import ReportPublication from '@components/Report/Publication'
import Confirm from '@components/UIElements/Confirm'
import useHandleWrongNetwork from '@hooks/useHandleWrongNetwork'
import type { ProfileOptions } from '@lens-protocol/metadata'
import { MetadataAttributeType, profile } from '@lens-protocol/metadata'
import useProfileStore from '@lib/store/idb/profile'
import { Dialog, DropdownMenu, Flex, IconButton, Text } from '@radix-ui/themes'
import { LENSHUB_PROXY_ABI } from '@tape.xyz/abis'
import {
  ERROR_MESSAGE,
  LENSHUB_PROXY_ADDRESS,
  REQUESTING_SIGNATURE_MESSAGE,
  SIGN_IN_REQUIRED,
  TAPE_APP_ID
} from '@tape.xyz/constants'
import {
  checkLensManagerPermissions,
  EVENTS,
  getIsIPFSUrl,
  getMetadataCid,
  getProfileCoverPicture,
  getProfilePictureUri,
  getSignature,
  getValueFromKeyInAttributes,
  logger,
  Tower,
  trimify,
  uploadToAr
} from '@tape.xyz/generic'
import type {
  OnchainSetProfileMetadataRequest,
  PrimaryPublication,
  Profile
} from '@tape.xyz/lens'
import {
  useAddPublicationBookmarkMutation,
  useAddPublicationNotInterestedMutation,
  useBroadcastOnchainMutation,
  useCreateOnchainSetProfileMetadataTypedDataMutation,
  useHidePublicationMutation,
  useRemovePublicationBookmarkMutation,
  useSetProfileMetadataMutation,
  useUndoPublicationNotInterestedMutation
} from '@tape.xyz/lens'
import { useApolloClient } from '@tape.xyz/lens/apollo'
import type { CustomErrorWithData } from '@tape.xyz/lens/custom-types'
import {
  BookmarkOutline,
  ExternalOutline,
  FlagOutline,
  ForbiddenOutline,
  PinOutline,
  ShareOutline,
  ThreeDotsOutline,
  TimesOutline,
  TrashOutline
} from '@tape.xyz/ui'
import type { FC, ReactNode } from 'react'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { v4 as uuidv4 } from 'uuid'
import { useContractWrite, useSignTypedData } from 'wagmi'

import ArweaveExplorerLink from '../Links/ArweaveExplorerLink'
import IPFSLink from '../Links/IPFSLink'
import Share from '../VideoCard/Share'

type Props = {
  publication: PrimaryPublication
  children?: ReactNode
  variant?: 'soft' | 'solid' | 'classic' | 'surface' | 'outline' | 'ghost'
}

const PublicationOptions: FC<Props> = ({
  publication,
  variant = 'ghost',
  children
}) => {
  const handleWrongNetwork = useHandleWrongNetwork()
  const [showConfirm, setShowConfirm] = useState(false)

  const { cache } = useApolloClient()
  const activeProfile = useProfileStore((state) => state.activeProfile)
  const { canUseLensManager, canBroadcast } =
    checkLensManagerPermissions(activeProfile)

  const isVideoOwner = activeProfile?.id === publication?.by?.id
  const pinnedVideoId = getValueFromKeyInAttributes(
    activeProfile?.metadata?.attributes,
    'pinnedPublicationId'
  )

  const [hideVideo] = useHidePublicationMutation({
    update(cache) {
      const normalizedId = cache.identify({
        id: publication?.id,
        __typename: 'Post'
      })
      cache.evict({ id: normalizedId })
      cache.gc()
    },
    onCompleted: () => {
      toast.success(`Video deleted`)
      Tower.track(EVENTS.PUBLICATION.DELETE, {
        publication_type: publication.__typename?.toLowerCase()
      })
    }
  })

  const onHideVideo = async () => {
    await hideVideo({ variables: { request: { for: publication?.id } } })
    setShowConfirm(false)
  }

  const onClickReport = () => {
    if (!activeProfile?.id) {
      return toast.error(SIGN_IN_REQUIRED)
    }
    if (handleWrongNetwork()) {
      return
    }
  }

  const onError = (error: CustomErrorWithData) => {
    toast.error(error?.data?.message ?? error?.message ?? ERROR_MESSAGE)
  }

  const onCompleted = (
    __typename?: 'RelayError' | 'RelaySuccess' | 'LensProfileManagerRelayError'
  ) => {
    if (
      __typename === 'RelayError' ||
      __typename === 'LensProfileManagerRelayError'
    ) {
      return
    }
    toast.success(`Transaction submitted`)
    Tower.track(EVENTS.PUBLICATION.PIN)
  }

  const { signTypedDataAsync } = useSignTypedData({
    onError
  })

  const { write } = useContractWrite({
    address: LENSHUB_PROXY_ADDRESS,
    abi: LENSHUB_PROXY_ABI,
    functionName: 'setProfileMetadataURI',
    onError,
    onSuccess: () => onCompleted()
  })

  const [broadcast] = useBroadcastOnchainMutation({
    onError,
    onCompleted: ({ broadcastOnchain }) =>
      onCompleted(broadcastOnchain.__typename)
  })

  const [createOnchainSetProfileMetadataTypedData] =
    useCreateOnchainSetProfileMetadataTypedDataMutation({
      onCompleted: async ({ createOnchainSetProfileMetadataTypedData }) => {
        const { typedData, id } = createOnchainSetProfileMetadataTypedData
        const { profileId, metadataURI } = typedData.value
        try {
          toast.loading(REQUESTING_SIGNATURE_MESSAGE)
          if (canBroadcast) {
            const signature = await signTypedDataAsync(getSignature(typedData))
            const { data } = await broadcast({
              variables: { request: { id, signature } }
            })
            if (data?.broadcastOnchain?.__typename === 'RelayError') {
              return write({ args: [profileId, metadataURI] })
            }
            return
          }
          return write({ args: [profileId, metadataURI] })
        } catch {}
      },
      onError
    })

  const [setProfileMetadata] = useSetProfileMetadataMutation({
    onCompleted: ({ setProfileMetadata }) =>
      onCompleted(setProfileMetadata.__typename),
    onError
  })

  const otherAttributes =
    activeProfile?.metadata?.attributes
      ?.filter((attr) => !['pinnedPublicationId', 'app'].includes(attr.key))
      .map(({ key, value, type }) => ({
        key,
        value,
        type: MetadataAttributeType[type] as any
      })) ?? []

  const onPinVideo = async () => {
    if (!activeProfile) {
      return toast.error(SIGN_IN_REQUIRED)
    }
    if (handleWrongNetwork()) {
      return
    }

    try {
      toast.loading(`Pinning video...`)
      const pfp = getProfilePictureUri(activeProfile as Profile)
      const metadata: ProfileOptions = {
        ...(activeProfile?.metadata?.displayName && {
          name: activeProfile?.metadata.displayName
        }),
        ...(activeProfile?.metadata?.bio && {
          bio: activeProfile?.metadata.bio
        }),
        ...(pfp && {
          picture: pfp
        }),
        appId: TAPE_APP_ID,
        coverPicture: getProfileCoverPicture(activeProfile),
        id: uuidv4(),
        attributes: [
          ...otherAttributes,
          {
            type: MetadataAttributeType.STRING,
            key: 'pinnedPublicationId',
            value: publication.id
          },
          {
            type: MetadataAttributeType.STRING,
            key: 'app',
            value: TAPE_APP_ID
          }
        ]
      }
      metadata.attributes = metadata.attributes?.filter(
        (m) => Boolean(trimify(m.key)) && Boolean(trimify(m.value))
      )
      const metadataUri = await uploadToAr(profile(metadata))
      const request: OnchainSetProfileMetadataRequest = {
        metadataURI: metadataUri
      }

      if (canUseLensManager) {
        const { data } = await setProfileMetadata({
          variables: { request }
        })
        if (
          data?.setProfileMetadata?.__typename ===
          'LensProfileManagerRelayError'
        ) {
          return await createOnchainSetProfileMetadataTypedData({
            variables: { request }
          })
        }
        return
      }

      return createOnchainSetProfileMetadataTypedData({
        variables: { request }
      })
    } catch (error) {
      logger.error('[On Pin Video]', error)
    }
  }

  const modifyInterestCache = (notInterested: boolean) => {
    cache.modify({
      id: `Post:${publication?.id}`,
      fields: { notInterested: () => notInterested }
    })
    toast.success(
      notInterested
        ? `Publication marked as not interested`
        : `Publication removed from not interested`
    )
    Tower.track(EVENTS.PUBLICATION.TOGGLE_INTEREST)
  }

  const modifyListCache = (saved: boolean) => {
    cache.modify({
      id: `Post:${publication?.id}`,
      fields: {
        operations: () => {
          return {
            ...publication.operations,
            hasBookmarked: saved
          }
        }
      }
    })
    toast.success(
      saved ? `Video added to your list` : `Video removed from your list`
    )
    Tower.track(EVENTS.PUBLICATION.TOGGLE_INTEREST)
  }

  const [addNotInterested] = useAddPublicationNotInterestedMutation({
    onError,
    onCompleted: () => modifyInterestCache(true)
  })

  const [removeNotInterested] = useUndoPublicationNotInterestedMutation({
    onError,
    onCompleted: () => modifyInterestCache(false)
  })

  const [saveVideoToList] = useAddPublicationBookmarkMutation({
    onError,
    onCompleted: () => modifyListCache(true)
  })

  const [removeVideoFromList] = useRemovePublicationBookmarkMutation({
    onError,
    onCompleted: () => modifyListCache(false)
  })

  const notInterested = () => {
    if (!activeProfile?.id) {
      return toast.error(SIGN_IN_REQUIRED)
    }
    if (publication.operations.isNotInterested) {
      addNotInterested({
        variables: {
          request: {
            on: publication.id
          }
        }
      })
    } else {
      removeNotInterested({
        variables: {
          request: {
            on: publication.id
          }
        }
      })
    }
  }

  const saveToList = () => {
    if (!activeProfile?.id) {
      return toast.error(SIGN_IN_REQUIRED)
    }
    if (publication.operations.hasBookmarked) {
      removeVideoFromList({
        variables: {
          request: {
            on: publication.id
          }
        }
      })
    } else {
      saveVideoToList({
        variables: {
          request: {
            on: publication.id
          }
        }
      })
    }
  }

  return (
    <>
      <Confirm
        showConfirm={showConfirm}
        setShowConfirm={setShowConfirm}
        action={onHideVideo}
      />
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          {children ?? (
            <IconButton radius="full" variant={variant} highContrast size="2">
              <ThreeDotsOutline className="size-3.5" />
              <span className="sr-only">Video Options</span>
            </IconButton>
          )}
        </DropdownMenu.Trigger>
        <DropdownMenu.Content sideOffset={10} variant="soft" align="end">
          <div className="flex w-40 flex-col transition duration-150 ease-in-out">
            <Dialog.Root>
              <Dialog.Trigger>
                <button className="!cursor-default rounded-md px-3 py-1.5 hover:bg-gray-500/20">
                  <Flex align="center" gap="2">
                    <ShareOutline className="size-3.5" />
                    <Text size="2" className="whitespace-nowrap">
                      Share
                    </Text>
                  </Flex>
                </button>
              </Dialog.Trigger>

              <Dialog.Content style={{ maxWidth: 450 }}>
                <Flex justify="between" pb="5" align="center">
                  <Dialog.Title mb="0">Share</Dialog.Title>
                  <Dialog.Close>
                    <IconButton variant="ghost" color="gray">
                      <TimesOutline outlined={false} className="size-3" />
                    </IconButton>
                  </Dialog.Close>
                </Flex>

                <Share publication={publication} />
              </Dialog.Content>
            </Dialog.Root>
            {isVideoOwner && (
              <>
                {pinnedVideoId !== publication.id && (
                  <DropdownMenu.Item
                    disabled={!activeProfile?.id}
                    onClick={() => onPinVideo()}
                  >
                    <Flex align="center" gap="2">
                      <PinOutline className="size-3.5" />
                      <span className="whitespace-nowrap">Pin Video</span>
                    </Flex>
                  </DropdownMenu.Item>
                )}
                <DropdownMenu.Item
                  color="red"
                  onClick={() => setShowConfirm(true)}
                >
                  <Flex align="center" gap="2">
                    <TrashOutline className="size-3.5" />
                    <span className="whitespace-nowrap">Delete</span>
                  </Flex>
                </DropdownMenu.Item>
              </>
            )}

            {!isVideoOwner && (
              <>
                <DropdownMenu.Item
                  disabled={!activeProfile?.id}
                  onClick={() => saveToList()}
                >
                  <Flex align="center" gap="2">
                    <BookmarkOutline className="size-3.5 flex-none" />
                    <span className="truncate whitespace-nowrap">
                      {publication.operations.hasBookmarked ? 'Unsave' : 'Save'}
                    </span>
                  </Flex>
                </DropdownMenu.Item>
                <DropdownMenu.Item
                  disabled={!activeProfile?.id}
                  onClick={() => notInterested()}
                >
                  <Flex align="center" gap="2">
                    <ForbiddenOutline className="size-3.5" />
                    <span className="whitespace-nowrap">
                      {publication.operations.isNotInterested
                        ? 'Interested'
                        : 'Not Interested'}
                    </span>
                  </Flex>
                </DropdownMenu.Item>
                <Dialog.Root>
                  <Dialog.Trigger disabled={!activeProfile?.id}>
                    <button
                      className="!cursor-default rounded-md px-3 py-1.5 hover:bg-gray-500/20 disabled:opacity-40 disabled:hover:bg-inherit"
                      onClick={() => onClickReport()}
                    >
                      <Flex align="center" gap="2">
                        <FlagOutline className="size-3.5" />
                        <Text size="2" className="whitespace-nowrap">
                          Report
                        </Text>
                      </Flex>
                    </button>
                  </Dialog.Trigger>

                  <Dialog.Content style={{ maxWidth: 450 }}>
                    <Dialog.Title>Report</Dialog.Title>
                    <ReportPublication publication={publication} />
                  </Dialog.Content>
                </Dialog.Root>

                {getIsIPFSUrl(publication.metadata.rawURI) ? (
                  <IPFSLink hash={getMetadataCid(publication)}>
                    <DropdownMenu.Item
                      onClick={() => Tower.track(EVENTS.CLICK_VIEW_METADATA)}
                    >
                      <Flex align="center" gap="2">
                        <ExternalOutline className="size-3.5" />
                        <span className="whitespace-nowrap">View metadata</span>
                      </Flex>
                    </DropdownMenu.Item>
                  </IPFSLink>
                ) : (
                  <ArweaveExplorerLink txId={getMetadataCid(publication)}>
                    <DropdownMenu.Item
                      onClick={() => Tower.track(EVENTS.CLICK_VIEW_METADATA)}
                    >
                      <Flex align="center" gap="2">
                        <ExternalOutline className="size-3.5" />
                        <span className="whitespace-nowrap">View metadata</span>
                      </Flex>
                    </DropdownMenu.Item>
                  </ArweaveExplorerLink>
                )}
                {publication.momoka?.proof && (
                  <ArweaveExplorerLink
                    txId={publication.momoka?.proof?.replace('ar://', '')}
                  >
                    <DropdownMenu.Item
                      onClick={() => Tower.track(EVENTS.CLICK_VIEW_PROOF)}
                    >
                      <Flex align="center" gap="2">
                        <ExternalOutline className="size-3.5" />
                        <span className="whitespace-nowrap">View proof</span>
                      </Flex>
                    </DropdownMenu.Item>
                  </ArweaveExplorerLink>
                )}
              </>
            )}
          </div>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </>
  )
}

export default PublicationOptions

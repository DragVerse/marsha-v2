// apps/web/src/components/Profile/BasicInfo/Follow.tsx
import { LENSHUB_PROXY_ABI } from '@dragverse/abis'
import {
  ERROR_MESSAGE,
  LENSHUB_PROXY_ADDRESS,
  REQUESTING_SIGNATURE_MESSAGE,
  SIGN_IN_REQUIRED
} from '@dragverse/constants'
import {
  checkLensManagerPermissions,
  EVENTS,
  getProfile,
  getSignature,
  Tower
} from '@dragverse/generic'
import type { FollowLensManagerRequest, Profile } from '@dragverse/lens'
import {
  useBroadcastOnchainMutation,
  useCreateFollowTypedDataMutation,
  useFollowMutation
} from '@dragverse/lens'
import type { CustomErrorWithData } from '@dragverse/lens/custom-types'
import { Button } from '@dragverse/ui'
import useHandleWrongNetwork from '@hooks/useHandleWrongNetwork'
import useProfileStore from '@lib/store/idb/profile'
import useNonceStore from '@lib/store/nonce'
import type { FC } from 'react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useSignTypedData, useWriteContract } from 'wagmi'

import TipEmbed from '../../Watch/OpenActions/Unknown/Tip/TipEmbed'
import styles from './Follow.module.css'

type Props = {
  profile: Profile
  onSubscribe: () => void
}

const Follow: FC<Props> = ({ profile, onSubscribe }) => {
  const [loading, setLoading] = useState(false)
  const [showTipEmbed, setShowTipEmbed] = useState(false)
  const { activeProfile } = useProfileStore()
  const { canUseLensManager, canBroadcast } =
    checkLensManagerPermissions(activeProfile)
  const handleWrongNetwork = useHandleWrongNetwork()

  const { lensHubOnchainSigNonce, setLensHubOnchainSigNonce } = useNonceStore()

  const onError = (error: CustomErrorWithData) => {
    toast.error(error?.data?.message ?? error?.message ?? ERROR_MESSAGE)
    setLoading(false)
  }

  const onCompleted = (__typename?: 'RelayError' | 'RelaySuccess') => {
    if (__typename === 'RelayError') {
      return
    }
    onSubscribe()
    setLoading(false)
    toast.success(`Followed ${getProfile(profile)?.displayName}`)
    Tower.track(EVENTS.PROFILE.FOLLOW, {
      profile_id: profile.id,
      profile_name: getProfile(profile)?.slug
    })
  }

  const { signTypedDataAsync } = useSignTypedData({
    mutation: { onError }
  })

  const { writeContractAsync } = useWriteContract({
    mutation: {
      onSuccess: () => onCompleted(),
      onError
    }
  })

  const write = async ({ args }: { args: any[] }) => {
    return await writeContractAsync({
      address: LENSHUB_PROXY_ADDRESS,
      abi: LENSHUB_PROXY_ABI,
      functionName: 'follow',
      args
    })
  }

  const [broadcast] = useBroadcastOnchainMutation({
    onCompleted: ({ broadcastOnchain }) =>
      onCompleted(broadcastOnchain.__typename),
    onError
  })

  const [createFollowTypedData] = useCreateFollowTypedDataMutation({
    onCompleted: async ({ createFollowTypedData }) => {
      const { typedData, id } = createFollowTypedData
      const {
        followerProfileId,
        idsOfProfilesToFollow,
        followTokenIds,
        datas
      } = typedData.value
      const args = [
        followerProfileId,
        idsOfProfilesToFollow,
        followTokenIds,
        datas
      ]
      try {
        toast.loading(REQUESTING_SIGNATURE_MESSAGE)
        if (canBroadcast) {
          const signature = await signTypedDataAsync(getSignature(typedData))
          setLensHubOnchainSigNonce(lensHubOnchainSigNonce + 1)
          const { data } = await broadcast({
            variables: { request: { id, signature } }
          })
          if (data?.broadcastOnchain?.__typename === 'RelayError') {
            return await write({ args })
          }
          return
        }
        return await write({ args })
      } catch {
        setLoading(false)
      }
    },
    onError
  })

  const [followMutation] = useFollowMutation({
    onCompleted: () => onCompleted(),
    onError
  })

  const followViaLensManager = async (request: FollowLensManagerRequest) => {
    const { data } = await followMutation({ variables: { request } })

    if (data?.follow.__typename === 'LensProfileManagerRelayError') {
      return await createFollowTypedData({
        variables: {
          options: { overrideSigNonce: lensHubOnchainSigNonce },
          request
        }
      })
    }
  }

  const follow = async () => {
    if (!activeProfile?.id) {
      return toast.error(SIGN_IN_REQUIRED)
    }
    await handleWrongNetwork()

    setLoading(true)
    const request = {
      follow: [
        {
          profileId: profile.id
        }
      ]
    }

    if (canUseLensManager) {
      return await followViaLensManager(request)
    }

    return await createFollowTypedData({
      variables: {
        options: { overrideSigNonce: lensHubOnchainSigNonce },
        request
      }
    })
  }

  const toggleTipEmbed = () => {
    setShowTipEmbed((prev) => !prev)
  }

  const closeTipEmbed = () => {
    setShowTipEmbed(false)
  }

  return (
    <div className={styles.container}>
      <Button disabled={loading} loading={loading} onClick={() => follow()}>
        Follow
      </Button>
      <Button className={styles.tipButton} onClick={toggleTipEmbed}>
        Tip
      </Button>
      {showTipEmbed && (
        <TipEmbed publicationId={profile.id} onClose={closeTipEmbed} />
      )}
    </div>
  )
}

export default Follow

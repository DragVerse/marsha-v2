import { ADMIN_IDS } from '@dragverse/constants'
import {
  EVENTS,
  getLennyPicture,
  getProfile,
  getProfilePicture,
  Tower
} from '@dragverse/generic'
import type { Profile } from '@dragverse/lens'
import { useProfilesManagedQuery } from '@dragverse/lens'
import {
  BookmarkOutline,
  ChevronRightOutline,
  CogOutline,
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  GraphOutline,
  HandWaveOutline,
  SwitchProfileOutline,
  UserOutline
} from '@dragverse/ui'
import useProfileStore from '@lib/store/idb/profile'
import { usePrivy } from '@privy-io/react-auth'
import { useRouter } from 'next/router'
import React, { useMemo, useState } from 'react'

import ReminderPasswordPopup from '../Common/ReminderPasswordPopup'

const UserMenu = () => {
  const router = useRouter()
  const { logout } = usePrivy()
  const { activeProfile } = useProfileStore()
  const [loading, setLoading] = useState(false)
  const [showReminder, setShowReminder] = useState(false)

  const { data } = useProfilesManagedQuery({
    skip: !activeProfile?.id // Only fetch if there is an active profile
  })

  const profilesManagedWithoutActiveProfile = useMemo(() => {
    if (!data?.profilesManaged?.items) {
      return []
    }
    return data.profilesManaged.items.filter(
      (p) => p.id !== activeProfile?.id
    ) as Profile[]
  }, [data?.profilesManaged, activeProfile])

  const handleLogout = async () => {
    setLoading(true)
    try {
      await logout()
      Tower.track(EVENTS.AUTH.SIGN_OUT)
      router.push('/') // Redirect to homepage or login page
    } catch (error) {
      console.error('Logout failed:', error)
    } finally {
      setLoading(false)
      setShowReminder(false)
    }
  }

  const isAdmin = ADMIN_IDS.includes(activeProfile?.id)

  const onClickSignout = () => {
    setShowReminder(true)
  }

  return (
    <>
      <DropdownMenu
        trigger={
          <div className="ring-brand-500 size-[34px] rounded-full hover:ring-2">
            <img
              className="h-full w-full flex-none rounded-full object-cover"
              src={getProfilePicture(activeProfile, 'AVATAR')}
              alt={getProfile(activeProfile)?.displayName}
              onError={({ currentTarget }) =>
                (currentTarget.src = getLennyPicture(activeProfile?.id))
              }
            />
          </div>
        }
      >
        {isAdmin && (
          <DropdownMenuItem onClick={() => router.push('/admin')}>
            <div className="flex items-center gap-2">
              <GraphOutline className="size-4" />
              <p className="whitespace-nowrap">Mod</p>
            </div>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem
          onClick={() => router.push(`/profile/${activeProfile?.id}`)}
        >
          <div className="flex items-center gap-2">
            <UserOutline className="size-4" />
            <p className="whitespace-nowrap">My Profile</p>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push('/bookmarks')}>
          <div className="flex items-center gap-2">
            <BookmarkOutline className="size-4" />
            <p className="whitespace-nowrap">Bookmarks</p>
          </div>
        </DropdownMenuItem>
        {profilesManagedWithoutActiveProfile.length > 0 && (
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="flex justify-between">
              <div className="flex items-center gap-2">
                <SwitchProfileOutline className="size-4" />
                <p className="whitespace-nowrap">Switch Profile</p>
              </div>
              <ChevronRightOutline className="size-2.5" />
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                {profilesManagedWithoutActiveProfile.map((profile) => (
                  <DropdownMenuItem
                    key={profile.id}
                    onClick={() => router.push(`/profile/${profile.id}`)}
                  >
                    <div className="flex items-center gap-2">
                      <img
                        src={getProfilePicture(profile)}
                        className="size-4 rounded-full"
                        alt={getProfile(profile)?.displayName}
                        onError={({ currentTarget }) => {
                          currentTarget.src = getLennyPicture(profile?.id)
                        }}
                        draggable={false}
                      />
                      <span>{getProfile(profile)?.slug}</span>
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        )}
        <DropdownMenuItem onClick={() => router.push('/settings')}>
          <div className="flex items-center gap-2">
            <CogOutline className="size-4" />
            <p className="whitespace-nowrap">My Settings</p>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled={loading} onClick={onClickSignout}>
          <div className="flex items-center gap-2 text-red-500">
            <HandWaveOutline className="size-4" />
            <p className="whitespace-nowrap">Sign out</p>
          </div>
        </DropdownMenuItem>
      </DropdownMenu>
      {showReminder && (
        <ReminderPasswordPopup
          onConfirm={handleLogout}
          onClose={() => setShowReminder(false)}
        />
      )}
    </>
  )
}

export default UserMenu

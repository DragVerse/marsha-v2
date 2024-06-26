import { tw } from '@dragverse/browser'
import { getIsProfileOwner } from '@dragverse/generic'
import {
  InterestsOutline,
  KeyOutline,
  LockOutline,
  MentionOutline,
  ProfileBanOutline,
  ProfileManagerOutline,
  SubscribeOutline,
  UserOutline,
  WarningOutline
} from '@dragverse/ui'
import useProfileStore from '@lib/store/idb/profile'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useAccount } from 'wagmi'

import {
  SETTINGS,
  SETTINGS_ALLOWANCE,
  SETTINGS_BLOCKED,
  SETTINGS_DANGER_ZONE,
  SETTINGS_FOLLOW,
  SETTINGS_HANDLES,
  SETTINGS_INTERESTS,
  SETTINGS_MANAGER,
  SETTINGS_SESSIONS
} from '.'

const SettingsSidebar = () => {
  const router = useRouter()
  const { address } = useAccount()
  const activeProfile = useProfileStore((state) => state.activeProfile)
  const isActivePath = (path: string) => router.pathname === path
  if (!activeProfile || !address) {
    return null
  }

  const isProfileOwner = getIsProfileOwner(activeProfile, address)

  return (
    <div className="flex flex-col space-y-1 pb-10 md:ml-auto md:w-44">
      <Link
        href={SETTINGS}
        className={tw(
          'flex items-center space-x-3 rounded-lg px-3 py-1.5 text-sm transition-colors',
          isActivePath(SETTINGS)
            ? 'bg-brand-600/50 dark:bg-brand-600/80/80 font-bold'
            : 'text-dust hover:bg-brand-600 dark:hover:bg-brand-600/50 font-medium'
        )}
      >
        <UserOutline className="size-4" />
        <span>Basic Info</span>
      </Link>
      <Link
        href={SETTINGS_FOLLOW}
        className={tw(
          'flex items-center space-x-3 rounded-lg px-3 py-1.5 text-sm transition-colors',
          isActivePath(SETTINGS_FOLLOW)
            ? 'bg-brand-600/50 dark:bg-brand-600/80/80 font-bold'
            : 'text-dust hover:bg-brand-600/50 dark:hover:bg-brand-600/50 font-medium'
        )}
      >
        <SubscribeOutline className="size-4" />
        <span>Set Follow</span>
      </Link>
      <Link
        href={SETTINGS_HANDLES}
        className={tw(
          'flex items-center space-x-3 rounded-lg px-3 py-1.5 text-sm transition-colors',
          isActivePath(SETTINGS_HANDLES)
            ? 'bg-brand-600/50 dark:bg-brand-600/80/80 font-bold'
            : 'text-dust hover:bg-brand-600/50 dark:hover:bg-brand-600/50 font-medium'
        )}
      >
        <MentionOutline className="size-4" />
        <span>Handles</span>
      </Link>
      <Link
        href={SETTINGS_INTERESTS}
        className={tw(
          'flex items-center space-x-3 rounded-lg px-3 py-1.5 text-sm transition-colors',
          isActivePath(SETTINGS_INTERESTS)
            ? 'bg-brand-600/50 dark:bg-brand-600/80/80 font-bold'
            : 'text-dust hover:bg-brand-600/50 dark:hover:bg-brand-600/50 font-medium'
        )}
      >
        <InterestsOutline className="size-4" />
        <span>Interests</span>
      </Link>
      {isProfileOwner && (
        <Link
          href={SETTINGS_MANAGER}
          className={tw(
            'flex items-center space-x-3 rounded-lg px-3 py-1.5 text-sm transition-colors',
            isActivePath(SETTINGS_MANAGER)
              ? 'bg-brand-600/50 dark:bg-brand-600/80/80 font-bold'
              : 'text-dust hover:bg-brand-600/50 dark:hover:bg-brand-600/50 font-medium'
          )}
        >
          <ProfileManagerOutline className="size-4" />
          <span>Manager</span>
        </Link>
      )}
      <Link
        href={SETTINGS_ALLOWANCE}
        className={tw(
          'flex items-center space-x-3 rounded-lg px-3 py-1.5 text-sm transition-colors',
          isActivePath(SETTINGS_ALLOWANCE)
            ? 'bg-brand-600/50 dark:bg-brand-600/80/80 font-bold'
            : 'text-dust hover:bg-brand-600/50 dark:hover:bg-brand-600/50 font-medium'
        )}
      >
        <LockOutline className="size-4" />
        <span>Allowance</span>
      </Link>
      <Link
        href={SETTINGS_BLOCKED}
        className={tw(
          'flex items-center space-x-3 rounded-lg px-3 py-1.5 text-sm transition-colors',
          isActivePath(SETTINGS_BLOCKED)
            ? 'bg-brand-600/50 dark:bg-brand-600/80/80 font-bold'
            : 'text-dust hover:bg-brand-600/50 dark:hover:bg-brand-600/50 font-medium'
        )}
      >
        <ProfileBanOutline className="size-4" />
        <span>Blocked</span>
      </Link>
      <Link
        href={SETTINGS_SESSIONS}
        className={tw(
          'flex items-center space-x-3 rounded-lg px-3 py-1.5 text-sm transition-colors',
          isActivePath(SETTINGS_SESSIONS)
            ? 'bg-brand-600/50 dark:bg-brand-600/80/80 font-bold'
            : 'text-dust hover:bg-brand-600/50 dark:hover:bg-brand-600/50 font-medium'
        )}
      >
        <KeyOutline className="size-4" />
        <span>Sessions</span>
      </Link>
      {isProfileOwner && (
        <Link
          href={SETTINGS_DANGER_ZONE}
          className={tw(
            'flex items-center space-x-3 rounded-lg px-3 py-1.5 text-sm text-red-500 transition-colors',
            isActivePath(SETTINGS_DANGER_ZONE)
              ? 'bg-red-200 font-bold dark:bg-red-900/50'
              : 'font-medium hover:bg-red-100 dark:hover:bg-red-900/50'
          )}
        >
          <WarningOutline className="size-4" />
          <span>Danger Zone</span>
        </Link>
      )}
    </div>
  )
}

export default SettingsSidebar

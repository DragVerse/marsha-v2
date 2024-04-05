import { tw } from '@dragverse/browser'

export const AudioCardShimmer = ({ rounded = true }) => {
  return (
    <div className={tw('w-full', rounded && 'rounded-xl')}>
      <div className="animate-shimmer flex flex-col space-x-2">
        <div
          className={tw(
            'dark:bg-brand-250/50 h-24 w-full bg-gray-200 md:h-40',
            rounded && 'rounded-large'
          )}
        />
      </div>
    </div>
  )
}

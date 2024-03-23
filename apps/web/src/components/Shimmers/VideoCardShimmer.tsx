import { tw } from '@dragverse/browser'

export const CardShimmer = ({ rounded = true }) => {
  return (
    <div className={tw('w-full', rounded && 'rounded-xl')}>
      <div className="animate-shimmer flex flex-col space-x-2">
        <div
          className={tw(
            'aspect-w-16 aspect-h-9 dark:bg-brand-950 bg-gray-200',
            rounded && 'rounded-large'
          )}
        />
      </div>
    </div>
  )
}

const VideoCardShimmer = () => {
  return (
    <div className="w-full rounded-xl">
      <div className="animate-shimmer flex flex-col">
        <div className="aspect-w-16 aspect-h-9 rounded-medium dark:bg-brand-950 bg-gray-200" />
        <div className="flex space-x-2 py-2">
          <div className="dark:bg-brand-950 size-8 flex-none rounded-full bg-gray-200" />
          <div className="flex w-full flex-col space-y-2">
            <div className="dark:bg-brand-950 h-3 w-full rounded-md bg-gray-200" />
            <div className="dark:bg-brand-950 h-3 w-full rounded-md bg-gray-200" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoCardShimmer

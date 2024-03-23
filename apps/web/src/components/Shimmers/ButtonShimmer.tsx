import { tw } from '@dragverse/browser'

const ButtonShimmer = ({ className = 'h-10' }) => {
  return (
    <div className="animate-shimmer w-full">
      <div
        className={tw(
          'dark:bg-brand-250/50 w-full rounded-lg bg-gray-200',
          className
        )}
      />
    </div>
  )
}

export default ButtonShimmer

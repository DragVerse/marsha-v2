import React from 'react'

const SuggestedShimmer = () => {
  return (
    <div className="w-full rounded-md">
      <div className="animate-shimmer flex space-x-2">
        <div className="rounded-small dark:bg-brand-950 h-24 w-44 bg-gray-200" />
        <div className="flex flex-1 flex-col space-y-2 py-1">
          <div className="dark:bg-brand-950 h-4 w-full rounded bg-gray-200" />
          <div className="dark:bg-brand-950 h-3 w-1/2 rounded bg-gray-200" />
          <div className="dark:bg-brand-950 h-3 w-1/2 rounded bg-gray-200" />
        </div>
      </div>
    </div>
  )
}

export default SuggestedShimmer

import React from 'react'

const SquareButtonShimmer = () => {
  return (
    <div className="flex self-center">
      <div className="animate-shimmer flex">
        <div className="dark:bg-brand-950 rounded-lg bg-gray-200 p-3.5 md:rounded-xl md:p-[18px]" />
      </div>
    </div>
  )
}

export default SquareButtonShimmer

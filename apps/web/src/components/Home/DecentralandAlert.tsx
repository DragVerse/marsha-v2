import React from 'react'

const DecentralandAlert: React.FC = () => {
  return (
    <a
      href="https://decentraland.org/play/?realm=dragverse.dcl.eth"
      className="tape-border rounded-large ultrawide:h-[400px] relative flex h-[350px] w-full flex-none overflow-hidden sm:w-[300px] lg:w-[500px]"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        src="/assets/dragverse-decentraland.png"
        alt="Play on Decentraland"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="ultrawide:p-8 relative flex h-full w-full flex-col justify-end space-y-4 p-4 text-left text-white md:p-6">
        <div className="absolute inset-0 h-full w-full bg-gradient-to-t from-black/90 via-black/60 to-transparent"></div>
        <h3 className="relative text-lg font-bold">Play on Decentraland</h3>
      </div>
    </a>
  )
}

export default DecentralandAlert

import React from 'react'

const HyperfyAlert: React.FC = () => {
  return (
    <a
      href="https://hyperfy.io/drag"
      className="tape-border rounded-large ultrawide:h-[400px] relative flex h-[350px] w-full flex-none overflow-hidden sm:w-[300px] lg:w-[500px]"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        src="https://static.wixstatic.com/media/707696_13bc8603b6144e60933071e2e9605d20~mv2.jpg"
        alt="Play on Hyperfy"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="ultrawide:p-8 relative flex h-full w-full flex-col justify-end space-y-4 p-4 text-left text-white md:p-6">
        <div className="absolute inset-0 h-full w-full bg-gradient-to-t from-black/90 via-black/60 to-transparent"></div>
        <h3 className="relative text-lg font-bold">Play on Hyperfy</h3>
      </div>
    </a>
  )
}

export default HyperfyAlert

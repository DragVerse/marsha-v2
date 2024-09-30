import type React from "react";

const DecentralandAlert: React.FC = () => {
  return (
    <a
      href="https://decentraland.org/play/?realm=dragverse.dcl.eth"
      className="dragverse-border relative flex h-[350px] ultrawide:h-[400px] w-full flex-none overflow-hidden rounded-large sm:w-[300px] lg:w-[500px]"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        src="/assets/dragverse-decentraland.png"
        alt="Play on Decentraland"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="relative flex h-full w-full flex-col justify-end space-y-4 p-4 ultrawide:p-8 text-left text-white md:p-6">
        <div className="absolute inset-0 h-full w-full bg-gradient-to-t from-black/90 via-black/60 to-transparent" />
        <h3 className="relative font-bold text-lg">Play on Decentraland</h3>
      </div>
    </a>
  );
};

export default DecentralandAlert;

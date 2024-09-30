import type React from "react";

const LogoHero: React.FC = () => {
  return (
    <div className="flex h-[300px] items-center justify-center justify-self-center pr-4">
      <img
        src="/assets/stacked-yellow-logo.png"
        alt="Dragverse Logo"
        className="h-full w-auto object-contain"
      />
    </div>
  );
};

export default LogoHero;

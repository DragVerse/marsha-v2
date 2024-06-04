const WelcomeSuccess = () => {
  return (
    <div className="tape-border rounded-large ultrawide:h-[250px] relative flex h-[250px] w-[300px] flex-none overflow-hidden">
      <div className="to-brand-600 via-brand-950/60 absolute inset-0 z-[1] h-full w-full bg-gradient-to-b from-transparent" />
      <div className="ultrawide:p-8 relative z-[2] flex h-full flex-col justify-end space-y-4 p-4 text-left text-white md:p-6">
        <div className="text-3xl font-bold">Happy Pride</div>
        <p className="md:text-md max-w-2xl text-sm lg:text-lg">
          Embrace your true self and spread the joy of being authenticly YOU! 🌈
        </p>
      </div>
    </div>
  )
}

export default WelcomeSuccess

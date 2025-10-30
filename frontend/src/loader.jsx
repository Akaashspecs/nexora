const Loader = () => {
  return (
    <div className="h-screen w-screen backdrop-blur-3xl flex justify-center items-center fixed  z-50 top-0">
      <img src="/loader.gif" className="rounded-full" />
    </div>
  );
};

export default Loader;

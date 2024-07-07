import LoaderImage from "/loader2.gif";
function Loader() {
  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center bg-slate-300/20 backdrop-blur-sm">
      <img src={LoaderImage} alt="loader" className="w-14 sm:w-20" />
    </div>
  );
}

export default Loader;

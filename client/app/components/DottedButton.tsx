const DottedButton = ({ text, size }) => {
  if (size == "small") {
    return (
      <button className="cursor-pointer rounded-md border-2 border-dashed border-black bg-white px-4 py-1 font-semibold uppercase text-black transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-2xl hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none text-xs my-0">
        {text}
      </button>
    );
  } else {
    return (
      <button className="cursor-pointer rounded-md border-2 border-dashed border-black bg-white px-6 py-2 font-semibold uppercase text-black transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-2xl hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none my-0">
        {text}
      </button>
    );
  }
};

export default DottedButton;

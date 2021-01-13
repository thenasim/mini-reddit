import React from "react";

interface Props {}

const Wrapper: React.FC<Props> = ({ children }) => {
  return (
    <div className="grid min-h-screen place-items-center">
      <div className="w-11/12 p-12 bg-white sm:w-8/12 md:w-1/2 lg:w-5/12">
        <h1 className="text-xl font-semibold">
          Hello there 👋,{" "}
          <span className="font-normal">
            please fill in your information to continue
          </span>
        </h1>{" "}
        {children}
      </div>
    </div>
  );
};

export default Wrapper;

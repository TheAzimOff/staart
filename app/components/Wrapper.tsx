import React from "react";
import Sidebar from "./Sidebar";

const Wrapper = () => {
  return (
    <>
      <Sidebar />
      <div className="absolute left-0 top-0 -z-10 h-screen w-full bg-neutral-800">
        <div
          className="pointer-events-none h-full w-full"
          style={{
            opacity: 0.7,
            background:
              "url(https://unsplash.com/photos/ne3RC_Q9UEA/download?ixid=M3wxMjA3fDF8MXxhbGx8MXx8fHx8fDJ8fDE3MTEzNTM3OTR8&force=true&w=1920)",
          }}
        ></div>
      </div>
    </>
  );
};

export default Wrapper;

import React from "react";

const ShowError = ({ Error }) => {
  return (
    <>
      <div className="pointer-events-none absolute top-3 right-0  items-center px-3 ">
        <svg
          className="h-4 w-4 text-rose-500"
          width="16"
          height="16"
          fill="currentColor"
          viewBox="0 0 16 16"
          aria-hidden="true"
        >
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
        </svg>
      </div>
      <p className="mt-2  text-xs text-rose-600 " id="password-error">
        {Error}
      </p>
    </>
  );
};

export default ShowError;

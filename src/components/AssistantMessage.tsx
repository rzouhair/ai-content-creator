import React from "react";

const AssistantMessage = (props: any) => {
  return (
    <div className="rounded-lg mb-2">
      <div className="pl-14 relative response-block scroll-mt-32 rounded-md hover:bg-gray-50 pb-2 pt-2 pr-2 group min-h-[52px]">
        <div className="absolute top-2 left-2">
          <img
            src="/favicon-192x192.png"
            className="w-9 h-9 rounded-md flex-none"
          />
        </div>
        <div className="absolute bottom-0 right-0 p-2 flex items-center justify-center gap-1">
          <button className="rounded-full border bg-gray-100 border-gray-300 px-2 py-1 text-xs hover:bg-gray-200 transition-all hidden group-hover:flex overflow-hidden items-center justify-center text-gray-500 active:bg-gray-300 gap-1">
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 640 512"
              className="w-4 h-4"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M278.9 511.5l-61-17.7c-6.4-1.8-10-8.5-8.2-14.9L346.2 8.7c1.8-6.4 8.5-10 14.9-8.2l61 17.7c6.4 1.8 10 8.5 8.2 14.9L293.8 503.3c-1.9 6.4-8.5 10.1-14.9 8.2zm-114-112.2l43.5-46.4c4.6-4.9 4.3-12.7-.8-17.2L117 256l90.6-79.7c5.1-4.5 5.5-12.3.8-17.2l-43.5-46.4c-4.5-4.8-12.1-5.1-17-.5L3.8 247.2c-5.1 4.7-5.1 12.8 0 17.5l144.1 135.1c4.9 4.6 12.5 4.4 17-.5zm327.2.6l144.1-135.1c5.1-4.7 5.1-12.8 0-17.5L492.1 112.1c-4.8-4.5-12.4-4.3-17 .5L431.6 159c-4.6 4.9-4.3 12.7.8 17.2L523 256l-90.6 79.7c-5.1 4.5-5.5 12.3-.8 17.2l43.5 46.4c4.5 4.9 12.1 5.1 17 .6z"></path>
            </svg>
          </button>
          <button className="rounded-full border bg-gray-100 border-gray-300 px-2 py-1 text-xs hover:bg-gray-200 transition-all hidden group-hover:flex overflow-hidden items-center justify-center text-gray-500 gap-1">
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 448 512"
              className="w-4 h-4"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M320 448v40c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24V120c0-13.255 10.745-24 24-24h72v296c0 30.879 25.121 56 56 56h168zm0-344V0H152c-13.255 0-24 10.745-24 24v368c0 13.255 10.745 24 24 24h272c13.255 0 24-10.745 24-24V128H344c-13.2 0-24-10.8-24-24zm120.971-31.029L375.029 7.029A24 24 0 0 0 358.059 0H352v96h96v-6.059a24 24 0 0 0-7.029-16.97z"></path>
            </svg>
          </button>
        </div>
        <div className="w-full">
          <div className="prose prose-sm  dark:prose-invert prose-p:my-0">
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssistantMessage;

import React from 'react'

const UserMessage = (props: any) => {
  return (
    <div className="pl-14 relative response-block scroll-mt-32 rounded-md hover:bg-gray-100 pb-2 pt-2 pr-2 group min-h-[52px] duration-100 transition-colors">
      <div className="absolute top-2 left-2">
        <button className="w-9 h-9 bg-gray-200 rounded-md  flex-none flex items-center justify-center text-gray-500 hover:bg-gray-300 transition-all group active:bg-gray-200 overflow-hidden">
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 448 512"
            className="w-5 h-5 inline-block group-hover:hidden"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"></path>
          </svg>
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 512 512"
            className="w-5 h-5 hidden group-hover:inline-block"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M464 448H48c-26.51 0-48-21.49-48-48V112c0-26.51 21.49-48 48-48h416c26.51 0 48 21.49 48 48v288c0 26.51-21.49 48-48 48zM112 120c-30.928 0-56 25.072-56 56s25.072 56 56 56 56-25.072 56-56-25.072-56-56-56zM64 384h384V272l-87.515-87.515c-4.686-4.686-12.284-4.686-16.971 0L208 320l-55.515-55.515c-4.686-4.686-12.284-4.686-16.971 0L64 336v48z"></path>
          </svg>
        </button>
      </div>
      <div className="absolute bottom-0 right-0 p-2 flex items-center justify-center gap-1">
        <button className="rounded-full border bg-gray-100 border-gray-300 px-2 py-1 text-xs hover:bg-gray-200 dark:hover:bg-gray-700 transition-all hidden group-hover:flex overflow-hidden items-center justify-center text-gray-500 active:bg-gray-300 gap-1">
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
        <div>
          <div className="text-sm space-y-2 w-fit bg-blue-500 text-white px-4 py-2 rounded-lg max-w-full overflow-auto highlight-darkblue focus:outline">
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserMessage
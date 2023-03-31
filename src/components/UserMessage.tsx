import React from 'react'

const UserMessage = (props: any) => {
  return (
    <div className="relative flex items-start gap-3 response-block scroll-mt-32 rounded-md pb-2 pt-2 group min-h-[52px] duration-100 transition-colors">
      <div>
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
      <div className="w-full">
        <div>
          <p className='text-sm mb-1.5 text-gray-700'>User</p>
          <div className="text-sm w-fit bg-indigo-600 text-white px-3.5 py-2.5 rounded-lg rounded-tl-none max-w-full overflow-auto highlight-darkblue focus:outline">
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserMessage
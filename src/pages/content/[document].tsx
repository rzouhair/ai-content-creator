import QuillToolbar, { modules, formats } from "@/components/App/QuillToolbar";
import ContentSidebar from "@/components/Content/ContentSidebar";
import LayoutMain from "@/components/Layouts/LayoutMain";
import React, { useEffect, useMemo, useRef, useState } from "react";

import "react-quill/dist/quill.snow.css";

function ContentDocument() {
  const ReactQuill =
    typeof window === "object"
      ? (() => {
          const quill = require("react-quill");

          const icons = quill.Quill.import?.("ui/icons");
          const history = quill.Quill.import?.("modules/history");
          if (icons) {
            icons.header["1"] = '<i class="text-2xl h-[18px] i-tabler-h-1" />';
            icons.header["2"] = '<i class="text-2xl h-[18px] i-tabler-h-2" />';
            icons.header["3"] = '<i class="text-2xl h-[18px] i-tabler-h-3" />';
            icons.header["4"] = '<i class="text-2xl h-[18px] i-tabler-h-4" />';
          }

          return quill;
        })()
      : () => false;

  const [initialRenderComplete, setInitialRenderComplete] = useState(false);
  const quill = useRef();

  // This useEffect will only run once, during the first client render
  useEffect(() => {
    // Updating a state causes a re-render
    setInitialRenderComplete(true);

    setTimeout(() => {
      const ref = quill.current;
      // @ts-ignore
      ref?.editor.container.classList.remove("ql-container");
      // @ts-ignore
      ref?.editor.container.classList.add(
        "w-full",
        "max-w-none",
        "ql-container"
      );
    }, 500);
  }, [quill]);

  const [value, setValue] = useState("<h1>Step-by-Step: How to Tame Your Baby Cockatiel for a Happy Home</h1><h2>Introduction</h2><h3>Importance of taming baby cockatiels</h3><p><br></p><h3>Understanding their behavior</h3><p><br></p><h2>Steps to Follow for Taming Baby Cockatiels</h2><h3>Creating a safe environment for your cockatiel</h3><p>When it comes to creating a safe environment for your cockatiel, there are a few key things you need to consider. Make sure their cage is large enough for them to move around comfortably and that it's made of high-quality, non-toxic materials. Avoid placing their cage near any potential hazards like open windows or doors, and keep any toxic plants or chemicals out of their reach.</p><h3>Bonding with your cockatiel through talks and songs</h3><p><br></p><h3>Hand-feeding to develop trust</h3><h3><br></h3><h3>Gradual training to encourage interaction</h3><p><br></p><h3>Rewards and positive reinforcement</h3><p><br></p><h3>Consistency in training</h3><p><br></p><h2>Additional Tips for Successful Taming</h2><h3>Reading body language and identifying signs of stress</h3><p><br></p><h3>Moderate handling and socialization</h3><p><br></p><h3>Timeframe for taming</h3><p><br></p><h2>Conclusion</h2><h3>Summary of the steps and tips provided</h3><p><br></p><h3>Importance of patience and consistency</h3><p><br></p><h3>Benefits of a tamed Cockatiel</h3><p><br></p><h1><br></h1><p><br></p>");

  return (
    <div className="flex items-stretch h-screen max-h-screen">
      <ContentSidebar />
      {initialRenderComplete && (
        <div className="flex-1 flex flex-col items-start rounded max-h-screen overflow-auto">
          <QuillToolbar />
          <ReactQuill
            ref={quill}
            className="!w-full max-w-5xl mx-auto max-h-screen overflow-auto flex-1"
            theme="snow"
            modules={modules}
            formats={formats}
            onChange={setValue}
            defaultValue={value}
          />
          {/* <div
            className="fixed bottom-0 z-20 transition-all duration-150 pointer-events-none inset-x-0"
          >
            <div className="flex justify-center max-w-4xl mx-auto">
              <div
                className="flex items-center w-full p-3 space-x-3 bg-white shadow-sm pointer-events-auto dark:bg-gray-700 sm:w-auto ring-1 ring-gray-300 ring-opacity-50 dark:ring-gray-600 rounded-t-md"
              >
                <div tabindex={0}>
                  <button
                    type="submit"
                    className="relative inline-flex items-center justify-center overflow-hidden font-semibold transition duration-100 ease-in-out rounded-lg outline-none focus:outline-none focus:ring-2 focus:ring-offset-2 w-full py-4 rounded-lg outline-none selectionRing focus:outline-none px-5 py-2 text-base leading-6 text-white bg-gradient-to-r from-purple-500 to-blue-500 shadow-sm hover:from-purple-400 hover:to-blue-400 selectionRing active:from-purple-600 active:to-blue-600"
                    content="CMD + J"
                    style={{ minWidth: '12rem', maxWidth: '16rem' }}
                  >
                    Compose
                  </button>
                  <div
                    arrow=""
                    interactive=""
                    sticky=""
                    offset="0, 18"
                    placement="bottom"
                    theme="blue tip-bubble"
                    trigger="manual"
                  >
                    <div></div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="relative inline-flex items-center justify-center overflow-hidden font-semibold transition duration-100 ease-in-out rounded-lg outline-none focus:outline-none focus:ring-2 focus:ring-offset-2 w-full py-4 rounded-lg outline-none selectionRing focus:outline-none px-5 py-2 text-base leading-6 text-gray-400 bg-gray-100 cursor-not-allowed opacity-75"
                  content="Erase last output and try again (CMD + /)"
                  data-dd-action-name="redo last action: compose bar"
                  style={{ maxWidth: '4rem' }}
                >
                  <svg
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    ></path></svg>
                </button>
                <div>
                  <div className="mb-2 text-xs font-medium text-gray-400">Output length</div>
                  <div className="flex items-center space-x-2">
                    <button
                      type="submit"
                      className="relative inline-flex items-center justify-center overflow-hidden font-semibold transition duration-100 ease-in-out rounded-lg outline-none focus:outline-none focus:ring-2 focus:ring-offset-2 px-3 py-2 text-sm leading-3 text-gray-600 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 hover:text-gray-700 selectionRing active:bg-gray-100 active:text-gray-700"
                      content="Shorter"
                    >
                      S
                    </button>
                    <button
                      type="submit"
                      className="relative inline-flex items-center justify-center overflow-hidden font-semibold transition duration-100 ease-in-out rounded-lg outline-none focus:outline-none focus:ring-2 focus:ring-offset-2 px-3 py-2 text-sm leading-3 text-gray-600 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 hover:text-gray-700 selectionRing active:bg-gray-100 active:text-gray-700 ring-2 text-blue-400 bg-blue-100 hover:text-blue-400"
                      content="Medium"
                    >
                      M
                    </button>
                    <button
                      type="submit"
                      className="relative inline-flex items-center justify-center overflow-hidden font-semibold transition duration-100 ease-in-out rounded-lg outline-none focus:outline-none focus:ring-2 focus:ring-offset-2 px-3 py-2 text-sm leading-3 text-gray-600 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 hover:text-gray-700 selectionRing active:bg-gray-100 active:text-gray-700"
                      content="Longer"
                    >
                      L
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <AppEditor /> */}
        </div>
      )}
    </div>
  );
}

ContentDocument.getLayout = function getLayout(page: any) {
  return <LayoutMain navCollapsed={true}>{page}</LayoutMain>;
};

export default ContentDocument;

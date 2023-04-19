import { getDocumentById, updateDocument } from "@/api/documents";
import QuillToolbar, { modules, formats } from "@/components/App/QuillToolbar";
import ContentSidebar from "@/components/Content/ContentSidebar";
import LayoutMain from "@/components/Layouts/LayoutMain";
import { activeDocumentAtom, setActiveDocumentAtom } from "@/stores/documents";
import { activeProject } from "@/stores/projects";
import { sideBarTheme } from "@/stores/theme";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useRef, useState } from "react";

import "react-quill/dist/quill.snow.css";

function ContentDocument() {

  const [theme] = useAtom(sideBarTheme)
  const [activeDocument] = useAtom(activeDocumentAtom)
  const [project] = useAtom(activeProject)
  const [, setActiveDocument] = useAtom(setActiveDocumentAtom)

  const [saving, setSaving] = useState(false)

  const router = useRouter()

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
    async function getActiveDocument() {
      try {
        const res = await getDocumentById(router.query.document as string)
        console.log({
          res
        })
        if (res) {
          await setActiveDocument(res)
          console.log({
            before: res,
            initialRenderComplete: false
          })
          setEditorContent()
        }
      } catch (error) {
        router.push('/content')
      }
    }

    async function setEditorContent () { 
      setInitialRenderComplete(true);

      setTimeout(async () => {
        const ref = quill.current;
        // @ts-ignore
        ref?.editor.container.classList.remove("ql-container");
        
        // @ts-ignore
        await ref?.editor.setContents(activeDocument?.delta || [])
        console.log({
          activeDocument
        })
        setValue(activeDocument?.delta)

        // @ts-ignore
        ref?.editor.container.classList.add(
          "w-full",
          "max-w-none",
          "ql-container"
        );
      }, 500);
    }

    if (!activeDocument)
      getActiveDocument()
    
    else
      setEditorContent()
    // Updating a state causes a re-render
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quill, activeDocument]);

  const [value, setValue] = useState("");

  const delayTimeoutRef = useRef();
  const handleEditorChange = (content: any, delta: any, source: any, editor: any) => {
    if (delayTimeoutRef.current) {
      clearTimeout(delayTimeoutRef.current);
    }
    // @ts-ignore
    delayTimeoutRef.current = setTimeout(async () => {
      setSaving(true)
      setValue(editor.getContents());
      try {
        await updateDocument(activeDocument?._id as string, {
          ...activeDocument,
          delta: editor.getContents(),
          content: editor.getText(),
        })
      } catch (error) {
        console.error(error)
      } finally {
        setSaving(false)
      }
    }, 2000); // Adjust the delay time as needed
  };


  return (
    <div className="flex items-stretch h-screen max-h-screen">
      <ContentSidebar />
      {initialRenderComplete && (
        <div className="flex-1 flex flex-col items-start rounded max-h-screen overflow-auto">
          <QuillToolbar loading={saving} />
          <ReactQuill
            ref={quill}
            className="!w-full max-w-5xl mx-auto max-h-screen overflow-auto flex-1"
            theme="snow"
            modules={modules}
            formats={formats}
            onChange={handleEditorChange}
            value={value}
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
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
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
      <div className={`w-full max-w-md h-screen transition-colors ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-50 text-gray-800' }`}>
        <h1>hlo</h1>
      </div>
    </div>
  );
}

ContentDocument.getLayout = function getLayout(page: any) {
  return <LayoutMain navCollapsed={true}>{page}</LayoutMain>;
};

export default ContentDocument;

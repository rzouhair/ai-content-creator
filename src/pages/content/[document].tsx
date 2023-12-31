import { getDocumentById, updateDocument } from "@/api/documents";
import { Button } from '@/components/ui/button'
import QuillToolbar, { modules, formats } from "@/components/App/QuillToolbar";
import QuillMarkdown from 'quilljs-markdown'
import ContentSidebar from "@/components/Content/ContentSidebar";
import ContentStructure from "@/components/Content/ContentStructure";
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
          console.log({
            quill: quill.Quill
          })

          quill.Quill.register?.('modules/QuillMarkdown', QuillMarkdown, true)

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
          suggestion: activeDocument?.suggestion?._id || null
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
        </div>
      )}
      <ContentStructure document={activeDocument} />
    </div>
  );
}

ContentDocument.getLayout = function getLayout(page: any) {
  return <LayoutMain navCollapsed={true}>{page}</LayoutMain>;
};

export default ContentDocument;

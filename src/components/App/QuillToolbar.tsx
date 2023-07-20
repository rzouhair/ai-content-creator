import { getCompletion } from "@/api/skills";
import React from "react";

// Undo and redo functions for Custom Toolbar
function undoChange() {
  // @ts-ignore
  this.quill.history.undo();
}
function redoChange() {
  // @ts-ignore
  this.quill.history.redo();
}

// Modules object for setting up the Quill editor
export const modules = {
  toolbar: {
    container: "#toolbar",
    handlers: {
      undo: undoChange,
      redo: redoChange
    }
  },
  keyboard: {
    bindings: {
      // There is no default binding named 'custom'
      // so this will be added without overwriting anything
      custom: {
        key: 'Enter',
        shortKey: true,
        handler: async function(range, context) {
          // Handle shift+b
          console.log("Ctrl/Cmd Enter")
          console.log({
            quill: this.quill,
            range,
            context,
          })

          let selection = null
          let ctx = ""
          let command = ""

          if (range.length === 0) {
            const cursorPosition = this.quill.getSelection()?.index;
            if (!cursorPosition) return;
            const [line, offset] = this.quill.getLine(cursorPosition);
            const lineStartPosition = cursorPosition - offset
            this.quill?.setSelection(lineStartPosition, offset);

            selection = this.quill?.getSelection()

            if (!selection)
              return

            command = this.quill?.getText(lineStartPosition, offset)

            const start = 0;
            const end = selection.index;
            ctx = this.quill.getText(start, end - start);

            console.log({
              command,
              ctx,
            })

          } else {
            selection = this.quill?.getSelection()
            const start = selection.index;
            const end = selection.length;
            
            const start2 = 0
            const end2 = selection.index

            command = this.quill.getText(start, start+end);
            ctx = this.quill.getText(start2, end2 - start2);
          }

          const data = await getCompletion({
            command,
            context: ctx,
          })

          console.log({
            data: data,
          })

          this.quill.deleteText(selection.index, selection.length, "user");
          this.quill.insertText(selection.index, data?.content, "user");

        }
      },
    }
  },
  history: {
    delay: 500,
    maxStack: 100,
    userOnly: true
  }
};

// Formats objects for setting up the Quill editor
export const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "align",
  "strike",
  "script",
  "blockquote",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "color",
  "code-block"
];

// Quill Toolbar component
export const QuillToolbar = (props: { loading: boolean }) => (
  <div id="toolbar" className="flex items-center justify-between gap-2 w-full !border-t-transparent !border-x-transparent !border-b border-gray-200" >
    <div className="flex-1">
      <span className="ql-formats">
        <button className="ql-undo">
          <i className="text-2xl h-[18px] i-tabler-arrow-back" />
        </button>
        <button className="ql-redo">
          <i className="text-2xl h-[18px] i-tabler-arrow-forward" />
        </button>
      </span>
      <span className="ql-formats">
        <button className="ql-header" value="1" />
        <button className="ql-header" value="2" />
        <button className="ql-header" value="3" />
        <button className="ql-header" value="4" />
      </span>
      <span className="ql-formats">
        <button className="ql-bold" />
        <button className="ql-italic" />
        <button className="ql-underline" />
        <button className="ql-strike" />
      </span>
      <span className="ql-formats">
        <button className="ql-list" value="ordered" />
        <button className="ql-list" value="bullet" />
        <button className="ql-indent" value="-1" />
        <button className="ql-indent" value="+1" />
      </span>
      <span className="ql-formats">
        <select className="ql-align" />
        <button className="ql-blockquote" />
        <button className="ql-code-block" />
        <button className="ql-link" />
        <button className="ql-image" />
        <button className="ql-clean" />
      </span>
    </div>
    <div className="text-md text-gray-400">
      { props.loading ? <span className="flex items-center gap-1">Saving... <i className="i-tabler-loader animate-spin" /></span> : 'Saved' }
    </div>
  </div>
);

export default QuillToolbar;
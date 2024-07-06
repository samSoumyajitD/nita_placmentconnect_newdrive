import { $getRoot, $getSelection } from "lexical";
import { useEffect, useRef, useState } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { MuiContentEditable, placeHolderSx } from "./styles";
import { Box, Divider } from "@mui/material";
import { lexicalEditorConfig } from "../../config/lexicalEditorConfig";
import LexicalEditorTopBar from "../LexicalEditorTopBar";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import ImagesPlugin from "../CustomPlugins/ImagePlugin";
import FloatingTextFormatToolbarPlugin from "../CustomPlugins/FloatingTextFormatPlugin";

function LexicalEditorWrapper({ onExtractDom }) {
  const divRef = useRef(null);

  const handleExtractDom = () => {
    if (divRef.current) {
      const domContent = divRef.current.outerHTML;
      onExtractDom(domContent);
    }
  };

  return (
    <>
      <LexicalComposer initialConfig={lexicalEditorConfig}>
        <LexicalEditorTopBar />
        <Divider />
        <Box sx={{ position: "relative", background: "white" }}>
          <div ref={divRef}>
            <RichTextPlugin
              contentEditable={<MuiContentEditable />}
              placeholder={<Box sx={placeHolderSx}>Enter some text...</Box>}
              ErrorBoundary={LexicalErrorBoundary}
            />
          </div>
          <HistoryPlugin />
          <ListPlugin />
          <LinkPlugin />
          <ImagesPlugin captionsEnabled={false} />
          <FloatingTextFormatToolbarPlugin />
        </Box>
      </LexicalComposer>
      <div className="dd">
        <button onClick={handleExtractDom}>Extract DOM Code</button>
      

      </div>
    </>
  );
}

function onChange(editorState) {
  editorState.read(() => {
    const root = $getRoot();
    const selection = $getSelection();
    console.log(root, selection);
  });
}

function MyCustomAutoFocusPlugin() {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    editor.focus();
  }, [editor]);
  return null;
}

export default LexicalEditorWrapper;

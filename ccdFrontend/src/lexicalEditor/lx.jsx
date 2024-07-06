import React from 'react';
import {
  Box,
  CssBaseline,
  Grid,
  ThemeProvider,
} from "@mui/material";
import LexicalEditorWrapper from "./component/LexicalEditorWrapper";
import theme from "./theme";
import "./styles.css";

function Lx({ onExtractDom }) {
  return (
    <div className="no-tailwindcss-base">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Grid
          container
          flexDirection="column"
          alignItems="center"
        >
          <Grid item sx={{ my: 2 }}>
          </Grid>
          <Grid item sx={{ width: 1000, overflow: "hidden" }}>
            <LexicalEditorWrapper onExtractDom={onExtractDom} />
          </Grid>
        </Grid>
      </ThemeProvider>
    </div>
  );
}

export default Lx;

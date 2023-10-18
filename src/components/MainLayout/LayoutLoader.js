import React from "react";
import { Backdrop, CircularProgress, Box, LinearProgress } from "@mui/material";
import { useReactiveVar } from "@apollo/client";
import { styled } from "@mui/material/styles";
import {
  loadingStatus,
  loadingNavStatus,
} from "../apollo/ReactiveVariables";

const StyledBackdrop = styled(Backdrop)(({ theme }) => ({
  zIndex: 1500,
  color: theme.palette.primary.main,
}));

function LayoutLoader() {
  const loader = useReactiveVar(loadingStatus);
  const navTransition = useReactiveVar(loadingNavStatus);
  return (
    <>
      <StyledBackdrop open={loader}>
        <CircularProgress color="inherit" />
      </StyledBackdrop>
      {navTransition && (
        <Box
          className="full-width"
          sx={{
            position: "absolute",
            top: 0,
          }}
        >
          <LinearProgress
            color="secondary"
            sx={{
              "&.MuiLinearProgress-root": {
                zIndex: 1100,
              },
            }}
          />
        </Box>
      )}
    </>
  );
}

export default LayoutLoader;
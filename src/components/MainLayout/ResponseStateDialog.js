import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import PropTypes from "prop-types";
import Dialog from "../../components/Dialog";
import { responseMessage } from "../apollo/ReactiveVariables";
import { useReactiveVar } from "@apollo/client";

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px 24px",
    [theme.breakpoints.down("md")]: {
      padding: "20px 24px",
    },
  },
}));

const CloseIconButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  right: 15,
  top: 15,
  color: theme.palette.primary.main,
}));

const StyledIconWrapper = styled(Box)(({ theme }) => ({
  width: 180,
  height: 180,
  borderRadius: "50%",
  backgroundColor: "#F7F7F7",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  [theme.breakpoints.down("md")]: {
    width: 100,
    height: 100,
  },
}));

const StyledContentWrapper = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
}));

const StyledHeading = styled(Typography)(() => ({
  fontWeight: 400,
  fontSize: 32,
  textAlign: "center",
}));

const StyledContent = styled(Typography)(() => ({
  fontWeight: 400,
  fontSize: 20,
  textAlign: "center",
  color: "#C1C1C1", // TODO To use secondary after standardization from the design team
}));

function ModalContent({ state, isMobile, theme, title, message, element }) {
  const getColor = () => {
    let color = theme.palette.success.main;
    if (state === "warning") {
      color = theme.palette.warning.main;
    }
    if (state === "error") {
      color = theme.palette.error.main;
    }
    // TODO define colors for info and error
    return color;
  };

  return (
    <StyledContentWrapper>
      <StyledIconWrapper>
        {state === "success" && (
          <Image
            src="/assets/success-tick.svg"
            alt="success"
            width={isMobile ? 33 : 66}
            height={isMobile ? 22.5 : 45}
          />
        )}
        {state === "warning" && (
          <Image
            src="/assets/warning.svg"
            alt="warning"
            width={isMobile ? 33 : 66}
            height={isMobile ? 22.5 : 45}
          />
        )}
        {state === "error" && (
          <Image
            src="/assets/error.svg"
            alt="error"
            width={isMobile ? 33 : 66}
            height={isMobile ? 22.5 : 45}
          />
        )}
      </StyledIconWrapper>
      <Box sx={{ mt: 3 }}>
        {title && title !== "" && (
          <StyledHeading
            variant="h3"
            sx={{
              color: getColor(state),
            }}
          >
            {title}
          </StyledHeading>
        )}

        <StyledContent variant="body1" sx={{ mt: 1, color: getColor(state) }}>
          {message}
        </StyledContent>
        {element && element}
      </Box>
    </StyledContentWrapper>
  );
}

function ResponseStateDialog() {
  const { open, state, message, title, element } = useReactiveVar(responseMessage);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const closeDialog = () => {
    responseMessage({
      open: false,
      state: "info",
      message: "",
    });
  };

  return (
    <StyledDialog
      open={open}
      maxWidth="sm"
      fullWidth
      handleClose={closeDialog}
      modalContent={
        <>
          <CloseIconButton onClick={closeDialog}>
            <CloseIcon color="primary" />
          </CloseIconButton>
          <ModalContent
            state={state}
            message={message}
            title={title}
            theme={theme}
            element={element}
            isMobile={isMobile}
          />
        </>
      }
    />
  );
}

ModalContent.propTypes = {
  state: PropTypes.oneOf(["success", "warning", "error"]).isRequired,
  isMobile: PropTypes.bool.isRequired,
  theme: PropTypes.object.isRequired,
  title: PropTypes.string,
  message: PropTypes.string.isRequired,
  element: PropTypes.node,
};
export default ResponseStateDialog;

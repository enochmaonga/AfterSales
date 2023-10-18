import React from "react";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import { useRouter } from "next/router";
import ResponseStateDialog from "./ResponseStateDialog";
import { dashboard } from "../apollo/ReactiveVariables";
import LayoutLoader from "./LayoutLoader";
import JoscareSideBar from "../SideBar/JoscareSideBar";
import RightPanel from "../RightPanel";
import Card from "@mui/material/Card"; // Import Card directly without destructuring

function JoscareMainLayout({ children, height }) {
  const router = useRouter();
  React.useEffect(() => { // Use useEffect to update dashboard value
    dashboard(router.pathname === "/");
  }, [router.pathname]);

  return (
    <Card>
      <Grid
        container
        alignItems="center"
        justifyContent="flex-start"
        direction="column"
        sx={{ padding: "10px" }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "20% 80%",
            gridTemplateRows: "1fr",
            width: "100%",
            height: "100%",
            gridGap: "1%",
          }}
        >
          <Grid
            container
            alignItems="center"
            direction="column"
            justifyContent="flex-start"
            wrap="nowrap"
            sx={{ marginTop: `2rem` }}
          >
            <LayoutLoader />
            <ResponseStateDialog />
            <JoscareSideBar />
          </Grid>
          <RightPanel height={height}>{children}</RightPanel>
        </Box>
      </Grid>
    </Card>
  );
}

export default JoscareMainLayout;

JoscareMainLayout.propTypes = {
  children: PropTypes.node.isRequired,
  height: PropTypes.number.isRequired,
};
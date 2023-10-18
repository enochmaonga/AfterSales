import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import PropTypes from "prop-types";
import { useReactiveVar } from "@apollo/client";
import { dashboard } from "../apollo/ReactiveVariables";

function RightPanel({ children }) {
  const isDashboard = useReactiveVar(dashboard);

  return (
    <Card
      sx={{
        backgroundColor: "white",
        padding: isDashboard ? "0" : "13px",
        height: "auto",
        overflow: "hidden",
        marginTop: `2rem`,
        marginRight: "30px",
        boxShadow: "none",
        borderRadius: "8px",
      }}
    >
      <CardContent
        sx={{
          padding: isDashboard ? 0 : "", 
        }}
      >
        {children}
      </CardContent>
    </Card>
  );
}

RightPanel.propTypes = {
  children: PropTypes.node.isRequired,
  height: PropTypes.number.isRequired,
};

export default RightPanel;

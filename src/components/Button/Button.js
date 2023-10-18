import { Button } from "@mui/material";
import React from "react";



const MyButton = ({text, color, variant, onClick}) => {
    return (
      <Button
      variant={'outlined'}
      color={'primary'}
      onClick={onClick}
      sx={{borderRadius: 5, height: 40, width: "50%"}}
    />
   
      )
    };
    

export default MyButton;
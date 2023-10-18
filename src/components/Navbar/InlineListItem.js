import { styled } from "@mui/material/styles";
import ListItem from "@mui/material/ListItem";

const InlineListitem = styled(ListItem)(({ theme }) => ({
  display: "inline",
  color: theme.palette.text.primary,
}));

export default InlineListitem;

import React from "react";
import NextLink from "next/link";
import { styled } from "@mui/material/styles";
import Link from "@mui/material/Link";
import InlineListitem from "./InlineListItem";

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: theme.palette.text.primary,
}));

const Navitem = React.forwardRef(
  ({ href = "", children, newTab, active, ...rest }, ref) => {
    return (
      <InlineListitem style={{ cursor: "pointer" }} ref={ref} {...rest}>
        {newTab ? (
          <StyledLink
            href={href}
            target="_blank"
            color="primary"
            sx={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            {children}
          </StyledLink>
        ) : (
          <NextLink href={href}>
            <Link
              href={href}
              sx={(theme) => ({
                color: active
                  ? theme.palette.primary.main
                  : theme.palette.text.primary,
                textDecoration: "none",
                fontWeight: active ? 900 : 500,
              })}
            >
              {children}
            </Link>
          </NextLink>
        )}
      </InlineListitem>
    );
  }
);

export default Navitem;

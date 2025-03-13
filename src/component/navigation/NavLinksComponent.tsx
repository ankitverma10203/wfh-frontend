import { Box, Typography } from "@mui/material";
import { NAV_LINKS, RoleOptions } from "../../Constants";
import { useState, useCallback, useEffect } from "react";
import Cookies from "js-cookie";
import { useLocation, Link as RouterLink } from "react-router-dom";
import NavigationIcons from "./NavigationIcons";
import React from "react";

function NavLinksComponent(props: {
  role: RoleOptions;
  highlightColor: string;
  hoverColor: string;
}) {
  const location = useLocation();
  const [navLinks, setNavLinks] = useState<any[]>(
    JSON.parse(Cookies.get("navLinks") || "[]") || []
  );

  const getApplicableNavLinks = useCallback(
    (role: RoleOptions) => {
      const applicableNavLinks = NAV_LINKS.filter((link) =>
        link.roles.includes(role)
      ).map((link) => {
        return { name: link.name, link: link.link };
      });

      if (JSON.stringify(applicableNavLinks) !== JSON.stringify(navLinks)) {
        setNavLinks(applicableNavLinks);
        Cookies.set("navLinks", JSON.stringify(applicableNavLinks));
      }
    },
    [props.role]
  );

  useEffect(() => {
    getApplicableNavLinks(props.role);
  }, [props.role]);

  return (
    <>
      {navLinks.map((navLink) => (
        <Box
          key={navLink.name}
          component={RouterLink}
          to={navLink.link}
          sx={{
            margin: 1,
            fontSize: "large",
            whiteSpace: "nowrap",
            color:
              location.pathname === navLink.link
                ? props.highlightColor
                : "inherit",
            textDecoration: "none",
            "&:hover": {
              color: props.hoverColor,
            },
          }}
        >
          <Box
            sx={{
              display: "inline-flex",
              flexDirection: "row",
              transition: "color 0.5s ease",
            }}
          >
            <NavigationIcons navLinkName={navLink.name} />
            <Typography sx={{ marginLeft: 0.5, color: "inherit" }}>
              {navLink.name}
            </Typography>
          </Box>
        </Box>
      ))}
    </>
  );
}

export default React.memo(NavLinksComponent);

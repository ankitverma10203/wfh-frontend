import { Box, Link } from "@mui/material";
import { NAV_LINKS, RoleOptions } from "../../Constants";
import { useState, useCallback, useEffect } from "react";
import Cookies from "js-cookie";

function NavLinksComponent(prop: { role: RoleOptions }) {
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
    [prop.role]
  );

  useEffect(() => {
    getApplicableNavLinks(prop.role);
  }, [prop.role]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      {navLinks.map((navLink) => (
        <Link
          key={navLink.name}
          href={navLink.link}
          color={"inherit"}
          underline="none"
          sx={{
            marginLeft: 5,
            fontSize: "large",
            fontFamily: "monospace",
            whiteSpace: "nowrap",
          }}
        >
          {navLink.name}
        </Link>
      ))}
    </Box>
  );
}

export default NavLinksComponent;

import { Box, Link, Typography, useTheme } from "@mui/material";
import { NAV_LINKS, RoleOptions } from "../../Constants";
import { useState, useCallback, useEffect } from "react";
import Cookies from "js-cookie";
import { useLocation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { getEmployeeData } from "../../service/EmployeeDetailService";
import NavigationIcons from "./NavigationIcons";
import React from "react";

function NavLinksComponent(prop: {
  highlightColor: string;
  hoverColor: string;
}) {
  const location = useLocation();
  const [navLinks, setNavLinks] = useState<any[]>(
    JSON.parse(Cookies.get("navLinks") || "[]") || []
  );
  const { getAccessTokenSilently } = useAuth0();
  const [role, setRole] = useState<RoleOptions>(
    (Cookies.get("role") as RoleOptions) || RoleOptions.EMPLOYEE
  );
  const theme = useTheme();

  const fetchEmployeeDetail = async () => {
    const token = await getAccessTokenSilently();
    const employeeDetails = await getEmployeeData(token);
    if (employeeDetails.role !== role) {
      setRole(employeeDetails.role);
    }
  };

  useEffect(() => {
    fetchEmployeeDetail();
  }, []);

  useEffect(() => {
    Cookies.set("role", role);
  }, [role]);

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
    [role]
  );

  useEffect(() => {
    getApplicableNavLinks(role);
  }, [role]);

  return (
    <>
      {navLinks.map((navLink) => (
        <Link
          key={navLink.name}
          href={navLink.link}
          color={
            location.pathname === navLink.link
              ? prop.highlightColor
              : "inherit"
          }
          underline="none"
          sx={{
            margin: 1,
            fontSize: "large",
            whiteSpace: "nowrap",
            "&:hover": {
              color: prop.hoverColor,
            },
          }}
        >
          <Box
            sx={{
              display: "inline-flex",
              flexDirection: "row",
            }}
          >
            <NavigationIcons navLinkName={navLink.name} />
            <Typography sx={{ marginLeft: 0.5, color: "inherit" }}>
              {navLink.name}
            </Typography>
          </Box>
        </Link>
      ))}
    </>
  );
}

export default React.memo(NavLinksComponent);

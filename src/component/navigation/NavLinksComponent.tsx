import { Box, Link } from "@mui/material";
import { NAV_LINKS, RoleOptions } from "../../Constants";
import { useState, useCallback, useEffect } from "react";
import Cookies from "js-cookie";
import { useLocation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { getEmployeeData } from "../../service/EmployeeDetailService";

function NavLinksComponent() {
  const location = useLocation();
  const [navLinks, setNavLinks] = useState<any[]>(
    JSON.parse(Cookies.get("navLinks") || "[]") || []
  );
  const { getAccessTokenSilently } = useAuth0();
  const [role, setRole] = useState<RoleOptions>(
    (Cookies.get("role") as RoleOptions) || RoleOptions.EMPLOYEE
  );

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
    <Box sx={{ flexGrow: 1 }}>
      {navLinks.map((navLink) => (
        <Link
          key={navLink.name}
          href={navLink.link}
          color={location.pathname === navLink.link ? "cyan" : "inherit"}
          underline="none"
          sx={{
            marginLeft: 5,
            fontSize: "large",
            fontFamily: "monospace",
            whiteSpace: "nowrap",
            "&:hover": {
              color: "lightcyan",
            },
          }}
        >
          {navLink.name}
        </Link>
      ))}
    </Box>
  );
}

export default NavLinksComponent;

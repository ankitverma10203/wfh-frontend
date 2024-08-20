import { useEffect } from "react";
import NavBar from "./NavBar";
import { NavLink } from "../Types";
import Box from "@mui/material/Box";

function GenericPage(prop: {
  item: JSX.Element;
  navLinks: NavLink[];
  notifications: any[];
}) {
  useEffect(() => {}, []);

  return (
    <>
      <Box sx={{ width: "100vw" }}>
        <NavBar links={prop.navLinks} notifications={prop.notifications} />
        <Box
          sx={{
            width: "100vw",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {prop.item}
        </Box>
      </Box>
    </>
  );
}

export default GenericPage;

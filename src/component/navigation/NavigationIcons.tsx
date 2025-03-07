import { NAV_LINK_NAME } from "../../Constants";
import SpaceDashboardTwoToneIcon from "@mui/icons-material/SpaceDashboardTwoTone";
import RuleTwoToneIcon from "@mui/icons-material/RuleTwoTone";
import GroupTwoToneIcon from "@mui/icons-material/GroupTwoTone";
import TableRowsTwoToneIcon from "@mui/icons-material/TableRowsTwoTone";
import CircleTwoToneIcon from "@mui/icons-material/CircleTwoTone";

function NavigationIcons(props: { navLinkName: NAV_LINK_NAME }) {
  if (props.navLinkName === NAV_LINK_NAME.DASHBOARD) {
    return <SpaceDashboardTwoToneIcon />;
  } else if (props.navLinkName === NAV_LINK_NAME.APPROVALS) {
    return <RuleTwoToneIcon />;
  } else if (props.navLinkName === NAV_LINK_NAME.EMPLOYEE_DETAILS) {
    return <GroupTwoToneIcon />;
  } else if (props.navLinkName === NAV_LINK_NAME.WFH_ALLOCATION) {
    return <TableRowsTwoToneIcon />;
  } else {
    return <CircleTwoToneIcon />;
  }
}

export default NavigationIcons;

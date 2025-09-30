import * as React from "react";
import Stack from "@mui/material/Stack";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import CustomDatePicker from "../ui/CustomDatePicker";
import NavbarBreadcrumbs from "../ui/NavbarBreadcrumbs";
import MenuButton from "../navigation/MenuButton";
// import ColorModeIconDropdown from '../../shared-theme/ColorModeIconDropdown'; // TODO: Implement

import Search from "../ui/Search";

export default function Header() {
  return (
    <Stack
      direction="row"
      sx={{
        display: { xs: "none", md: "flex" },
        width: "100%",
        alignItems: { xs: "flex-start", md: "center" },
        justifyContent: "space-between",
        maxWidth: { sm: "100%", md: "1700px" },
        pt: 1.5,
      }}
      spacing={2}
    >
      <NavbarBreadcrumbs />
      <Stack direction="row" sx={{ gap: 1 }}>
        <Search />
        <CustomDatePicker />
        <MenuButton showBadge aria-label="Open notifications">
          <NotificationsRoundedIcon />
        </MenuButton>
        {/* <ColorModeIconDropdown /> TODO: Implement */}
      </Stack>
    </Stack>
  );
}

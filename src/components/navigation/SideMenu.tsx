import { styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import MuiDrawer, { drawerClasses } from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { alpha } from "@mui/material/styles";
import SelectContent from "../ui/SelectContent";
import MenuContent from "./MenuContent";
import OptionsMenu from "../ui/OptionsMenu";

const drawerWidth = 240;

const Drawer = styled(MuiDrawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  boxSizing: "border-box",
  [`& .${drawerClasses.paper}`]: {
    width: drawerWidth,
    boxSizing: "border-box",
    background: `linear-gradient(180deg, ${alpha(
      theme.palette.primary.main,
      0.02
    )} 0%, ${alpha(theme.palette.background.paper, 1)} 100%)`,
    borderRight: `1px solid ${alpha(theme.palette.divider, 0.12)}`,
    backdropFilter: "blur(20px)",
  },
}));

export default function SideMenu() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: "none", md: "block" },
        [`& .${drawerClasses.paper}`]: {
          backgroundColor: "background.paper",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          mt: "calc(var(--template-frame-height, 0px) + 8px)",
          p: 3,
          background: (theme) => `linear-gradient(135deg, 
            ${alpha(theme.palette.primary.main, 0.08)} 0%, 
            ${alpha(theme.palette.secondary.main, 0.04)} 100%
          )`,
          position: "relative",
          "&::after": {
            content: '""',
            position: "absolute",
            bottom: 0,
            left: "16px",
            right: "16px",
            height: "1px",
            background: (theme) => `linear-gradient(90deg, 
              transparent 0%, 
              ${alpha(theme.palette.primary.main, 0.3)} 50%, 
              transparent 100%
            )`,
          },
        }}
      >
        <SelectContent />
      </Box>
      <Divider />
      <Box
        sx={{
          overflow: "auto",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          py: 1,
          position: "relative",
          "&::-webkit-scrollbar": {
            width: "6px",
          },
          "&::-webkit-scrollbar-track": {
            background: "transparent",
          },
          "&::-webkit-scrollbar-thumb": {
            background: (theme) => alpha(theme.palette.primary.main, 0.2),
            borderRadius: "3px",
            "&:hover": {
              background: (theme) => alpha(theme.palette.primary.main, 0.4),
            },
          },
        }}
      >
        <MenuContent />
      </Box>
      <Stack
        direction="row"
        sx={{
          p: 3,
          gap: 2,
          alignItems: "center",
          background: (theme) => `linear-gradient(135deg, 
            ${alpha(theme.palette.primary.main, 0.1)} 0%, 
            ${alpha(theme.palette.secondary.main, 0.08)} 100%
          )`,
          backdropFilter: "blur(20px)",
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: "16px",
            right: "16px",
            height: "1px",
            background: (theme) => `linear-gradient(90deg, 
              transparent 0%, 
              ${alpha(theme.palette.primary.main, 0.3)} 50%, 
              transparent 100%
            )`,
          },
        }}
      >
        <Box sx={{ position: "relative" }}>
          <Avatar
            alt="Riley Carter"
            src="/static/images/avatar/7.jpg"
            sx={{
              width: 48,
              height: 48,
              border: (theme) =>
                `3px solid ${alpha(theme.palette.background.paper, 0.8)}`,
              boxShadow: (theme) => `
                0 4px 12px ${alpha(theme.palette.primary.main, 0.25)},
                0 0 0 1px ${alpha(theme.palette.primary.main, 0.1)}
              `,
            }}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: 2,
              right: 2,
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor: "success.main",
              border: (theme) => `2px solid ${theme.palette.background.paper}`,
            }}
          />
        </Box>
        <Box sx={{ mr: "auto", minWidth: 0 }}>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 700,
              lineHeight: "20px",
              color: "text.primary",
              fontSize: "0.9rem",
            }}
          >
            Riley Carter
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: "text.secondary",
              fontSize: "0.75rem",
              fontWeight: 500,
              opacity: 0.8,
            }}
          >
            riley@email.com
          </Typography>
        </Box>
        <OptionsMenu />
      </Stack>
    </Drawer>
  );
}

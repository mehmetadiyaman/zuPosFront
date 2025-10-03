import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Drawer, { drawerClasses } from "@mui/material/Drawer";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { alpha } from "@mui/material/styles";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import MenuButton from "./MenuButton";
import MenuContent from "./MenuContent";

interface SideMenuMobileProps {
  open: boolean | undefined;
  toggleDrawer: (newOpen: boolean) => () => void;
}

export default function SideMenuMobile({
  open,
  toggleDrawer,
}: SideMenuMobileProps) {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={toggleDrawer(false)}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        [`& .${drawerClasses.paper}`]: {
          backgroundImage: "none",
          background: (theme) =>
            `linear-gradient(180deg, ${alpha(
              theme.palette.primary.main,
              0.02
            )} 0%, ${alpha(theme.palette.background.paper, 1)} 100%)`,
          backdropFilter: "blur(20px)",
          borderLeft: (theme) =>
            `1px solid ${alpha(theme.palette.divider, 0.12)}`,
        },
      }}
    >
      <Stack
        sx={{
          maxWidth: "70dvw",
          height: "100%",
        }}
      >
        <Stack
          direction="row"
          sx={{
            p: 2,
            pb: 0,
            gap: 1,
            background: (theme) => alpha(theme.palette.primary.main, 0.04),
          }}
        >
          <Stack
            direction="row"
            sx={{ gap: 1.5, alignItems: "center", flexGrow: 1, p: 1 }}
          >
            <Avatar
              alt="Riley Carter"
              src="/static/images/avatar/7.jpg"
              sx={{
                width: 32,
                height: 32,
                border: (theme) =>
                  `2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                boxShadow: (theme) =>
                  `0 2px 8px ${alpha(theme.palette.primary.main, 0.2)}`,
              }}
            />
            <Typography
              component="p"
              variant="h6"
              sx={{
                fontWeight: 600,
                color: "text.primary",
              }}
            >
              Riley Carter
            </Typography>
          </Stack>
          <MenuButton showBadge>
            <NotificationsRoundedIcon />
          </MenuButton>
        </Stack>
        <Divider
          sx={{
            borderColor: (theme) => alpha(theme.palette.primary.main, 0.1),
            mx: 2,
          }}
        />
        <Stack sx={{ flexGrow: 1 }}>
          <MenuContent />
          <Divider
            sx={{
              borderColor: (theme) => alpha(theme.palette.primary.main, 0.1),
              mx: 2,
            }}
          />
        </Stack>
        <Stack
          sx={{
            p: 2,
            background: (theme) => alpha(theme.palette.primary.main, 0.02),
          }}
        >
          <Button
            variant="outlined"
            fullWidth
            startIcon={<LogoutRoundedIcon />}
            sx={{
              borderRadius: 2,
              py: 1.2,
              fontWeight: 500,
              textTransform: "none",
              border: (theme) =>
                `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
              "&:hover": {
                background: (theme) => alpha(theme.palette.primary.main, 0.08),
                border: (theme) =>
                  `1px solid ${alpha(theme.palette.primary.main, 0.5)}`,
              },
            }}
          >
            Çıkış Yap
          </Button>
        </Stack>
      </Stack>
    </Drawer>
  );
}

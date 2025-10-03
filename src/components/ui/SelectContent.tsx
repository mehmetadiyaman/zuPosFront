import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import {
  Box,
  Typography,
  ButtonBase,
  Stack,
  alpha,
  useTheme,
} from "@mui/material";
import {
  Restaurant as RestaurantIcon,
  Home as HomeIcon,
} from "@mui/icons-material";

const ZuPosButton = styled(ButtonBase)(({ theme }) => ({
  width: "100%",
  borderRadius: theme.spacing(1.5),
  padding: theme.spacing(2.5, 2),
  background: "transparent",
  color: theme.palette.text.primary,
  position: "relative",
  overflow: "hidden",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  border: "none",

  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `linear-gradient(135deg, 
      ${alpha(theme.palette.primary.main, 0.06)} 0%, 
      ${alpha(theme.palette.secondary.main, 0.03)} 100%
    )`,
    opacity: 0,
    transition: "opacity 0.3s ease",
  },

  "&:hover": {
    background: `linear-gradient(135deg, 
      ${alpha(theme.palette.primary.main, 0.08)} 0%, 
      ${alpha(theme.palette.secondary.main, 0.04)} 100%
    )`,
    transform: "translateY(-1px)",

    "&::before": {
      opacity: 1,
    },
  },

  "&:active": {
    transform: "translateY(0)",
    transition: "all 0.1s ease",
  },
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 48,
  height: 48,
  borderRadius: "50%",
  background: `linear-gradient(135deg, 
    ${theme.palette.primary.main} 0%, 
    ${theme.palette.secondary.main} 100%
  )`,
  marginBottom: theme.spacing(1),
  transition: "transform 0.2s ease",
}));

const BrandText = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: "1.4rem",
  letterSpacing: "-0.02em",
  background: `linear-gradient(135deg, 
    ${theme.palette.primary.main} 0%, 
    ${theme.palette.secondary.main} 100%
  )`,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  marginBottom: theme.spacing(0.5),
}));

export default function SelectContent() {
  const navigate = useNavigate();
  const theme = useTheme();

  const handleClick = () => {
    navigate("/dashboard");
  };

  return (
    <ZuPosButton onClick={handleClick} disableRipple>
      <Stack
        alignItems="center"
        spacing={0}
        sx={{ position: "relative", zIndex: 1 }}
      >
        <LogoContainer>
          <RestaurantIcon
            sx={{
              fontSize: "1.6rem",
              color: theme.palette.common.white,
            }}
          />
        </LogoContainer>

        <BrandText>ZuPOS</BrandText>

        <Stack
          direction="row"
          alignItems="center"
          spacing={0.6}
          sx={{
            mt: 1,
            px: 1.5,
            py: 0.6,
            borderRadius: 1.5,
            background: "transparent",
          }}
        >
          <HomeIcon
            sx={{
              fontSize: "0.85rem",
              color: "text.secondary",
            }}
          />
          <Typography
            variant="caption"
            sx={{
              fontSize: "0.7rem",
              fontWeight: 500,
              color: "text.secondary",
              letterSpacing: "0.01em",
            }}
          >
            Ana Sayfa
          </Typography>
        </Stack>
      </Stack>
    </ZuPosButton>
  );
}

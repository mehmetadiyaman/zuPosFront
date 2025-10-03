import { useLocation, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import {
  Box,
  Typography,
  Breadcrumbs,
  Link,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ChevronRight as ChevronRightIcon } from "@mui/icons-material";

const HeaderContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  [theme.breakpoints.down("md")]: {
    marginBottom: theme.spacing(3),
  },
}));

const StyledBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  "& .MuiBreadcrumbs-separator": {
    margin: theme.spacing(0, 1),
    color: theme.palette.text.disabled,
  },
  "& .MuiBreadcrumbs-ol": {
    flexWrap: "wrap",
  },
  [theme.breakpoints.down("sm")]: {
    marginBottom: theme.spacing(1),
    "& .MuiBreadcrumbs-separator": {
      margin: theme.spacing(0, 0.5),
    },
  },
}));

const BreadcrumbLink = styled(Link)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  color: theme.palette.text.secondary,
  textDecoration: "none",
  fontSize: "0.875rem",
  fontWeight: 500,
  padding: theme.spacing(0.5, 1),
  borderRadius: theme.spacing(1),
  transition: "all 0.2s ease-in-out",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
    color: theme.palette.primary.main,
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.8rem",
    padding: theme.spacing(0.25, 0.5),
  },
}));

const CurrentBreadcrumb = styled(Typography)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  color: theme.palette.text.primary,
  fontSize: "0.875rem",
  fontWeight: 600,
  padding: theme.spacing(0.5, 1),
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.8rem",
    padding: theme.spacing(0.25, 0.5),
  },
}));

const PageTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  color: theme.palette.text.primary,
  letterSpacing: "-0.01em",
  [theme.breakpoints.down("md")]: {
    fontSize: "2rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.75rem",
  },
}));

export default function NavbarBreadcrumbs() {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Route'a göre başlık ve breadcrumb bilgilerini belirleyen fonksiyon
  const getBreadcrumbInfo = (pathname: string) => {
    const pathSegments = pathname.split("/").filter(Boolean);

    if (
      pathSegments.includes("stok-tanimlari") &&
      pathSegments.includes("depo-tanimlama")
    ) {
      return {
        title: "Depo Tanımlama",
        breadcrumbs: [
          {
            label: "Ana Sayfa",
            path: "/dashboard",
          },
          {
            label: "Stok Tanımları",
            path: null,
          },
          {
            label: "Depo Tanımlama",
            current: true,
          },
        ],
      };
    }

    // Diğer route'lar için varsayılan
    return {
      title: "Dashboard",
      breadcrumbs: [
        {
          label: "Ana Sayfa",
          current: true,
        },
      ],
    };
  };

  const { title, breadcrumbs } = getBreadcrumbInfo(location.pathname);

  const handleBreadcrumbClick = (path: string | null) => {
    if (path) {
      navigate(path);
    }
  };

  return (
    <HeaderContainer>
      {/* Breadcrumb Navigation */}
      <StyledBreadcrumbs
        separator={<ChevronRightIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {breadcrumbs.map((crumb, index) => {
          if (crumb.current) {
            return (
              <CurrentBreadcrumb key={index}>{crumb.label}</CurrentBreadcrumb>
            );
          }

          return (
            <BreadcrumbLink
              key={index}
              onClick={() => handleBreadcrumbClick(crumb.path || null)}
            >
              {crumb.label}
            </BreadcrumbLink>
          );
        })}
      </StyledBreadcrumbs>

      {/* Page Title */}
      <PageTitle variant={isMobile ? "h5" : "h4"}>{title}</PageTitle>
    </HeaderContainer>
  );
}

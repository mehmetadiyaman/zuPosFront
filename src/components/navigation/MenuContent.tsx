import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Collapse from "@mui/material/Collapse";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { alpha } from "@mui/material/styles";
import {
  ExpandLess,
  ExpandMore,
  Inventory as StokIcon,
  PointOfSale as SatisIcon,
  Settings as SistemIcon,
  SwapHoriz as HareketIcon,
  People as PersonelIcon,
  Assessment as RaporIcon,
  BusinessCenter as DonemIcon,
  Warehouse as DepoIcon,
  Category as KategoriIcon,
  Receipt as FaturaIcon,
  TrendingUp as TrendIcon,
  Description as ArticleIcon,
} from "@mui/icons-material";
import axios from "axios";

interface MenuItem {
  mainModel: {
    menuSeqId: number;
    menuId: number;
    name: string;
    url: string;
    controller: string;
    action: string;
    imagePath: string;
    typeId: 2;
  };
  subMenu: Array<{
    menuSeqId: number;
    menuId: number;
    name: string;
    url: string;
    controller: string;
    action: string;
  }>;
}

export default function MenuContent() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [openMenus, setOpenMenus] = useState<Record<number, boolean>>({});
  const navigate = useNavigate();
  const location = useLocation();

  // Aktif sayfa tespit fonksiyonu
  const isActiveRoute = useCallback(
    (controller: string, action: string) => {
      const currentPath = location.pathname;
      const expectedPath = getRouteForMenuItem(controller, action);
      return currentPath === expectedPath;
    },
    [location.pathname]
  );

  // Aktif menüyü tespit et
  const getActiveMenuAndSubMenu = useCallback(() => {
    for (const menu of menuItems) {
      for (const subMenu of menu.subMenu) {
        if (isActiveRoute(subMenu.controller, subMenu.action)) {
          return {
            mainMenuId: menu.mainModel.menuSeqId,
            subMenuId: subMenu.menuSeqId,
          };
        }
      }
    }
    return null;
  }, [menuItems, isActiveRoute]);

  // Menu kategorisine göre ikon belirleme fonksiyonu
  const getMenuIcon = (menuName: string) => {
    const name = menuName.toUpperCase();
    if (name.includes("STOK")) return <StokIcon />;
    if (name.includes("SATIŞ")) return <SatisIcon />;
    if (name.includes("SİSTEM")) return <SistemIcon />;
    if (name.includes("HAREKET")) return <HareketIcon />;
    if (name.includes("PERSONEL")) return <PersonelIcon />;
    if (name.includes("RAPOR")) return <RaporIcon />;
    if (name.includes("DÖNEM")) return <DonemIcon />;
    return <KategoriIcon />;
  };

  // Submenu item'a göre ikon belirleme fonksiyonu
  const getSubMenuIcon = (itemName: string) => {
    const name = itemName.toUpperCase();
    if (name.includes("DEPO")) return <DepoIcon />;
    if (name.includes("FATURA")) return <FaturaIcon />;
    if (name.includes("RAPOR")) return <TrendIcon />;
    if (name.includes("PERSONEL")) return <PersonelIcon />;
    return <ArticleIcon />;
  };

  // Menu item'larını route path'lerine map eden fonksiyon
  const getRouteForMenuItem = (controller: string, action: string) => {
    // Controller ve action'a göre route belirleme
    if (controller === "Store" && action === "Index") {
      return "/dashboard/stok-tanimlari/depo-tanimlama";
    }
    // Diğer route'lar buraya eklenebilir
    // Genel fallback: controller-action formatında
    return `/dashboard/${controller?.toLowerCase() || "page"}/${
      action?.toLowerCase() || "index"
    }`;
  };

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_WEB_PANEL_URL
          }/api/Menu/getMenuList?languageID=1`,
          { withCredentials: true }
        );

        // Sadece typeId = 2 olan menüleri filtrele
        const filteredMenus = (response.data || []).filter(
          (item: MenuItem) => item.mainModel.typeId === 2
        );

        setMenuItems(filteredMenus);
      } catch (error) {
        console.error("Menu yükleme hatası:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  // Sayfa değiştiğinde aktif menüyü aç, diğerlerini kapat
  useEffect(() => {
    if (menuItems.length > 0) {
      const activeMenuData = getActiveMenuAndSubMenu();
      if (activeMenuData) {
        setOpenMenus({ [activeMenuData.mainMenuId]: true });
      }
    }
  }, [location.pathname, menuItems, getActiveMenuAndSubMenu]);

  const handleMenuClick = (menuSeqId: number) => {
    setOpenMenus((prev) => ({ ...prev, [menuSeqId]: !prev[menuSeqId] }));
  };

  const handleSubMenuClick = (subItem: MenuItem["subMenu"][0]) => {
    const route = getRouteForMenuItem(subItem.controller, subItem.action);
    navigate(route);
  };

  if (loading) {
    return (
      <Stack
        sx={{
          flexGrow: 1,
          p: 3,
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
        }}
      >
        <CircularProgress
          size={32}
          thickness={4}
          sx={{
            color: "primary.main",
            filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))",
          }}
        />
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            fontSize: "0.8rem",
            fontWeight: 500,
          }}
        >
          Menü yükleniyor...
        </Typography>
      </Stack>
    );
  }

  return (
    <Stack sx={{ flexGrow: 1, p: 1 }}>
      <List dense>
        {menuItems.map((item, index) => (
          <React.Fragment key={`menu-${item.mainModel.menuSeqId}-${index}`}>
            <ListItem disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                onClick={() => handleMenuClick(item.mainModel.menuSeqId)}
                sx={{
                  borderRadius: 2,
                  mx: 1,
                  minHeight: 48,
                  transition: "all 0.2s ease-in-out",
                  "&:hover": {
                    backgroundColor: (theme) =>
                      alpha(theme.palette.primary.main, 0.08),
                    transform: "translateX(4px)",
                    boxShadow: (theme) =>
                      `0 2px 8px ${alpha(theme.palette.primary.main, 0.15)}`,
                  },
                  ...(openMenus[item.mainModel.menuSeqId] && {
                    backgroundColor: (theme) =>
                      alpha(theme.palette.primary.main, 0.12),
                    color: "primary.main",
                    fontWeight: 600,
                  }),
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 40,
                    color: openMenus[item.mainModel.menuSeqId]
                      ? "primary.main"
                      : "text.secondary",
                  }}
                >
                  {getMenuIcon(item.mainModel.name)}
                </ListItemIcon>
                <ListItemText
                  primary={item.mainModel.name}
                  primaryTypographyProps={{
                    fontWeight: openMenus[item.mainModel.menuSeqId] ? 600 : 500,
                    fontSize: "0.875rem",
                  }}
                />
                {item.subMenu.length > 0 && (
                  <ListItemIcon
                    sx={{
                      minWidth: "auto",
                      color: openMenus[item.mainModel.menuSeqId]
                        ? "primary.main"
                        : "text.secondary",
                    }}
                  >
                    {openMenus[item.mainModel.menuSeqId] ? (
                      <ExpandLess />
                    ) : (
                      <ExpandMore />
                    )}
                  </ListItemIcon>
                )}
              </ListItemButton>
            </ListItem>

            {item.subMenu.length > 0 && (
              <Collapse in={openMenus[item.mainModel.menuSeqId]} timeout="auto">
                <List component="div" disablePadding>
                  {item.subMenu.map((subItem, subIndex) => {
                    const isActive = isActiveRoute(
                      subItem.controller,
                      subItem.action
                    );

                    return (
                      <ListItem
                        key={`sub-${item.mainModel.menuSeqId}-${subItem.menuSeqId}-${subIndex}`}
                        disablePadding
                        sx={{ pl: 2 }}
                      >
                        <ListItemButton
                          onClick={() => handleSubMenuClick(subItem)}
                          sx={{
                            borderRadius: 2,
                            mx: 1,
                            ml: 3,
                            minHeight: 40,
                            transition: "all 0.2s ease-in-out",
                            ...(isActive && {
                              backgroundColor: (theme) =>
                                alpha(theme.palette.primary.main, 0.15),
                              borderLeft: (theme) =>
                                `3px solid ${theme.palette.primary.main}`,
                              color: "primary.main",
                              fontWeight: 600,
                              transform: "translateX(4px)",
                              boxShadow: (theme) =>
                                `0 2px 8px ${alpha(
                                  theme.palette.primary.main,
                                  0.2
                                )}`,
                            }),
                            "&:hover": {
                              backgroundColor: (theme) =>
                                isActive
                                  ? alpha(theme.palette.primary.main, 0.2)
                                  : alpha(theme.palette.secondary.main, 0.08),
                              transform: isActive
                                ? "translateX(4px)"
                                : "translateX(8px)",
                              boxShadow: (theme) =>
                                `0 2px 8px ${alpha(
                                  isActive
                                    ? theme.palette.primary.main
                                    : theme.palette.secondary.main,
                                  0.15
                                )}`,
                            },
                          }}
                        >
                          <ListItemIcon
                            sx={{
                              minWidth: 32,
                              color: isActive
                                ? "primary.main"
                                : "text.secondary",
                              "& svg": {
                                fontSize: "1.1rem",
                              },
                            }}
                          >
                            {getSubMenuIcon(subItem.name)}
                          </ListItemIcon>
                          <ListItemText
                            primary={subItem.name}
                            primaryTypographyProps={{
                              fontSize: "0.8rem",
                              fontWeight: isActive ? 600 : 500,
                              color: isActive
                                ? "primary.main"
                                : "text.secondary",
                            }}
                          />
                        </ListItemButton>
                      </ListItem>
                    );
                  })}
                </List>
              </Collapse>
            )}
          </React.Fragment>
        ))}
      </List>
    </Stack>
  );
}

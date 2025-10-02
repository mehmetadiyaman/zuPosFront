import * as React from "react";
import { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Collapse from "@mui/material/Collapse";
import CircularProgress from "@mui/material/CircularProgress";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import FolderIcon from "@mui/icons-material/Folder";
import ArticleIcon from "@mui/icons-material/Article";
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

  const handleMenuClick = (menuSeqId: number) => {
    setOpenMenus((prev) => ({ ...prev, [menuSeqId]: !prev[menuSeqId] }));
  };

  if (loading) {
    return (
      <Stack
        sx={{
          flexGrow: 1,
          p: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress size={24} />
      </Stack>
    );
  }

  return (
    <Stack sx={{ flexGrow: 1, p: 1 }}>
      <List dense>
        {menuItems.map((item, index) => (
          <React.Fragment key={`menu-${item.mainModel.menuSeqId}-${index}`}>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => handleMenuClick(item.mainModel.menuSeqId)}
              >
                <ListItemIcon>
                  <FolderIcon />
                </ListItemIcon>
                <ListItemText primary={item.mainModel.name} />
                {item.subMenu.length > 0 &&
                  (openMenus[item.mainModel.menuSeqId] ? (
                    <ExpandLess />
                  ) : (
                    <ExpandMore />
                  ))}
              </ListItemButton>
            </ListItem>

            {item.subMenu.length > 0 && (
              <Collapse in={openMenus[item.mainModel.menuSeqId]} timeout="auto">
                <List component="div" disablePadding>
                  {item.subMenu.map((subItem, subIndex) => (
                    <ListItem
                      key={`sub-${item.mainModel.menuSeqId}-${subItem.menuSeqId}-${subIndex}`}
                      disablePadding
                      sx={{ pl: 4 }}
                    >
                      <ListItemButton>
                        <ListItemIcon>
                          <ArticleIcon />
                        </ListItemIcon>
                        <ListItemText primary={subItem.name} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            )}
          </React.Fragment>
        ))}
      </List>
    </Stack>
  );
}

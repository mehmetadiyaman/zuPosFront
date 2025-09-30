import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Button,
  Box,
  AppBar,
  Toolbar,
  Card,
  CardContent,
} from "@mui/material";
import {
  Restaurant,
  ShoppingCart,
  People,
  Assessment,
  ExitToApp,
} from "@mui/icons-material";
import { useAuth } from "../hooks/useAuth";

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const menuItems = [
    {
      title: "Sipariş Yönetimi",
      description: "Siparişleri görüntüle ve yönet",
      icon: <ShoppingCart sx={{ fontSize: 40 }} />,
      color: "#2E7D32",
    },
    {
      title: "Menü Yönetimi",
      description: "Menü öğelerini düzenle",
      icon: <Restaurant sx={{ fontSize: 40 }} />,
      color: "#FF6F00",
    },
    {
      title: "Müşteri Yönetimi",
      description: "Müşteri bilgilerini yönet",
      icon: <People sx={{ fontSize: 40 }} />,
      color: "#1976D2",
    },
    {
      title: "Raporlar",
      description: "Satış ve analiz raporları",
      icon: <Assessment sx={{ fontSize: 40 }} />,
      color: "#7B1FA2",
    },
  ];

  if (!user) {
    return null;
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ bgcolor: "primary.main" }}>
        <Toolbar>
          <Restaurant sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ZuPOS - Dashboard
          </Typography>
          <Typography variant="body1" sx={{ mr: 2 }}>
            Hoş geldiniz, {user.username}
          </Typography>
          <Button
            color="inherit"
            onClick={handleLogout}
            startIcon={<ExitToApp />}
          >
            Çıkış
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ color: "primary.main", mb: 4 }}
        >
          Restoran Yönetim Paneli
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
              md: "1fr 1fr 1fr 1fr",
            },
            gap: 3,
          }}
        >
          {menuItems.map((item, index) => (
            <Card
              key={index}
              sx={{
                height: "100%",
                cursor: "pointer",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
                },
              }}
            >
              <CardContent sx={{ textAlign: "center", p: 3 }}>
                <Box sx={{ color: item.color, mb: 2 }}>{item.icon}</Box>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>

        <Box sx={{ mt: 4, p: 3, bgcolor: "background.paper", borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom sx={{ color: "primary.main" }}>
            Sistem Durumu
          </Typography>
          <Typography variant="body1" color="text.secondary">
            ✅ Tüm sistemler çalışıyor
            <br />
            ✅ API bağlantısı aktif
            <br />✅ Veritabanı erişimi normal
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Dashboard;

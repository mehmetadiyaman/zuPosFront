import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  IconButton,
  Chip,
  Stack,
  useTheme,
  alpha,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Warehouse as WarehouseIcon,
} from "@mui/icons-material";
import CustomModal from "../../components/ui/CustomModal";
import StatGrid from "../../components/ui/StatGrid";
import CustomTable from "../../components/ui/CustomTable";

interface Depo {
  id: number;
  ad: string;
  kod: string;
  devirTipi: string;
  durum: string;
}

const DepoTanimlama: React.FC = () => {
  const theme = useTheme();
  const [depolar] = useState<Depo[]>([
    {
      id: 1,
      ad: "AEVERV",
      kod: "AERGV",
      devirTipi: "Reçeteli Mamul",
      durum: "Aktif",
    },
    {
      id: 2,
      ad: "AFRBF",
      kod: "ERAVFV",
      devirTipi: "Reçeteli Mamul",
      durum: "Aktif",
    },
    {
      id: 3,
      ad: "AVVB",
      kod: "AFBADR",
      devirTipi: "Reçeteli Mamul",
      durum: "Aktif",
    },
    {
      id: 4,
      ad: "Deneme3hhhh",
      kod: "4555",
      devirTipi: "Reçeteli Mamul",
      durum: "Pasif",
    },
    {
      id: 5,
      ad: "fjgckc",
      kod: "kcghkm",
      devirTipi: "Reçeteli Mamul",
      durum: "Aktif",
    },
    {
      id: 6,
      ad: "THGSRT",
      kod: "RTH",
      devirTipi: "Reçeteli Mamul",
      durum: "Aktif",
    },
  ]);

  // Modal states
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    ad: "",
    kod: "",
    devirTipi: "",
  });

  // İstatistik verileri
  const aktifDepolar = depolar.filter((d) => d.durum === "Aktif").length;
  const pasifDepolar = depolar.filter((d) => d.durum === "Pasif").length;
  const toplamDepo = depolar.length;

  // Örnek trend verileri (gerçek uygulamada API'dan gelir)
  const trendData = [4, 6, 8, 12, 16, 14, 18, 22, 20, 24, 28, 30];

  // İstatistik kartları için veri hazırlama
  const statGridItems = [
    {
      title: "Toplam Depo",
      value: toplamDepo.toString(),
      interval: "Tüm depolar",
      trend: "up" as const,
      data: trendData,
    },
    {
      title: "Aktif Depolar",
      value: aktifDepolar.toString(),
      interval: "Aktif durumda",
      trend: "up" as const,
      data: trendData.map((val) => val * 0.8),
    },
    {
      title: "Pasif Depolar",
      value: pasifDepolar.toString(),
      interval: "Kullanım dışı",
      trend: pasifDepolar > 0 ? ("down" as const) : ("neutral" as const),
      data: trendData.map((val) => val * 0.2),
    },
    {
      title: "Kapasite Kullanımı",
      value: "87%",
      interval: "Ortalama doluluk",
      trend: "up" as const,
      data: trendData.map((val) => val * 0.9),
    },
  ];

  // Tablo kolonları
  const tableColumns = [
    {
      key: "ad",
      label: "Adı",
      render: (value: unknown) => (
        <Typography
          variant="body2"
          sx={{ fontWeight: 500, color: "text.primary" }}
        >
          {String(value)}
        </Typography>
      ),
    },
    {
      key: "kod",
      label: "Kodu",
      render: (value: unknown) => (
        <Box
          sx={{
            px: 2,
            py: 1,
            borderRadius: 1.5,
            backgroundColor: alpha(theme.palette.primary.main, 0.08),
            display: "inline-block",
          }}
        >
          <Typography
            variant="body2"
            sx={{
              fontFamily: "monospace",
              fontWeight: 600,
              color: "primary.main",
              fontSize: "0.75rem",
            }}
          >
            {String(value)}
          </Typography>
        </Box>
      ),
    },
    {
      key: "devirTipi",
      label: "Devir Tipi",
      render: (value: unknown) => (
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {String(value)}
        </Typography>
      ),
    },
    {
      key: "durum",
      label: "Durumu",
      render: (value: unknown) => (
        <Chip
          label={String(value)}
          color={value === "Aktif" ? "success" : "error"}
          size="small"
          sx={{
            fontWeight: 600,
            fontSize: "0.7rem",
            height: 28,
          }}
        />
      ),
    },
    {
      key: "actions",
      label: "İşlemler",
      align: "center" as const,
      render: () => (
        <Stack direction="row" spacing={1} justifyContent="center">
          <IconButton
            size="small"
            sx={{
              color: "primary.main",
              backgroundColor: alpha(theme.palette.primary.main, 0.08),
              borderRadius: 2,
              "&:hover": {
                backgroundColor: alpha(theme.palette.primary.main, 0.15),
                transform: "scale(1.05)",
              },
            }}
            title="Düzenle"
          >
            <EditIcon sx={{ fontSize: "1rem" }} />
          </IconButton>
          <IconButton
            size="small"
            sx={{
              color: "error.main",
              backgroundColor: alpha(theme.palette.error.main, 0.08),
              borderRadius: 2,
              "&:hover": {
                backgroundColor: alpha(theme.palette.error.main, 0.15),
                transform: "scale(1.05)",
              },
            }}
            title="Sil"
          >
            <DeleteIcon sx={{ fontSize: "1rem" }} />
          </IconButton>
        </Stack>
      ),
    },
  ];

  // Modal ve form fonksiyonları
  const handleCloseModal = () => {
    setOpenModal(false);
    setFormData({ ad: "", kod: "", devirTipi: "" });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    // Burada form verilerini işle (API çağrısı vs.)
    console.log("Yeni depo verileri:", formData);
    handleCloseModal();
  };

  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      {/* Sayfa Başlığı */}
      <Stack
        direction="row"
        alignItems="center"
        spacing={2}
        sx={{
          mb: 4,
          p: 3,
          borderRadius: 3,
          background: `linear-gradient(135deg, 
            ${alpha(theme.palette.primary.main, 0.08)} 0%, 
            ${alpha(theme.palette.secondary.main, 0.04)} 100%
          )`,
          border: `1px solid ${alpha(theme.palette.primary.main, 0.12)}`,
        }}
      >
        <Box
          sx={{
            p: 2,
            borderRadius: 2,
            background: `linear-gradient(135deg, 
              ${theme.palette.primary.main} 0%, 
              ${theme.palette.secondary.main} 100%
            )`,
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <WarehouseIcon sx={{ fontSize: "2rem" }} />
        </Box>
        <Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              background: `linear-gradient(135deg, 
                ${theme.palette.primary.main} 0%, 
                ${theme.palette.secondary.main} 100%
              )`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              mb: 0.5,
            }}
          >
            Depo Tanımlamaları
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "text.secondary", fontWeight: 500 }}
          >
            Depo bilgilerini yönetin ve düzenleyin
          </Typography>
        </Box>
      </Stack>

      {/* İstatistikler - StatGrid Component */}
      <Box sx={{ mb: 4 }}>
        <StatGrid items={statGridItems} />
      </Box>

      {/* Depo Listesi - CustomTable Component */}
      <CustomTable
        title="Depo Listesi"
        columns={tableColumns}
        data={depolar.map((depo) => ({ ...depo }))}
        searchable={true}
        searchPlaceholder="Search:"
        rowsPerPage={5}
        showPagination={true}
        actions={
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenModal(true)}
            sx={{
              borderRadius: 2,
              fontWeight: 600,
              textTransform: "none",
              px: 3,
              py: 1,
              boxShadow: `0 4px 14px ${alpha(
                theme.palette.primary.main,
                0.25
              )}`,
              background: `linear-gradient(135deg, 
                ${theme.palette.primary.main} 0%, 
                ${theme.palette.secondary.main} 100%
              )`,
              "&:hover": {
                boxShadow: `0 6px 20px ${alpha(
                  theme.palette.primary.main,
                  0.35
                )}`,
                transform: "translateY(-2px)",
              },
            }}
          >
            Yeni Depo Ekle
          </Button>
        }
      />

      {/* Depo Ekleme Modal'ı */}
      <CustomModal
        open={openModal}
        onClose={handleCloseModal}
        title="Yeni Depo Ekle"
        subtitle="Sisteme yeni bir depo eklemek için gerekli bilgileri doldurun"
        icon={<WarehouseIcon />}
        maxWidth="sm"
        actions={
          <>
            <Button
              variant="outlined"
              onClick={handleCloseModal}
              sx={{
                borderRadius: 2,
                fontWeight: 500,
                textTransform: "none",
                px: 4,
                py: 1,
                borderColor: alpha(theme.palette.grey[400], 0.5),
                color: "text.secondary",
                "&:hover": {
                  borderColor: theme.palette.grey[400],
                  backgroundColor: alpha(theme.palette.grey[100], 0.5),
                },
              }}
            >
              İptal
            </Button>
            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{
                borderRadius: 2,
                fontWeight: 600,
                textTransform: "none",
                px: 4,
                py: 1,
                backgroundColor: theme.palette.primary.main,
                "&:hover": {
                  backgroundColor: theme.palette.primary.dark,
                },
              }}
            >
              Depo Ekle
            </Button>
          </>
        }
      >
        <Stack spacing={3}>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              label="Depo Adı"
              variant="outlined"
              placeholder="Depo adını giriniz"
              value={formData.ad}
              onChange={(e) => handleInputChange("ad", e.target.value)}
              size="small"
              sx={{
                flex: 2,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
            />
            <TextField
              label="Depo Kodu"
              variant="outlined"
              placeholder="Örn: DEP001"
              value={formData.kod}
              onChange={(e) => handleInputChange("kod", e.target.value)}
              size="small"
              sx={{
                flex: 1,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
            />
          </Stack>

          <TextField
            fullWidth
            label="Devir Tipi"
            variant="outlined"
            placeholder="Devir tipini giriniz"
            value={formData.devirTipi}
            onChange={(e) => handleInputChange("devirTipi", e.target.value)}
            size="small"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
          />
        </Stack>
      </CustomModal>
    </Box>
  );
};

export default DepoTanimlama;

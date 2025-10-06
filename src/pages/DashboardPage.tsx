import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Copyright from "../components/common/Copyright";
import ChartUserByCountry from "../components/charts/ChartUserByCountry";
import CustomizedTreeView from "../components/ui/CustomizedTreeView";
import CustomizedDataGrid from "../components/ui/CustomizedDataGrid";
import HighlightedCard from "../components/ui/HighlightedCard";
import PageViewsBarChart from "../components/charts/PageViewsBarChart";
import SessionsChart from "../components/charts/SessionsChart";
import StatCard, { type StatCardProps } from "../components/ui/StatCard";

const data: StatCardProps[] = [
  {
    title: "Günlük Satışlar",
    value: "₺12.5k",
    interval: "Son 30 gün",
    trend: "up",
    data: [
      200, 24, 220, 260, 240, 380, 100, 240, 280, 240, 300, 340, 320, 360, 340,
      380, 360, 400, 380, 420, 400, 640, 340, 460, 440, 480, 460, 600, 880, 920,
    ],
  },
  {
    title: "Toplam Müşteri",
    value: "1.2k",
    interval: "Son 30 gün",
    trend: "up",
    data: [
      100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320, 340, 360, 380,
      400, 420, 440, 460, 480, 500, 520, 540, 560, 580, 600, 620, 640, 660, 680,
    ],
  },
  {
    title: "Aktif Masalar",
    value: "24/32",
    interval: "Şu anda",
    trend: "neutral",
    data: [
      20, 22, 18, 25, 23, 21, 24, 26, 22, 20, 23, 25, 21, 24, 22, 26, 23, 21,
      25, 24, 22, 23, 25, 24, 22, 21, 23, 25, 24, 22,
    ],
  },
];

export default function DashboardPage() {
  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      {/* Başlık */}
      <Typography
        variant="h4"
        component="h1"
        sx={{ mb: 3, color: "primary.main", fontWeight: "bold" }}
      >
        ZuPOS Dashboard
      </Typography>

      {/* Özet Kartları */}
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Günlük Özet
      </Typography>
      <Grid
        container
        spacing={2}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        {data.map((card, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, lg: 3 }}>
            <StatCard {...card} />
          </Grid>
        ))}
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <HighlightedCard />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <SessionsChart />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <PageViewsBarChart />
        </Grid>
      </Grid>

      {/* Detaylar */}
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Detaylı Raporlar
      </Typography>
      <Grid container spacing={2} columns={12}>
        <Grid size={{ xs: 12, lg: 9 }}>
          <CustomizedDataGrid />
        </Grid>
        <Grid size={{ xs: 12, lg: 3 }}>
          <Stack gap={2} direction={{ xs: "column", sm: "row", lg: "column" }}>
            <CustomizedTreeView />
            <ChartUserByCountry />
          </Stack>
        </Grid>
      </Grid>

      <Copyright sx={{ my: 4 }} />
    </Box>
  );
}

import type { Theme } from "@mui/material/styles";
import { alpha } from "@mui/material/styles";

export const dataGridCustomizations = {
  MuiDataGrid: {
    styleOverrides: {
      root: ({ theme }: { theme: Theme }) => ({
        border: `1px solid ${alpha(theme.palette.primary.main, 0.12)}`,
        borderRadius: theme.shape.borderRadius,
        "& .MuiDataGrid-columnHeaders": {
          backgroundColor: alpha(theme.palette.primary.main, 0.04),
          borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.12)}`,
        },
        "& .MuiDataGrid-cell": {
          borderBottom: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
        },
        "& .MuiDataGrid-row:hover": {
          backgroundColor: alpha(theme.palette.primary.main, 0.04),
        },
      }),
    },
  },
};

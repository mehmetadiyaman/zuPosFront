import React from "react";
import {
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  Stack,
  useTheme,
  alpha,
} from "@mui/material";

export interface TableColumn {
  key: string;
  label: string;
  align?: "left" | "center" | "right";
  hideOn?: "xs" | "sm" | "md" | "lg" | "xl";
  render?: (value: unknown, row: Record<string, unknown>) => React.ReactNode;
  minWidth?: number;
}

export interface CustomTableProps {
  title: string;
  subtitle?: string;
  columns: TableColumn[];
  data: Record<string, unknown>[];
  actions?: React.ReactNode;
  onRowClick?: (row: Record<string, unknown>) => void;
  maxHeight?: number | string;
}

const CustomTable: React.FC<CustomTableProps> = ({
  title,
  subtitle,
  columns,
  data,
  actions,
  onRowClick,
  maxHeight,
}) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        borderRadius: 3,
        border: `1px solid ${alpha(theme.palette.primary.main, 0.12)}`,
        boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.08)}`,
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 3,
          background: `linear-gradient(135deg, 
            ${alpha(theme.palette.primary.main, 0.06)} 0%, 
            ${alpha(theme.palette.secondary.main, 0.03)} 100%
          )`,
          borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.12)}`,
        }}
      >
        <Stack
          direction={{ xs: "column", sm: "row" }}
          alignItems={{ xs: "flex-start", sm: "center" }}
          justifyContent="space-between"
          spacing={2}
        >
          <Box>
            <Typography
              variant="h6"
              sx={{ fontWeight: 600, color: "primary.main", mb: 0.5 }}
            >
              {title}
            </Typography>
            {subtitle && (
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {subtitle}
              </Typography>
            )}
          </Box>
          {actions && <Box>{actions}</Box>}
        </Stack>
      </Box>

      {/* Table Content */}
      <CardContent sx={{ p: 0 }}>
        <TableContainer
          sx={{
            maxHeight: maxHeight,
            "& .MuiTable-root": {
              borderCollapse: "separate",
              borderSpacing: 0,
            },
          }}
        >
          <Table>
            {/* Table Head */}
            <TableHead>
              <TableRow
                sx={{
                  backgroundColor: alpha(theme.palette.grey[100], 0.5),
                  "& .MuiTableCell-root": {
                    fontWeight: 600,
                    fontSize: "0.875rem",
                    color: "text.primary",
                    border: "none",
                    py: 2,
                  },
                }}
              >
                {columns.map((column, index) => (
                  <TableCell
                    key={column.key}
                    align={column.align || "left"}
                    sx={{
                      pl: index === 0 ? 3 : 1,
                      pr: index === columns.length - 1 ? 3 : 1,
                      display: column.hideOn
                        ? {
                            [column.hideOn]: "none",
                            [getNextBreakpoint(column.hideOn)]: "table-cell",
                          }
                        : "table-cell",
                      minWidth: column.minWidth,
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            {/* Table Body */}
            <TableBody>
              {data.map((row, rowIndex) => (
                <TableRow
                  key={rowIndex}
                  sx={{
                    cursor: onRowClick ? "pointer" : "default",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      backgroundColor: alpha(theme.palette.primary.main, 0.04),
                      transform: onRowClick ? "translateX(4px)" : "none",
                    },
                    "& .MuiTableCell-root": {
                      border: "none",
                      py: 2.5,
                      borderBottom:
                        rowIndex === data.length - 1
                          ? "none"
                          : `1px solid ${alpha(theme.palette.divider, 0.5)}`,
                    },
                  }}
                  onClick={() => onRowClick && onRowClick(row)}
                >
                  {columns.map((column, colIndex) => (
                    <TableCell
                      key={column.key}
                      align={column.align || "left"}
                      sx={{
                        pl: colIndex === 0 ? 3 : 1,
                        pr: colIndex === columns.length - 1 ? 3 : 1,
                        display: column.hideOn
                          ? {
                              [column.hideOn]: "none",
                              [getNextBreakpoint(column.hideOn)]: "table-cell",
                            }
                          : "table-cell",
                        minWidth: column.minWidth,
                      }}
                    >
                      {column.render
                        ? column.render(row[column.key], row)
                        : String(row[column.key] ?? "")}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

// Helper function to get next breakpoint for responsive display
const getNextBreakpoint = (breakpoint: string): string => {
  const breakpoints = ["xs", "sm", "md", "lg", "xl"];
  const currentIndex = breakpoints.indexOf(breakpoint);
  return breakpoints[currentIndex + 1] || "xl";
};

export default CustomTable;

import React, { useState, useMemo } from "react";
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
  Pagination,
  useTheme,
  alpha,
} from "@mui/material";
import Search from "./Search";

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
  searchable?: boolean;
  searchPlaceholder?: string;
  rowsPerPage?: number;
  showPagination?: boolean;
}

const CustomTable: React.FC<CustomTableProps> = ({
  title,
  subtitle,
  columns,
  data,
  actions,
  onRowClick,
  maxHeight,
  searchable = false,
  searchPlaceholder = "Ara...",
  rowsPerPage = 10,
  showPagination = true,
}) => {
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Filter data based on search term
  const filteredData = useMemo(() => {
    if (!searchable || !searchTerm) return data;

    return data.filter((row) =>
      Object.values(row).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [data, searchTerm, searchable]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedData = showPagination
    ? filteredData.slice(startIndex, endIndex)
    : filteredData;

  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

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

        {/* Search Field */}
        {searchable && (
          <Box sx={{ mt: 2 }}>
            <Search
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder={searchPlaceholder}
              width={400}
            />
          </Box>
        )}
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
              {paginatedData.map((row, rowIndex) => (
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
                        rowIndex === paginatedData.length - 1
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

        {/* Pagination */}
        {showPagination && totalPages > 1 && (
          <Box
            sx={{
              p: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderTop: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
            }}
          >
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Showing page {currentPage} of {totalPages}
            </Typography>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              size="small"
              sx={{
                "& .MuiPaginationItem-root": {
                  borderRadius: 2,
                },
              }}
            />
          </Box>
        )}
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

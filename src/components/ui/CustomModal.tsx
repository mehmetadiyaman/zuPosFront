import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Box,
  Typography,
  Fade,
  useTheme,
  alpha,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

export interface CustomModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl";
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

const CustomModal: React.FC<CustomModalProps> = ({
  open,
  onClose,
  title,
  subtitle,
  children,
  actions,
  maxWidth = "sm",
  fullWidth = true,
  icon,
}) => {
  const theme = useTheme();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      TransitionComponent={Fade}
      transitionDuration={400}
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: 4,
          boxShadow: `0 12px 40px ${alpha(theme.palette.common.black, 0.15)}`,
          border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          background: theme.palette.background.paper,
          overflow: "hidden",
          position: "relative",
          maxHeight: "90vh",
          m: 2,
        },
        "& .MuiBackdrop-root": {
          backgroundColor: alpha(theme.palette.common.black, 0.4),
          backdropFilter: "blur(6px)",
        },
      }}
    >
      {/* Header */}
      <DialogTitle
        sx={{
          p: 3,
          pb: 2,
          background: alpha(theme.palette.grey[50], 0.5),
          borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Box
              sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}
            >
              {icon && (
                <Box
                  sx={{
                    p: 1,
                    borderRadius: 2,
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                    color: "primary.main",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {icon}
                </Box>
              )}
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  color: "text.primary",
                  lineHeight: 1.2,
                }}
              >
                {title}
              </Typography>
            </Box>
            {subtitle && (
              <Typography
                variant="body2"
                sx={{
                  color: "text.secondary",
                  fontWeight: 400,
                  pl: icon ? 5.5 : 0,
                  lineHeight: 1.4,
                }}
              >
                {subtitle}
              </Typography>
            )}
          </Box>

          <IconButton
            onClick={onClose}
            size="small"
            sx={{
              color: "text.secondary",
              backgroundColor: "transparent",
              borderRadius: 2,
              transition: "all 0.2s ease",
              "&:hover": {
                backgroundColor: alpha(theme.palette.grey[400], 0.1),
                color: "text.primary",
              },
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
      </DialogTitle>

      {/* Content */}
      <DialogContent
        sx={{
          p: 3,
          py: 2,
          overflowY: "auto",
        }}
      >
        {children}
      </DialogContent>

      {/* Actions */}
      {actions && (
        <DialogActions
          sx={{
            p: 3,
            pt: 2,
            borderTop: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
            backgroundColor: alpha(theme.palette.grey[50], 0.3),
            gap: 1.5,
            flexDirection: { xs: "column-reverse", sm: "row" },
            "& > *": {
              width: { xs: "100%", sm: "auto" },
            },
          }}
        >
          {actions}
        </DialogActions>
      )}
    </Dialog>
  );
};

export default CustomModal;

import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { useTheme, alpha } from "@mui/material";

interface SearchProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  width?: object | string | number;
}

export default function Search({
  value = "",
  onChange,
  placeholder = "Search…",
  width = { xs: "100%", md: "25ch" },
}: SearchProps) {
  const theme = useTheme();

  return (
    <FormControl sx={{ width }} variant="outlined">
      <OutlinedInput
        size="small"
        id="search"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        sx={{
          flexGrow: 1,
          backgroundColor: alpha(theme.palette.background.paper, 0.8),
          "&:hover": {
            backgroundColor: theme.palette.background.paper,
          },
        }}
        startAdornment={
          <InputAdornment position="start" sx={{ color: "text.primary" }}>
            <SearchRoundedIcon fontSize="small" />
          </InputAdornment>
        }
        inputProps={{
          "aria-label": "search",
        }}
      />
    </FormControl>
  );
}

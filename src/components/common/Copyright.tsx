import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import type { SxProps, Theme } from "@mui/material/styles";

interface CopyrightProps {
  sx?: SxProps<Theme>;
}

export default function Copyright(props: CopyrightProps) {
  return (
    <Typography
      variant="body2"
      align="center"
      {...props}
      sx={[
        {
          color: "text.secondary",
        },
        ...(Array.isArray(props.sx) ? props.sx : props.sx ? [props.sx] : []),
      ]}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://github.com/mehmetadiyaman/zuPosFront">
        ZuPOS
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

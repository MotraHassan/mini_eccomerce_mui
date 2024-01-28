import { useTheme } from "@emotion/react";
import { Box, Typography } from "@mui/material";

export default function NotFound() {
  const theme= useTheme()
  return (
    <Box>
      <Typography variant="h3" color={theme.palette.error.main}>Not Found </Typography>
    </Box>
    )
}

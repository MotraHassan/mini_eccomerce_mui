import { blue, grey } from "@mui/material/colors";

export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? 
      {
          // palette values for light mode
          btnColor:{
            main:blue[400]
          },
          newColor:{
            main:grey[100]
          }
        }
      : 
      {
          // palette values for dark mode
          btnColor:{
            main:blue[700]
          },
          newColor:{
            main:grey[800]
          },
        }),
  },
});

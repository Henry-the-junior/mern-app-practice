import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  return (
    // 整個頁面視為一個 Box
    <Box>
      {/* loginPage 所用的 navbar */}
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%" // padding: (上下) (左右)
        textAlign="center"
      >
        <Typography fontWeight="bold" fontSize="32px" color="primary">
          Sociopedia
        </Typography>
      </Box>
      {/* loginPage 主要呈現表單的地方 */}
      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem" // padding: (上下左右)
        m="2rem auto" // margin: (上下) (左右)
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Welcome to Socipedia, the Social Media for Sociopaths!
        </Typography>
        <Form />
      </Box>
    </Box>
  );
};

export default LoginPage;

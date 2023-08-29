import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";

// 前端專案用到的技能
// React
// Redux
// Redux Persist
// React Dropzone
// Dotenv
// Formik
// React Router
// Material UI

// npm i react-redux @reduxjs/toolkit
// redux-persist react-dropzone dotenv
// formik yup react-router-dom@6
// @mui/material @emotion/react
// @emotion/styled @mui/icons-material

function App() {
  // 取得設定 theme 所需要的 mode
  const mode = useSelector((state) => state.mode);

  // 讓 theme 在 mode 被變動時更新，也就是讓 theme 可以被切換
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  // 判斷 state 中有沒有 token，這會影響到下面的 Route
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            {/* <Route
              path="/home"
              element={isAuth ? <HomePage /> : <Navigate to="/" />}
            />
            <Route
              path="/profile/:userId"
              element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
            /> */}

            <Route path="/home" element={<HomePage />} />
            <Route path="/profile/:userId" element={<ProfilePage />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;

// [ReactJS Tutorial: A Step-by-Step Guide To Learn React](https://www.simplilearn.com/tutorials/reactjs-tutorial?fbclid=IwAR0JD4OnEACh4toKlm_iyg4S0uPeGjMfZ0WZ05I3XyFGQRMOkJJVOEroSMw)

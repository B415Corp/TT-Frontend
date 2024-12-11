import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { PrivateRoute } from "./Features/Login_Registration/PrivateRoutes.tsx";
import "./index.css";
import Layout from "./Pages/Layout/Layout.tsx";
import LoginPage from "./Pages/Login/LoginPage.tsx";
import MainPage from "./Pages/MainPage/MainPage.tsx";
import NotFound from "./Pages/Not Found/Not Found.tsx";
import Projects from "./Pages/Projects/Projects.tsx";
import RegistrationPage from "./Pages/Registration/RegistrationPage.tsx";
import Tasks from "./Pages/Tasks/Tasks.tsx";
import { SnackbarProvider } from "notistack";

const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SnackbarProvider
      maxSnack={3}
      preventDuplicate
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    />
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout></Layout>}>
            <Route
              index
              element={
                <PrivateRoute>
                  <MainPage></MainPage>
                </PrivateRoute>
              }
            ></Route>
            <Route
              path="projects"
              element={
                <PrivateRoute>
                  <Projects></Projects>
                </PrivateRoute>
              }
            ></Route>
            <Route
              path="projects/:id"
              element={
                <PrivateRoute>
                  <Tasks></Tasks>
                </PrivateRoute>
              }
            ></Route>
          </Route>

          <Route path="login" element={<LoginPage />} />
          <Route path="registration" element={<RegistrationPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);

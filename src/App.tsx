import { styled } from "@mui/material";
import { Box } from "@mui/system";
import { createContext, useEffect } from "react";
import { APP_GRID, ROUTES } from "consts";
import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { ExplorerPage, DeployerPage, Jetton } from "pages";
import { Footer } from "components/footer";
import { Header } from "components/header";
import { useJettonLogo } from "hooks/useJettonLogo";
import { FaqPage } from "pages/faq";
import analytics from "services/analytics";
import useNotification from "hooks/useNotification";
import { ProfilePage } from "pages/profile";

analytics.init();

const AppWrapper = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  height: "100vh",
  overflowY: "scroll",
  backgroundImage: "url(/bg.jpeg)", // Add this line
  backgroundSize: "cover", // Optional: Adjust how the background image is sized
  backgroundPosition: "center", // Optional: Center the background image
}));

const FooterBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "center",
  flex: "0 0 auto",
}));

const ScreensWrapper = styled(Box)({
  flex: "1 1 auto",
  overflowY: "auto",
  overflowX: "hidden",
  width: "100vw",

  "*::-webkit-scrollbar": {
    display: "none",
  },
  "*::-webkit-scrollbar-track": {
    display: "none",
  },
  "*::-webkit-scrollbar-thumb": {
    display: "none",
  },
});

const FlexibleBox = styled(Box)(({ theme }) => ({
  maxWidth: APP_GRID,
  width: "calc(100% - 50px)",
  marginLeft: "auto",
  marginRight: "auto",

  [theme.breakpoints.down("sm")]: {
    width: "calc(100% - 30px)",
  },
}));

export const EnvContext = createContext({
  isSandbox: false,
  isTestnet: false,
});

const PageNotFound = () => {
  const { showNotification } = useNotification();

  useEffect(() => {
    showNotification("Page not found", "error");
  }, [showNotification]);

  return <Box />;
};

interface ContentWrapperProps {
  children?: any;
}

const ContentWrapper = ({ children }: ContentWrapperProps) => {
  return (
    <FlexibleBox>
      {children}
      <Outlet />
    </FlexibleBox>
  );
};

const App = () => {
  const { resetJetton } = useJettonLogo();
  const location = useLocation();

  useEffect(() => {
    resetJetton();
  }, [location.pathname, resetJetton]);

  return (
    <AppWrapper>
      <EnvContext.Provider
        value={{
          isSandbox: window.location.search.includes("sandbox"),
          isTestnet: window.location.search.includes("testnet"),
        }}>
        <ScreensWrapper>
          <Routes>
            <Route
              path="*"
              element={
                <>
                  <Header />
                  <Navigate to="/" />
                  <PageNotFound />
                </>
              }
            />
            <Route path="/" element={<Header />}>
              <Route path="/" element={<ContentWrapper />}>
                <Route path={ROUTES.explorer} element={<ExplorerPage />} />
                <Route path={ROUTES.deployer} element={<DeployerPage />} />
                <Route path={ROUTES.jettonId} element={<Jetton />} />
                <Route path={ROUTES.profile} element={<ProfilePage />} />
                <Route path={ROUTES.faq} element={<FaqPage />} />
              </Route>
            </Route>
          </Routes>
        </ScreensWrapper>
      </EnvContext.Provider>
      <FooterBox mt={5}>
        <Footer />
      </FooterBox>
    </AppWrapper>
  );
};

export default App;

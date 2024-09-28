import { Box, Fade } from "@mui/material";
import { Screen, ScreenContent } from "components/Screen";
import { useEffect } from "react";
import { Card } from "./Card";
import { EmptyCard } from "./EmptyCard";
import { ROUTES } from "consts";
import { IJetton } from "store/jetton-list-store";
import { useNavigatePreserveQuery } from "lib/hooks/useNavigatePreserveQuery";
import useJettonStore from "store/jetton-store/useJettonStore";
import { useHeader } from "hooks/useHeader";

function ProfilePage() {
  const navigate = useNavigatePreserveQuery();
  const { userProfileList, getUserProfileList } = useJettonStore();

  useEffect(() => {
    getUserProfileList();
  }, [getUserProfileList]);

  const onClickCard = (item: IJetton | undefined) => {
    if (item) {
      navigate(`${ROUTES.jetton}/${item.masterAddress}`);
    }
  };
  const { setHeader } = useHeader();
  useEffect(() => {
    setHeader("Portfolio", { showBackButton: false });
  }, [setHeader]);

  return (
    <Screen>
      <ScreenContent removeBackground>
        <Fade in>
          <Box>
            {userProfileList?.length ? (
              userProfileList.map((item) => <Card item={item} onClickCard={onClickCard} />)
            ) : (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "70vh",
                  width: "100%",
                  color: "white",
                }}>
                <EmptyCard />
              </Box>
            )}
          </Box>
        </Fade>
      </ScreenContent>
    </Screen>
  );
}

export { ProfilePage };

import { Box, Fade } from "@mui/material";
import { Screen, ScreenContent } from "components/Screen";
import { StyledHeading } from "./styles";
import { useEffect } from "react";
import { Card } from "./Card";
import { ROUTES } from "consts";
import { IJetton } from "store/jetton-list-store";
import { useNavigatePreserveQuery } from "lib/hooks/useNavigatePreserveQuery";
import useJettonStore from "store/jetton-store/useJettonStore";

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

  return (
    <Screen>
      <ScreenContent removeBackground>
        <Fade in>
          <Box>
            <StyledHeading>PORTFOLIO</StyledHeading>
            {userProfileList?.map((item) => (
              <Card item={item} onClickCard={onClickCard} />
            ))}
          </Box>
        </Fade>
      </ScreenContent>
    </Screen>
  );
}

export { ProfilePage };

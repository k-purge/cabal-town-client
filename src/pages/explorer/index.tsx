import { useState, useEffect, useCallback } from "react";
import { Box, Fade } from "@mui/material";
import { SearchBar } from "components/header/headerSearchBar";
import { ListContainer, ScreenHeading } from "./styles";
import { Screen, ScreenContent } from "components/Screen";
import { useNavigatePreserveQuery } from "lib/hooks/useNavigatePreserveQuery";
import { ROUTES } from "consts";
import { Card } from "./card";
import { IJetton } from "store/jetton-list-store";
import useJettonListStore from "store/jetton-list-store/useJettonListStore";
import { useHeader } from "hooks/useHeader";

function ExplorerPage() {
  const { setSelectedJetton, jettonList, getJettonList } = useJettonListStore();
  const [example, setExample] = useState<string | undefined>(undefined);
  const navigate = useNavigatePreserveQuery();

  const resetExample = useCallback(() => {
    setExample(undefined);
  }, []);

  const onClickCard = useCallback(
    (jetton: IJetton | undefined) => {
      if (jetton) {
        setSelectedJetton(jetton);
        navigate(ROUTES.jettonId.replace(":id", jetton.masterAddress));
      }
    },
    [navigate, setSelectedJetton],
  );
  const { setHeader } = useHeader();

  useEffect(() => {
    setHeader("Explore", { showBackButton: false });
  }, [setHeader]);

  useEffect(() => {
    getJettonList();
  }, [getJettonList]);

  return (
    <Screen>
      <ScreenContent removeBackground>
        <Fade in>
          <Box>
            <Box sx={{ width: "100%" }}>
              <SearchBar
                example={example}
                resetExample={resetExample}
                closeMenu={() => console.log("closeMenu")}
              />
            </Box>

            <ListContainer>
              {jettonList.map((item, index) => (
                <Card key={index} item={item} onClickCard={onClickCard} />
              ))}
            </ListContainer>
          </Box>
        </Fade>
      </ScreenContent>
    </Screen>
  );
}

export { ExplorerPage };

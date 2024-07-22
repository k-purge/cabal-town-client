import { useState, useEffect, useCallback } from "react";
import { Box, Fade } from "@mui/material";
import { SearchBar } from "components/header/headerSearchBar";
import { ListContainer, ScreenHeading } from "./styles";
import { Screen, ScreenContent } from "components/Screen";
import { useNavigatePreserveQuery } from "lib/hooks/useNavigatePreserveQuery";
import { ROUTES } from "consts";
import { Card } from "./card";
import useJettonListStore from "store/jetton-list-store/useJettonListStore";
import { IJetton } from "store/jetton-list-store";

function ExplorerPage() {
  const { setSelectedJetton, jettonList, getJettonList } = useJettonListStore();
  const [isLoading, setIsLoading] = useState(false);
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

  useEffect(() => {
    getJettonList();
  }, []);

  return (
    <Screen>
      <ScreenContent removeBackground>
        <Fade in>
          <Box>
            <Box mb={3}>
              <ScreenHeading>Explorer</ScreenHeading>
            </Box>

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

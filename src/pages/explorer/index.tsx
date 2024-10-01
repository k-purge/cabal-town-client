import { useState, useEffect, useCallback } from "react";
import { Box, Fade } from "@mui/material";
import { SearchBar } from "components/header/headerSearchBar";
import { ListContainer, ButtonContainer, SelectedButton, UnselectedButton } from "./styles";
import { Screen, ScreenContent } from "components/Screen";
import { useNavigatePreserveQuery } from "lib/hooks/useNavigatePreserveQuery";
import { ROUTES } from "consts";
import { Card } from "../../components/card";
import { IJetton } from "store/jetton-list-store";
import useJettonListStore from "store/jetton-list-store/useJettonListStore";
import { useHeader } from "hooks/useHeader";

const categories = [
  { category: "All", value: "all" },
  { category: "Popular", value: "popular" },
  { category: "Blue Chips", value: "blueChip" },
  { category: "Trending", value: "trending" },
];

function ExplorerPage() {
  const { setSelectedJetton, jettonList, getJettonList } = useJettonListStore();
  const [example, setExample] = useState<string | undefined>(undefined);
  const navigate = useNavigatePreserveQuery();
  const [selectedCategory, setSelectedCategory] = useState("All");

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

  const onClickCategory = useCallback(
    (cat: string, val: string) => {
      setSelectedCategory(cat);
      getJettonList(val);
    },
    [getJettonList],
  );

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
            <ButtonContainer>
              {categories.map(({ category, value }) =>
                selectedCategory === category ? (
                  <SelectedButton key={category} onClick={() => onClickCategory(category, value)}>
                    {category}
                  </SelectedButton>
                ) : (
                  <UnselectedButton key={category} onClick={() => onClickCategory(category, value)}>
                    {category}
                  </UnselectedButton>
                ),
              )}
            </ButtonContainer>

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

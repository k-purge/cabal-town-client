import { useState, useCallback } from "react";
import { Box, Fade } from "@mui/material";
import { IJetton, useJettonList } from "hooks/useJettonList";
import { SearchBar } from "components/header/headerSearchBar";
import { ListContainer, ScreenHeading } from "./styles";
import { Screen, ScreenContent } from "components/Screen";
import { useNavigatePreserveQuery } from "lib/hooks/useNavigatePreserveQuery";
import { Card } from "./card";

function ExplorerPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [example, setExample] = useState<string | undefined>(undefined);
  const navigate = useNavigatePreserveQuery();
  const { list } = useJettonList();

  const resetExample = useCallback(() => {
    setExample(undefined);
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
              {list.map((item, index) => (
                <Card key={index} item={item} />
              ))}
            </ListContainer>
          </Box>
        </Fade>
      </ScreenContent>
    </Screen>
  );
}

export { ExplorerPage };

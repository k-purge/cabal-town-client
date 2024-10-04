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
import { useTonAddress } from "@tonconnect/ui-react";
import { IJettonProfile } from "store/jetton-store";
import { NoCabalsCard } from "./NoCabalsCard";

function orderProfilesByOwnerAddress(
  targetOwnerAddress: string,
  userProfileList: IJettonProfile[],
): IJettonProfile[] {
  return [...userProfileList].sort((a, b) => {
    const aMatches = a.ownerAddress === targetOwnerAddress ? 1 : 0;
    const bMatches = b.ownerAddress === targetOwnerAddress ? 1 : 0;
    return bMatches - aMatches; // Profiles with matching ownerAddress come first
  });
}

function ProfilePage() {
  const navigate = useNavigatePreserveQuery();
  const ownerAddress = useTonAddress(false);
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

  // Order the list with Owners on top
  const orderedProfileList = userProfileList
    ? orderProfilesByOwnerAddress(ownerAddress, userProfileList)
    : undefined;

  return (
    <Screen>
      <ScreenContent removeBackground>
        <Fade in>
          <Box display="flex" flexDirection="column" gap={2}>
            {ownerAddress === "" ? (
              <EmptyCard />
            ) : orderedProfileList?.length ? (
              orderedProfileList.map((item) => (
                <Card
                  item={item}
                  onClickCard={onClickCard}
                  isOwner={item.ownerAddress === ownerAddress}
                />
              ))
            ) : (
              <NoCabalsCard />
            )}
          </Box>
        </Fade>
      </ScreenContent>
    </Screen>
  );
}

export { ProfilePage };

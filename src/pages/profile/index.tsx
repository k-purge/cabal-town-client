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

function orderProfilesByOwnerAddress(
  targetOwnerAddress: string,
  userProfileList: IJettonProfile[],
) {
  return userProfileList.sort((a, b) => {
    const aMatches = a.ownerAddress === targetOwnerAddress ? 1 : 0;
    const bMatches = b.ownerAddress === targetOwnerAddress ? 1 : 0;
    return bMatches - aMatches; // Profiles with matching ownerAddress come first
  });
}

function ProfilePage() {
  const navigate = useNavigatePreserveQuery();
  // const ownerAddress = useTonAddress();
  const ownerAddress = "0xOwnerAddress";
  // const { userProfileList, getUserProfileList } = useJettonStore();

  // useEffect(() => {
  //   getUserProfileList();
  // }, [getUserProfileList]);

  var userProfileList: IJettonProfile[] = [
    {
      masterAddress: "0x123123213",
      imageUri: "1231313k1j",
      name: "Coin",
      balance: "1000",
      players: [
        {
          name: "1",
        },
        {
          name: "2",
        },
        {
          name: "3",
        },
      ],
      ownerAddress: "0xOwnerAddress",
      id: "10293210931",
    },
    {
      masterAddress: "0x123123213",
      imageUri: "1231313k1j",
      name: "Coing",
      balance: "1000",
      players: [
        {
          name: "1",
        },
        {
          name: "2",
        },
        {
          name: "3",
        },
      ],
      ownerAddress: "0xOwnerAddress123123",
      id: "10293210931",
    },
    {
      masterAddress: "0x123123213",
      imageUri: "1231313k1j",
      name: "MemeCoin",
      balance: "1000",
      players: [
        {
          name: "1",
        },
        {
          name: "2",
        },
        {
          name: "3",
        },
      ],
      ownerAddress: "0xOwnerAddress",
      id: "10293210931",
    },
    {
      masterAddress: "0xqkwjeqkj",
      imageUri: "1231313k1j",
      name: "Coin1",
      balance: "100021",
      players: [
        {
          name: "1",
        },
        {
          name: "2",
        },
        {
          name: "3",
        },
      ],
      ownerAddress: "0xBadAddress",
      id: "10293210931",
    },
  ];

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
  const orderedProfileList = orderProfilesByOwnerAddress(ownerAddress, userProfileList);

  return (
    <Screen>
      <ScreenContent removeBackground>
        <Fade in>
          <Box>
            {orderedProfileList?.length ? (
              orderedProfileList.map((item) => (
                <Card
                  item={item}
                  onClickCard={onClickCard}
                  isOwner={item.ownerAddress === ownerAddress}
                />
              ))
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

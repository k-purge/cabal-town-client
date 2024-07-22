import { useMemo } from "react";
import { StyledBlock, HolderContainer, BoxConainer, BoxText, DotBox } from "./styled";
import { Typography } from "@mui/material";
import { useTonAddress } from "@tonconnect/ui-react";
import useJettonListStore from "store/jetton-list-store/useJettonListStore";
import HolderCard from "./HolderCard";

export const Holder = () => {
  const rawAddress = useTonAddress(false);
  const { selectedJetton } = useJettonListStore();

  const userHolding = useMemo(() => {
    let place = 0;
    const holdings = selectedJetton?.holders.filter((obj, i) => {
      place = i+1;
      return obj.owner.address === rawAddress;
    });

    if (holdings?.length) {
      return {
        place,
        holding: holdings[0],
      };
    }
  }, [selectedJetton]);

  const circulatingSupply = useMemo(() => {
    return selectedJetton?.holders.reduce(
      (balance, holder) => balance + parseInt(holder.balance),
      0,
    );
  }, [selectedJetton]);

  const highestHolders = useMemo(() => selectedJetton?.holders.slice(0, 5), []);
  const lowestHolders = useMemo(() => selectedJetton?.holders.slice(-5), []);

  return (
    <StyledBlock height="100%">
      <BoxConainer>
        <BoxText>HOLDER</BoxText>
      </BoxConainer>

      <HolderContainer>
        {/* Owner */}
        <HolderCard
          isUser={true}
          bgcolor="#FFB800"
          place={userHolding?.place ?? 0}
          address={userHolding?.holding.owner.address}
          balance={parseFloat(userHolding?.holding.balance)}
          circulatingSupply={circulatingSupply}
        />

        {/* Top holders */}
        {highestHolders?.map((holder, index) => {
          if (holder.owner.address !== rawAddress) {
            return (
              <HolderCard
                bgcolor="#fff"
                key={holder.owner.address}
                place={index + 1}
                address={holder.owner.address}
                balance={parseFloat(holder.balance)}
                circulatingSupply={circulatingSupply}
              />
            );
          }
        })}
        <DotBox>...</DotBox>
        <DotBox sx={{ background: "#C50B37" }}>
          <Typography color="#fff">KICK OUT RISK</Typography>
        </DotBox>

        {/* Least holders */}
        {lowestHolders?.map((holder, index) => (
          <HolderCard
            key={holder.owner.address}
            bgcolor="#E9C1CB"
            place={index + 1}
            address={holder.owner.address}
            balance={parseFloat(holder.balance)}
            circulatingSupply={circulatingSupply}
          />
        ))}
      </HolderContainer>
    </StyledBlock>
  );
};

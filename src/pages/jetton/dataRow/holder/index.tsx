import { useMemo } from "react";
import { StyledBlock, HolderContainer, BoxConainer, BoxText, DotBox } from "./styled";
import { Typography } from "@mui/material";
import { useTonAddress } from "@tonconnect/ui-react";
import HolderCard from "./HolderCard";
import useJettonStore from "store/jetton-store/useJettonStore";

export const Holder = () => {
  const rawAddress = useTonAddress(false);
  const { selectedJetton, userBalance } = useJettonStore();

  const userHolding = useMemo(() => {
    if (selectedJetton?.holders) {
      let place = 0;
      for (let i = 0; i < selectedJetton?.holders?.length; i++) {
        const ele = selectedJetton?.holders[i];
        if (ele.owner.address === rawAddress) {
          place = i + 1;
          continue;
        }
      }

      if (userBalance) {
        return {
          place,
          holding: userBalance,
        };
      }
    }
  }, [rawAddress, selectedJetton?.holders, userBalance]);

  const circulatingSupply = useMemo(() => {
    return (
      selectedJetton?.holders?.reduce((balance, holder) => balance + parseInt(holder.balance), 0) ??
      0
    );
  }, [selectedJetton]);

  const highestHolders = useMemo(
    () => selectedJetton?.holders?.slice(0, 5),
    [selectedJetton?.holders],
  );
  const lowestHolders = useMemo(
    () => selectedJetton?.holders?.slice(-5),
    [selectedJetton?.holders],
  );

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
          address={rawAddress}
          balance={userHolding?.holding ?? 0}
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
          return <></>;
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

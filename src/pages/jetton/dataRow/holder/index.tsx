import { useMemo } from "react";
import { StyledBlock, HolderContainer, BoxConainer, BoxText, DotBox } from "./styled";
import { Typography } from "@mui/material";
import { useTonAddress } from "@tonconnect/ui-react";
import HolderCard from "./HolderCard";
import useJettonStore from "store/jetton-store/useJettonStore";

export const Holder = () => {
  const rawAddress = useTonAddress(false);
  const { holders, userBalance } = useJettonStore();

  const userHolding = useMemo(() => {
    if (holders) {
      let place = 0;
      for (let i = 0; i < holders.length; i++) {
        const ele = holders[i];
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
  }, [rawAddress, holders, userBalance]);

  const circulatingSupply = useMemo(() => {
    if (holders) {
      return holders.reduce((balance, holder) => balance + parseInt(holder.balance), 0) ?? 0;
    }
  }, [holders]);

  const highestHolders = useMemo(() => holders?.slice(0, 5), [holders]);
  const lowestHolders = useMemo(() => holders?.slice(-5), [holders]);

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

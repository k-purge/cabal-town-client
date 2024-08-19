import BN from "bn.js";
import { Cell, beginCell, Address, toNano } from "ton";
import { OPS } from "./utils";

export interface IUserDeposit {
  userDeposit: number;
  unclaimedReward: number;
  startedTimestamp: number;
  lastUpdatedTimestamp: number;
}

export function readStakingDetail(contentCell: Cell | null): IUserDeposit | undefined {
  try {
    if (contentCell) {
      const contentSlice = contentCell.beginParse();

      const userDeposit = contentSlice.readCoins().toNumber();
      const unclaimedReward = contentSlice.readCoins().toNumber();
      const startedTimestamp = contentSlice.readUint(32).toNumber();
      const lastUpdatedTimestamp = contentSlice.readUint(32).toNumber();

      return {
        userDeposit,
        unclaimedReward,
        startedTimestamp,
        lastUpdatedTimestamp,
      };
    }
  } catch (error) {
    console.log(error);
  }
}

export function lockJetton(jettonAmount: BN, stakingAddress: Address, userAddress: Address) {
  const timestampNow = Math.floor(Date.now() / 1000);

  const stakingCell = beginCell()
    .storeUint(OPS.LockJetton, 32)
    .storeUint(1, 64)
    .storeAddress(userAddress) // user_address
    .storeAddress(stakingAddress) // staking address
    .storeCoins(jettonAmount) // locked amt
    .storeUint(timestampNow, 32) // time_now
    .storeAddress(userAddress) // response_address
    .storeCoins(toNano(0.001))
    .storeBit(false) // forward_payload in this slice, not separate cell
    .endCell();

  return beginCell()
    .storeUint(OPS.Transfer, 32)
    .storeUint(1, 64)
    .storeCoins(jettonAmount)
    .storeAddress(stakingAddress)
    .storeAddress(userAddress)
    .storeBit(false)
    .storeCoins(toNano(0.001))
    .storeRefMaybe(stakingCell)
    .storeBit(false) // forward_payload in this slice, not separate cell
    .endCell();
}

export function unlockJetton(jettonAmount: BN) {
  const timestampNow = Math.floor(Date.now() / 1000);

  const transferCell = beginCell()
    .storeUint(OPS.UnlockJetton, 32)
    .storeUint(1, 64)
    .storeCoins(toNano(0.001))
    .storeBit(false) // forward_payload in this slice, not separate cell
    .endCell();

  return beginCell()
    .storeUint(OPS.PoolUnlockJetton, 32)
    .storeUint(1, 64)
    .storeCoins(jettonAmount)
    .storeUint(timestampNow, 32) // time_now
    .storeRefMaybe(transferCell)
    .storeBit(false) // forward_payload in this slice, not separate cell
    .endCell();
}

export function claimReward() {
  const timestampNow = Math.floor(Date.now() / 1000);

  return beginCell()
    .storeUint(OPS.ClaimTon, 32)
    .storeUint(1, 64)
    .storeUint(timestampNow, 32) // time_now
    .endCell();
}

export function changeAdminBody(newAdmin: Address): Cell {
  return beginCell()
    .storeUint(OPS.ChangeAdmin, 32)
    .storeUint(0, 64) // queryid
    .storeAddress(newAdmin)
    .endCell();
}

export function updateMetadataBody(metadata: Cell): Cell {
  return beginCell()
    .storeUint(OPS.ReplaceMetadata, 32)
    .storeUint(0, 64) // queryid
    .storeRef(metadata)
    .endCell();
}

export function bouncedBody(): Cell {
  return beginCell()
    .storeUint(OPS.Bounced, 32)
    .storeUint(0, 64) // queryid
    .storeRef(
      // internal transfer message
      beginCell().endCell(),
    )
    .endCell();
}

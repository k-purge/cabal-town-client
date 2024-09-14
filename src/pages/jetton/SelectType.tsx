import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { StyledSelectBox, StyledMenuItem } from "./styled";

export default function SelectType({ type, handleChange }: { type: string; handleChange: any }) {
  return (
    <StyledSelectBox>
      <FormControl fullWidth>
        <Select
          labelId="purge.select-label"
          id="purge.select"
          value={type}
          onChange={handleChange}
          MenuProps={{
            MenuListProps: { disablePadding: true },
          }}
          sx={{
            borderRadius: "0px",
            border: "2px solid #FFB800",
            fontFamily: "'Bungee', sans-serif",
            fontSize: "14px",
            fontWeight: "400",
            lineHeight: "16.8px",
            letterSpacing: "0.04em",
            background: "#000",
            textAlign: "left",
            color: "#FFF",
            width: "100%",
            height: "48px",
            svg: {
              color: "#FFB800",
            },

            // Remove the default outline
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
          }}>
          <StyledMenuItem divider value={"BUY_AND_SELL"}>
            BUY AND SELL
          </StyledMenuItem>
          {/* <StyledMenuItem divider value={"LOCK_AND_CLAIM"}>
            LOCK AND CLAIM
          </StyledMenuItem> */}
          <StyledMenuItem divider value={"HOLDER_DISTRIBUTION"}>
            HOLDER DISTRIBUTION
          </StyledMenuItem>
          <StyledMenuItem divider value={"TRANSACTION_HISTORY"}>
            TRANSACTION HISTORY
          </StyledMenuItem>
          <StyledMenuItem divider value={"STATISTIC"}>
            STATISTIC (7 DAYS)
          </StyledMenuItem>
        </Select>
      </FormControl>
    </StyledSelectBox>
  );
}

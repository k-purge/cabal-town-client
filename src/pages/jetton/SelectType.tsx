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
          <StyledMenuItem value={"1"}>BUY AND SELL</StyledMenuItem>
          {/* <MenuItem value={"2"}>LOCK AND CLAIM</MenuItem> */}
          <StyledMenuItem value={"3"}>HOLDER DISTRIBUTION</StyledMenuItem>
          <StyledMenuItem value={"4"}>TRANSACTION HISTORY</StyledMenuItem>
        </Select>
      </FormControl>
    </StyledSelectBox>
  );
}

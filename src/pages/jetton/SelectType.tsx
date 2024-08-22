import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { StyledSelectBox } from "./styled";

export default function SelectType({ type, handleChange }: { type: string; handleChange: any }) {
  return (
    <StyledSelectBox>
      <FormControl fullWidth>
        <Select
          labelId="purge.select-label"
          id="purge.select"
          value={type}
          onChange={handleChange}
          sx={{
            background: "#ffff",
            textAlign: "left",
            color: "#606060",
            width: "100%",
            height: "48px",
            svg: {
              color: "#000",
            },
          }}>
          <MenuItem value={"1"}>BUY/SELL</MenuItem>
          {/* <MenuItem value={"2"}>LOCK AND CLAIM</MenuItem> */}
          <MenuItem value={"3"}>HOLDER DISTRIBUTION</MenuItem>
          <MenuItem value={"4"}>TRANSACTION HISTORY</MenuItem>
        </Select>
      </FormControl>
    </StyledSelectBox>
  );
}

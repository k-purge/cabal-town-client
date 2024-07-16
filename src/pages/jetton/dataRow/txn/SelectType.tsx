import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

export default function SelectType() {
  const [type, setType] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setType(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <Select
          labelId="purge.select-label"
          id="purge.select"
          value={type}
          label="Type"
          onChange={handleChange}
          defaultValue={"1"}
          sx={{
            "input.MuiSelect-select": {
              color: "#fff",
            },
          }}>
          <MenuItem value={"1"}>BUY/SELL</MenuItem>
          <MenuItem value={"2"}>HOLDER DISTRIBUTION</MenuItem>
          <MenuItem value={"3"}>TRANSACTION HISTORY</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

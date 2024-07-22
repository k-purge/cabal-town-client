import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export default function ColorToggleButton({
  tradeType,
  handleChangeType,
}: {
  tradeType: string;
  handleChangeType: any;
}) {
  return (
    <ToggleButtonGroup
      color="primary"
      value={tradeType}
      exclusive
      onChange={handleChangeType}
      aria-label="buy/sell"
      sx={{
        marginBlock: "24px",
        width: "341px",
        height: "56px",
        backgroundColor: "#5E5C55",
        borderRadius: "8px",
        fontSize: "16px",
        color: "#fff",
        button: {
          fontFamily: "Bungee, Sans-serif",
          width: "50%",
        },
        ".Mui-selected": {
          backgroundColor: "#FFB800 !important",
          color: "#000 !important",
          borderRadius: "8px",
          margin: "5px 3px",
        },
      }}>
      <ToggleButton value="buy">BUY</ToggleButton>
      <ToggleButton value="sell">SELL</ToggleButton>
    </ToggleButtonGroup>
  );
}

import { Box, Switch } from "@mui/material";
import { useState } from "react";

function Header() {
  const [ isDarkModeEnabled, enableDarkMode ] = useState(false)

  return (
    <Box
      display={"flex"}
      justifyContent="space-between"
      className="bg-gray-200"
      px={"15px"}
    >
      <Box>
        <h1 className="text-center py-4 text-xl font-semibold">
          Weavy URL Preview Post Feed{" "}
        </h1>
      </Box>

      <Box display={"flex"} alignItems="center">
        <Switch
          checked={isDarkModeEnabled}
          onChange={() => enableDarkMode(!isDarkModeEnabled)}
          inputProps={{ "aria-label": "controlled" }}
        />
      </Box>
    </Box>
  );
}

export default Header;

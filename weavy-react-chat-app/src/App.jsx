import { ThemeProvider } from "@mui/material";
import Home from "./pages/home";
import { theme } from "./utils/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Home />
    </ThemeProvider>
  );
}

export default App;

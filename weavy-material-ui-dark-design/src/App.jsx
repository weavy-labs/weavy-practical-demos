import React from "react";
import {ThemeProvider} from "@mui/material";
import {grey} from "@mui/material/colors"

import Home from "./pages/home";
import {AppContext} from "./state/app-context.jsx";
import {createTheme} from "@mui/material";

function App() {
    const {displayMode} = React.useContext(AppContext)

    const theme = React.useMemo(() => createTheme({
        palette: {
            mode: displayMode,
            ...(
                displayMode === "light" ? {
                    primary: {
                        main: "#f3f4f6"
                    },
                    text: {
                        primary: "#000",
                    },
                    custom: {
                        main: grey[400],
                    },
                    surface: {
                        main: "#e5e7eb"
                    }
                } : {
                    primary: {
                        main: "#DDD",
                    },
                    text: {
                        primary: "rgba(255, 255, 255, 0.87)",
                    },
                    custom: {
                        main: '#FFFFFF1F',
                    },
                    surface: {
                        main: "#202020"
                    }
                }
            )
        }
    }), [displayMode])

    return (
        <ThemeProvider theme={theme}>
            <Home/>
        </ThemeProvider>
    );
}

export default App;

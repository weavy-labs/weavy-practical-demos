import {Box, Switch, Typography} from "@mui/material";
import React from "react";
import {AppContext} from "../state/app-context.jsx";
import {makeStyles, useTheme} from "@mui/styles";
import {FiMoon, FiSun} from 'react-icons/fi'

const useStyles = makeStyles((theme) => ({
    headerCtn: {
        height: "75px",
        display: "flex",
        placeItems: "center",
        alignItems: "center",
        justifyContent: "center",
        background: "#fff"
    },
    title: {
    },
}))

function Header() {
    const {displayMode, toggleDisplayMode} = React.useContext(AppContext)
    const classes = useStyles()
    const theme = useTheme()

    return (
        <Box
            className={classes.headerCtn}
        >
            <Box
                display={"flex"}
                justifyContent="space-between"
                px={"15px"}
                width={"100%"}
            >
                <Box>
                    <Typography
                        variant={"h1"}
                        fontSize={"26px"}
                        className={classes.title}
                    >
                        Weavy Chat
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}

export default Header;

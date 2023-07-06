import React, {useContext} from "react";
import {BsSend} from "react-icons/bs";
import PostCard from "../components/PostCard";
import {Box} from "@mui/material";
import {makeStyles,} from "@mui/styles";
import Header from "../components/Header";
import {AppContext} from "../state/app-context.jsx";

const useStyles = makeStyles((theme) => ({
    messagesContainer: {
        height: "calc(100vh - 170px)",
        overflow: "auto",
    },
    container: {
        maxWidth: "650px",
        margin: "auto",
    },
    messageWindow: {
        background: theme.palette.custom.main,
        padding: "0 12px"
    },
    messageInput: {
        width: "100%",
        padding: "12px",
        background: theme.palette.surface.main,
        color: theme.palette.text.primary,
        outline: 0,
    },
    inputContainer: {
        background: theme.palette.surface.main,
    },
    sendIcon: {
        margin: "0 12px",
        fontSize: "34px",
        color: theme.palette.text.primary,
        placeItems: "center",

        "&:hover": {
            cursor: "pointer"
        }
    },
    formContainer: {
        height: "60px",
        width: "100%",
        display: "flex",
        border: `1px solid ${theme.palette.text.primary}`,
        marginBottom: "30px"
    }
}));

function Home() {
    const {retrievedChats, submitChatMessage, chatMessageText, actionDispatcher} = useContext(AppContext)

    const classes = useStyles();

    return (
        <Box
            height={"100vh"}
            display={"flex"}
            width={"100%"}
            sx={{
                bgcolor: "background.default",
            }}
            className={classes.page}
            justifyContent={"center"}
        >
            <Box
                height={"100%"}
                width={"100%"}
                className={classes.container}
            >
                <Header/>

                <Box className={classes.messageWindow}>
                    <Box className={classes.messagesContainer}>
                        {retrievedChats && (
                            <ul>
                                {retrievedChats.map(({text, id, embed, created_at, created_by}) => (
                                    <li className="my-8" key={id}>
                                        <PostCard {...{text, embed, created_at, created_by}} />
                                    </li>
                                ))}
                            </ul>
                        )}
                    </Box>

                    <br/>
                    <form className={classes.formContainer}>
                        <Box display={"flex"} alignItems={"center"} width={"100%"} className={classes.inputContainer}>
                            <input
                                value={chatMessageText}
                                onChange={(e) => actionDispatcher(
                                    "HANDLE_CHAT_MESSAGE",
                                    {text: e.target.value}
                                )}
                                placeholder="Enter A Message"
                                className={classes.messageInput}
                            />
                        </Box>

                        <Box
                            display={"flex"}
                            onClick={() => submitChatMessage(chatMessageText)}
                            className={classes.sendIcon}
                        >
                            <BsSend/>
                        </Box>
                    </form>
                </Box>
            </Box>
        </Box>
    );
}

export default Home;

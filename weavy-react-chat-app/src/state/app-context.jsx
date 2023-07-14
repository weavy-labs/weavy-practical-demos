import React, {useEffect, useReducer} from "react";
import {ApiClient} from "../api.js";
import {extractUrlFromText} from "../utils/helpers.js";

const APP_ID = import.meta.env.VITE_APP_ID;

const initialState = {
    chatMessageText: "",

    submitChatMessage: async () => {
    },
    actionDispatcher: () => {
    },
    retrievedChats: []
}

const fetchChats = async () => {
    const postData = await ApiClient({endpoint: `/apps/${APP_ID}/messages`});

    return postData?.data
}


export const AppContext = React.createContext(initialState)

export const reducer = (state, action) => {
    const {payload} = action;

    switch (action.type) {
        case "HANDLE_CHAT_MESSAGE":
            return {
                ...state,
                chatMessageText: payload.text,
            };

        case "HANDLE_CHATS":
            return {
                ...state,
                retrievedChats: payload.chats,
            };
        default:
            return state;
    }
};

export const AppProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const actionDispatcher = (type, payload) => {
        if (!type || !payload) console.error("ACTION DISPATCHER ERROR")

        dispatch({
            type,
            payload,
        });
    }

    useEffect(() => {
        (async () => {
            const chats = await fetchChats()

            if (Array.isArray(chats)) {
                actionDispatcher("HANDLE_CHATS", { chats });
            }
        })();
    }, []);

    const submitChatMessage = async (message) => {
        const extractedUrl = extractUrlFromText(message);
        let embedId = null;

        if (extractedUrl) {
            const createEmbedData = await ApiClient({
                endpoint: `/embeds`,
                method: "POST",
                body: {
                    url: extractedUrl[0],
                },
            });

            embedId = createEmbedData?.id;
        }

        const createPostData = await ApiClient({
            endpoint: `/apps/${APP_ID}/messages`,
            method: "POST",
            body: {
                text: message,
                embed_id: embedId,
            },
        });

        if (!createPostData.created_at) {
            console.error("Unable to submit message:", createPostData.detail)

            return
        }

        actionDispatcher(
            "HANDLE_CHATS",
            {
                chats: [...state.retrievedChats, createPostData]
            },
        );

        actionDispatcher("HANDLE_CHAT_MESSAGE", {text: ""})
    };

    return (
        <AppContext.Provider
            value={{
                ...state,
                submitChatMessage,
                actionDispatcher
            }}>
            {children}
        </AppContext.Provider>
    )
}
import React from "react";
import {AiOutlineLink} from "react-icons/ai";
import {Box, Typography} from "@mui/material";
import {makeStyles} from "@mui/styles";
import {truncateText} from "../utils/helpers.js";

const useStyles = makeStyles((theme) => ({
    title: {
        fontSize: "18px"
    },
    card: {
        margin: "34px 8px 0 8px",
        background: theme.palette.background.default,
        borderRadius: "8px"
    },
    text: {
        color: theme.palette.text.primary
    },
    previewContainer: {
        background: theme.palette.surface.main,
    },
    image: {
        width: "150px",
        height: "100px",
        objectFit: "cover"
    }
}))

const PostCard = ({text, embed, created_at, created_by}) => {
    const classes = useStyles()

    return (
        <Box className={classes.card}>
            {embed && (
                <Box display={"flex"} flexDirection={"row"} className={classes.previewContainer}>
                    {embed?.image && (
                        <img
                            className={classes.image}
                            src={embed.thumbnail_url}
                            alt={embed.title}
                        />
                    )}

                    <Box display={"flex"} ml={1} py={1} alignItems={"center"}>
                        <Box>
                            <Typography fontSize={"18px"} className={classes.text}>
                                <a target={"_blank"} rel="no-opener" href={embed.original_url}>
                                    {embed.title}
                                </a>
                            </Typography>

                            <Typography className={classes.text}> {truncateText(embed.description, 10)}... </Typography>
                        </Box>
                    </Box>

                    <Box fontSize={"24px"} mr={1} mt={1}>
                        <Box className={classes.text}>
                            <AiOutlineLink/>
                        </Box>
                    </Box>
                </Box>
            )}

            <Box className="px-2 py-4">
                <Typography fontSize={"20px"} mb={"8px"} className={classes.text}>{text}</Typography>

                <Typography style={{opacity: .8}} className={classes.text}>
                    Posted By <b> {created_by.display_name} </b> On{" "}
                    <b>{new Date(created_at).toLocaleDateString()} </b>
                </Typography>
            </Box>
        </Box>
    )
};

export default PostCard;

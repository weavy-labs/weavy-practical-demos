import React from "react";
import { AiOutlineLink } from "react-icons/ai";
import { Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

const truncateText = (text, length) =>
  text.split(" ").slice(0, length).join(" ");

const useStyles = makeStyles({
  title: {
    fontSize: "18px"
  }
})

const PostCard = ({ text, embed, created_at, created_by }) => {
  const classes = useStyles()

  return (
  <Box className="rounded overflow-hidden shadow-lg mt-4 bg-white ">
    {embed && (
      <Box className="flex row bg-gray-100">
        {embed?.image && (
          <img
            className="w-[150px] h-[100px] object-cover"
            src={embed.thumbnail_url}
            alt={embed.title}
          />
        )}

        <Box className="ml-4 flex items-center py-1">
          <Box>
            <a target={"_blank"} rel="no-opener" href={embed.original_url}>
              <Typography className="font-semibold"> {embed.title} </Typography>
            </a>

            <Typography> {truncateText(embed.description, 10)}... </Typography>
          </Box>
        </Box>

        <Box className="ml-2 mr-2 mt-1 text-2xl">
          <AiOutlineLink />
        </Box>
      </Box>
    )}

    <Box className="px-2 py-4">
      <Typography className="text-xl mb-4  font-semibold ">{text}</Typography>

      <Typography className="text-gray-500 mb-2">
        Posted By <b> {created_by.display_name} </b> On{" "}
        <b>{new Date(created_at).toLocaleDateString()} </b>
      </Typography>
    </Box>
  </Box>
)};

export default PostCard;

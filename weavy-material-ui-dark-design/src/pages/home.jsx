import { useState } from "react";
import { BsSend } from "react-icons/bs";
import { useEffect } from "react";
import { ApiClient } from "../api";
import PostCard from "../components/PostCard";
import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Header from "../components/Header";

const APP_ID = import.meta.env.VITE_APP_ID;
const extractUrlFromText = (text) => text.match(/(https?:\/\/[^ ]*)/);

const useStyles = makeStyles({
  messagesContainer: {
    height: "calc(100vh - 150px)",
    overflow: "auto",
  },
});

function Home() {
  const [post, setAvailablePosts] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    (async () => {
      const postData = await ApiClient({ endpoint: `/apps/${APP_ID}/messages` });

      setAvailablePosts(postData?.data);
    })();
  }, []);

  const handleSubmit = async () => {
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

    setAvailablePosts([...post, createPostData]);
    setMessage("");
  };

  const classes = useStyles();

  return (
    <Box
      style={{ height: "100vh" }}
      className="flex w-full bg-gray-100 h-full justify-center"
    >
      <Box className="max-w-[650px] shadow m-auto h-full bg-[white] w-full ">
        <Header />

        <Box className="px-6">
          <Box className={classes.messagesContainer}>
            {post && (
              <ul>
                {post.map(({ text, id, embed, created_at, created_by }) => (
                  <li className="my-8" key={id}>
                    <PostCard {...{ text, embed, created_at, created_by }} />
                  </li>
                ))}
              </ul>
            )}
          </Box>

          <br />
          <form className="border h-[60px] w-full flex">
            <Box className="w-full bg-gray-100 flex items-center">
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter A Message"
                className="p-4 w-full"
              />
            </Box>

            <Box
              onClick={() => handleSubmit()}
              className="flex mx-4 text-3xl items-center cursor-pointer"
            >
              <BsSend />
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  );
}

export default Home;

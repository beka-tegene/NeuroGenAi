import { FileCopy, Mic, Send } from "@mui/icons-material";
import {
  Card,
  IconButton,
  ImageListItem,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useState } from "react";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";
import axios from "axios";
import parse from "html-react-parser";
import logo from "../../Image/image 14.png";
const Chat = () => {
  const [userMessages, setUserMessages] = useState([]);
  const [question, setQuestion] = useState("");
  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      setQuestion(event.target.value);
      submitHandler(event);
    }
  };

  function handleCopyMessage(message) {
    navigator.clipboard
      .writeText(message)
      .then(function () {
        console.log(message);
      })
      .catch(function (err) {
        console.error(err);
      });
  }
  const handleMicClick = async () => {
    const recognition =
      new window.webkitSpeechRecognition() || new window.SpeechRecognition();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setQuestion(transcript);
    };

    recognition.start();
  };
  function formatText(text) {
    // Replace **...** with <strong>...</strong>
    text = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

    // Replace *...* with <li>...</li>
    text = text.replace(/\* (.*?)\n/g, `<li>$1</li>`);

    return text;
  }
  const submitHandler = async (e) => {
    e.preventDefault();
    const newUserMessages = [...userMessages];
    newUserMessages.push({ message: question, isQuestion: true }); // Store the question as an object with a flag
    setUserMessages(newUserMessages);
    const token = Cookies.get("token");
    const decodedToken = jwt_decode(token);
    console.log(decodedToken);
    const userId = decodedToken.userId;

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/medical/medical-chat",
        {
          question: question,
          userId,
        }
      );

      const responseData = response.data.response;

      newUserMessages.push({
        message: formatText(responseData),
        isQuestion: false,
      });

      setUserMessages(newUserMessages);

      // Scroll to the bottom of the chat after adding a new message
      const chatContainer = document.getElementById("chat-container");
      chatContainer.scrollTop = chatContainer.scrollHeight;
    } catch (error) {
      console.error("Request Error:", error);
    }

    setQuestion("");
  };

  const isMobile = useMediaQuery("(max-width: 770px)");
  const isTablet = useMediaQuery("(max-width: 430px)");
  return (
    <Stack
      sx={{ width: isTablet ? "100%" : isMobile ? "100%" : "84%" }}
    >
      <Stack
        sx={{ background: "#192655", height: "10dvh" }}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Typography color={"#FFFFFF"} fontSize={"24px"} fontWeight={"bold"}>
          Chat Bot
        </Typography>
      </Stack>
      <Stack
        sx={{
          height: "80vh",
          overflowY: "scroll",
          overflowX: "hidden",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
        gap={2}
        alignItems={"center"}
      >
        {userMessages.map((message, index) => (
          <Stack
            sx={{
              width: "100%",
              p: 1,
              backgroundColor: message.isQuestion ? "#FFFFFF" : "#DFF2F4", // Conditionally set the background color
            }}
            alignItems={"center"}
            key={index}
          >
            <Stack
              direction={"row"}
              gap={2}
              alignItems={"flex-start"}
              justifyContent="flex-start"
              sx={{
                width: isMobile ? "100%": "80%",
              }}
            >
              <Card
                sx={{
                  p: 1,
                  borderRadius: 2,
                  backgroundColor: message.isQuestion ? "#FFFFFF" : "#DFF2F4",
                  color: "#272727",
                  boxShadow: 0,
                  position: "relative",
                  width: "100%",
                }}
              >
                <Stack
                  direction={"row"}
                  alignItems={"flex-start"}
                  justifyContent={"flex-start"}
                  gap={2}
                  sx={{ pt: 2 }}
                >
                  {!message.isQuestion && (
                    <ImageListItem
                      sx={{
                        maxWidth: isMobile ? "25px" : "50px",
                        minWidth: isMobile ? "25px" : "50px",
                        maxHeight: isMobile ? "25px" : "50px",
                        minHeight: isMobile ? "25px" : "50px",
                        borderRadius: "50%",
                        border: "0.5px solid #16C2D5",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        src={logo}
                        alt="logo"
                        style={{ borderRadius: "50%" }}
                      />
                    </ImageListItem>
                  )}
                  <Typography sx={{ width: "95%" }}>
                    {parse(message.message)}
                  </Typography>
                </Stack>
                {!message.isQuestion && (
                  <IconButton
                    sx={{
                      position: "absolute",
                      top: "0",
                      right: "0",
                    }}
                    onClick={() => handleCopyMessage(message.message)}
                  >
                    <FileCopy />
                  </IconButton>
                )}
              </Card>
            </Stack>
          </Stack>
        ))}
      </Stack>
      <Paper
        component="form"
        sx={{
          position: "fixed",
          display: "flex",
          flexDirection: "row",
          width: isMobile ? "100%" : "50%",
          bottom: "10px",
          left: "60%",
          transform: "translateX(-50%)",
          gap: 2,
          padding: 1,
        }}
        onSubmit={submitHandler}
      >
        <textarea
          rows={1}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          style={{
            padding: "0.5rem 1rem",
            fontSize: "15px",
            outline: "none",
            border: "none",
            borderRadius: 4,
            resize: "none",
            width: "80%",
          }}
          onKeyPress={handleKeyPress}
          placeholder="Type Something..."
        />
        <IconButton onClick={handleMicClick}>
          <Mic />
        </IconButton>
        <IconButton type="submit">
          <Send />
        </IconButton>
      </Paper>
    </Stack>
  );
};

export default Chat;

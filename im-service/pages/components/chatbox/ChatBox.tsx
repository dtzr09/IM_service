import styles from "./_chatbox.module.scss";
import { BsFillCaretRightFill } from "react-icons/bs";
import { ConversationBox } from "../conversationbox/ConversationBox";
import { useRef, useEffect, useState } from "react";

export const ChatBox = () => {
  const [response, setResponse] = useState(null);
  const [message, setMessage] = useState<string>("");
  const [allMessage, setAllMessage] = useState<any>();
  const [user, setUser] = useState("john");
  const [limit, setLimit] = useState(0);

  const chatBoxRef = useRef<HTMLDivElement | null>(null);
  const sendMsgRef = useRef<HTMLDivElement | null>(null);

  const scrollToLatest = () => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  useEffect(() => {
    scrollToLatest();
  }, [chatBoxRef, allMessage]);

  const sendMsgReq = async () => {
    try {
      const requestBody = {
        chat: "john:doe",
        text: message,
        sender: user,
      };
      const response = await fetch("/api/send", {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const responseData = await response.json();
      setResponse(responseData);
      setUser(user == "john" ? "doe" : "john");
      setMessage("");
    } catch (error) {
      console.error("Error making POST request:", error);
    }
  };

  const pullMsgReq = async () => {
    try {
      const requestParams = {
        chat: "john:doe",
        cursor: "0",
        limit: String(limit),
        reverse: "false",
      };

      const queryParams = new URLSearchParams(requestParams).toString();

      const response = await fetch(
        `http://localhost:8080/api/pull/messages?${queryParams}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      setAllMessage(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (sendMsgRef.current && sendMsgRef.current.id == "enterButton")
      setLimit(limit + 1);
    pullMsgReq();
  }, [user]);

  const handleOnKeyDown = (event: any) => {
    if (
      event.keyCode === 13 &&
      sendMsgRef.current &&
      sendMsgRef.current.id == "enterButton"
    ) {
      event.preventDefault();
      sendMsgRef.current.click();
    }
  };

  return (
    <div className={styles.wrapperBox}>
      <div className={styles.chatBox}>
        <div className={styles.containerBox}>
          {allMessage &&
            allMessage?.messages?.map((message: any, index: number) => {
              return (
                <div
                  key={index}
                  ref={
                    index === allMessage.messages.length - 1 ? chatBoxRef : null
                  }
                >
                  <ConversationBox
                    from={message.sender}
                    inputValue={message.text}
                  />
                </div>
              );
            })}
        </div>
        <div className={styles.inputBox} onKeyDown={handleOnKeyDown}>
          <input
            type="text"
            placeholder=""
            onChange={(e: any) => setMessage(e.target.value)}
            value={message}
          />
          <div
            id="enterButton"
            className={styles.iconBox}
            ref={sendMsgRef}
            onClick={() => {
              sendMsgReq();
            }}
          >
            <BsFillCaretRightFill size={"30px"} />
          </div>
        </div>
      </div>
    </div>
  );
};

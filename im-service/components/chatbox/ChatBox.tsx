import styles from "./_chatbox.module.scss";
import { BsFillCaretRightFill } from "react-icons/bs";
import { ConversationBox } from "../conversationbox/ConversationBox";
import { useRef, useEffect, useState } from "react";
import { pullMsgReq, sendMsgReq } from "../functions/http_request";

type ChatBoxProps = {
  user: string;
};

export const ChatBox = (props: ChatBoxProps) => {
  const { user } = props;
  const [message, setMessage] = useState<string>("");
  const [allMessage, setAllMessage] = useState<any>();
  const [limit, setLimit] = useState<number>(50);
  const [hasMore, setHasMore] = useState<boolean>(false);

  const chatBoxRef = useRef<HTMLDivElement | null>(null);
  const sendMsgRef = useRef<HTMLDivElement | null>(null);

  const scrollToLatest = () => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToLatest();
  }, [allMessage, message, sendMsgRef]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await pullMsgReq({ limit });
      if (data) {
        setHasMore(data.has_more);
        setAllMessage(data.messages);
      }
    };

    const interval = setInterval(fetchData, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleSendMsg = async () => {
    const responseData = await sendMsgReq({ message, user });
    setMessage("");
  };

  const handleOnKeyDown = (event: any) => {
    if (
      event.keyCode === 13 &&
      sendMsgRef.current &&
      sendMsgRef.current.id == "enterButton"
    ) {
      if (hasMore) {
        const newLimit = limit + 1;
        setLimit(newLimit);
      }
      event.preventDefault();
      sendMsgRef.current.click();
    }
  };

  return (
    <div className={styles.wrapperBox}>
      <div className={styles.chatBox}>
        <div className={styles.containerBox}>
          {allMessage &&
            allMessage.map((message: any, index: number) => {
              return (
                <div
                  key={index}
                  ref={index === allMessage.length - 1 ? chatBoxRef : null}
                  style={{
                    position: "relative",
                  }}
                >
                  <ConversationBox
                    user={user}
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
            placeholder="Press Enter to send message"
            onChange={(e: any) => setMessage(e.target.value)}
            value={message}
          />
          <div
            id="enterButton"
            className={styles.iconBox}
            ref={sendMsgRef}
            onClick={() => {
              handleSendMsg();
            }}
          >
            <BsFillCaretRightFill size={"30px"} />
          </div>
        </div>
      </div>
    </div>
  );
};

import { SiProbot } from "react-icons/si";
import { IoAccessibilityOutline } from "react-icons/io5";
import styles from "./_conversationBox.module.scss";
import { useEffect, useState } from "react";

interface ConvoBoxProps {
  user: string;
  from: string;
  inputValue: string;
}

export const ConversationBox = (props: ConvoBoxProps) => {
  const { from, inputValue, user } = props;
  const [message, setMessage] = useState(inputValue || "");

  useEffect(() => {
    const truncatedMessage =
      message.length > 250 ? message.slice(0, 250) + "..." : message;
    setMessage(truncatedMessage);
  }, [message]);

  return (
    <>
      {from == user ? (
        <div className={styles.leftContainer}>
          <div className={styles.convoContainer}>
            <div className={styles.inputValue}>
              <div>{message}</div>
            </div>
            <div>
              {from == "Doe" ? (
                <SiProbot size={"25px"} />
              ) : (
                <IoAccessibilityOutline size={"25px"} />
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.rightContainer}>
          <div className={styles.convoContainer}>
            <div>
              {from == "Doe" ? (
                <SiProbot size={"25px"} />
              ) : (
                <IoAccessibilityOutline size={"25px"} />
              )}
            </div>
            <div className={styles.inputValue}>
              <div>{message}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

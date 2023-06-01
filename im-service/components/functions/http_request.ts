type sendMsgProps = {
  message: string;
  user: string;
};

type pullMsgProps = {
  limit: number;
};

export const sendMsgReq = async (props: sendMsgProps) => {
  const { message, user } = props;
  try {
    const requestBody = {
      chat: "john:doe",
      text: message,
      sender: user,
    };
    const response = await fetch("http://localhost:8080/api/send", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error making POST request:", error);
  }
};

export const pullMsgReq = async (props: pullMsgProps) => {
  const { limit } = props;
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
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

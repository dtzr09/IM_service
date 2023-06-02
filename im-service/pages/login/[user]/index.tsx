import { useRouter } from "next/router";
import { ChatBox } from "../../../components/chatbox/ChatBox";
import NavBar from "../../../components/navbar/NavBar";

const UserPage = () => {
  const { query } = useRouter();
  const user = (query.user as string) || "";
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <NavBar />
      {user != "" ? <ChatBox user={user} /> : <div> 404 NOT FOUND</div>}
    </div>
  );
};

export default UserPage;

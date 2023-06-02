import { useRouter } from "next/router";
import styles from "./navbar.module.scss";
const NavBar = () => {
  const router = useRouter();
  const user = (router.query.user as string) || "";

  const handleLogout = () => {
    router.push("/");
  };
  return (
    <div className={styles.container}>
      <div>Logged in as {user}</div>
      <button type="submit" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default NavBar;

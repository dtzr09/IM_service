import { useRouter } from "next/router";
import styles from "./login.module.scss";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const LoginPage = () => {
  const router = useRouter();
  const [selecteduser, setSelectedUser] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = () => {
    if (selecteduser == "") {
      toast.error("Please select at least one of the avatar.");
      return;
    }
    if (password == "") {
      toast.error("Please input any password.");
      return;
    }
    router.push(`/login/${selecteduser}`);
  };

  const users = ["John", "Doe"];

  return (
    <div className={styles.wrapper}>
      <div className={styles.loginContainer}>
        <div className={styles.header}>
          <div className={styles.headerText}>Choose your avatar</div>
          <div className={styles.avatar}>
            {users.map((user, index) => {
              return (
                <div
                  key={index}
                  onClick={() => setSelectedUser(user)}
                  className={
                    user === selecteduser ? styles.selectedUser : styles.user
                  }
                >
                  {user}
                </div>
              );
            })}
          </div>
        </div>
        <div className={styles.password}>
          <input
            type="password"
            placeholder="any pasword"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className={styles.submit}>
          <button type="submit" onClick={handleLogin}>
            Login
          </button>
        </div>
      </div>
      <div className={styles.toastContainer}>
        <ToastContainer
          autoClose={5000}
          hideProgressBar={true}
          position="bottom-right"
        />
      </div>
    </div>
  );
};

export default LoginPage;

import React from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebaseConfig.js";
import { useRouter } from "next/router";

const Register = () => {
  const router = useRouter();
  const [registerEmail, setRegisterEmail] = React.useState("");
  const [registerPassword, setRegisterPassword] = React.useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(registerEmail, registerPassword);
    try {
      await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
    } catch (error) {
      alert(error);
    }
  };
  const [user, setUser] = React.useState("");
  React.useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, [user]);
  user && router.push("/mypage");
  return (
    <>
      <h1>新規登録</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>メールアドレス</label>
          <input
            name="email"
            type="email"
            value={registerEmail}
            onChange={(e) => setRegisterEmail(e.target.value)}
          />
        </div>
        <div>
          <label>パスワード</label>
          <input
            name="password"
            type="password"
            value={registerPassword}
            onChange={(e) => setRegisterPassword(e.target.value)}
          />
        </div>
        <button>登録する</button>
      </form>
    </>
  );
};

export default Register;

import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../FirebaseConfig.js";
import { useRouter } from "next/router";

const Login = () => {
  const [loginEmail, setLoginEmail] = React.useState("");
  const [loginPassword, setLoginPassword] = React.useState("");
  const [user, setUser] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  });

  user && useRouter().push("/mypage");

  return (
    <>
      <h1>ログインページ</h1>
      <form>
        <div>
          <label>メールアドレス</label>
          <input
            name="email"
            type="email"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
          />
        </div>
        <div>
          <label>パスワード</label>
          <input
            name="password"
            type="password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
          />
        </div>
        <button onClick={handleSubmit}>ログイン</button>
      </form>
    </>
  );
};

export default Login;

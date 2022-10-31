import React, { useState, useEffect } from "react";
/* 「onAuthStateChanged」と「auth」をimport↓ */
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../FirebaseConfig.js";

const MyPage = () => {
  const [user, setUser] = useState("");
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, [user]);
  const logout =async()=>{
    
  }
  return (
    <>
      <h1>マイページ</h1>
      {/* ↓ユーザーのメールアドレスを表示（ログインしている場合） */}
      <p>{user?.email}</p>
      <button onClick={logout}>ログアウト</button>
    </>
  );
};

export default MyPage;

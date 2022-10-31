/* 「useState」と「useEffect」をimport↓ */
import React, { useState, useEffect } from "react";
/* 「onAuthStateChanged」と「auth」をimport↓ */
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../FirebaseConfig.js";
import { useRouter } from "next/router";

const MyPage = () => {
  /* ↓state変数「user」を定義 */
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  /* ↓ログインしているかどうかを判定する */
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
  }, []);

  const logout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  !loading && !user && router.push("/login");

  return (
    <>
      <h1>マイページ</h1>
      {/* ↓ユーザーのメールアドレスを表示（ログインしている場合） */}
      <p>{user?.email}</p>
      <button onClick={logout}>logout</button>
    </>
  );
};

export default MyPage;

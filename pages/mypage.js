/* 「useState」と「useEffect」をimport↓ */
import React, { useState, useEffect } from "react";
/* 「onAuthStateChanged」と「auth」をimport↓ */
import { signOut } from "firebase/auth";
import { auth } from "../FirebaseConfig.js";
import { useRouter } from "next/router";
import { useAuthContext } from "../context/authContext";

const MyPage = () => {
  const router = useRouter();
  const { user } = useAuthContext();

  const logout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  console.log(user);

  if(typeof window !== "undefined"){
    !user && router.push("/login");
  }

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

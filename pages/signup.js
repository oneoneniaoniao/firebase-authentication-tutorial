import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useRouter } from "next/router";
import { useAuthContext } from "../context/authContext";

const signUp = () => {
  const { user } = useAuthContext();
  const router = useRouter();
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e);
    const { email, password } = e.target.elements;
    try {
      await createUserWithEmailAndPassword(auth, email.value, password.value);
    } catch (error) {
      switch (error.code) {
        case "auth/invalid-email":
          setError("正しいメールアドレスの形式で入力してください。");
          break;
        case "auth/weak-password":
          setError("パスワードは6文字以上を設定する必要があります。");
          break;
        case "auth/email-already-in-use":
          setError("そのメールアドレスは登録済みです。");
          break;
        default:
          setError("メールアドレスかパスワードに誤りがあります。");
          break;
      }
    }
  };

  user && router.push("/mypage");
  return (
    <>
      <h1>新規登録</h1>
      <form onSubmit={handleSubmit}>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div>
          <label htmlFor="email">メールアドレス</label>
          <input id="email" name="email" type="email" />
        </div>
        <div>
          <label htmlFor="password">パスワード</label>
          <input id="password" name="password" type="password" />
        </div>
        <button>登録する</button>
      </form>
    </>
  );
};

export default signUp;

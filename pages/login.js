import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../FirebaseConfig.js";
import { useRouter } from "next/router";
import { useAuthContext } from "../context/authContext";

const Login = () => {
  const [error, setError] = useState('');
  const router = useRouter();
  const { user } = useAuthContext();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e);
    const { email, password } = e.target.elements;
    try {
      await signInWithEmailAndPassword(auth, email.value, password.value);
      router.push("/mypage");
    } catch (error) {
      switch (error.code) {
        case 'auth/invalid-email':
          setError('正しいメールアドレスの形式で入力してください。');
          break;
        case 'auth/user-not-found':
          setError('User not found. The email is not registered.');
          break;
        case 'auth/wrong-password':
          setError('wrong password.');
          break;
        default:
          setError('メールアドレスかパスワードに誤りがあります。');
          break;
      }
    }
  };

  if (typeof window !== "undefined") {
    user && router.push("/mypage");
  }

  return (
    <>
      <h1>ログインページ</h1>
      <form onSubmit={handleSubmit}>
      {error && <p style={{ color: 'red' }}>{error}</p>}
        <div>
          <label>メールアドレス</label>
          <input id="email" name="email" type="email" />
        </div>
        <div>
          <label>パスワード</label>
          <input id="password" name="password" type="password" />
        </div>
        <button>ログイン</button>
      </form>
      <button onClick={() => router.push("/signup")}>ユーザ登録はこちらから</button>
    </>
  );
};

export default Login;

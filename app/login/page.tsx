export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <input type="text" placeholder="아이디" />
      <input type="password" placeholder="비밀번호" />
      <button>로그인</button>
    </div>
  );
}

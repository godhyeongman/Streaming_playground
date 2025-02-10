import LoginForm from '@/src/component/login/loginForm';

export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-5">
      <h1 className="text-4xl font-bold">LOGO</h1>
      <span className="text-2xl font-bold">
        로그인 후 서비스 사용이 가능합니다
      </span>
      <LoginForm />
    </div>
  );
}

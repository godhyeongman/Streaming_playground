'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { FieldErrors } from 'react-hook-form';

type LoginForm = z.infer<typeof loginSchema>;

const ID_FORM_ID = 'id';
const PASSWORD_FORM_ID = 'password';

const loginSchema = z.object({
  id: z.string().email({ message: '이메일 형식이 올바르지 않습니다' }),
  password: z
    .string()
    .min(8, '비밀번호는 최소 8자 이상이어야 합니다')
    .regex(/[A-Za-z]/, '영문이 포함되어야 합니다'),
});

export default function Login() {
  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      id: '',
      password: '',
    },
  });

  const { register, handleSubmit, formState } = form;

  const handleLoginSubmit = (data: LoginForm) => {
    console.log(data);
  };

  const handleLoginError = (errors: FieldErrors<LoginForm>) => {
    console.log(errors);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(handleLoginSubmit, handleLoginError)}
      >
        <input {...register(ID_FORM_ID)} type="text" placeholder="아이디" />
        {formState.errors.id && (
          <p className="text-red-500">{formState.errors.id.message}</p>
        )}

        <input
          {...register(PASSWORD_FORM_ID)}
          type="password"
          placeholder="비밀번호"
        />
        {formState.errors.password && (
          <p className="text-red-500">{formState.errors.password.message}</p>
        )}

        <button type="submit">로그인</button>
      </form>
    </div>
  );
}

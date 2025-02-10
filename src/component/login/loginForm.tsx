'use client';

import { useForm } from 'react-hook-form';
import { Input } from '@/src/component/ui/input';
import { Button } from '@/src/component/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { FieldErrors } from 'react-hook-form';

const loginSchema = z.object({
  id: z.string().email({ message: '이메일 형식이 올바르지 않습니다' }),
  password: z
    .string()
    .min(8, '비밀번호는 최소 8자 이상이어야 합니다')
    .regex(/[A-Za-z]/, '영문이 포함되어야 합니다'),
});

type LoginForm = z.infer<typeof loginSchema>;

const ID_FORM_ID = 'id';
const PASSWORD_FORM_ID = 'password';

export default function LoginForm() {
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
    <form
      className="flex flex-col gap-4 w-[25%]"
      onSubmit={handleSubmit(handleLoginSubmit, handleLoginError)}
    >
      <Input {...register(ID_FORM_ID)} type="text" placeholder="아이디" />
      {formState.errors.id && (
        <p className="text-red-500">{formState.errors.id.message}</p>
      )}

      <Input
        {...register(PASSWORD_FORM_ID)}
        type="password"
        placeholder="비밀번호"
      />
      {formState.errors.password && (
        <p className="text-red-500">{formState.errors.password.message}</p>
      )}

      <Button type="submit">로그인</Button>
    </form>
  );
}

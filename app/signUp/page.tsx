'use client';
import SignUpMonthPopOver from '@/src/component/signUp/signUpMonthPopOver';
import SignUpInput from '@/src/component/signUp/signUpInput';
import { Input } from '@/src/component/ui/input';
import { useForm, FieldErrors } from 'react-hook-form';
import { z } from 'zod';

const ID_FORM_ID = 'id';
const PASSWORD_FORM_ID = 'password';
const PASSWORD_CHECK_FORM_ID = 'passwordConfirm';
const NAME_FORM_ID = 'name';
const BIRTH_YEAR_FORM_ID = 'birthYear';
const BIRTH_DAY_FORM_ID = 'birthDay';
const BIRTH_MONTH_FORM_ID = 'birthMonth';

const CURRENT_YEAR = new Date().getFullYear();

const USER_ACCOUNT_DATAS: {
  id: keyof SignUpForm;
  label: string;
  placeholder: string;
}[] = [
  {
    id: ID_FORM_ID,
    label: '아이디',
    placeholder: '아이디를 입력해주세요',
  },
  {
    id: PASSWORD_FORM_ID,
    label: '비밀번호',
    placeholder: '비밀번호를 입력해주세요',
  },
  {
    id: PASSWORD_CHECK_FORM_ID,
    label: '비밀번호 재확인',
    placeholder: '비밀번호를 재입력해주세요',
  },
  {
    id: NAME_FORM_ID,
    label: '이름',
    placeholder: '이름을 입력해주세요',
  },
];

const signUpSchema = z
  .object({
    id: z.string().email({ message: '이메일 형식이 올바르지 않습니다' }),
    password: z
      .string()
      .min(8, '비밀번호는 최소 8자 이상이어야 합니다')
      .regex(/[A-Za-z]/, '영문이 포함되어야 합니다'),
    passwordConfirm: z.string(),
    name: z.string().min(1),
    birthYear: z
      .number()
      .min(1900, '1900년 이상이어야 합니다')
      .max(CURRENT_YEAR, `${CURRENT_YEAR}년 이하여야 합니다`),
    birthDay: z
      .number()
      .min(1)
      .max(31, '1월 1일부터 12월 31일까지 입력해주세요'),
    birthMonth: z.number().min(1).max(12),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: '비밀번호가 일치하지 않습니다',
    path: ['passwordConfirm'],
  });

export type SignUpForm = z.infer<typeof signUpSchema>;

export default function SignUp() {
  const { register, handleSubmit, formState } = useForm<SignUpForm>();

  const handleSignUpSubmit = (data: SignUpForm) => {
    console.log(data);
  };

  const handleSignUpError = (errors: FieldErrors<SignUpForm>) => {
    console.log(errors);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form
        className="flex flex-col gap-4 w-[25%]"
        onSubmit={handleSubmit(handleSignUpSubmit, handleSignUpError)}
      >
        {USER_ACCOUNT_DATAS.map((data) => (
          <SignUpInput register={register} {...data} key={data.id} />
        ))}
        <div className="flex flex-col">
          <span>생년월일</span>
          <div className="flex flex-row gap-2">
            <Input
              className="my-2"
              id={BIRTH_YEAR_FORM_ID}
              {...register(BIRTH_YEAR_FORM_ID)}
            />
            <SignUpMonthPopOver placeholder="월을 입력해주세요" />
            <Input
              className="my-2"
              id={BIRTH_DAY_FORM_ID}
              {...register(BIRTH_DAY_FORM_ID)}
            />
          </div>
        </div>
      </form>
    </div>
  );
}

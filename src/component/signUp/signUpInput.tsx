'use client';

import { Input } from '@/src/component/ui/input';
import { UseFormRegister } from 'react-hook-form';
import { SignUpForm } from '@/app/signUp/page';
type SignUpInputProps = {
  register: UseFormRegister<SignUpForm>;
  id: keyof SignUpForm;
  label: string;
  placeholder: string;
};

export default function SignUpInput({
  register,
  id,
  label,
  placeholder,
}: SignUpInputProps) {
  return (
    <div className="flex flex-col">
      <label htmlFor={id}>{label}</label>
      <Input
        className="my-2"
        placeholder={placeholder}
        id={id}
        {...register(id)}
      />
    </div>
  );
}

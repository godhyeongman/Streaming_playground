import { Checkbox } from '@/src/component/ui/checkbox';
import { Button } from '@/src/component/ui/button';

export default function LoginHelpers() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <Checkbox />
        <span>아이디 저장</span>
        <Checkbox />
        <span>자동 로그인</span>
      </div>
      <Button variant="outline" className="border-none">
        회원가입
      </Button>
    </div>
  );
}

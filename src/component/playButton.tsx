import { AiFillPlayCircle } from 'react-icons/ai';
import { cn } from '@/utils';

type PlayButtonProps = {
  onClick?: () => void;
  size?: number;
  className?: string;
};

export default function PlayButton({
  onClick,
  size = 24,
  className,
}: PlayButtonProps) {
  return (
    <div className={cn(className)}>
      <AiFillPlayCircle onClick={onClick} size={size} />
    </div>
  );
}

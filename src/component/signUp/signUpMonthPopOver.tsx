'use client';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/src/component/ui/popover';
import { Button } from '@/src/component/ui/button';
import { useState } from 'react';
const MONTH_LIST = Array.from({ length: 12 }, (_, i) => i + 1);

type SignUpMonthPopOverProps = {
  placeholder: string;
};

export default function SignUpMonthPopOver({
  placeholder,
}: SignUpMonthPopOverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [month, setMonth] = useState<number | null>(null);

  const handleOpenChange = () => {
    setIsOpen(!isOpen);
  };

  const handleMonthClick = (e: React.MouseEvent<HTMLDivElement>) => {
    setMonth(Number((e.target as HTMLDivElement).dataset.month));
  };

  return (
    <Popover open={isOpen} onOpenChange={handleOpenChange}>
      <PopoverTrigger>
        <Button variant="outline" onClick={handleOpenChange}>
          {month ? month : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side="top"
        className="flex flex-col"
        onClick={handleMonthClick}
      >
        {MONTH_LIST.map((month) => (
          <div
            className="flex justify-center items-center hover:bg-gray-100"
            data-month={month}
            key={month}
          >
            {month}
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
}

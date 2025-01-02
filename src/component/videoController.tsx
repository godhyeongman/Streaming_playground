import { Slider } from '@/src/component/ui/slider';

export default function VideoController() {
  return (
    <div className="w-full h-[30px] bg-white/50 flex justify-end items-center pr-10">
      <Slider orientation="vertical" />
    </div>
  );
}

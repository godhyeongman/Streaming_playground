import { Slider } from '@/src/component/ui/slider';

type VideoControllerProps = {
  onVolumeChange?: (value: number[]) => void;
  onMute?: () => void;
  onFullscreen?: () => void;
  onPlay?: () => void;
  onPause?: () => void;
  onSeek?: (value: number) => void;
};

const SliderWidth = 15;
const SliderHeight = 150;

export default function VideoController({
  onVolumeChange,
}: VideoControllerProps) {
  return (
    <div className="w-full h-[30px] bg-black/50 flex justify-end items-center pr-10 gap-10">
      <div>호</div>

      <div className="relative">
        <Slider
          width={SliderWidth}
          onValueChange={onVolumeChange}
          orientation="vertical"
          className={`h-[${SliderHeight}px] w-[${SliderWidth}px] absolute -translate-x-1/2 -translate-y-full`}
        />
      </div>
    </div>
  );
}

import Video from '@/src/component/video';

export default function Home() {
  return (
    <>
      <Video url="http://localhost:8080/hls/1080/123123_1080p.m3u8" />
    </>
  );
}

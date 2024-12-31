'use client';

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  return (
    <div>
      Hello World
      <button onClick={() => router.push('/test')}>이동</button>
    </div>
  );
}

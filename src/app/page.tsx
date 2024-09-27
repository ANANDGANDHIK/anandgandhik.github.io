import dynamic from 'next/dynamic';

const Canvas = dynamic(() => import('../components/Canvas'), { ssr: false });

export default function HomePage() {
  return (
    <main className="h-screen w-screen">
      <Canvas />
    </main>
  );
}

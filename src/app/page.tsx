import dynamic from 'next/dynamic';

const ModelCanvas = dynamic(() => import('../components/ModelCanvas'), { ssr: false });

export default function HomePage() {
  return (
    <main className="h-screen w-screen">
      <ModelCanvas />
    </main>
  );
}

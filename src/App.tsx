import { Outlet } from "react-router-dom";

export default function App() {
  return (
    <>
      <main className='relative flex min-h-screen w-full bg-background text-primary transition-all duration-400'>
        <Outlet />
      </main>
    </>
  );
}

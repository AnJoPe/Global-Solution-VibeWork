import { useSidebar } from "../../Context/SidebarContext";

export default function Navbar() {
  const { setOpen } = useSidebar();
  return (
    <nav id='telefone-navbar-sel' className='flex md:hidden w-full h-fit px-5 py-3 bg-surface-primary transition-all duration-400'>
      <div onClick={() => setOpen(true)} className='flex items-center gap-3 text-primary font-bold text-xl transition-all duration-400'>
        <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' className='h-7'>
          <path d='M4 5H20M4 12H20M4 19H20' />
        </svg>
        Menu
      </div>
    </nav>
  );
}

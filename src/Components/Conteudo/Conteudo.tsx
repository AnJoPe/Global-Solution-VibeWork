import { Outlet } from "react-router-dom";
import { useSidebar } from "../../Context/SidebarContext";
import Header from "../Header/Header";
import Navbar from "../Navbar/Navbar";

export default function Conteudo() {
  const { open } = useSidebar();
  const sidebarWidth = open ? "md:ml-[25%] lg:ml-[20%] xl:ml-[15%]" : "md:ml-[7%] lg:ml-[5.5%] xl:ml-[3.5%]";
  return (
    <div className={`flex flex-col items-center w-full transition-all duration-400 ${sidebarWidth}`}>
      <Header />
      <Navbar />
      <Outlet />
    </div>
  );
}

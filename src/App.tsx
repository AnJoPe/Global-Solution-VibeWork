import { ThemeProvider } from "./Context/ThemeContext";
import { SidebarProvider } from "./Context/SidebarContext";
import Sidebar from "./Components/Sidebar/Sidebar";
import Conteudo from "./Components/Conteudo/Conteudo";

export default function App() {
  return (
    <>
      <ThemeProvider>
        <SidebarProvider>
          <main className='relative flex min-h-screen w-full bg-background text-primary transition-all duration-400'>
            <Sidebar />
            <Conteudo />
          </main>
        </SidebarProvider>
      </ThemeProvider>
    </>
  );
}

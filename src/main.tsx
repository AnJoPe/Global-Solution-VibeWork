import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import Home from "./Pages/Home/Home.tsx";
import Relatorios from "./Pages/Relatorios/Relatorios.tsx";
import Contato from "./Pages/Contato/Contato.tsx";
import Sobre from "./Pages/Sobre/Sobre.tsx";
import Integrantes from "./Pages/Integrantes/Integrantes.tsx";
import Cadastro from "./Pages/Cadastro/Cadastro.tsx";
import Login from "./Pages/Login/Login.tsx";
import Perfil from "./Pages/Perfil/Perfil.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route index element={<Home />} />
          <Route path='relatorios' element={<Relatorios />} />
          <Route path='contato' element={<Contato />} />
          <Route path='sobre' element={<Sobre />} />
          <Route path='integrantes' element={<Integrantes />} />
          <Route path='cadastro' element={<Cadastro />} />
          <Route path='login' element={<Login />} />
          <Route path='perfil' element={<Perfil />} />
          <Route path='perfil/:id' element={<Perfil />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);

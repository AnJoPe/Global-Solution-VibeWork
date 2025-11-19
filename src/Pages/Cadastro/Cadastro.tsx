import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

type Usuario = {
  id?: string | number;
  nome: string;
  email: string;
  senha: string;
  preferenciaTrabalho: string;
};

const API_URL = "https://api-vibe-work.onrender.com/";

export default function Cadastro() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [usuario, setUsuario] = useState<Usuario>({
    nome: "",
    email: "",
    senha: "",
    preferenciaTrabalho: "",
  });

  const validarEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUsuario((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(API_URL + "usuario", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuario),
      });

      if (response.ok) {
        alert("Cadastro realizado com sucesso!");
        navigate("/login");
      } else {
        alert("Erro ao cadastrar. Tente novamente.");
      }
    } catch (error) {
      console.error(error);
      alert("Erro na requisição");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className='flex flex-col w-[90%] md:w-[85%] py-12 items-center gap-10'>
        <form onSubmit={handleSubmit} className='grid grid-cols-1 xl:grid-cols-2 gap-8 w-[90%] md:w-4/5 lg:w-3/5'>
          <label className='flex flex-col gap-2 text-xl font-bold'>
            Nome
            <input
              type='text'
              name='nome'
              autoComplete='name'
              value={usuario.nome}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              className={`p-1 border-b-2 outline-0 font-light focus:border-brand ${
                !touched.nome ? "border-neutral-500" : usuario.nome.length >= 3 ? "border-success-400" : "border-error-400"
              }`}
            />
          </label>
          <label className='flex flex-col gap-2 text-xl font-bold'>
            Email
            <input
              type='email'
              name='email'
              placeholder='seu.email@dominio.com'
              autoComplete='email'
              value={usuario.email}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              className={`p-1 border-b-2 outline-0 font-light focus:border-brand placeholder:text-secondary ${
                !touched.email
                  ? "border-neutral-500"
                  : validarEmail(usuario.email) && usuario.email
                  ? "border-success-400"
                  : usuario.email
                  ? "border-error-400"
                  : "border-neutral-500"
              }`}
            />
          </label>
          <label className='flex flex-col gap-2 text-xl font-bold'>
            Senha
            <input
              type='password'
              name='senha'
              minLength={5}
              maxLength={25}
              autoComplete='new-password'
              value={usuario.senha}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              className={`p-1 border-b-2 outline-0 font-light focus:border-brand ${
                !touched.senha ? "border-neutral-500" : usuario.senha.length >= 5 ? "border-success-400" : "border-error-400"
              }`}
            />
          </label>
          <label className='relative flex flex-col gap-2 text-xl font-bold'>
            Preferência de Trabalho
            <select
              name='preferenciaTrabalho'
              value={usuario.preferenciaTrabalho}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              className={`p-1 border-2 rounded outline-0 font-light appearance-none focus:border-brand ${
                !touched.preferenciaTrabalho ? "border-neutral-500" : usuario.preferenciaTrabalho ? "border-success-400" : "border-error-400"
              }`}>
              <option value='' className='bg-surface-secondary dark:bg-surface-primary'>
                Selecionar
              </option>
              <option value='Remoto' className='bg-surface-secondary dark:bg-surface-primary'>
                Remoto
              </option>
              <option value='Presencial' className='bg-surface-secondary dark:bg-surface-primary'>
                Presencial
              </option>
            </select>
            <svg
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='h-6 absolute right-1 bottom-[0.45rem]'>
              <path d='M6 9L12 15L18 9' />
            </svg>
          </label>
          <button
            type='submit'
            disabled={loading}
            className={`flex w-fit px-3 py-1.5 gap-3 xl:col-start-2 justify-self-end bg-brand hover:bg-brand-hover focus:bg-brand-focus items-center rounded text-xl text-white font-semibold cursor-pointer${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-brand"
            }`}>
            {loading ? "Cadastrando..." : "Cadastrar"}
            <img src='/Icons/user-plus.svg' className='h-6' />
          </button>
        </form>
        <p className='self-center pb-4'>
          Já possui uma conta?{" "}
          <Link to='/login' className='text-brand'>
            Faça login
          </Link>
        </p>
      </div>
    </>
  );
}

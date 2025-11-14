import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Perfil() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleLogout = () => {
    if (confirm("Tem certeza que deseja sair?")) {
      localStorage.removeItem("userId");
      localStorage.removeItem("userData");
      navigate("/login");
    }
  };

  if (loading) {
    return (
      <div className='flex flex-col w-[85%] py-12 items-center gap-10'>
        <h2 className='text-4xl font-semibold'>Carregando Informações...</h2>
      </div>
    );
  }

  return (
    <div className='flex flex-col w-[85%] items-center py-12 gap-10'>
      <h2 className='text-4xl font-semibold self-start'>Meu Perfil</h2>
      <div className='flex w-[85%] justify-center px-12 gap-20'>
        <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1' strokeLinecap='round' className='h-44'>
          <path d='M7 20.662V19C7 18.4696 7.21071 17.9609 7.58579 17.5858C7.96086 17.2107 8.46957 17 9 17H15C15.5304 17 16.0391 17.2107 16.4142 17.5858C16.7893 17.9609 17 18.4696 17 19V20.662M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM15 10C15 11.6569 13.6569 13 12 13C10.3431 13 9 11.6569 9 10C9 8.34315 10.3431 7 12 7C13.6569 7 15 8.34315 15 10Z' />
        </svg>
        <form className='grid grid-cols-2 gap-8 w-3/5'>
          <label className='flex flex-col gap-2 text-xl font-bold'>
            Nome
            <input
              type='text'
              name='nome'
              autoComplete='name'
              disabled
              className='p-1 border-b-2 border-neutral-500 outline-0 font-light bg-transparent cursor-not-allowed opacity-60'
            />
          </label>
          <label className='flex flex-col gap-2 text-xl font-bold'>
            Email
            <input
              type='email'
              name='email'
              placeholder='seu.email@dominio.com'
              autoComplete='email'
              onBlur={handleBlur}
              className={`p-1 border-b-2 outline-0 font-light focus:border-brand placeholder:text-secondary ${
                !touched.email ? "border-neutral-500" : "border-error-400"
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
              onBlur={handleBlur}
              className={`p-1 border-b-2 outline-0 font-light focus:border-brand ${!touched.senha ? "border-neutral-500" : "border-error-400"}`}
            />
          </label>
          <label className='relative flex flex-col gap-2 text-xl font-bold'>
            Preferência de Trabalho
            <select
              name='preferenciaTrabalho'
              onBlur={handleBlur}
              className={`p-1 border-2 rounded outline-0 font-light appearance-none focus:border-brand ${
                !touched.preferenciaTrabalho ? "border-neutral-500" : "border-error-400"
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
            disabled={saving}
            className={`flex w-fit px-3 py-1.5 gap-3 col-start-2 justify-self-end items-center rounded text-xl text-white font-semibold cursor-pointer ${
              saving ? "bg-gray-400 cursor-not-allowed" : "bg-brand hover:bg-brand-hover focus:bg-brand-focus"
            }`}>
            {saving ? "Salvando..." : "Salvar"}
            <img src='/Icons/user-pen.svg' className='h-6' />
          </button>
        </form>
      </div>
      <button
        type='button'
        onClick={handleLogout}
        className='flex w-fit px-3 py-1.5 gap-3 items-center self-end rounded text-xl font-semibold cursor-pointer bg-error-500 hover:bg-error-600 focus:bg-error-700 text-white'>
        Sair
        <img src='/Icons/log-out.svg' className='h-6' />
      </button>
    </div>
  );
}

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Usuario } from "../../Types/UsuarioType";

const API_URL = "https://api-vibe-work.onrender.com/";

export default function Perfil() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [originalData, setOriginalData] = useState<Usuario | null>(null);

  const validarEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUsuario((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    if (!usuario || !id) {
      alert("Erro ao salvar dados");
      setSaving(false);
      return;
    }

    try {
      if (usuario.email.trim().length === 0 || !validarEmail(usuario.email)) {
        alert("Email inválido");
        setSaving(false);
        return;
      }

      if (usuario.senha.trim().length < 5) {
        alert("Senha deve ter no mínimo 5 caracteres");
        setSaving(false);
        return;
      }

      if (!usuario.preferenciaTrabalho) {
        alert("Selecione uma preferência de trabalho");
        setSaving(false);
        return;
      }

      const promises = [];

      if (originalData?.email !== usuario.email) {
        promises.push(fetch(API_URL + `usuario/email/${id}/${usuario.email}`, { method: "PUT" }));
      }

      if (originalData?.senha !== usuario.senha) {
        promises.push(fetch(API_URL + `usuario/senha/${id}/${usuario.senha}`, { method: "PUT" }));
      }

      if (originalData?.preferenciaTrabalho !== usuario.preferenciaTrabalho) {
        promises.push(fetch(API_URL + `usuario/preferencia/${id}/${usuario.preferenciaTrabalho}`, { method: "PUT" }));
      }

      const responses = await Promise.all(promises);
      const allOk = responses.every((r) => r.ok);

      if (allOk || promises.length === 0) {
        alert("Dados atualizados com sucesso!");
        localStorage.setItem("userData", JSON.stringify(usuario));
        setOriginalData(usuario);
        setTouched({});
      } else {
        alert("Erro ao atualizar alguns dados");
      }
    } catch (error) {
      console.error(error);
      alert("Erro na requisição");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    if (confirm("Tem certeza que deseja sair?")) {
      localStorage.removeItem("userId");
      localStorage.removeItem("userData");
      navigate("/login");
    }
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (!userId && !id) {
      setLoading(false);
      return;
    }

    if (userId && !id) {
      navigate(`/perfil/${userId}`);
      return;
    }

    if (id) {
      fetch(API_URL + `usuario/${id}`)
        .then((r) => r.json())
        .then((data) => {
          setUsuario(data);
          setOriginalData(data);
        })
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [id, navigate]);

  if (loading) {
    return (
      <div className='flex flex-col w-[90%] md:w-[85%] py-12 items-center gap-10'>
        <h2 className='text-2xl md:text-3xl lg:text-4xl font-semibold'>Carregando Informações...</h2>
      </div>
    );
  }

  if (!usuario && !id) {
    return (
      <div className='flex flex-col w-[90%] md:w-[85%] py-12 items-center gap-10'>
        <h2 className='text-2xl md:text-3xl lg:text-4xl font-semibold'>Perfil não encontrado</h2>
        <p className='text-lg'>Por favor, faça login para ver seu perfil</p>
        <button
          onClick={() => navigate("/login")}
          className='flex w-fit px-3 py-1.5 gap-3 xl:col-start-2 justify-self-end items-center rounded text-lg font-semibold cursor-pointer bg-brand hover:bg-brand-hover focus:bg-brand-focus'>
          Ir para Login
        </button>
      </div>
    );
  }

  if (!usuario) {
    return (
      <div className='flex flex-col w-[90%] md:w-[85%] py-12 items-center gap-10'>
        <h2 className='text-2xl md:text-3xl lg:text-4xl font-semibold'>Perfil não encontrado</h2>
      </div>
    );
  }

  return (
    <>
      <div className='flex flex-col w-[90%] md:w-[85%] items-center py-12 gap-10'>
        <h2 className='text-2xl md:text-3xl lg:text-4xl font-semibold self-start'>Meu Perfil</h2>
        <div className='flex flex-col md:flex-row w-[90%] md:w-[85%] justify-center md:px-12 gap-5 md:gap-20'>
          <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1' strokeLinecap='round' className='h-44'>
            <path d='M7 20.662V19C7 18.4696 7.21071 17.9609 7.58579 17.5858C7.96086 17.2107 8.46957 17 9 17H15C15.5304 17 16.0391 17.2107 16.4142 17.5858C16.7893 17.9609 17 18.4696 17 19V20.662M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM15 10C15 11.6569 13.6569 13 12 13C10.3431 13 9 11.6569 9 10C9 8.34315 10.3431 7 12 7C13.6569 7 15 8.34315 15 10Z' />
          </svg>
          <form onSubmit={handleSubmit} className='grid grid-cols-1 xl:grid-cols-2 gap-8 w-[90%] md:w-4/5 lg:w-3/5'>
            <label className='flex flex-col gap-2 text-xl font-bold'>
              Nome
              <input
                type='text'
                name='nome'
                autoComplete='name'
                value={usuario.nome}
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
                value={usuario.email}
                onChange={handleChange}
                onBlur={handleBlur}
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
              disabled={saving}
              className={`flex w-fit px-3 py-1.5 gap-3 xl:col-start-2 md:justify-self-end items-center rounded text-xl font-semibold cursor-pointer ${
                saving ? "bg-gray-400 cursor-not-allowed" : "bg-brand hover:bg-brand-hover focus:bg-brand-focus"
              }`}>
              {saving ? "Salvando..." : "Salvar"}
              <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' className='h-6'>
                <path d='M11.5 15H7C5.93913 15 4.92172 15.4214 4.17157 16.1716C3.42143 16.9217 3 17.9391 3 19V21M21.378 16.626C21.7764 16.2276 22.0001 15.6874 22.0001 15.124C22.0001 14.5606 21.7764 14.0204 21.378 13.622C20.9796 13.2236 20.4394 12.9999 19.876 12.9999C19.3126 12.9999 18.7724 13.2236 18.374 13.622L14.364 17.634C14.1262 17.8716 13.9522 18.1653 13.858 18.488L13.021 21.358C12.9959 21.444 12.9944 21.5353 13.0166 21.6221C13.0389 21.7089 13.0841 21.7882 13.1474 21.8516C13.2108 21.9149 13.2901 21.9601 13.3769 21.9824C13.4637 22.0046 13.555 22.0031 13.641 21.978L16.511 21.141C16.8337 21.0468 17.1274 20.8728 17.365 20.635L21.378 16.626ZM14 7C14 9.20914 12.2091 11 10 11C7.79086 11 6 9.20914 6 7C6 4.79086 7.79086 3 10 3C12.2091 3 14 4.79086 14 7Z' />
              </svg>
            </button>
          </form>
        </div>
        <button
          type='button'
          onClick={handleLogout}
          className='flex w-fit px-3 py-1.5 gap-3 items-center self-end rounded text-xl font-semibold cursor-pointer bg-error-500 hover:bg-error-600 focus:bg-error-700 text-primary'>
          Sair
          <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' className='h-6'>
            <path d='M16 17L21 12M21 12L16 7M21 12H9M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9' />
          </svg>
        </button>
      </div>
    </>
  );
}

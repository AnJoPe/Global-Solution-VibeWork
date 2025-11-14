import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [credentials, setCredentials] = useState({
    email: "",
    senha: "",
  });

  const validarEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  return (
    <>
      <div className='flex flex-col w-[85%] py-12 items-center gap-10'>
        <form className='grid grid-cols-2 gap-8 w-3/5'>
          <label className='flex flex-col gap-1 text-xl font-bold'>
            Email
            <input
              type='email'
              name='email'
              autoComplete='email'
              placeholder='seu.email@dominio.com'
              value={credentials.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`p-1 border-b-2 outline-0 font-light focus:border-brand placeholder:text-secondary ${
                !touched.email
                  ? "border-neutral-500"
                  : validarEmail(credentials.email) && credentials.email
                  ? "border-success-400"
                  : credentials.email
                  ? "border-error-400"
                  : "border-neutral-500"
              }`}
            />
          </label>
          <label className='flex flex-col gap-1 text-xl font-bold'>
            Senha
            <input
              type='password'
              name='senha'
              minLength={5}
              maxLength={25}
              autoComplete='current-password'
              value={credentials.senha}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              className={`p-1 border-b-2 outline-0 font-light focus:border-brand ${
                !touched.senha ? "border-neutral-500" : credentials.senha.length >= 5 ? "border-success-400" : "border-error-400"
              }`}
            />
          </label>
          <button
            type='submit'
            disabled={loading}
            className={`flex w-fit px-3 py-1.5 gap-3 col-start-2 justify-self-end items-center rounded text-xl text-white font-semibold cursor-pointer ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-brand hover:bg-brand-hover focus:bg-brand-focus"
            }`}>
            {loading ? "Entrando..." : "Entrar"}
            <img src='/Icons/log-in.svg' className='h-6' />
          </button>
        </form>
        <p className='self-center pb-4'>
          Não possui conta?{" "}
          <Link to='/cadastro' className='text-brand'>
            Crie uma aqui
          </Link>
        </p>
      </div>
    </>
  );
}

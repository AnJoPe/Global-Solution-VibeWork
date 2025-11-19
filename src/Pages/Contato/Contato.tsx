import { useState } from "react";
import emailjs from "@emailjs/browser";

export default function Contato() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [assunto, setAssunto] = useState("");
  const [corpo, setCorpo] = useState("");
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validarEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  function enviarEmail(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const errosTemp = {
      nome: nome.trim().length < 3,
      email: !validarEmail(email),
      corpo: corpo.trim().length < 3,
    };

    if (Object.values(errosTemp).some((error) => error)) {
      alert("Por favor, preencha todos os campos obrigatórios corretamente");
      setLoading(false);
      return;
    }

    const templateParams = {
      nome: nome,
      email: email,
      assunto: assunto || "Sem assunto",
      corpo: corpo,
    };

    emailjs.send("gmailVibeWork", "template_kddys0v", templateParams, "zjV-4chPOo9jgqx9c").then(
      (response) => {
        console.log("EMAIL ENVIADO", response.status, response.text);
        alert("Email enviado com sucesso!");
        setNome("");
        setEmail("");
        setAssunto("");
        setCorpo("");
        setTouched({});
        setLoading(false);
      },
      (err) => {
        console.log("ERRO: ", err);
        alert("Erro ao enviar email");
        setLoading(false);
      }
    );
  }

  return (
    <>
      <div className='flex flex-col w-[90%] md:w-full py-12 items-center'>
        <form onSubmit={enviarEmail} className='grid grid-cols-1 xl:grid-cols-2 gap-5 w-[90%] md:w-4/5 lg:w-3/5'>
          <label className='flex flex-col gap-1 text-xl font-bold'>
            Nome
            <input
              type='text'
              name='nome'
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              onBlur={handleBlur}
              className={`p-1 border-b-2 outline-0 font-light focus:border-brand ${
                !touched.nome ? "border-neutral-500" : nome.trim().length >= 3 ? "border-success-400" : "border-error-400"
              }`}
              required
            />
          </label>
          <label className='flex flex-col gap-1 text-xl font-bold'>
            Email
            <input
              type='email'
              name='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={handleBlur}
              placeholder='seu.email@dominio.com'
              className={`p-1 border-b-2 outline-0 font-light focus:border-brand placeholder:text-secondary ${
                !touched.email ? "border-neutral-500" : validarEmail(email) && email ? "border-success-400" : email ? "border-error-400" : "border-neutral-500"
              }`}
              required
            />
          </label>
          <label className='flex flex-col gap-1 text-xl font-bold'>
            Assunto
            <input
              type='text'
              name='assunto'
              value={assunto}
              onChange={(e) => setAssunto(e.target.value)}
              onBlur={handleBlur}
              className='p-1 border-b-2 border-neutral-500 focus:border-brand outline-0 font-light'
            />
          </label>
          <label className='flex flex-col gap-1 text-xl font-bold'>
            Mensagem
            <textarea
              name='corpo'
              value={corpo}
              onChange={(e) => setCorpo(e.target.value)}
              onBlur={handleBlur}
              rows={3}
              className={`p-1 border-2 outline-0 rounded font-light focus:border-brand ${
                !touched.corpo ? "border-neutral-500" : corpo.trim().length >= 3 ? "border-success-400" : "border-error-400"
              }`}
              required
            />
          </label>
          <button
            type='submit'
            disabled={loading}
            className={`flex w-fit px-3 py-1.5 gap-4 xl:col-start-2 justify-self-end items-center rounded text-xl font-semibold cursor-pointer ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-brand hover:bg-brand-hover focus:bg-brand-focus"
            }`}>
            {loading ? "Enviando..." : "Enviar"}
            <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' className='h-6'>
              <path d='M10.9136 13.0853C10.7225 12.8945 10.4947 12.7444 10.2441 12.6441L2.31405 9.46406C2.21937 9.42606 2.13857 9.36002 2.08251 9.27478C2.02644 9.18955 1.9978 9.0892 2.00041 8.98722C2.00302 8.88523 2.03677 8.78648 2.09712 8.70423C2.15747 8.62197 2.24155 8.56015 2.33805 8.52706L21.338 2.02706C21.4267 1.99505 21.5225 1.98894 21.6145 2.00945C21.7064 2.02995 21.7907 2.07622 21.8573 2.14283C21.9239 2.20945 21.9702 2.29366 21.9907 2.38561C22.0112 2.47756 22.0051 2.57345 21.973 2.66206L15.473 21.6621C15.44 21.7586 15.3781 21.8426 15.2959 21.903C15.2136 21.9633 15.1149 21.9971 15.0129 21.9997C14.9109 22.0023 14.8106 21.9737 14.7253 21.9176C14.6401 21.8615 14.574 21.7807 14.536 21.6861L11.356 13.7541C11.2552 13.5036 11.1047 13.2761 10.9136 13.0853ZM10.9136 13.0853L21.854 2.14706' />
            </svg>
          </button>
        </form>
      </div>
    </>
  );
}

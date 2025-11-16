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
    <div className='flex flex-col w-[90%] md:w-full py-12 items-center'>
      <div className='w-full flex flex-col items-center gap-2 mb-8'>
        <h2 className='text-3xl font-bold mb-2 text-center'>Entre em contato conosco!</h2>
        <p className='text-lg text-center text-secondary'>
          Ficou com dúvida, sugestão ou quer só conversar sobre produtividade?
          <br />
          Estamos aqui para ajudar!
        </p>
        <div className='flex flex-col gap-1 items-center text-base mt-4'>
          <span>
            <b>Email:</b> contato@vibework.com
          </span>
          <span>
            <b>Telefone:</b> (11) 99999-4321
          </span>
        </div>
        <div className='font-semibold text-center mt-6 text-lg'>Ou nos envie uma mensagem por aqui:</div>
      </div>
      <form onSubmit={enviarEmail} className='grid grid-cols-1 lg:grid-cols-2 gap-5 w-[90%] md:w-4/5 lg:w-3/5'>
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
          className={`flex w-fit px-3 py-1.5 gap-4 xl:col-start-2 justify-self-end items-center rounded text-xl text-white font-semibold cursor-pointer ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-brand hover:bg-brand-hover focus:bg-brand-focus"
          }`}>
          {loading ? "Enviando..." : "Enviar"}
          <img src='/Icons/send.svg' className='h-6' />
        </button>
      </form>
    </div>
  );
}

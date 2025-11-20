import { useState } from "react";

type PerguntaProps = {
  pergunta: string;
  resposta: string;
};

export default function Pergunta({ pergunta, resposta }: PerguntaProps) {
  const [aberta, setAberta] = useState(false);
  return (
    <div className='flex flex-col px-3 w-full bg-surface-primary dark:bg-surface-secondary rounded shadow-md self-center transition-all duration-400'>
      <div className='flex px-2 py-3 justify-between items-center text-secondary' onClick={() => setAberta((prev) => !prev)}>
        <h3 className='font-medium text-xl sm:text-[1.35rem] md:text-2xl lg:text-[1.7rem] select-none transition-all duration-400'>{pergunta}</h3>
        <svg
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
          className={`h-8 transition-all duration-400 ${aberta ? "rotate-180" : ""}`}>
          <path d='M6 9L12 15L18 9' />
        </svg>
      </div>
      <div className={`overflow-hidden transition-all duration-400 ${aberta ? "" : "max-h-0"}`}>
        <p className='text-tertiary text-justify font-base sm:text-[1.15rem] md:text-xl px-1.5 pb-3'>{resposta}</p>
      </div>
    </div>
  );
}

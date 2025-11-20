type IntegranteProps = {
  imagem: string;
  nome: string;
  rm: string;
  github: string;
  linkedin: string;
};

export default function Integrante({ imagem, nome, rm, github, linkedin }: IntegranteProps) {
  return (
    <div className='flex flex-col items-center justify-center px-10 md:px-0 gap-3 bg-surface-primary dark:bg-surface-secondary transition-all duration-400 rounded-2xl font-bold w-[300px] h-[430px] sm:h-[460px] md:w-[350px] lg:w-[360px] lg:h-[500px]'>
      <div className='flex items-center justify-center rounded-full aspect-square bg-brand transition-all duration-400'>
        <img src={imagem} alt={`Foto do integrante ${nome}`} draggable='false' />
      </div>
      <h2 className='min-h-[50px] text-center text-[1.34rem] lg:text-2xl'>{nome}</h2>
      <p className='text-secondary text-[1.1rem] lg:text-[1.35rem] transition-all duration-400'>RM {rm} | 1TDSA</p>
      <div className='flex gap-8'>
        <a href={github} target='_blank' className='bg-brand hover:bg-brand-hover focus:bg-brand-focus transition-all duration-400 p-3 rounded-full'>
          <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' className='h-7'>
            <path d='M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4 M9 18c-4.51 2-5-2-7-2' />
          </svg>
        </a>
        <a href={linkedin} target='_blank' className='bg-brand hover:bg-brand-hover focus:bg-brand-focus transition-all duration-400 p-3 rounded-full'>
          <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinejoin='round' className='h-7'>
            <path d='M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z' />
            <rect width='4' height='12' x='2' y='9' />
            <circle cx='4' cy='4' r='2' />
          </svg>
        </a>
      </div>
    </div>
  );
}

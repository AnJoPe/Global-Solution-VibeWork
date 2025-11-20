interface RelatorioBemEstar {
  id: number;
  data: string;
  nivelEnergia: number;
  quantidadePausas: number;
  nivelEstresse: number;
  descricao: string;
}

interface CardBemEstarProps {
  relatorio: RelatorioBemEstar;
  onDelete: (id: number) => void;
}

export default function CardBemEstar({ relatorio, onDelete }: CardBemEstarProps) {
  return (
    <div className='p-5 bg-surface-primary dark:bg-surface-secondary rounded border-l-4 border-brand'>
      <div className='flex justify-between items-start mb-3'>
        <p className='font-semibold text-sm'>{new Date(relatorio.data).toLocaleDateString("pt-BR", { timeZone: "UTC" })}</p>
        <button onClick={() => onDelete(relatorio.id)} className='text-error-500 hover:text-error-600 focus:text-error-700 cursor-pointer'>
          <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' className='h-5'>
            <path d='M18 6L6 18M6 6L18 18' />
          </svg>
        </button>
      </div>
      <div className='flex flex-col gap-2 text-sm mb-3'>
        <div className='flex justify-between'>
          <span>Energia:</span>
          <span className='font-semibold'>{relatorio.nivelEnergia}/5</span>
        </div>
        <div className='flex justify-between'>
          <span>Pausas:</span>
          <span className='font-semibold'>{relatorio.quantidadePausas}</span>
        </div>
        <div className='flex justify-between'>
          <span>Estresse:</span>
          <span className='font-semibold'>{relatorio.nivelEstresse}/5</span>
        </div>
      </div>
      <p className='text-xs text-secondary'>{relatorio.descricao}</p>
    </div>
  );
}

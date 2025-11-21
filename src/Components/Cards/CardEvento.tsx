import type { CalendarEvent } from "../../Types/CalendarEvent";

interface CardEventoProps {
  evento: CalendarEvent;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}

export default function CardEvento({ evento, onDelete, onEdit }: CardEventoProps) {
  return (
    <div className='p-3 bg-background rounded border-l-4 border-brand transition-all duration-400'>
      <div className='flex justify-between items-start gap-2 mb-2'>
        <div className='flex-1 flex justify-between items-center'>
          <p className='font-semibold text-sm'>{evento.title}</p>
          <p className='text-xs text-tertiary'>{evento.start.toLocaleDateString("pt-BR")}</p>
        </div>
        <button onClick={() => onDelete(evento.id)} className='text-error-500 hover:text-error-600 focus:text-error-700 cursor-pointer'>
          <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' className='h-5'>
            <path d='M18 6L6 18M6 6L18 18' />
          </svg>
        </button>
      </div>
      {evento.desc && <p className='text-xs text-secondary mb-2'>{evento.desc}</p>}
      <button onClick={() => onEdit(evento.id)} className='text-xs px-2 py-1 bg-brand hover:bg-brand-hover focus:bg-brand-focus rounded text-white font-semibold'>
        Editar
      </button>
    </div>
  );
}

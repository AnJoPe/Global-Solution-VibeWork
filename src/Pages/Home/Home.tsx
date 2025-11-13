import { useState } from "react";

export default function Home() {
  const [bemEstar, setBemEstar] = useState({ energia: 0, pausas: 0, estresse: 0, descricao: "" });
  const [loadingBemEstar, setLoadingBemEstar] = useState(false);

  return (
    <div className='flex flex-col w-[85%] py-12 items-center gap-5'>
      <h2 className='text-4xl font-semibold self-start'>Agenda de Trabalho</h2>
      <div className='flex w-full gap-5 text-lg mb-5'>
        <div className='w-3/5 px-8 py-4 bg-surface-primary dark:bg-surface-secondary rounded transition-all duration-400'>Calendário</div>
        <div className='flex flex-col w-2/5 gap-5'>
          <div className='w-full grow px-8 py-4 bg-surface-primary dark:bg-surface-secondary rounded transition-all duration-400'>
            <h3 className='text-xl font-semibold mb-3'>Eventos</h3>
            <div className='flex flex-col gap-3 max-h-96 overflow-y-auto'>Lista de eventos</div>
            <hr className='border border-brand rounded my-5' />
            <div>Adicionar eventos</div>
          </div>
          <div className='w-full px-8 py-4 bg-surface-primary dark:bg-surface-secondary rounded transition-all duration-400'>
            <div className='flex flex-col gap-2 text-base'>
              <div className='flex justify-between'>
                <span>Segunda-Feira:</span>
                <span className='font-semibold'>REMOTO/PRESENCIAL</span>
              </div>
              <div className='flex justify-between'>
                <span>Terça-Feira:</span>
                <span className='font-semibold'>REMOTO/PRESENCIAL</span>
              </div>
              <div className='flex justify-between'>
                <span>Quarta-Feira:</span>
                <span className='font-semibold'>REMOTO/PRESENCIAL</span>
              </div>
              <div className='flex justify-between'>
                <span>Quinta-Feira:</span>
                <span className='font-semibold'>REMOTO/PRESENCIAL</span>
              </div>
              <div className='flex justify-between'>
                <span>Sexta-Feira:</span>
                <span className='font-semibold'>REMOTO/PRESENCIAL</span>
              </div>
              <div className='flex justify-between'>
                <span>Sábado:</span>
                <span className='font-semibold'>REMOTO/PRESENCIAL</span>
              </div>
              <div className='flex justify-between'>
                <span>Domingo:</span>
                <span className='font-semibold'>REMOTO/PRESENCIAL</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h2 className='text-4xl font-semibold self-start'>Check-in de Bem-estar</h2>
      <div className='flex flex-col w-full gap-8 px-10 py-5 bg-surface-primary dark:bg-surface-secondary rounded transition-all duration-400'>
        <div className='flex gap-0'>
          <div className='flex flex-col w-full gap-10'>
            <div className='flex flex-col gap-2'>
              <p className='text-xl font-semibold'>Qual seu nível de energia hoje?</p>
              <div className='flex gap-5'>
                <label>
                  <input
                    type='radio'
                    name='energia'
                    value='1'
                    checked={bemEstar.energia === 1}
                    onChange={() => setBemEstar({ ...bemEstar, energia: 1 })}
                    className='peer/energia hidden'
                  />
                  <span className='peer-checked/energia:text-error-500 cursor-pointer'>
                    <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' className='h-7'>
                      <path d='M9.75 9L14.25 6V18' />
                    </svg>
                  </span>
                </label>
                <label>
                  <input
                    type='radio'
                    name='energia'
                    value='2'
                    checked={bemEstar.energia === 2}
                    onChange={() => setBemEstar({ ...bemEstar, energia: 2 })}
                    className='peer/energia hidden'
                  />
                  <span className='peer-checked/energia:text-error-300 cursor-pointer'>
                    <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' className='h-7'>
                      <path d='M15 18H9C9 11.8001 15 13.35 15 8.70009C15 6.37511 12 4.82513 9 7.1501' />
                    </svg>
                  </span>
                </label>
                <label>
                  <input
                    type='radio'
                    name='energia'
                    value='3'
                    checked={bemEstar.energia === 3}
                    onChange={() => setBemEstar({ ...bemEstar, energia: 3 })}
                    className='peer/energia hidden'
                  />
                  <span className='peer-checked/energia:text-yellow-400 cursor-pointer'>
                    <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' className='h-7'>
                      <path d='M9.75 6.59767C12.3 5.11289 15 6.59767 15 8.82485C15 9.61243 14.6839 10.3678 14.1213 10.9247C13.5587 11.4816 12.7956 11.7944 12 11.7944C12.7956 11.7944 13.5587 12.1073 14.1213 12.6642C14.6839 13.2211 15 13.9764 15 14.764C15 17.4366 12 19.2184 9 16.9912' />
                    </svg>
                  </span>
                </label>
                <label>
                  <input
                    type='radio'
                    name='energia'
                    value='4'
                    checked={bemEstar.energia === 4}
                    onChange={() => setBemEstar({ ...bemEstar, energia: 4 })}
                    className='peer/energia hidden'
                  />
                  <span className='peer-checked/energia:text-success-300 cursor-pointer'>
                    <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' className='h-7'>
                      <path d='M9 6V10.5C9 10.8978 9.15803 11.2794 9.43934 11.5607C9.72064 11.842 10.1022 12 10.5 12H15M15 6V18' />
                    </svg>
                  </span>
                </label>
                <label>
                  <input
                    type='radio'
                    name='energia'
                    value='5'
                    checked={bemEstar.energia === 5}
                    onChange={() => setBemEstar({ ...bemEstar, energia: 5 })}
                    className='peer/energia hidden'
                  />
                  <span className='peer-checked/energia:text-success-500 cursor-pointer'>
                    <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' className='h-7'>
                      <path d='M15 6H9V10.5H10.95C13.2 10.5 15 12.15 15 14.25C15 16.35 13.2 18 10.95 18C10.2 18 9.6 17.85 9 17.55' />
                    </svg>
                  </span>
                </label>
              </div>
            </div>

            <div className='flex flex-col gap-2'>
              <p className='text-xl font-semibold'>Qual seu nível de estresse hoje?</p>
              <div className='flex gap-5'>
                <label>
                  <input
                    type='radio'
                    name='estresse'
                    value='1'
                    checked={bemEstar.estresse === 1}
                    onChange={() => setBemEstar({ ...bemEstar, estresse: 1 })}
                    className='peer/estresse hidden'
                  />
                  <span className='peer-checked/estresse:text-success-500 cursor-pointer'>
                    <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' className='h-7'>
                      <path d='M9.75 9L14.25 6V18' />
                    </svg>
                  </span>
                </label>
                <label>
                  <input
                    type='radio'
                    name='estresse'
                    value='2'
                    checked={bemEstar.estresse === 2}
                    onChange={() => setBemEstar({ ...bemEstar, estresse: 2 })}
                    className='peer/estresse hidden'
                  />
                  <span className='peer-checked/estresse:text-success-300 cursor-pointer'>
                    <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' className='h-7'>
                      <path d='M15 18H9C9 11.8001 15 13.35 15 8.70009C15 6.37511 12 4.82513 9 7.1501' />
                    </svg>
                  </span>
                </label>
                <label>
                  <input
                    type='radio'
                    name='estresse'
                    value='3'
                    checked={bemEstar.estresse === 3}
                    onChange={() => setBemEstar({ ...bemEstar, estresse: 3 })}
                    className='peer/estresse hidden'
                  />
                  <span className='peer-checked/estresse:text-yellow-400 cursor-pointer'>
                    <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' className='h-7'>
                      <path d='M9.75 6.59767C12.3 5.11289 15 6.59767 15 8.82485C15 9.61243 14.6839 10.3678 14.1213 10.9247C13.5587 11.4816 12.7956 11.7944 12 11.7944C12.7956 11.7944 13.5587 12.1073 14.1213 12.6642C14.6839 13.2211 15 13.9764 15 14.764C15 17.4366 12 19.2184 9 16.9912' />
                    </svg>
                  </span>
                </label>
                <label>
                  <input
                    type='radio'
                    name='estresse'
                    value='4'
                    checked={bemEstar.estresse === 4}
                    onChange={() => setBemEstar({ ...bemEstar, estresse: 4 })}
                    className='peer/estresse hidden'
                  />
                  <span className='peer-checked/estresse:text-error-300 cursor-pointer'>
                    <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' className='h-7'>
                      <path d='M9 6V10.5C9 10.8978 9.15803 11.2794 9.43934 11.5607C9.72064 11.842 10.1022 12 10.5 12H15M15 6V18' />
                    </svg>
                  </span>
                </label>
                <label>
                  <input
                    type='radio'
                    name='estresse'
                    value='5'
                    checked={bemEstar.estresse === 5}
                    onChange={() => setBemEstar({ ...bemEstar, estresse: 5 })}
                    className='peer/estresse hidden'
                  />
                  <span className='peer-checked/estresse:text-error-500 cursor-pointer'>
                    <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' className='h-7'>
                      <path d='M15 6H9V10.5H10.95C13.2 10.5 15 12.15 15 14.25C15 16.35 13.2 18 10.95 18C10.2 18 9.6 17.85 9 17.55' />
                    </svg>
                  </span>
                </label>
              </div>
            </div>
          </div>
          <div className='flex flex-col w-full gap-10'>
            <div>
              <label className='flex flex-col text-xl font-semibold'>
                Quantidade de pausas realizadas
                <input
                  type='number'
                  min='0'
                  value={bemEstar.pausas}
                  onChange={(e) => setBemEstar({ ...bemEstar, pausas: parseInt(e.target.value) || 0 })}
                  className='p-2 border-b-2 border-neutral-500 focus:border-brand outline-0 w-20'
                />
              </label>
            </div>
            <div>
              <label className='flex flex-col text-xl font-semibold'>Como foi seu dia?</label>
              <textarea
                value={bemEstar.descricao}
                onChange={(e) => setBemEstar({ ...bemEstar, descricao: e.target.value })}
                rows={3}
                className='p-2 w-full border-2 border-neutral-500 focus:border-brand outline-0 rounded font-light'
              />
            </div>
          </div>
        </div>
        <button
          disabled={loadingBemEstar}
          className={`flex w-fit px-3 py-1.5 gap-3 items-center self-end rounded text-lg text-white font-semibold cursor-pointer ${
            loadingBemEstar ? "bg-gray-400 cursor-not-allowed" : "bg-brand hover:bg-brand-hover focus:bg-brand-focus"
          }`}>
          {loadingBemEstar ? "Salvando..." : "Salvar Check-in"}
          <img src='/Icons/check.svg' className='h-6' />
        </button>
      </div>
    </div>
  );
}

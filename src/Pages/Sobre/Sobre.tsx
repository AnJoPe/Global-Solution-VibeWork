import { useState } from "react";

export default function Sobre() {
  const [aberta, setAberta] = useState(false);

  return (
    <>
      <div className='flex flex-col w-[85%] py-12 items-center gap-10'>
        <h2 className='text-4xl font-semibold self-start'>Quem Somos</h2>
        <div className='flex flex-col w-full gap-5 px-10 text-xl'>
          <p>
            A VibeWork é uma plataforma criada para ajudar profissionais, equipes e empresas que atuam no modelo híbrido a manter o equilíbrio entre produtividade e
            bem-estar. Frente aos desafios de alternar entre dias de trabalho remoto e presencial, reunimos, em um só lugar, ferramentas para organizar a rotina,
            monitorar pausas, registrar o humor e analisar métricas sobre o equilíbrio entre vida pessoal e profissional.
          </p>
          <p>
            Nosso diferencial está em unir planejamento da rotina híbrida, check-ins de bem-estar e análises personalizadas em uma experiência digital prática, intuitiva
            e humana. Acreditamos que produtividade e saúde mental caminham juntas, por isso colocamos o bem-estar emocional no centro do VibeWork. Queremos que cada
            pessoa ou equipe possa planejar melhor os dias de trabalho, os momentos de pausa e o autocuidado — tudo com tecnologia de ponta, acessível do web ao mobile.
          </p>
          <p>
            Além de apoiar o profissional autônomo, a VibeWork oferece relatórios e indicadores para empresas que desejam investir em ambientes mais saudáveis, promovendo
            uma cultura de produtividade equilibrada.
          </p>
        </div>
        <h2 className='text-4xl font-semibold self-start'>Perguntas Frequentes</h2>
        <div className='flex flex-col w-full gap-5 px-10'>
          <div className='flex flex-col px-3 w-full bg-surface-primary dark:bg-surface-secondary rounded shadow-md self-center transition-all duration-400'>
            <div className='flex px-2 py-3 justify-between items-center text-secondary' onClick={() => setAberta((prev) => !prev)}>
              <h3 className='font-medium text-[1.7rem] select-none transition-all duration-400'>
                O VibeWork é apenas um organizador de tarefas?
              </h3>
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
              <p className='text-tertiary text-justify font-base text-xl px-1.5 pb-3'>
                Não. O VibeWork vai além das agendas convencionais: integra planejamento semanal entre remoto e presencial, envia lembretes personalizados de pausa,
                permite check-ins de humor e bem-estar, e oferece dashboards com métricas para autoconhecimento. Tudo pensado para promover um equilíbrio saudável na
                rotina profissional e pessoal.
              </p>
            </div>
          </div>
          <div className='flex flex-col px-3 w-full bg-surface-primary dark:bg-surface-secondary rounded shadow-md self-center transition-all duration-400'>
            <div className='flex px-2 py-3 justify-between items-center text-secondary' onClick={() => setAberta((prev) => !prev)}>
              <h3 className='font-medium text-[1.7rem] select-none transition-all duration-400'>
                Meus dados e registros ficam privados?
              </h3>
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
              <p className='text-tertiary text-justify font-base text-xl px-1.5 pb-3'>
                Sim. Todos os dados de rotina, bem-estar e produtividade salvos no VibeWork pertencem apenas ao usuário. Não são compartilhados com terceiros ou com a
                empresa, exceto se o próprio usuário optar por algum recurso empresarial ou relatório coletivo em um plano corporativo.
              </p>
            </div>
          </div>
          <div className='flex flex-col px-3 w-full bg-surface-primary dark:bg-surface-secondary rounded shadow-md self-center transition-all duration-400'>
            <div className='flex px-2 py-3 justify-between items-center text-secondary' onClick={() => setAberta((prev) => !prev)}>
              <h3 className='font-medium text-[1.7rem] select-none transition-all duration-400'>
                Posso personalizar meus horários, notificações e tipos de pausa?
              </h3>
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
              <p className='text-tertiary text-justify font-base text-xl px-1.5 pb-3'>
                Sim! O VibeWork permite que cada usuário ajuste sua agenda, configure horários de trabalho ou folga, defina tipos e frequência das pausas, além de receber
                notificações conforme sua preferência.
              </p>
            </div>
          </div>
          <div className='flex flex-col px-3 w-full bg-surface-primary dark:bg-surface-secondary rounded shadow-md self-center transition-all duration-400'>
            <div className='flex px-2 py-3 justify-between items-center text-secondary' onClick={() => setAberta((prev) => !prev)}>
              <h3 className='font-medium text-[1.7rem] select-none transition-all duration-400'>
                O sistema funciona para quem trabalha só presencialmente ou só remotamente?
              </h3>
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
              <p className='text-tertiary text-justify font-base text-xl px-1.5 pb-3'>
                Sim. Embora VibeWork seja ideal para regimes híbridos, qualquer profissional pode usar a plataforma para organizar a própria rotina, fazer registros de
                bem-estar e acompanhar seus hábitos de trabalho, independentemente do formato de atuação.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

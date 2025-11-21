import { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format } from "date-fns/format";
import { parse } from "date-fns/parse";
import { startOfWeek } from "date-fns/startOfWeek";
import { getDay } from "date-fns/getDay";
import { ptBR } from "date-fns/locale/pt-BR";
import { addHours } from "date-fns/addHours";
import "react-big-calendar/lib/css/react-big-calendar.css";
import type { CalendarEvent } from "../../Types/CalendarEvent";
import CardEvento from "../../Components/Cards/CardEvento";

const API_URL = "https://api-vibe-work.onrender.com/";

export default function Home() {
  const userId = localStorage.getItem("userId");
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [rotinaSemanal, setRotinaSemanal] = useState<Record<string, string> | null>(null);
  const [bemEstar, setBemEstar] = useState({ energia: 0, pausas: 0, estresse: 0, descricao: "" });
  const [loadingBemEstar, setLoadingBemEstar] = useState(false);
  const [mostrarFormEvento, setMostrarFormEvento] = useState(false);
  const [loadingEvento, setLoadingEvento] = useState(false);
  const [formEvento, setFormEvento] = useState({
    titulo: "",
    descricao: "",
    data: "",
    idEdicao: null as number | null,
  });

  useEffect(() => {
    if (!userId) return;

    fetch(API_URL + `evento_calendario/${userId}`)
      .then((r) => r.json())
      .then((data: any[]) => {
        const convertedEvents = data.map((evento) => {
          const dataInicio = new Date(evento.data);
          const dataFim = addHours(dataInicio, 1);
          return {
            id: evento.id,
            title: evento.titulo,
            start: dataInicio,
            end: dataFim,
            desc: evento.descricao,
          };
        });
        setEvents(convertedEvents);
      })
      .catch((err) => console.error("Erro ao buscar eventos:", err));
  }, [userId]);

  useEffect(() => {
    if (!userId) return;

    fetch(API_URL + `rotina_semanal/id_usuario/${userId}`)
      .then((r) => r.json())
      .then((data) => {
        setRotinaSemanal({
          segunda: data.segunda,
          terca: data.terca,
          quarta: data.quarta,
          quinta: data.quinta,
          sexta: data.sexta,
          sabado: data.sabado,
          domingo: data.domingo,
        });
      })
      .catch((err) => console.error("Erro ao buscar rotina:", err));
  }, [userId]);

  const handleAdicionarEvento = async () => {
    if (!userId || !formEvento.titulo || !formEvento.data) {
      alert("Preencha título e data");
      return;
    }

    setLoadingEvento(true);
    try {
      const response = await fetch(API_URL + "evento_calendario", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          titulo: formEvento.titulo,
          descricao: formEvento.descricao,
          data: new Date(formEvento.data).toISOString(),
          usuario: { id: userId },
        }),
      });

      if (response.ok) {
        const eventoResponse = await fetch(API_URL + `evento_calendario/${userId}`);
        const eventosAtualizados: any[] = await eventoResponse.json();

        const convertedEvents = eventosAtualizados.map((evento) => {
          const dataInicio = new Date(evento.data);
          const dataFim = addHours(dataInicio, 1);
          return {
            id: evento.id,
            title: evento.titulo,
            start: dataInicio,
            end: dataFim,
            desc: evento.descricao,
          };
        });

        setEvents(convertedEvents);
        setFormEvento({ titulo: "", descricao: "", data: "", idEdicao: null });
        setMostrarFormEvento(false);
        alert("Evento adicionado!");
      } else {
        alert("Erro ao adicionar evento");
      }
    } catch (error) {
      console.error(error);
      alert("Erro na requisição");
    } finally {
      setLoadingEvento(false);
    }
  };

  const handleEditEvento = (id: number) => {
    const evento = events.find((e) => e.id === id);
    if (evento) {
      setFormEvento({
        titulo: evento.title,
        descricao: evento.desc || "",
        data: "", // opcional, não usado na edição
        idEdicao: id,
      });
      setMostrarFormEvento(true);
    }
  };

  const handleAtualizarEvento = async () => {
    if (!formEvento.idEdicao) return;

    setLoadingEvento(true);
    try {
      const response = await fetch(API_URL + "evento_calendario", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: formEvento.idEdicao,
          titulo: formEvento.titulo,
          descricao: formEvento.descricao,
          usuario: { id: userId },
        }),
      });

      if (response.ok) {
        const eventoResponse = await fetch(API_URL + `evento_calendario/${userId}`);
        const eventosAtualizados: any[] = await eventoResponse.json();

        const convertedEvents = eventosAtualizados.map((evento) => {
          const dataInicio = new Date(evento.data);
          const dataFim = addHours(dataInicio, 1);
          return {
            id: evento.id,
            title: evento.titulo,
            start: dataInicio,
            end: dataFim,
            desc: evento.descricao,
          };
        });

        setEvents(convertedEvents);
        setFormEvento({ titulo: "", descricao: "", data: "", idEdicao: null });
        setMostrarFormEvento(false);
        alert("Evento atualizado!");
      } else {
        alert("Erro ao atualizar evento");
      }
    } catch (error) {
      console.error(error);
      alert("Erro na requisição");
    } finally {
      setLoadingEvento(false);
    }
  };

  const handleDeleteEvento = async (id: number) => {
    if (!confirm("Tem certeza que deseja deletar?")) return;

    try {
      const response = await fetch(API_URL + `evento_calendario/${id}`, { method: "DELETE" });

      if (response.ok) {
        const eventoResponse = await fetch(API_URL + `evento_calendario/${userId}`);
        const eventosAtualizados: any[] = await eventoResponse.json();

        const convertedEvents = eventosAtualizados.map((evento) => {
          const dataInicio = new Date(evento.data);
          const dataFim = addHours(dataInicio, 1);
          return {
            id: evento.id,
            title: evento.titulo,
            start: dataInicio,
            end: dataFim,
            desc: evento.descricao,
          };
        });

        setEvents(convertedEvents);
        alert("Evento deletado!");
      } else {
        alert("Erro ao deletar evento");
      }
    } catch (error) {
      console.error(error);
      alert("Erro na requisição");
    }
  };

  const handleSalvarBemEstar = async () => {
    if (!userId || bemEstar.energia === 0 || bemEstar.estresse === 0) {
      alert("Selecione um nível de bem-estar");
      return;
    }

    setLoadingBemEstar(true);

    try {
      const response = await fetch(API_URL + "relatorio_bem_estar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nivelEnergia: bemEstar.energia,
          quantidadePausas: bemEstar.pausas,
          nivelEstresse: bemEstar.estresse,
          descricao: bemEstar.descricao,
          usuario: { id: userId },
        }),
      });

      if (response.ok) {
        alert("Check-in salvo com sucesso!");
        setBemEstar({ energia: 0, pausas: 0, estresse: 0, descricao: "" });
      } else {
        alert("Erro ao salvar check-in");
      }
    } catch (error) {
      console.error(error);
      alert("Erro na requisição");
    } finally {
      setLoadingBemEstar(false);
    }
  };

  return (
    <div className='flex flex-col w-[90%] md:w-[85%] py-12 items-center gap-5'>
      <h2 className='text-2xl md:text-3xl lg:text-4xl font-semibold self-start'>Agenda de Trabalho</h2>
      <div className='flex flex-col lg:flex-row w-full gap-5 text-sm md:text-base lg:text-lg mb-5'>
        <div className='w-full lg:w-3/5 px-5 md:px-8 py-2.5 md:py-4 bg-surface-primary dark:bg-surface-secondary rounded transition-all duration-400'>
          <Calendar
            views={["month", "week", "day"]}
            defaultView='month'
            messages={{
              next: "Próximo",
              previous: "Anterior",
              today: "Hoje",
              month: "Mês",
              week: "Semana",
              day: "Dia",
            }}
            events={events}
            localizer={localizer}
            style={{ height: typeof window !== "undefined" && window.innerWidth < 640 ? "60vh" : window.innerWidth < 768 ? "50vh" : "70vh" }}
          />
        </div>
        <div className='flex flex-col w-full lg:w-2/5 gap-5'>
          <div className='w-full grow px-5 md:px-8 py-2.5 md:py-4 bg-surface-primary dark:bg-surface-secondary rounded transition-all duration-400'>
            <h3 className='text-lg md:text-xl font-semibold mb-3'>Eventos</h3>
            <div className='flex flex-col gap-3 max-h-96 overflow-y-auto'>
              {events.length === 0 ? (
                <p className='text-secondary text-sm'>Nenhum evento cadastrado</p>
              ) : (
                events.map((event) => <CardEvento key={event.id} evento={event} onDelete={handleDeleteEvento} onEdit={handleEditEvento} />)
              )}
            </div>
            <hr className='border border-brand rounded my-5' />
            <div>
              <button
                onClick={() => setMostrarFormEvento(!mostrarFormEvento)}
                className='w-full px-3 py-1.5 bg-brand hover:bg-brand-hover focus:bg-brand-focus rounded text-white text-base font-semibold cursor-pointer'>
                {mostrarFormEvento ? "Cancelar" : "Novo Evento"}
              </button>
              {mostrarFormEvento && (
                <div className='flex flex-col gap-3 pt-3'>
                  <input
                    type='text'
                    placeholder='Título do evento'
                    value={formEvento.titulo}
                    onChange={(e) => setFormEvento({ ...formEvento, titulo: e.target.value })}
                    className='p-2 text-sm border-b-2 border-neutral-500 focus:border-brand outline-0'
                  />
                  <input
                    type='text'
                    placeholder='Descrição'
                    value={formEvento.descricao}
                    onChange={(e) => setFormEvento({ ...formEvento, descricao: e.target.value })}
                    className='p-2 text-sm border-b-2 border-neutral-500 focus:border-brand outline-0'
                  />
                  {!formEvento.idEdicao && (
                    <input
                      type='datetime-local'
                      value={formEvento.data}
                      onChange={(e) => setFormEvento({ ...formEvento, data: e.target.value })}
                      className='p-2 text-sm border-b-2 border-neutral-500 focus:border-brand outline-0'
                    />
                  )}
                  <button
                    onClick={formEvento.idEdicao ? handleAtualizarEvento : handleAdicionarEvento}
                    disabled={loadingEvento}
                    className={`px-3 py-1.5 rounded text-white text-base font-semibold cursor-pointer ${
                      loadingEvento ? "bg-gray-400 cursor-not-allowed" : "bg-success-400 hover:bg-success-500"
                    }`}>
                    {loadingEvento ? "Salvando..." : formEvento.idEdicao ? "Atualizar" : "Adicionar"}
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className='w-full px-5 md:px-8 py-2.5 md:py-4 bg-surface-primary dark:bg-surface-secondary rounded transition-all duration-400'>
            {rotinaSemanal ? (
              <div className='flex flex-col gap-2 text-base'>
                <div className='flex justify-between'>
                  <span>Segunda-Feira:</span>
                  <span className='font-semibold'>{rotinaSemanal.segunda}</span>
                </div>
                <div className='flex justify-between'>
                  <span>Terça-Feira:</span>
                  <span className='font-semibold'>{rotinaSemanal.terca}</span>
                </div>
                <div className='flex justify-between'>
                  <span>Quarta-Feira:</span>
                  <span className='font-semibold'>{rotinaSemanal.quarta}</span>
                </div>
                <div className='flex justify-between'>
                  <span>Quinta-Feira:</span>
                  <span className='font-semibold'>{rotinaSemanal.quinta}</span>
                </div>
                <div className='flex justify-between'>
                  <span>Sexta-Feira:</span>
                  <span className='font-semibold'>{rotinaSemanal.sexta}</span>
                </div>
                <div className='flex justify-between'>
                  <span>Sábado:</span>
                  <span className='font-semibold'>{rotinaSemanal.sabado}</span>
                </div>
                <div className='flex justify-between'>
                  <span>Domingo:</span>
                  <span className='font-semibold'>{rotinaSemanal.domingo}</span>
                </div>
              </div>
            ) : (
              <p className='text-secondary'>Nenhuma rotina cadastrada</p>
            )}
          </div>
        </div>
      </div>
      <h2 className='text-2xl md:text-3xl lg:text-4xl font-semibold self-start'>Check-in de Bem-estar</h2>
      <div className='flex flex-col w-full gap-8 px-5 md:px-10 py-2.5 md:py-5 bg-surface-primary dark:bg-surface-secondary rounded transition-all duration-400'>
        <div className='flex flex-col md:flex-row gap-10 md:gap-0'>
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
                    <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' className='h-6 md:h-7'>
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
                    <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' className='h-6 md:h-7'>
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
                    <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' className='h-6 md:h-7'>
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
                    <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' className='h-6 md:h-7'>
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
                    <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' className='h-6 md:h-7'>
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
                    <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' className='h-6 md:h-7'>
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
                    <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' className='h-6 md:h-7'>
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
                    <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' className='h-6 md:h-7'>
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
                    <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' className='h-6 md:h-7'>
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
                    <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' className='h-6 md:h-7'>
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
          onClick={handleSalvarBemEstar}
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

const locales = { "pt-BR": ptBR };
const localizer = dateFnsLocalizer({ format, parse, startOfWeek, getDay, locales });

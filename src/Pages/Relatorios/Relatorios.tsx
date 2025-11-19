import { useEffect, useState } from "react";

interface RelatorioBemEstar {
  id: number;
  data: string;
  nivelEnergia: number;
  quantidadePausas: number;
  nivelEstresse: number;
  descricao: string;
}

interface RelatorioProdutividade {
  id: number;
  data: string;
  horasTrabalhadas: number;
  qntdDiasPresenciais: number;
  qntdDiasRemotos: number;
  descricao: string;
}

const API_URL = "https://api-vibe-work.onrender.com/";

export default function Relatorios() {
  const userId = localStorage.getItem("userId");
  const [relatoriosBemEstar, setRelatoriosBemEstar] = useState<RelatorioBemEstar[]>([]);
  const [relatoriosProdutividade, setRelatoriosProdutividade] = useState<RelatorioProdutividade[]>([]);
  const [loadingBemEstar, setLoadingBemEstar] = useState(true);
  const [loadingProdutividade, setLoadingProdutividade] = useState(true);

  useEffect(() => {
    if (!userId) return;

    fetch(API_URL + `relatorio_bem_estar/${userId}`)
      .then((r) => r.json())
      .then((data) => setRelatoriosBemEstar(data))
      .catch((err) => console.error("Erro ao buscar bem-estar:", err))
      .finally(() => setLoadingBemEstar(false));

    fetch(API_URL + `relatorio_produtividade/${userId}`)
      .then((r) => r.json())
      .then((data) => setRelatoriosProdutividade(data))
      .catch((err) => console.error("Erro ao buscar produtividade:", err))
      .finally(() => setLoadingProdutividade(false));
  }, [userId]);

  const handleDeleteBemEstar = async (id: number) => {
    if (!confirm("Tem certeza que deseja deletar?")) return;

    try {
      const response = await fetch(API_URL + `relatorio_bem_estar/${id}`, { method: "DELETE" });
      if (response.ok) {
        setRelatoriosBemEstar(relatoriosBemEstar.filter((r) => r.id !== id));
        alert("Relatório deletado!");
      } else {
        alert("Erro ao deletar");
      }
    } catch (error) {
      console.error(error);
      alert("Erro na requisição");
    }
  };

  const handleDeleteProdutividade = async (id: number) => {
    if (!confirm("Tem certeza que deseja deletar?")) return;

    try {
      const response = await fetch(API_URL + `relatorio_produtividade/${id}`, { method: "DELETE" });
      if (response.ok) {
        setRelatoriosProdutividade(relatoriosProdutividade.filter((r) => r.id !== id));
        alert("Relatório deletado!");
      } else {
        alert("Erro ao deletar");
      }
    } catch (error) {
      console.error(error);
      alert("Erro na requisição");
    }
  };

  return (
    <div className='flex flex-col w-[90%] md:w-[85%] py-12 items-center gap-10'>
      <div className='flex flex-col w-full gap-5'>
        <h2 className='text-2xl md:text-3xl lg:text-4xl font-semibold self-start'>Relatórios de Bem-estar</h2>
        {loadingBemEstar ? (
          <p className='text-secondary'>Carregando...</p>
        ) : relatoriosBemEstar.length === 0 ? (
          <p className='text-secondary'>Nenhum relatório encontrado</p>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
            {relatoriosBemEstar.map((relatorio) => (
              <div key={relatorio.id} className='p-5 bg-surface-primary dark:bg-surface-secondary rounded border-l-4 border-brand'>
                <div className='flex justify-between items-start mb-3'>
                  <p className='font-semibold text-sm'>{new Date(relatorio.data).toLocaleDateString("pt-BR", { timeZone: "UTC" })}</p>
                  <button onClick={() => handleDeleteBemEstar(relatorio.id)} className='text-error-500 hover:text-error-600'>
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
            ))}
          </div>
        )}
      </div>
      <div className='flex flex-col w-full gap-5'>
        <h2 className='text-2xl md:text-3xl lg:text-4xl font-semibold self-start'>Relatórios de Produtividade</h2>
        {loadingProdutividade ? (
          <p className='text-secondary'>Carregando...</p>
        ) : relatoriosProdutividade.length === 0 ? (
          <p className='text-secondary'>Nenhum relatório encontrado</p>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
            {relatoriosProdutividade.map((relatorio) => (
              <div key={relatorio.id} className='p-5 bg-surface-primary dark:bg-surface-secondary rounded border-l-4 border-brand'>
                <div className='flex justify-between items-start mb-3'>
                  <p className='font-semibold text-sm'>{new Date(relatorio.data).toLocaleDateString("pt-BR", { timeZone: "UTC" })}</p>
                  <button onClick={() => handleDeleteProdutividade(relatorio.id)} className='text-error-500 hover:text-error-600'>
                    <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' className='h-5'>
                      <path d='M18 6L6 18M6 6L18 18' />
                    </svg>
                  </button>
                </div>
                <div className='flex flex-col gap-2 text-sm mb-3'>
                  <div className='flex justify-between'>
                    <span>Horas trabalhadas:</span>
                    <span className='font-semibold'>{relatorio.horasTrabalhadas}h</span>
                  </div>
                  <div className='flex justify-between'>
                    <span>Dias presenciais:</span>
                    <span className='font-semibold'>{relatorio.qntdDiasPresenciais}</span>
                  </div>
                  <div className='flex justify-between'>
                    <span>Dias remotos:</span>
                    <span className='font-semibold'>{relatorio.qntdDiasRemotos}</span>
                  </div>
                </div>
                <p className='text-xs text-secondary'>{relatorio.descricao}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

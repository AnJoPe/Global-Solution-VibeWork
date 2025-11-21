import { useEffect, useState } from "react";
import CardBemEstar from "../../Components/Cards/CardBemEstar";
import CardProdutividade from "../../Components/Cards/CardProdutividade";
import type { RelatorioBemEstar, RelatorioProdutividade } from "../../Types/Relatorios";

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
              <CardBemEstar key={relatorio.id} relatorio={relatorio} onDelete={handleDeleteBemEstar} />
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
              <CardProdutividade key={relatorio.id} relatorio={relatorio} onDelete={handleDeleteProdutividade} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

import Integrante from "../../Components/Integrante/Integrante";

export default function Integrantes() {
  return (
    <>
      <div className='flex flex-col py-12 items-center gap-6 lg:flex-row lg:flex-wrap lg:justify-center xl:gap-10'>
        <Integrante
          imagem='/Integrantes/andre_rosa.png'
          nome='André Rosa Colombo'
          rm='563112'
          github='https://github.com/AndreColombo'
          linkedin='https://www.linkedin.com/in/andrerosacolombo'
        />
        <Integrante
          imagem='/Integrantes/jose_diogo.png'
          nome='José Diogo da Silva Neves'
          rm='562341'
          github='https://github.com/ZeDio'
          linkedin='https://www.linkedin.com/in/jos%C3%A9-diogo-d-33634b280'
        />
        <Integrante
          imagem='/Integrantes/pedro_miranda.png'
          nome='Pedro Henrique M. de Vasconcelos'
          rm='562682'
          github='https://github.com/pmiranda27'
          linkedin='https://www.linkedin.com/in/pedro-henrique-miranda-de-vasconcelos/'
        />
      </div>
    </>
  );
}

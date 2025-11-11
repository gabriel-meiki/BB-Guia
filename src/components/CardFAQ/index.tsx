import beneficiosIcon from "../../assets/beneficios-icon.svg";
import liberacaoServicos from "../../assets/liberar-servicos.svg";
import senhaIcon from "../../assets/senha-icon.svg";

import './styles.css';

export function CardFAQ({ servico }) {
  // Função para determinar o ícone com base no serviço
  const getIcon = (servico) => {
    switch (servico) {
      case "Pegar benefícios":
        return <img src={beneficiosIcon} alt="Ícone de Benefícios" className="icone" />;
      case "Liberação de serviços":
        return <img src={liberacaoServicos} alt="Ícone de Depósito" className="icone" />;
      case "Recuperar Acesso":
        return <img src={senhaIcon} alt="Ícone de recuperar acesso" className="icone" />;
      default:
        return null; // Não renderiza ícone se o serviço não for reconhecido
    }
  };

  return (
    <a href="/tutorial" className="card-faq">
      {getIcon(servico)}
      <span>{servico}</span>
    </a>
  );
}
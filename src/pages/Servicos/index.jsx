import { CardFAQ } from "../../components/CardFAQ";
import { HeaderDiferente } from "../../components/Header2/HeaderDiferente";
import './styles.css'

export function Servicos(){
    const nomeComunidade = localStorage.getItem("comunidade");
    let nomesServicos = []

    switch (nomeComunidade) {
        case "tukano":
            nomesServicos = ['Dinheiro missé', 'Serviço missé', 'Senha arpaturí ahposé']
            break;
    
        default:
            nomesServicos = ['Pegar Benefícios', 'Liberação de Serviços', 'Recuperar Acesso']
            break;
    }

    return(
        <>
            <HeaderDiferente titulo="Serviços"/>
            <main id="cards-faq">
                <div className="cards">
                    {nomesServicos.map((servico) => (
                        <CardFAQ servico={servico}/>
                    ))}
                </div>
            </main>
        </>
    )
}
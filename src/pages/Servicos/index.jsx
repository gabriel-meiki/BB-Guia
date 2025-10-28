import { CardFAQ } from "../../components/CardFAQ";
import { HeaderDiferente } from "../../components/Header2/HeaderDiferente";
import './styles.css'

export function Servicos(){
    return(
        <>
            <HeaderDiferente titulo="Serviços"/>
            <main id="cards-faq">
                <div className="cards">
                    <CardFAQ servico="Pegar benefícios"/>
                    <CardFAQ servico="Recuperar Acesso"/>
                    {/* <CardFAQ servico="Depositar"/> */}
                    <CardFAQ servico="Liberação de serviços"/>
                    {/* <CardFAQ servico="Juros"/> */}
                </div>
            </main>
        </>
    )
}
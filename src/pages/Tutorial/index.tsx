import { HeaderDiferente } from "../../components/Header2/HeaderDiferente";
import './styles.css'

export function Tutorial(){

    let titulo = "Tutorial"
    
    return(
        <>
            <HeaderDiferente titulo={titulo} />
            <main id="video">
                <iframe src="https://youtube.com/embed/GBG5eWsc-Dw?si=j9D1cw5lJWJkQ-No" height={528} frameborder="0" >


                </iframe>
            </main>
        </>
    )
}
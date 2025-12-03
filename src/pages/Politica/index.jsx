import { HeaderTerceiro } from "../../components/Header3";

export function Politicas(){
    

    return(
        <>
            <HeaderTerceiro titulo="Politicas de Privacidade" caminho={"/tutorial/0"}/> 
            <main className="politica">
                <h1 className="text-2xl md:text-3xl font-bold text-center mb-6">
                Termos e Condições de Uso – Exemplo (Mockup Sem Valor Legal)
                          </h1>
                
                          {/* AVISO IMPORTANTE - Exatamente como na imagem */}
                          <div className="bg-yellow-50 border-l-8 border-yellow-500 p-6 mb-10">
                <p className="font-black text-lg flex items-start gap-3">
                  <span>AVISO IMPORTANTE:</span>
                </p>
                <p className="mt-3 text-black leading-snug">
                  Este documento é apenas um exemplo ilustrativo, preparado com fins de demonstração.
                  Não possui validade jurídica, não substitui análise legal e não deve ser utilizado
                  como termo oficial sem revisão jurídica especializada.
                </p>
                          </div>
                
                          <section className="mb-8">
                <h2 className="text-xl font-bold mb-3">1. Sobre o Aplicativo</h2>
                <p>
                  O aplicativo (“Aplicativo”) permite que usuários gravem áudios com o objetivo de explicar,
                  descrever ou detalhar etapas de um processo específico. As gravações podem ser armazenadas,
                  reproduzidas, transcritas ou compartilhadas conforme as funcionalidades disponibilizadas.
                </p>
                          </section>
                
                          <section className="mb-8">
                <h2 className="text-xl font-bold mb-3">2. Aceitação dos Termos</h2>
                <p>
                  Ao utilizar o Aplicativo, o usuário declara estar ciente de que estes Termos são um exemplo
                  e não constituem contrato real. A versão final exigirá aceite de Termos juridicamente válidos.
                </p>
                          </section>
                
                          <section className="mb-8">
                <h2 className="text-xl font-bold mb-3">3. Uso Permitido</h2>
                <p>
                  O usuário poderá utilizar o Aplicativo exclusivamente para finalidades relacionadas à gravação
                  de áudios explicativos. É proibido utilizar o Aplicativo para finalidades ilegais, ofensivas
                  ou que violem direitos de terceiros.
                </p>
                          </section>
                
                          <section className="mb-8">
                <h2 className="text-xl font-bold mb-3">4. Gravação e Armazenamento de Áudio</h2>
                <p className="mb-4">
                  <strong>4.1.</strong> O Aplicativo poderá solicitar acesso ao microfone para permitir a gravação
                  de áudio. Como este é um mockup, nenhuma gravação será efetivamente armazenada.
                </p>
                <p>
                  <strong>4.2.</strong> Ao utilizar a ferramenta colaborativa (gravação de voz em idioma indígena),
                  o usuário autoriza, de forma livre, informada e inequívoca, a captação, processamento, reprodução
                  e utilização de sua voz exclusivamente para viabilizar as funcionalidades do Aplicativo.
                </p>
                          </section>
                
                          <section className="mb-8">
                <h2 className="text-xl font-bold mb-4">5. Cláusulas Específicas de LGPD</h2>
                <h3 className="text-lg font-bold mb-2">5.1 Coleta de Dados Pessoais</h3>
                <p className="mb-4">
                  O Aplicativo poderá coletar dados pessoais, incluindo voz gravada, nome de usuário, dados
                  de dispositivo e outras informações necessárias para seu funcionamento.
                </p>
                <h3 className="text-lg font-bold mb-2">5.2 Finalidade do Tratamento</h3>
                <p className="mb-4">
                  Os dados serão tratados exclusivamente para permitir a gravação, armazenamento, transcrição
                  ou compartilhamento de áudios conforme as funcionalidades do Aplicativo.
                </p>
                <h3 className="text-lg font-bold mb-2">5.3 Base Legal</h3>
                <p className="mb-4">
                  O tratamento de dados pessoais poderá ocorrer com base no consentimento do usuário e/ou na
                  execução de funcionalidades solicitadas, conforme previsto na Lei 13.709/2018 (LGPD).
                </p>
                <h3 className="text-lg font-bold mb-2">5.4 Direitos do Titular</h3>
                <p className="mb-4">
                  O usuário poderá, a qualquer momento, solicitar acesso, correção, anonimização, portabilidade
                  ou exclusão dos dados pessoais tratados, conforme previsto na LGPD.
                </p>
                <h3 className="text-lg font-bold mb-2">5.5 Compartilhamento de Dados</h3>
                <p className="mb-4">
                  Os dados pessoais poderão ser compartilhados apenas com terceiros estritamente necessários
                  para o funcionamento do Aplicativo, como serviços de armazenamento ou transcrição.
                </p>
                <h3 className="text-lg font-bold mb-2">5.6 Segurança da Informação</h3>
                <p className="mb-4">
                  Serão adotadas medidas técnicas e administrativas para proteger os dados pessoais contra
                  acessos não autorizados, destruição, perda ou alteração.
                </p>
                <h3 className="text-lg font-bold mb-2">5.7 Retenção e Eliminação</h3>
                <p className="mb-4">
                  Os dados pessoais serão armazenados pelo tempo necessário para a execução das funcionalidades
                  do Aplicativo ou conforme exigido por lei.
                </p>
                          </section>
                
                          <section className="mb-8">
                <h2 className="text-xl font-bold mb-3">6. Direitos Autorais</h2>
                <p>
                  Todo o conteúdo, interface e funcionalidades demonstradas pertencem à empresa desenvolvedora
                  fictícia. Este mockup não implica qualquer transferência de direitos.
                </p>
                          </section>
                
                          <section className="mb-8">
                <h2 className="text-xl font-bold mb-3">7. Responsabilidades</h2>
                <p>
                  Este documento não cria obrigações reais. As versões finais deverão detalhar responsabilidades
                  da empresa e do usuário.
                </p>
                          </section>
                
                          <section className="mb-8">
                <h2 className="text-xl font-bold mb-3">8. Atualizações</h2>
                <p>
                  O Aplicativo poderá ser atualizado a qualquer momento. Este documento não reflete necessariamente
                  a versão final dos Termos.
                </p>
                          </section>
            </main>
        </>
    )
}
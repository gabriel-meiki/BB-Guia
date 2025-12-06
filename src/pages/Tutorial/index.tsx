import { h } from 'preact';
import { useRoute } from 'preact-iso';
import { useState, useRef, useEffect } from 'preact/hooks';
import { HeaderTerceiro } from '../../components/Header3';
import { AudioExplica } from '../../components/AudioExplica';
import { ModalEnviaAudio } from '../../components/ModalEnvioAudio';
import YouTube from 'react-youtube'; // ← funciona com Preact também
import './styles.css';

const videos = [
    {
        id: 0,
        idServico: '6930ef55fcb87172a2425cc2',
        servico: "pegar-beneficios",
        linkVideoYoutube: "98X02Dz6yfI"
    },

    {
        id: 1,
        idServico: '6932ed74e00f66a21fb37075',
        servico: "liberacao-servicos",
        linkVideoYoutube: "F-wOvzPQ2DM"
    },
    {
        id: 2,
        idServico: '6930045b38c86ebe11b44575',
        servico: "recuperar-acesso",
        linkVideoYoutube: "lxzbI2nio3s"
    },

]

export function Tutorial() {
    const {params} = useRoute();


    const titulo = 'Tutorial';

    // Estado do modal (seu código original)
    const [isModalOpen, setIsModalOpen] = useState(false);

    const comunidade = localStorage.getItem("comunidade");
    const videoId = videos[params.id].linkVideoYoutube; // seu vídeo

    const [audios, setAudios] = useState([])

    // === CONTROLE DO PLAYER DO YOUTUBE ===
    const playerRef = useRef<any>(null);        // guarda a instância do player
    const [playerReady, setPlayerReady] = useState(false);

    const opts = {
        height: '390',
        width: '640',
        playerVars: {
            autoplay: 0,        // não começa sozinho
            playsinline: 1,
            rel: 0,
            modestbranding: 1,
        } as const,
    };

    const onPlayerReady = (event: any) => {
    playerRef.current = event.target;
    setPlayerReady(true);
    };

    // Função que será passada para o AudioExplica e AudioExplica conectado com o vídeo do youtube
    const handleAudioPlay = () => {
        if (playerRef.current && playerReady) {
            playerRef.current.seekTo(0);
            playerRef.current.playVideo();
            playerRef.current.mute();

            // Opcional: rola suavemente até o vídeo
            document.querySelector('#video')?.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
    };

    const handleAudioPauseOrEnd = () => {
        if (playerRef.current && playerReady) {
            playerRef.current.pauseVideo();  // pausa o YouTube
        }
    };

    // Funções do modal (mantidas iguais)
    const openModal = () => (
        setIsModalOpen(true)
    );

    const fetchAudios = async () => {
        try {
            const responseAudios = await fetch('https://resid-ncia-banco-do-brasil-porto-digital.onrender.com/api/audios');
            const dados = await responseAudios.json();
            const dadosFiltradosComunidade = dados.filter((dado) => {
                return dado.community == comunidade && dado.serviceId == videos[params.id].idServico
            })

            setAudios(dadosFiltradosComunidade);

            console.log(dadosFiltradosComunidade);
        } catch (error) {
            console.error("Erro ao buscar áudios:", error);
        }
    };

    useEffect(() => {
        fetchAudios()
        
    }, [])

    
    return (
        <>
            <HeaderTerceiro titulo={titulo} caminho={"/servicos"}/>
            <main id="video">
                {/* Player do YouTube controlado por botão */}
                <div style={{ 
                    maxWidth: '350px', 
                    margin: '0 auto 2rem auto',
                    borderRadius: '12px',
                    overflow: 'hidden',
                }}>
                    <YouTube
                        videoId={videoId}
                        opts={{
                            width: '350',
                            height: '198',
                            playerVars: { autoplay: 0, playsinline: 1, rel: 0 },
                        }}
                        onReady={onPlayerReady}
                    />
                </div>

                {/* Seção de áudios da comunidade */}
                <div className="audios">
                    <h3>Comunidade explica</h3>
                    <div className="audio">

                        {audios.length == 0 && <p>Este serviço ainda não tem aúdios da sua comunidade, clique em "Explicar" para gravar um aúdio colaborativo.</p>}

                        {audios.map((audio) => {
                            return <AudioExplica nome={audio.name} comunidade={audio.community} onAudioPlay={handleAudioPlay} onAudioPause={handleAudioPauseOrEnd} onAudioEnd={handleAudioPauseOrEnd} audioLink={`https://resid-ncia-banco-do-brasil-porto-digital.onrender.com/api/url/${audio.filename}`}/> 
                        })}
                        

                    </div>
                </div>


                {/* Botão para abrir o modal de gravação */}
                <div className="mandar-audio">
                    <button onClick={openModal}>Explicar</button>
                </div>

                {/* Seu modal (mantido exatamente como estava) */}
                {/* Modal */}
                <ModalEnviaAudio
                    isOpen={isModalOpen}
                    video={videoId}
                    onClose={() => {
                        setIsModalOpen(false)
                        fetchAudios()
                    }}
                    idServico={videos[params.id].idServico}
                />
                
            </main>
        </>
    );
}
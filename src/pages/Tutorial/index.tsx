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
        servico: "pegar-beneficios",
        linkVideoYoutube: "lxzbI2nio3s"
    },

    {
        id: 1,
        servico: "liberacao-servicos",
        linkVideoYoutube: "98X02Dz6yfI"
    },
    {
        id: 2,
        servico: "recuperar-acesso",
        linkVideoYoutube: "F-wOvzPQ2DM"
    },

]

export function Tutorial() {
    const {params} = useRoute();


    const titulo = 'Tutorial';

    // Estado do modal (seu código original)
    const [isModalOpen, setIsModalOpen] = useState(false);

    const comunidade = localStorage.getItem("comunidade");
    const videoId = videos[params.id].linkVideoYoutube; // seu vídeo

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
                        <AudioExplica nome="Maria" comunidade={comunidade} onAudioPlay={handleAudioPlay} onAudioPause={handleAudioPauseOrEnd} onAudioEnd={handleAudioPauseOrEnd}/>
                        
                        <AudioExplica nome="Ana" comunidade={comunidade} onAudioPlay={handleAudioPlay} onAudioPause={handleAudioPauseOrEnd} onAudioEnd={handleAudioPauseOrEnd}/>
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
                    onClose={() => setIsModalOpen(false)}
                />
                
            </main>
        </>
    );
}
import { h } from 'preact';
import { useState, useRef, useEffect } from 'preact/hooks';
import { HeaderTerceiro } from '../../components/Header3';
import { AudioExplica } from '../../components/AudioExplica';
import YouTube from 'react-youtube'; // ← funciona com Preact também
import './styles.css';

export function Tutorial() {
    const titulo = 'Tutorial';

    // Estado do modal (seu código original)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [step, setStep] = useState(1);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [consent, setConsent] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
    const [audioURL, setAudioURL] = useState<string | null>(null);
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);

    const comunidade = localStorage.getItem("comunidade");
    const videoId = "lxzbI2nio3s"; // seu vídeo

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

    // Função que será passada para o AudioExplica
    const handleAudioPlay = () => {
        if (playerRef.current && playerReady) {
            playerRef.current.playVideo();

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
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setIsModalOpen(false);
        setName('');
        setEmail('');
        setConsent(false);
        if (audioURL) URL.revokeObjectURL(audioURL);
        setAudioBlob(null);
        setAudioURL(null);
        setIsRecording(false);
        setStep(1);
    };

    const toggleRecording = async () => { /* seu código original */ };
    const reRecord = () => { /* seu código original */ };
    const handleNext = () => { /* seu código original */ };
    const handleSubmit = (e: Event) => { /* seu código original */ };

    // ... (mantenha todas as suas funções de gravação aqui)

    return (
        <>
            <HeaderTerceiro titulo={titulo} />
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
                {isModalOpen && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <h2>Enviar Explicação</h2>
                            <form onSubmit={handleSubmit}>
                                {step === 1 ? (
                                    <>
                                        <div className="user-info">
                                            <div className="form-group">
                                                <label htmlFor="name">Nome completo:</label>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    placeholder="Digite seu nome completo"
                                                    value={name}
                                                    onInput={(e: any) => setName(e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="email">Email:</label>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    placeholder="Digite seu email"
                                                    value={email}
                                                    onInput={(e: any) => setEmail(e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div className="form-group consent">
                                                <input
                                                    type="checkbox"
                                                    id="consent"
                                                    checked={consent}
                                                    onChange={(e: any) => setConsent(e.target.checked)}
                                                    required
                                                />
                                                <label htmlFor="consent">
                                                    Concordo com as <a href="/politicas">políticas de privacidade</a>
                                                </label>
                                            </div>
                                        </div>
                                        <div className="modal-buttons">
                                            <button type="button" onClick={closeModal} className="btn-cancelar">Cancelar</button>
                                            <button type="button" onClick={handleNext} className="btn-seguir">Avançar</button>
                                        </div>
                                    </>
                                ) : (
                                    <div className="audio-section">
                                        <div className="audio-recording">
                                            <div className="video-placeholder"></div>
                                            {audioBlob && audioURL && (
                                                <audio controls>
                                                    <source src={audioURL} type="audio/webm" />
                                                    Seu navegador não suporta o elemento de áudio.
                                                </audio>
                                            )}
                                        </div>
                                        <button 
                                            type="button" 
                                            onClick={audioBlob && !isRecording ? reRecord : toggleRecording}
                                        >
                                            {isRecording ? 'Parar Gravação' : audioBlob ? 'Regravar Áudio' : 'Gravar Áudio'}
                                        </button>
                                        <div className="modal-buttons">
                                            <button type="button" onClick={closeModal} className="btn-cancelar">Cancelar</button>
                                            <button type="submit" className="btn-seguir">Enviar</button>
                                        </div>
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                )}
            </main>
        </>
    );
}
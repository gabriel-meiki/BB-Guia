import { h, createRef } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { HeaderTerceiro } from '../../components/Header3';
import { AudioExplica } from '../../components/AudioExplica';
import './styles.css'; // Mantenha se necessário

export function Tutorial() {
    const titulo = 'Tutorial';
    
    // Estado para controlar a visibilidade do modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    // Estado para controlar a etapa do modal
    const [step, setStep] = useState(1);
    
    // Estados para os inputs do modal
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [consent, setConsent] = useState(false);
    // Estado para gerenciar a gravação de áudio
    const [isRecording, setIsRecording] = useState(false);
    const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
    const [audioURL, setAudioURL] = useState<string | null>(null);
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);

    // Ref para o iframe do YouTube
    const iframeRef = createRef<HTMLIFrameElement>();
    const [youtubePlayer, setYoutubePlayer] = useState<any>(null);

    // Carregar a API do YouTube
    useEffect(() => {
        // Verifica se YT já está disponível (evita recarregamento desnecessário)
        if ((window as any).YT && (window as any).YT.Player) {
            initializePlayer();
            return;
        }

        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);

        // Função global exigida pela API
        (window as any).onYouTubeIframeAPIReady = () => {
            initializePlayer();
        };

        // Cleanup
        return () => {
            delete (window as any).onYouTubeIframeAPIReady;
        };

        function initializePlayer() {
            if (iframeRef.current && (window as any).YT) {
                // @ts-ignore - YT é global da API externa
                const player = new (window as any).YT.Player(iframeRef.current, {
                    events: {
                        onReady: (event: any) => {
                            setYoutubePlayer(event.target);
                        },
                    },
                });
            }
        }
    }, []); // Removido iframeRef da dependência para evitar loop infinito

    // Função chamada pelo AudioExplica ao clicar
    const handleAudioPlay = () => {
        if (youtubePlayer) {
            youtubePlayer.playVideo();
            youtubePlayer.setVolume(0); // Silencia o vídeo
        }
    };

    // Função para abrir o modal
    const openModal = () => setIsModalOpen(true);
    
    // Função para fechar o modal
    const closeModal = () => {
        setIsModalOpen(false);
        setName(''); // Limpa o campo nome
        setEmail(''); // Limpa o campo email
        setConsent(false); // Reseta o checkbox
        if (audioURL) {
            URL.revokeObjectURL(audioURL); // Libera a URL do áudio
        }
        setAudioBlob(null); // Limpa o áudio gravado
        setAudioURL(null);
        setIsRecording(false); // Reseta o estado de gravação
        setStep(1); // Reseta para a primeira etapa
    };

    // Função para iniciar/parar a gravação de áudio
    const toggleRecording = async () => {
        if (!isRecording) {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                const recorder = new MediaRecorder(stream);
                setMediaRecorder(recorder);
                
                const chunks: Blob[] = [];
                recorder.ondataavailable = (e) => chunks.push(e.data);
                recorder.onstop = () => {
                    const blob = new Blob(chunks, { type: 'audio/webm' });
                    const url = URL.createObjectURL(blob);
                    setAudioBlob(blob);
                    setAudioURL(url);
                };
                
                recorder.start();
                setIsRecording(true);
            } catch (err) {
                console.error('Erro ao acessar o microfone:', err);
                alert('Não foi possível acessar o microfone.');
            }
        } else {
            mediaRecorder?.stop();
            setIsRecording(false);
        }
    };

    // Função para regravar o áudio (descarta o atual e inicia uma nova gravação)
    const reRecord = () => {
        if (audioURL) {
            URL.revokeObjectURL(audioURL);
        }
        setAudioBlob(null);
        setAudioURL(null);
        toggleRecording(); // Inicia uma nova gravação
    };
    
    // Função para avançar para a próxima etapa
    const handleNext = () => {
        if (!name) {
            alert('Por favor, digite seu nome completo.');
            return;
        }
        if (!email) {
            alert('Por favor, digite seu email.');
            return;
        }
        if (!consent) {
            alert('Você precisa concordar com as políticas para prosseguir.');
            return;
        }
        setStep(2);
    };
    
    // Função para lidar com o envio do formulário
    const handleSubmit = (e: Event) => {
        e.preventDefault();
        if (!consent) {
            alert('Você precisa concordar com as políticas para enviar o áudio.');
            return;
        }
        if (!audioBlob) {
            alert('Nenhum áudio gravado.');
            return;
        }
        // Aqui você pode adicionar a lógica para enviar os dados (nome, email, áudio, etc.)
        console.log('Dados enviados:', { name, email, consent, audioBlob });
        closeModal(); // Fecha o modal após o envio
    };

    return (
        <>
            <HeaderTerceiro titulo={titulo} />
            <main id="video">
                
                <iframe ref={iframeRef} width="300" height="168" src="https://www.youtube.com/embed/lxzbI2nio3s?si=CMTlCOL_ktdyEJud" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>

                <div className="audios">
                    <h3>Comunidade explica</h3>
                    <div className="audio">
                        <AudioExplica 
                            nome="Maria" 
                            comunidade="Tucano"
                            onPlay={handleAudioPlay}
                        />
                        <AudioExplica 
                            nome="Ana" 
                            comunidade="Tucano"
                            onPlay={handleAudioPlay}
                        />
                    </div>
                </div>

                <div className="mandar-audio">
                    <button onClick={openModal}>Explicar</button>
                </div>

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
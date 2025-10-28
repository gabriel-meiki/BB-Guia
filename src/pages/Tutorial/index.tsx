import { h } from 'preact';
import { useState } from 'preact/hooks';
import { HeaderDiferente } from '../../components/Header2/HeaderDiferente';
import { HeaderTerceiro } from '../../components/Header3';
import './styles.css';
import audio from '../../assets/audioSom.mp3';

export function Tutorial() {
    const titulo = 'Tutorial';
    
    // Estado para controlar a visibilidade do modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    // Estados para os inputs do modal
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [consent, setConsent] = useState(false);
    // Estado para gerenciar a gravação de áudio
    const [isRecording, setIsRecording] = useState(false);
    const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);

    // Função para abrir o modal
    const openModal = () => setIsModalOpen(true);
    
    // Função para fechar o modal
    const closeModal = () => {
        setIsModalOpen(false);
        setName(''); // Limpa o campo nome
        setEmail(''); // Limpa o campo email
        setConsent(false); // Reseta o checkbox
        setAudioBlob(null); // Limpa o áudio gravado
        setIsRecording(false); // Reseta o estado de gravação
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
                    setAudioBlob(blob);
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
        if (audioBlob) {
            URL.revokeObjectURL(URL.createObjectURL(audioBlob)); // Libera a URL do blob anterior
        }
        setAudioBlob(null);
        toggleRecording(); // Inicia uma nova gravação
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
                <iframe
                    src="https://youtube.com/embed/GBG5eWsc-Dw?si=j9D1cw5lJWJkQ-No"
                    height={500}
                    width={300}
                    frameBorder={0}
                ></iframe>

                <div className="audios">
                    <h3>Comunidade explica</h3>
                    <div className="audio">
                        <p>Juliana - Kayapó</p>
                        <audio controls controlsList="nodownload nofullscreen novolume">
                            <source src={audio} type="audio/mpeg" />
                            Seu navegador não suporta o elemento de áudio.
                        </audio>
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
                                <div className="user-info">
                                    <div className="form-group">
                                        <label htmlFor="name">Nome:</label>
                                        <input
                                            type="text"
                                            id="name"
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
                                <div className="audio-section">
                                    <div className="audio-recording">
                                        <div className="video-placeholder"></div>
                                        {audioBlob && (
                                            <audio controls>
                                                <source src={URL.createObjectURL(audioBlob)} type="audio/webm" />
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
                                        <button type="button" onClick={closeModal}>Cancelar</button>
                                        <button type="submit">Enviar</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </main>
        </>
    );
}
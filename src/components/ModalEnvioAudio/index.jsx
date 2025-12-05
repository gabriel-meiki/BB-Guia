// src/components/ModalEnviaAudio.jsx
// @ts-ignore
import { h } from 'preact';
import { useState, useRef } from 'preact/hooks';
import YouTube from 'react-youtube';

export function ModalEnviaAudio({ isOpen, video, onClose, idServico }) {
    const nomeComunidade = localStorage.getItem("comunidade");
    const [step, setStep] = useState(1);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [consent, setConsent] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [audioBlob, setAudioBlob] = useState(null);
    const [audioURL, setAudioURL] = useState(null);
    const [audioKey, setAudioKey] = useState(0); // ← ESSA LINHA É A SOLUÇÃO

    const mediaRecorderRef = useRef(null);
    const playerRef = useRef(null);
    const [playerReady, setPlayerReady] = useState(false);

    // Limpa tudo ao fechar
    const handleClose = () => {
        setStep(1);
        setName('');
        setEmail('');
        setConsent(false);
        setIsRecording(false);
        setAudioBlob(null);
        setAudioKey(0);
        if (audioURL) URL.revokeObjectURL(audioURL);
        setAudioURL(null);
        if (mediaRecorderRef.current?.state === 'recording') {
            mediaRecorderRef.current.stop();
        }
        onClose();
    };

    const handleNext = () => {
        if (!name.trim() || !email.trim() || !consent) {
            alert('Por favor, preencha todos os campos e aceite as políticas de privacidade.');
            return;
        }
        setStep(2);
    };

    const toggleRecording = async () => {
        if (isRecording) {
            mediaRecorderRef.current?.stop();
            setIsRecording(false);
            handleAudioPauseOrEnd()
            return;
        }

        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const recorder = new MediaRecorder(stream);
            const chunks = [];

            recorder.ondataavailable = (e) => chunks.push(e.data);
            recorder.onstop = () => {
                const blob = new Blob(chunks, { type: 'audio/webm' });
                const url = URL.createObjectURL(blob);

                if (audioURL) URL.revokeObjectURL(audioURL);   // ← limpa URL antiga
                setAudioBlob(blob);
                setAudioURL(url);
                setAudioKey(prev => prev + 1);                 // ← FORÇA o <audio> ser remontado

                stream.getTracks().forEach(track => track.stop());
            };

            handleAudioPlay();
            recorder.start();
            mediaRecorderRef.current = recorder;
            setIsRecording(true);
        } catch (err) {
            alert('Erro ao acessar o microfone. Verifique as permissões.');
            console.error(err);
        }
    };

    const reRecord = () => {
        setAudioBlob(null);
        if (audioURL) URL.revokeObjectURL(audioURL);
        setAudioURL(null);
        toggleRecording();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!audioBlob) {
            alert('Por favor, grave um áudio antes de enviar.');
            return;
        }

        // Dados que o backend espera
        const payload = new FormData();
        payload.append('name', name.trim());
        payload.append('email', email.trim());
        payload.append('agreePrivacy', `${consent}`); // true ou false (boolean vira string automaticamente)
        payload.append('community', nomeComunidade);   // ← MUDE AQUI conforme necessário ("kaiapo" | "kurinin" | etc.)
        payload.append('serviceId', idServico);      // ← o ID do serviço que já vem como prop

        // Converte o Blob em File com o nome exato que o backend espera
        const audioFile = new File([audioBlob], 'audio', {
            type: audioBlob.type || 'audio/webm',
            lastModified: Date.now(),
        });
        payload.append('audio', audioFile);

        try {
            const response = await fetch('https://resid-ncia-banco-do-brasil-porto-digital.onrender.com/api/audio', {
            // Substitua pela URL real do seu backend
                method: 'POST',
                body: payload,
                // NÃO coloque Content-Type manualmente quando usar FormData!
            });

            if (response.ok) {
                alert('Áudio enviado com sucesso! Obrigado pela sua explicação');
                handleClose();
            } else {
                const erro = await response.text();
                console.error('Erro do servidor:', erro);
                alert('Ocorreu um erro ao enviar. Tente novamente.');
            }
        } catch (err) {
            console.error('Erro de rede:', err);
            alert('Sem conexão com a internet ou servidor fora do ar.');
        }
    };

    const onPlayerReady = (event) => {
        playerRef.current = event.target;
        setPlayerReady(true);
    };

    const handleAudioPlay = () => {
        if (playerRef.current && playerReady) {
            playerRef.current.seekTo(0);
            playerRef.current.playVideo();
            playerRef.current.mute();

        }
    };

    const handleAudioPauseOrEnd = () => {
        if (playerRef.current && playerReady) {
            playerRef.current.pauseVideo();  // pausa o YouTube
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={handleClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
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
                                        // @ts-ignore
                                        onInput={(e) => setName(e.target.value)}
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
                                        // @ts-ignore
                                        onInput={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="form-group consent">
                                    <input
                                        type="checkbox"
                                        id="consent"
                                        checked={consent}
                                        // @ts-ignore
                                        onChange={(e) => setConsent(e.target.checked)}
                                        required
                                    />
                                    <label htmlFor="consent">
                                        Concordo com as <a href="/politicas" target="_blank">políticas de privacidade</a>
                                    </label>
                                </div>
                            </div>

                            <div className="modal-buttons">
                                <button type="button" onClick={handleClose} className="btn-cancelar">
                                    Cancelar
                                </button>
                                <button type="button" onClick={handleNext} className="btn-seguir">
                                    Avançar
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="audio-section">
                            <div className="audio-recording">
                                <div className="video-placeholder" > 
                                    <YouTube
                                        videoId={video}
                                        opts={{
                                            width: '350',
                                            height: '198',
                                            playerVars: { autoplay: 0, playsinline: 1, rel: 0 },
                                        }}
                                        onReady={onPlayerReady}
                                    />
                                </div>

                                {audioURL && (
                                    <audio
                                        key={audioKey}                 
                                        controls
                                        src={audioURL}
                                        onPlay={handleAudioPlay}
                                        onPause={handleAudioPauseOrEnd}
                                    >
                                        Seu navegador não suporta áudio.
                                    </audio>
                                )}
                            </div>

                            <button
                                type="button"
                                className={isRecording ? 'recording' : ''}
                                onClick={audioBlob && !isRecording ? reRecord : toggleRecording}
                            >
                                {isRecording
                                    ? 'Parar Gravação'
                                    : audioBlob
                                        ? 'Regravar Áudio'
                                        : 'Gravar Áudio'}
                            </button>

                            <div className="modal-buttons">
                                <button type="button" onClick={handleClose} className="btn-cancelar">
                                    Cancelar
                                </button>
                                <button type="submit" className="btn-seguir" disabled={!audioBlob}>
                                    Enviar
                                </button>
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}
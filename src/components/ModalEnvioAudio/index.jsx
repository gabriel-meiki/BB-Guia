// src/components/ModalEnviaAudio.jsx
// @ts-ignore
import { h } from 'preact';
import { useState, useRef } from 'preact/hooks';

export function ModalEnviaAudio({ isOpen, onClose }) {
    const [step, setStep] = useState(1);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [consent, setConsent] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [audioBlob, setAudioBlob] = useState(null);
    const [audioURL, setAudioURL] = useState(null);
    const mediaRecorderRef = useRef(null);

    // Limpa tudo ao fechar
    const handleClose = () => {
        setStep(1);
        setName('');
        setEmail('');
        setConsent(false);
        setIsRecording(false);
        setAudioBlob(null);
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
                setAudioBlob(blob);
                setAudioURL(url);
                stream.getTracks().forEach(track => track.stop());
            };

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

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!audioBlob) {
            alert('Por favor, grave um áudio antes de enviar.');
            return;
        }

        // Aqui você faria o upload do audioBlob + name + email
        console.log('Enviando:', { name, email, audioBlob });
        alert('Áudio enviado com sucesso! (simulação)');
        handleClose();
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
                                <div className="video-placeholder"></div>

                                {audioURL && (
                                    <audio controls src={audioURL}>
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
import { h, createRef } from 'preact';
import audio from '../../assets/audioSom.mp3';
import { useState } from 'preact/hooks';
import likeIcon from '../../assets/hand-thumbs-up.svg'

import styles from './styles.module.css';

interface AudioExplicaProps {
    nome: string;
    comunidade: string;
    onPlay: () => void;  // Esta prop é obrigatória para o callback
}

export function AudioExplica({ nome, comunidade, onPlay }: AudioExplicaProps) {
    const [like, setLike] = useState(0);
    const audioRef = createRef<HTMLAudioElement>();

    const handlePlay = () => {
        onPlay(); // Chama a função para iniciar o vídeo sem som
        if (audioRef.current) {
            audioRef.current.play().catch((err) => {
                console.error('Erro ao reproduzir áudio:', err);
            });
        }
    };

    function darLike(){
        setLike(like + 1);
    }



    return (
        <>
            <div className={styles.header}>
                <p>{nome} - {comunidade}</p>
                <div>
                    <button onClick={darLike} className={styles.button}>    <img src={likeIcon} alt="" /> {like} 
                    </button>
                </div>
            </div>
            <audio
                ref={audioRef}
                controls
                controlsList="nodownload nofullscreen novolume"
                onPlay={handlePlay}  // Dispara ao clicar em play
            >
                <source src={audio} type="audio/mpeg" />
                Seu navegador não suporta o elemento de áudio. Entre em contato com nossos atendentes.
            </audio>
        </>
    );
}
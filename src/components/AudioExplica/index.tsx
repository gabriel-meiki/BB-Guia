import { h, createRef } from 'preact';
import audio from '../../assets/audioSom.mp3';
import { useState } from 'preact/hooks';
import likeIcon from '../../assets/hand-thumbs-up.svg'
import likePressIcon from '../../assets/like-press.svg'

import styles from './styles.module.css';



export function AudioExplica({nome, comunidade}) {

    const [handleLike, setHandleLike] = useState(JSON.parse(localStorage.getItem("podeDarLike")))
    
    
    const [like, setLike] = useState(0)

    function darLike(){
        if (handleLike === true){
            setLike(like + 1)
            setHandleLike(false)
        } else {
            setLike(like - 1)
            setHandleLike(true)
        }
    }


    return (
        <>
            <div className={styles.header}>
                <p>{nome} - {comunidade}</p>
                <div>
                    <button onClick={darLike} className={styles.button}>
                        {handleLike == true ? <img src={likeIcon} alt="" /> : <img src={likePressIcon} alt="com like" />} {like} 
                    </button>
                </div>
            </div>
            <audio
                controls
                controlsList="nodownload nofullscreen novolume"
            >
                <source src={audio} type="audio/mpeg" />
                Seu navegador não suporta o elemento de áudio. Entre em contato com nossos atendentes.
            </audio>
        </>
    );
}
import React from 'react'
import Image from 'next/image';
import styles from '@/styles/RightPanel.module.css'
import Link from 'next/link';

interface Comment {
    id: number;
    content: string;
    user: {
        image: string;
        name: string;
        username: string;
    };
}

interface SuggestionCardProps {
    id: number;
    title: string;
    category: string;
    upvotes: number;
    status: string;
    description: string;
    comments?: Comment[]; 
}

const SuggestionCard: React.FC<SuggestionCardProps> = (props) => {
    const updateVote = () => {
        console.log(props)
    }
    if(props.status!=="suggestion"){
        return null;
    }
    return (
        <div className={`${styles.cardContainer}`}>
            <div className={styles.flexContainer}>
            <div className={styles.box} onClick={updateVote}>
                <div className={styles.align}>
                <Image
                    src="/assets/shared/icon-arrow-up.svg"
                    alt="My Image"
                    width={10}
                    height={8} 
                />
                </div>
                <p className={styles.text}>
                {props.upvotes}
                </p>
            </div>
            <div className={styles.flexColumn}>
                <div>
                    <Link href={`comments/${props.id}`} >
                    <span className={styles.boldText}>
                        {props.title}
                    </span></Link>
                </div>
                <div>
                    <span className={styles.textDesc}>
                        {props.description}
                    </span>
                </div>
                <div className={styles.box1}>
                    <span className={styles.colorText}>
                        {props.category}
                    </span>
                </div>
            </div>
            </div>
            <div className={styles.lastDiv}>
                <Image
                className={styles.img}
                    src="/assets/shared/icon-comments.svg"
                    alt="My Image"
                    width={18}
                    height={16} 
                />
                {props.comments?props.comments.length:0}
            </div>
        </div>
    )
}

export default SuggestionCard;
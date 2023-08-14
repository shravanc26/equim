import React from 'react'
import styles from '@/styles/RightPanel.module.css'
import Image from 'next/image';
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

interface CardProps {
    id: number;
    title: string;
    category: string;
    upvotes: number;
    status: string;
    description: string;
    comments?: Comment[];
    type: string;
}

const Card: React.FC<CardProps> = ({ id, title, category, upvotes, status, description, comments, type }) => {
    // console.log()
    if(status!=="suggestion"){
        return null;
    }
    return (
        <div className={`${styles.CardDivs} ${styles.cardDivsDisplay}`}>
            <div className={styles.flexRow}>
                <div className={styles.circle} style={type === "Planned" ? { backgroundColor: "#F49F85" } : type === "live" ? { backgroundColor: "#62BCFA" } : type==="in-progress"?{ backgroundColor: "#AD1FEA" } : {display:"none"}}></div>
                <span className={styles.textDesc}>{type}</span>
            </div>
            <div className={styles.mt1}>
            <Link href={`comments/${id}`}>
                    <span className={styles.boldText}>
                        {title}
                    </span></Link>
            </div>

            <div className={styles.mt1}>
                <p className={styles.textDesc}>{description}</p>
            </div>
            <div className={styles.mt2}>
                <div className={styles.box1}>
                    <span className={styles.colorText}>
                        {category}
                    </span>
                </div>
            </div>
            <div className={styles.mt2}>
                <div className={styles.flexContainer}>
                <div className={styles.box1}>
                    <Image
                        src="/assets/shared/icon-arrow-up.svg"
                        alt="My Image"
                        width={10}
                        height={8}
                    // className={}
                    />
                    <span className={styles.textDesc} style={{ marginLeft: 10 }}>
                        {upvotes}
                    </span>
                </div>
                <div className={styles.lastiv}>
                    <Image
                        className={styles.img}
                        src="/assets/shared/icon-comments.svg"
                        alt="My Image"
                        width={18}
                        height={16}
                    />
                    {comments?comments.length:0}
                </div>
                </div>
            </div>
        </div>
    )
}

export default Card;

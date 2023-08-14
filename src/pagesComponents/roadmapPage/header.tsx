import React from 'react'
import Image from 'next/image';
import styles from '@/styles/Roadmap.module.css'
import { useRouter } from "next/router";
import Link from 'next/link';


export default function Header() {
    const router = useRouter();
    const handle = () => {
        router.replace(`/`);
    }
    return (
        <>
            <div className={styles.mainContainer1}>
                <div >
                    <div className={`${styles.flexContainer} ${styles.temp}`} onClick={handle} style={{cursor: "pointer"}}>
                        <Image
                            src="/images/leftArrow.svg"
                            alt="My Image"
                            width={10}
                            height={8}
                            className={styles.img4}
                        />
                        <p className={styles.backText1}>
                            Go Back
                        </p>
                    </div>
                    <div style={{ marginTop: '9px' }}> <span className={styles.boldText}>Roadmap</span></div>
                </div>
                <div >
                    <Link href="newfeedback">
                    <div className={styles.purpleBtn1}>
                        + Add Feedback
                    </div>
                    </Link>
                </div>

            </div>
        </>
    )
}

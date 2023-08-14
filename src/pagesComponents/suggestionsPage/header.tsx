import React, { useState } from 'react'
import Image from 'next/image';
import styles from '@/styles/RightPanel.module.css'
import Link from 'next/link';


const options = [
    { value: '0', label: 'Most Upvotes' },
    { value: '1', label: 'Least Upvotes' },
    { value: '2', label: 'Most Comments' },
    { value: '3', label: 'Least Comments' },
];

export default function Header() {
    const [selectedOption, setSelectedOption] = useState("Most Upvotes");
    const handleSelectChange = (e: any) => {
        setSelectedOption(e.target.value);
        console.log(selectedOption)
    };
    const addFeedback = () => {

    }
    return (
        <>
            <div className={styles.mainContainer}>
                <div className={`${styles.flexContainer} ${styles.displayNone}`}>
                    <div >
                        <Image
                            src="/images/bulb.png"
                            alt="My Image"
                            width={23}
                            height={24}
                        />
                    </div>
                    <div > <span className={`${styles.boldText} ${styles.fontSize}`}>6 Suggestions</span></div>
                </div>
                <div className={styles.flexContainer1}>
                    <div>
                        <span className={`${styles.fontSize}`}>
                            Sort by :
                        </span>
                        {/* <span className={`${styles.boldText} ${styles.fontSize}`}> Most Upvotes</span> */}
                        <select value={selectedOption} onChange={handleSelectChange}>
                            <option>Most Upvotes</option>
                            <option>Least Upvotes</option>
                            <option>Most Comments</option>
                            <option>Least Comments</option>
                        </select>
                    </div>
                    {/* <div >
                        <Image
                            src="/images/arrowDown.png"
                            alt="My Image"
                            width={10}
                            height={6}
                        />
                    </div> */}
                </div>
                <div >
                <Link href="/newfeedback">
                    <div className={styles.purpleBtn} onClick={addFeedback}>
                        + Add Feedback
                    </div>
                    </Link>
                </div>
            </div>
        </>
    )
}

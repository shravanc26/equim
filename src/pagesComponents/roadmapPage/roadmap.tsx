import React, { useState, useEffect } from 'react';
import Header from './header';
import styles from '@/styles/Roadmap.module.css'
import Card from './card';
type Comment = {
    id: number;
    content: string;
    user: {
        image: string;
        name: string;
        username: string;
    };
    replies?: Reply[]; // Optional array of replies
};

type Reply = {
    content: string;
    replyingTo: string;
    user: {
        image: string;
        name: string;
        username: string;
    };
};

type ProductRequest = {
    id: number;
    title: string;
    category: string;
    upvotes: number;
    status: string;
    description: string;
    comments: Comment[];
};

type UserData = {
    currentUser: {
        image: string;
        name: string;
        username: string;
    };
    productRequests: ProductRequest[];
};

export default function Roadmap() {
    const [data, setData] = useState<UserData | null>(null);
    useEffect(() => {
        const dataString = localStorage.getItem("data");
        if (dataString) {
            setData(JSON.parse(dataString));
        }
    }, [])
    console.log(data)
    const liveProducts = data?.productRequests.filter(item => item.status === "live");
    const inProgressProducts = data?.productRequests.filter(item => item.status === "in-progress");
    const plannedProducts = data?.productRequests.filter(item => item.status === "planned");

    console.log("Live Products:", liveProducts);
    console.log("In-Progress Products:", inProgressProducts);
    console.log("Planned Products:", plannedProducts);
    const [selectedTabs, setSelectedTabs] = useState(1);
    const [tab, setTab] = useState(inProgressProducts);
    const tabChange = (tabIndex: number) => {
        setSelectedTabs(tabIndex);
        if (tabIndex === 0) setTab(plannedProducts);
        else if (tabIndex === 1) setTab(inProgressProducts);
        else setTab(liveProducts);
    }
    return (
        <div style={{ height: 1325, flex: 1, justifyContent: 'center', display: 'flex', background: '#F7F8FD', gap: 24,padding : '24px'}} className={styles.removePd}>
            <div>
                <Header />
                <div className={`${styles.flexContainer} ${styles.displayOrNot}`} style={{ marginTop: '50px' }}>
                    {/* planned */}
                    <div className={styles.divs}>
                        <div>
                            <div className={styles.boldText}>
                                Planned ({plannedProducts?.length})
                            </div>
                            <div className={styles.textDesc}>
                                Ideas prioritized for research
                            </div>
                            <div className={styles.mt3}>
                                {
                                    plannedProducts && plannedProducts.map((data) => {
                                        return <Card {...data} type={"Planned"}  key={data.id} />
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    {/* inprogess */}
                    <div className={styles.divs}>
                        <div>
                            <div className={styles.boldText}>
                                In-Progress ({inProgressProducts?.length})
                            </div>
                            <div className={styles.textDesc}>
                                Currently being developed
                            </div>

                            <div className={styles.mt3}>
                                {
                                    inProgressProducts && inProgressProducts.map((data) => {
                                        return <Card {...data} type={"In-Progress"}  key={data.id} />
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    {/* live */}
                    <div className={styles.divs}>
                        <div>
                            <div className={styles.boldText}>
                                Live ({liveProducts?.length})
                            </div>
                            <div className={styles.textDesc}>
                                Released features
                            </div>
                            <div className={styles.mt3}>
                                {
                                    liveProducts && liveProducts.map((data) => {
                                        return <Card {...data} type={"Live"}  key={data.id} />
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
                {/* //mobile */}
                <div className={styles.mobile}>
                    <div className={styles.Container} style={{ marginTop: '50px' }}>
                        <div className={styles.tabs}>
                            <span className={`${styles.textDesc}`} onClick={() => tabChange(0)}>  Planned ({plannedProducts?.length})</span>
                            {selectedTabs === 0 && <div className={styles.blueLine}></div>}
                        </div>
                        <div className={styles.tabs}>
                            <span className={`${styles.textDesc}`} onClick={() => tabChange(1)}>
                                In-Progress ({inProgressProducts?.length})
                            </span>
                            {selectedTabs === 1 && <div className={styles.blueLine}></div>}
                        </div>
                        <div className={styles.tabs} >
                            <span className={`${styles.textDesc}`} onClick={() => tabChange(2)}>
                                Live ({liveProducts?.length})
                            </span>
                            {selectedTabs === 2 && <div className={styles.blueLine}></div>}
                        </div>
                    </div>
                    <div className={styles.line}></div>
                    <div className={styles.mt3}>
                        {
                            tab && tab.map((data) => {
                                return <Card {...data} type={"Live"}  key={data.id} />
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

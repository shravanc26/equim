import React, { useState, useEffect } from 'react'
import Header from './header'
import SuggestionCard from './suggestionCard'
import dataJson from "../../data.json"
import styles from '@/styles/RightPanel.module.css'
import Card from './card'
import Link from 'next/link'

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


export default function RightPanel() {
    const [data, setData] = useState<UserData | null>(null);
    useEffect(() => {
        if (!localStorage.getItem("data")) {
            localStorage.setItem("data", JSON.stringify(dataJson));
        }
        else{
            const dataString = localStorage.getItem("data");
            if (dataString) {
                setData(JSON.parse(dataString));
            }
        }
    }, [])

    return (
        <div className={styles.getMarginAuto} >
            <Header />
            {data && data.productRequests.map((data) => (
                 <SuggestionCard key={data.id} {...data} />
            ))}
            {data && data.productRequests.map((data) => (
                <Card key={data.id} {...data} type='' />
            ))}
        </div>
    )
}

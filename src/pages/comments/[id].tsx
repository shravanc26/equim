import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Comment.module.css'
import { useRouter } from 'next/router';
import SuggestionCard from '@/pagesComponents/suggestionsPage/suggestionCard';
import dataJson from "../../data.json"
import { useState } from 'react';
import CommentPage from '@/pagesComponents/commentPage/commentPage';
import Card from '@/pagesComponents/suggestionsPage/card';
import Link from 'next/link';
import React, { useEffect } from 'react';
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

const Home: NextPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const [data, setData] = useState<UserData | null>(null);
    useEffect(() => {
        const dataString = localStorage.getItem("data");
        if (dataString) {
            setData(JSON.parse(dataString));
        }
    }, [])
    const productRequests = data?.productRequests;
    const suggestionId = id ? parseInt(id as string, 10) : undefined;
    const sugeestion = productRequests?.find(request => request.id === suggestionId);
    const myComments = sugeestion?.comments;
    console.log(sugeestion, myComments)
    const handleClick = () => {
        router.replace(`/editFeedback/${suggestionId}`);
    };
    return (
        <div style={{ height: 1325, flex: 1, justifyContent: 'center', display: 'flex', background: '#F7F8FD', gap: 24, paddingTop: 24 }}>
            <div>
                <div className={styles.flexContainer2}>
                    <div className={styles.flexContainer}>
                        <Image
                            src="/assets/shared/icon-arrow-left.svg"
                            alt="My Image"
                            width={10}
                            height={8}
                            className={styles.img4}
                        />
                        <Link href="/">
                        <p className={styles.backText}>
                            Go Back
                        </p>
                        </Link>
                    </div>
                    <div>

                        <div className={styles.blueBtn} onClick={handleClick}>
                            Edit Feedback
                        </div>
                    </div>
                </div>
                {sugeestion && <SuggestionCard {...sugeestion} />}
                {sugeestion && <Card {...sugeestion} type='' />}
                <div className={styles.cardContainer1}>
                    <div className={styles.header1}>
                        <p className={styles.boldText}>
                            {myComments?.length} Coments
                        </p>
                    </div>
                    <div>
                        {
                            sugeestion && myComments?.map((data: any) => {
                                return <CommentPage {...data} key={data.id} />
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
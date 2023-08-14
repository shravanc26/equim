import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import styles from '@/styles/RightPanel.module.css'
import Select from 'react-select'
import Image from "next/image";
import { useRouter } from "next/router";

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






const NewFeedback = () => {
    const [data, setData] = useState<UserData | null>(null);
    const router = useRouter();
    useEffect(() => {
        const dataString = localStorage.getItem("data");
        if (dataString) {
            setData(JSON.parse(dataString));
        }
    }, []);
    const goBack = () => {
        router.replace(`/`);
    }
    const {
        register,
        watch,
        handleSubmit,
        formState: { errors, },
        control
    } = useForm();

    const formSubmit = (suggestionData: any) => {
        console.log(suggestionData);
        // data.push
        if (data) {
            const tempProductRequests = data.productRequests;
            const tempData = {
                category: suggestionData.category.value,
                comments: [],
                description: suggestionData.detail,
                id: tempProductRequests.length + 1,
                title: suggestionData.title,
                status: "suggestion",
                upvotes: 0,
            }
            console.log(tempData)
            tempProductRequests.push(tempData);

            // Update the data with the new product request
            const updatedData: UserData = {
                ...data,
                productRequests: tempProductRequests,
            };
            console.log(updatedData);
            // Store the updated data in localStorage
            localStorage.setItem("data", JSON.stringify(updatedData));

            // You can also update the state if needed
            setData(updatedData);
            router.replace(`/`);
        }

    };

    const options = [
        { value: 'feature', label: 'Feature' },
        { value: 'ui', label: 'UI' },
        { value: 'UX', label: 'UX' },
        { value: 'enhancement', label: 'Enhancement' },
        { value: 'bug', label: 'Bug' },
    ]

    return (
        <div style={{ height: 1325, flex: 1, justifyContent: 'center', display: 'flex', background: '#F7F8FD', gap: 24, paddingTop: 94 }}>
            <div className={styles.formContainer}>

                <span className={styles.boldText}>Create New Feedback</span>
                <Image
                    src="/assets/shared/add.svg"
                    alt="My Image"
                    width={56}
                    height={56}
                    className={styles.img3}
                />
                <form onSubmit={handleSubmit(formSubmit)} className={styles.mt} >
                    <div className={styles.inputDiv}>
                        <div className={styles.inputTitle}>Feedback Title</div>
                        <div className={styles.inputDesc}>Add a short, descriptive headline</div>
                        <input
                            {...register("title", { required: true, minLength: 2 })}
                            className={styles.input}
                        />
                        {errors.title && <p className={styles.error}>Title is required.</p>}
                    </div>
                    <div className={styles.inputDiv}>
                        <div className={styles.inputTitle}>Category</div>
                        <div className={styles.inputDesc}>Choose a category for your feedback</div>
                        <Controller
                            name="category"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    options={options}
                                    className={styles.select}
                                />
                            )}
                        />
                        {errors.category && <p className={styles.error}>Title is required.</p>}
                    </div>
                    <div className={styles.inputDiv}>
                        <div className={styles.inputTitle}>Feedback Detail</div>
                        <div className={styles.inputDesc}>Include any specific comments on what should be improved, added, etc.</div>
                        <textarea
                            rows={4} cols={50}
                            {...register("detail", { required: true, minLength: 2 })}
                            className={styles.input1}
                        />
                        {errors.detail && <p className={styles.error}>Detail is required.</p>}
                    </div>
                    <div className={`${styles.btnDiv} ${styles.column}`}>
                        <div className={`${styles.cancelBtn} ${styles.expandBtn}`} onClick={goBack}>
                            Cancel
                        </div>
                        <div onClick={handleSubmit(formSubmit)} className={`${styles.purpleBtn} ${styles.expandBtn}`}>
                            Add Feedback
                        </div>
                    </div>
                </form>
            </div></div>
    );
};

export default NewFeedback;
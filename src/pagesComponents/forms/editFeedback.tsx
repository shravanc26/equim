import React, { useState, useEffect } from "react";
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

const EditFeedback = () => {
    const {
        register,
        watch,
        handleSubmit,
        formState: { errors, },
        control
    } = useForm();
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
    console.log(sugeestion)
    const formSubmit = (formData: any) => {
        if (data) {
            const tempProductRequests = data.productRequests;
            const tempData = {
                category: formData.category.value,
                comments: sugeestion?.comments,
                description: formData.detail,
                id: sugeestion?.id,
                title: formData.title,
                status: formData.status.value,
                upvotes: sugeestion?.upvotes,
            }
            // Assuming productRequests is an array of request objects
            const updatedProductRequests = productRequests?.map(request => {
                if (request.id === suggestionId) {
                    // Replace the suggestion with a new one
                    return { ...tempData };
                }
                return request; // Keep other requests unchanged
            });

            console.log(updatedProductRequests, tempData);
            const updatedData = {
                ...data,
                productRequests: updatedProductRequests,
            };
            console.log(updatedData);
            // Store the updated data in localStorage
            localStorage.setItem("data", JSON.stringify(updatedData));
            router.replace(`/`);
        }
    };
    const goBack = () => {
        router.replace(`/`);
    }
    const options = [
        { value: 'feature', label: 'Feature' },
        { value: 'ui', label: 'UI' },
        { value: 'UX', label: 'UX' },
        { value: 'enhancement', label: 'Enhancement' },
        { value: 'bug', label: 'Bug' },
    ]
    const options1 = [
        { value: 'planned', label: 'Planned' },
        { value: 'suggestion', label: 'Suggestion' },
        { value: 'in-progress', label: 'In-Progress' },
        { value: 'live', label: 'Live' },
    ]

    return (
        <div style={{ height: 1325, flex: 1, justifyContent: 'center', display: 'flex', background: '#F7F8FD', gap: 24, paddingTop: 94 }}>
            <div className={styles.editFormContainer}>

                <span className={`${styles.boldText} ${styles.mt30}`} >Editing <span>‘Add a dark theme option’</span></span>
                <Image
                    src="/assets/shared/edit.svg"
                    alt="My Image"
                    width={56}
                    height={56}
                    className={styles.img2}
                />
                <form onSubmit={handleSubmit(formSubmit)} className={styles.mt} >
                    <div className={styles.inputDiv}>
                        <div className={styles.inputTitle}>Feedback Title</div>
                        <div className={styles.inputDesc}>Add a short, descriptive headline</div>
                        <input
                            defaultValue={sugeestion?.title}
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
                                    defaultValue={options[0]}
                                    {...field}
                                    options={options}
                                    className={styles.select}
                                />
                            )}
                        />
                        {errors.category && <p className={styles.error}>Category is required.</p>}
                    </div>
                    <div className={styles.inputDiv}>
                        <div className={styles.inputTitle}>Update Status</div>
                        <div className={styles.inputDesc}>Change feedback state</div>
                        <Controller
                            name="status"
                            control={control}
                            rules={{ required: true }}
                            defaultValue={options1[0]}
                            render={({ field }) => (
                                <Select
                                    defaultValue={sugeestion?.status}
                                    {...field}
                                    options={options1}
                                    className={styles.select}
                                />
                            )}
                        />
                        {errors.status && <p className={styles.error}>Status is required.</p>}
                    </div>
                    <div className={styles.inputDiv}>
                        <div className={styles.inputTitle}>Feedback Detail</div>
                        <div className={styles.inputDesc}>Include any specific comments on what should be improved, added, etc.</div>
                        <textarea
                            rows={4} cols={50}
                            defaultValue={sugeestion?.description}
                            {...register("detail", { required: true, minLength: 2 })}
                            className={styles.input1}
                        />
                        {errors.detail && <p className={styles.error}>Detail is required.</p>}
                    </div>
                    <div className={`${styles.flexContainer} ${styles.column}`}>
                        <div className={`${styles.redBtn} ${styles.expandBtn}`}>
                            Delete
                        </div>

                        <div className={styles.btnDiv}>
                            <div className={`${styles.cancelBtn} ${styles.expandBtn}`} onClick={goBack}>
                                Cancel
                            </div>
                            <div onClick={handleSubmit(formSubmit)} className={`${styles.purpleBtn} ${styles.expandBtn}`}>
                                Save Changes
                            </div>
                        </div>
                    </div>
                </form>
            </div></div>
    );
};

export default EditFeedback;
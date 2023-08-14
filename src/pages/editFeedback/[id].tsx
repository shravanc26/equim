import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import EditFeedback from '@/pagesComponents/forms/editFeedback'
const inter = Inter({ subsets: ['latin'] })


export default function Home() {
    return (
        <>
            <EditFeedback />
        </>
    )
}

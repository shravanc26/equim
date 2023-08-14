import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Suggestion from '@/pagesComponents/suggestionsPage/suggestion'
import NewFeedback from '@/pagesComponents/forms/newFeedback'
import EditFeedback from '@/pagesComponents/forms/editFeedback'
const inter = Inter({ subsets: ['latin'] })


export default function Home() {
  return (
    <>
    {/* <EditFeedback /> */}
    <NewFeedback />
    </>
  )
}

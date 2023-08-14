import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import Suggestion from '@/pagesComponents/suggestionsPage/suggestion'
const inter = Inter({ subsets: ['latin'] })


export default function Home() {
  return (
    <>
    <Suggestion />
    </>
  )
}

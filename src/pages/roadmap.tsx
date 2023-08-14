import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import Roadmap from '@/pagesComponents/roadmapPage/roadmap'
const inter = Inter({ subsets: ['latin'] })


export default function Home() {
  return (
    <>
    <Roadmap />
    </>
  )
}

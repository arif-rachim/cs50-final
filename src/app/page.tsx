import Image from 'next/image'
import Link from "next/link";

export default async function Home() {

    return (
        <main className={'flex flex-col h-screen p-5 bg-slate-500 text-slate-50 justify-center items-center gap-10'}>
            <h1 className={'w-1/3 text-center'}>Final project for CS-50 class, taking image and classifying them</h1>
            <div className={'flex gap-5'}>
                <Link href={'./photo'} className={'p-5 border-r-slate-50 border-2 '}>Record Photo</Link>
                <Link href={'./detect'} className={'p-5 border-r-slate-50 border-2 '}>Detect a Photo</Link>
            </div>
        </main>
    )
}


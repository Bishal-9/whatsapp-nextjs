import Head from 'next/head'
import Sidebar from '../components/Sidebar'

export default function Home() {
    return (
        <div>
            <Head>
                <title>WhatsApp</title>
                <link rel="icon" href="https://image.flaticon.com/icons/png/512/1384/1384883.png" />
            </Head>

            <Sidebar />
        </div>
    )
}

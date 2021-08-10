import { Button } from "@material-ui/core"
import Head from "next/head"
import { auth, provider } from '../firebase'

function Login() {

    const signIn = () => {
        auth.signInWithPopup(provider).catch(alert)
    }

    return (

        // Container
        <div className='grid place-items-center h-screen bg-[#f5f5f5]'>
            <Head>
                <title>Login</title>
                <link rel="icon" href="https://image.flaticon.com/icons/png/512/1384/1384883.png" />
            </Head>

            {/* Login Container */}
            <div className='flex flex-col p-20 items-center bg-white rounded-lg shadow-2xl'>
                <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1280px-WhatsApp.svg.png" 
                    height={200}
                    width={200}
                    className='mb-16'
                    alt="WhatsApp Logo" 
                />
                <Button 
                    variant='outlined'
                    onClick={signIn}
                >
                    Sign in with Google
                </Button>
            </div>

        </div>
    )
}

export default Login
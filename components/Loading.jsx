import { FadingCircle } from 'better-react-spinkit'

function Loading() {
    return (
        <center className='grid place-items-center h-screen'>
            <div>
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1280px-WhatsApp.svg.png"
                    height={200}
                    width={200}
                    className='mb-16'
                    alt="WhatsApp Logo"
                />

                <FadingCircle
                    color='#4fcf5d'
                    size={60}
                />
            </div>
        </center>
    )
}

export default Loading

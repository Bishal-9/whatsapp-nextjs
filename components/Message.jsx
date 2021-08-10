import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../firebase'
import moment from 'moment'

function Message({ user, message }) {

    const [userLoggedIn] = useAuthState(auth)

    const typeOfMessage = user === userLoggedIn.email ? 
        'ml-auto bg-[#dcf8c6]' : 'bg-[#f5f5f5] text-left'

    return (

        // Container
        <div>
            <p
                className={`w-fit p-2 rounded m-2 pb-6 text-right relative ${typeOfMessage}`}
            >
                {message.message}

                {/* Timestamp */}
                <span
                    className='text-gray-600 p-2 text-xs absolute bottom-0 text-right right-0'
                >
                    {
                        message.timestamp ? moment(message.timestamp).format('LT') : '...'
                    }
                </span>
            </p>
        </div>
    )
}

export default Message
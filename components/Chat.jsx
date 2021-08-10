import { Avatar } from "@material-ui/core"
import getRecipientEmail from "../utils/getRecipientEmail"
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../firebase'
import { useCollection } from 'react-firebase-hooks/firestore'
import { useRouter } from "next/dist/client/router"

function Chat({ id, users }) {

    const router = useRouter()
    const [user] = useAuthState(auth)
    const [recipientSnapshot] = useCollection(
        db
            .collection('users')
            .where('email', '==', getRecipientEmail(users, user))
    )
    const recipient = recipientSnapshot?.docs?.[0]?.data()
    const recipientEmail = getRecipientEmail(users, user)

    const enterChat = () => {
        router.push(`/chat/${id}`)
    }

    return (

        // Container
        <div
            onClick={enterChat} 
            className='flex items-center cursor-pointer p-1 break-words hover:bg-[#e9eaeb]'
        >
            {
                recipient ? (
                    <Avatar
                        src={recipient?.photoURL}
                        className='m-2 mr-4'
                    />
                ) : (
                    <Avatar className='m-2 mr-4'>{recipientEmail[0]}</Avatar>
                )
            }
            <p>{recipientEmail}</p>
        </div>
    )
}

export default Chat

import { Avatar, IconButton } from "@material-ui/core"
import { AttachFileRounded, MoreVertRounded } from "@material-ui/icons"
import MicIcon from '@material-ui/icons/Mic';
import InsertEmoticonRoundedIcon from '@material-ui/icons/InsertEmoticonRounded';
import { useRouter } from "next/dist/client/router"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth, db } from "../firebase"
import { useCollection } from 'react-firebase-hooks/firestore'
import Message from "./Message"
import { useRef, useState } from "react";
import firebase from 'firebase'
import getRecipientEmail from "../utils/getRecipientEmail";
import TimeAgo from 'timeago-react';

function ChatScreen({ chat, messages }) {

    const [user] = useAuthState(auth)
    const router = useRouter()
    const [input, setInput] = useState('')
    const endOfMessagesRef = useRef(null)

    const [messagesSnapshot] = useCollection(db
        .collection('chats')
        .doc(router.query.id)
        .collection('messages')
        .orderBy('timestamp', 'asc')
    )

    const [recipientSnapshot] = useCollection(
        db
            .collection('users')
            .where('email', '==', getRecipientEmail(chat.users, user))
    )

    const scrollToBottom = () => {
        endOfMessagesRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        })
    }

    const showMessages = () => {
        if (messagesSnapshot) {
            return messagesSnapshot.docs.map(message => (
                <Message
                    key={message.id}
                    user={message.data().user}
                    message={{
                        ...message.data(),
                        timestamp: message.data().timestamp?.toDate().getTime(),
                    }}
                />
            ))
        } else {
            return JSON.parse(messages).map(message => (
                <Message
                    key={message.id}
                    user={message.user}
                    message={message}
                />
            ))
        }
    }

    const sendMessage = e => {
        e.preventDefault()

        // Update the Last Seen
        db
            .collection('users')
            .doc(user.uid)
            .set({
                lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
            },{
                merge: true
            })

        // Saving Message
        db
            .collection('chats')
            .doc(router.query.id)
            .collection('messages')
            .add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                message: input,
                user: user.email,
                photoURL: user.photoURL,
            })

        setInput('')
        scrollToBottom()
    }

    const recipient = recipientSnapshot?.docs?.[0]?.data()

    const recipientEmail = getRecipientEmail(chat.users, user)

    return (

        // Container
        <div className=''>

            {/* Header */}
            <header className='sticky bg-white z-50 top-0 flex p-4 h-16 items-center border-gray-600'>

                {
                    recipient ? (
                        <Avatar src={recipient?.photoURL} />
                    ) : (
                        <Avatar>{recipientEmail[0]}</Avatar>
                    )
                }

                {/* Header Information */}
                <div className='ml-8 flex-grow'>

                    {/* Recipient Email */}
                    <h3 className='mb-1'>{recipientEmail}</h3>

                    {/* Last Seen */}
                    {
                        recipientSnapshot ? (
                            <p
                                className='text-sm text-gray-600'
                            >
                                Last active: {' '}
                                {
                                    recipient?.lastSeen?.toDate() ? (
                                        <TimeAgo
                                            datetime={recipient?.lastSeen?.toDate()}
                                        />
                                    ) : 'Unavailable'
                                }
                            </p>
                        ) : (
                            <p
                                className='text-sm text-gray-600'
                            >
                                Loading last active...
                            </p>
                        )
                    }

                </div>

                {/* Header Icons */}
                <div>
                    <IconButton>
                        <AttachFileRounded />
                    </IconButton>
                    <IconButton>
                        <MoreVertRounded />
                    </IconButton>
                </div>

            </header>

            {/* Message Container */}
            <div className='p-10 bg-[#e5ded8] min-h-90'>
                {/* Show Messages */}
                {
                    showMessages()
                }

                {/* End of Messages */}
                <div 
                    className='mb-8'
                    ref={endOfMessagesRef}
                />

            </div>

            {/* Input Container */}
            <form
                className='flex items-center p-3 sticky bottom-0 bg-white z-50'
            >
                <InsertEmoticonRoundedIcon />
                <input
                    type="text"
                    className='flex-grow items-center p-3 sticky bottom-0 bg-[#e5e5e5] z-50 outline-none rounded-full mx-3.5'
                    value={input}
                    onChange={e => setInput(e.target.value)}
                />
                <button
                    hidden
                    disabled={!input}
                    type='submit'
                    onClick={sendMessage}
                >
                    Send Message
                </button>
                <MicIcon />
            </form>

        </div>
    )
}

export default ChatScreen

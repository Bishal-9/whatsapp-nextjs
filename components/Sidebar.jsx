import { Avatar, Button, IconButton } from "@material-ui/core";
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import * as EmailValidator from 'email-validator'
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from 'react-firebase-hooks/firestore'
import { auth, db } from '../firebase'
import Chat from "./Chat";

function Sidebar() {

    const [user] = useAuthState(auth)
    const userChatRef = db.collection('chats').where('users', 'array-contains', user.email)
    const [chatsSnapshot] = useCollection(userChatRef)

    const createChat = e => {
        const input = prompt('Please enter an email address for the user you wish to chat with')

        if (!input) return null

        if (
            EmailValidator.validate(input) &&
            !chatAlreadyExists(input) &&
            input !== user.email
        ) {
            db
                .collection('chats')
                .add({
                    users: [user.email, input],
                })
        }
    }

    const chatAlreadyExists = recipientEmail => !!chatsSnapshot?.docs
        .find(chat => chat.data().users
            .find(user => user === recipientEmail)?.length > 0
        )


    return (

        // Container
        <div className='flex-0.45 border-r-2 h-screen min-w-300 max-w-350 overflow-y-scroll scrollbar-hide'>

            {/* Header */}
            <header className='flex sticky top-0 bg-white z-10 justify-between items-center p-4 h-16 border-gray-400'>

                {/* User Avatar */}
                <Avatar
                    src={user.photoURL}
                    className='cursor-pointer hover:opacity-80'
                    onClick={() => auth.signOut()}
                />

                {/* Icon Container */}
                <div>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </header>

            {/* Search Container */}
            <div className='flex items-center p-4 rounded-full'>
                <SearchIcon className='' />
                <input
                    type="text"
                    className='outline-none flex-grow'
                    placeholder='Search'
                />
            </div>

            {/* Sidebar Button */}
            <Button className='w-full !border-gray-700' onClick={createChat}>
                Start a new chat
            </Button>

            {/* List of Chats */}
            {
                chatsSnapshot?.docs.map(chat => (
                    <Chat
                        key={chat.id}
                        id={chat.id}
                        users={chat.data().users}
                    />
                ))
            }

        </div>
    )
}

export default Sidebar

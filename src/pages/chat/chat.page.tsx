import { useState, useEffect } from "react"
import { toast } from "react-toastify";

import { Card, Avatar } from "flowbite-react";

export interface UserDetail {
    _id: string,
    name: string,
    email: string,
    image: string,
}
export interface SingleMessage{
    _id: string,
    sender: UserDetail,
    reciver: UserDetail,
    date: Date,
    message: string
}

export interface SingleUser{
    _id: string,
    name: string,
    email: string,
    image: string,
    message: SingleMessage[]
}

export const ChatUserList = ({user}: {user: SingleUser}) => {
    return (<>
        <div className="flex pe-5 mb-5 mt-3 shadow-lg bg-gray-100 hover:bg-blue-50 hover:cursor-pointer">
            <div className="w-1/4 mx-3">
                <img src={user.image} className="rounded-full" alt="" />
            </div>
            <div className=" py-5 ms-3">
                <h1 className="bold">{user.name}</h1>
                <p className="text-xs italic">
                    {user.email}
                </p>
                <small className="text-xs italic text-gray-500">
                    {user?.message[0].message}
                </small>
            </div>
        </div>
    </>)
}

const messages = [
    {
        _id: "123",
        sender: {
            _id: "1234",
            name: "User name",
            email: "name@user.com",
            image: "https://placehold.co/600x600",
        },
        reciver: {
            _id: "1234",
            name: "User name",
            email: "name@user.com",
            image: "https://placehold.co/600x600",
        },
        date: new Date(),
        message: "Hello"
    },
    {
        _id: "1233",
        sender: {
            _id: "123",
            name: "User name",
            email: "name@user.com",
            image: "https://placehold.co/600x600",
        },
        reciver: {
            _id: "1234",
            name: "User name",
            email: "name@user.com",
            image: "https://placehold.co/600x600",
        },
        date: new Date(),
        message: "Hello"
    },
    {
        _id: "123",
        sender: {
            _id: "1234",
            name: "User name",
            email: "name@user.com",
            image: "https://placehold.co/600x600",
        },
        reciver: {
            _id: "1234",
            name: "User name",
            email: "name@user.com",
            image: "https://placehold.co/600x600",
        },
        date: new Date(),
        message: "Hello"
    },
    {
        _id: "123",
        sender: {
            _id: "1234",
            name: "User name",
            email: "name@user.com",
            image: "https://placehold.co/600x600",
        },
        reciver: {
            _id: "1234",
            name: "User name",
            email: "name@user.com",
            image: "https://placehold.co/600x600",
        },
        date: new Date(),
        message: "Hello"
    },
    {
        _id: "123",
        sender: {
            _id: "1234",
            name: "User name",
            email: "name@user.com",
            image: "https://placehold.co/600x600",
        },
        reciver: {
            _id: "1234",
            name: "User name",
            email: "name@user.com",
            image: "https://placehold.co/600x600",
        },
        date: new Date(),
        message: "Hello"
    }
]

const currentUser = {
    _id: "1234",
    name: "User name",
    email: "name@user.com",
    image: "https://placehold.co/600x600",
}

const ChatListView = () => {
    const [userList, setUserList] = useState<SingleUser[]>();

    // load all users 
    const loadAllUsers =async () => {
        try {
            const response: SingleUser[] = [
                {
                    _id: "123",
                    name: "User name",
                    email: "name@user.com",
                    image: "https://placehold.co/600x600",
                    message: [
                        {
                            _id: "123123",
                            sender: {
                                _id: "1234",
                                name: "User one",
                                email: "one@user.com",
                                image: "https://placehold.co/600x600",
                            },
                            reciver: {
                                _id: "123",
                                name: "User name",
                                email: "name@user.com",
                                image: "https://placehold.co/600x600",
                            },
                            date: "2024-08-07T09:00:00.123Z",
                            message: "Hello"
                        }
                    ]
                },
                {
                    _id: "123",
                    name: "User Two",
                    email: "two@user.com",
                    image: "https://placehold.co/600x600",
                    message: [
                        {
                            _id: "123123",
                            sender: {
                                _id: "1234",
                                name: "User name",
                                email: "name@user.com",
                                image: "https://placehold.co/600x600",
                            },
                            reciver: {
                                _id: "123",
                                name: "User Two",
                                email: "two@user.com",
                                image: "https://placehold.co/600x600",
                            },
                            date: "2024-08-07T09:00:00.123Z",
                            message: "Hello"
                        }
                    ]
                },
            ]

            setUserList(response);
        } catch(exception) {
            toast.error("Error loading user list.")
        }
    }
    useEffect(() => {
        loadAllUsers()
    }, [])
    return (<>
    
        <div className="md:flex lg:flex sm:grid-cols-1 mx-3 md:mx-20 py-5 gap-2 mt-5 min-h-screen">
            <div className="w-1/4 bg-gray-200">
                {
                    userList && userList.map((row: SingleUser, i: number) => (
                        <ChatUserList user={row} key={i} />
                    ))
                }
                
            </div>
            <div className="w-3/4">
                <div className="p-4">
                    <Card>
                        <div className="h-96 overflow-y-auto">
                        {messages.map((message: any, index: number) => (
                            <div
                            key={index}
                            className={`flex items-start mb-4 ${
                                message.sender._id === currentUser._id
                                ? 'justify-end'
                                : 'justify-start'
                            }`}
                            >
                            {message.sender._id !== currentUser._id && (
                                <Avatar
                                img={message.sender.image}
                                rounded={true}
                                className="mr-2"
                                />
                            )}
                            <div
                                className={`rounded-lg px-4 py-2 ${
                                message.sender._id === currentUser._id
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-200 text-gray-900'
                                } max-w-xs`}
                            >
                                <p>{message.message}</p>
                                <small className="block mt-1 text-xs text-gray-600">
                                {new Date(message.date).toLocaleTimeString()}
                                </small>
                            </div>
                            {message.sender._id === currentUser._id && (
                                <Avatar
                                img={message.sender.image}
                                rounded={true}
                                className="ml-2"
                                />
                            )}
                            </div>
                        ))}
                        </div>
                        <div className="mt-4">
                        <input
                            type="text"
                            placeholder="Type a message..."
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                        />
                        </div>
                    </Card>
                    </div>
            </div>
        </div>

    </>)
}

export default ChatListView;
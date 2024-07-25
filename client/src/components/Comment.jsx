import React, { useEffect } from 'react'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment'
import { Button, Textarea } from 'flowbite-react';
import { FaThumbsUp } from 'react-icons/fa'

export default function Comment({ comment, onLike, onEdit, onDelete }) {

    const [user, setUser] = useState({});
    const [isEditting, setIsEditting] = useState(false)
    const [edittedContent, setEdittedContent] = useState(comment.content)
    const { currentUser } = useSelector((state) => state.user)

    {/* ============================ FETCHES THE RESPECTIVE USER ============================= */}
    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await fetch(`/api/user/${comment.userId}`);
                const data = await res.json();
                // console.log(data)

                if (res.ok) {
                    setUser(data)
                }
            } catch (error) {
                console.log(error.message);
            }
        };
        getUser();
    }, [comment])

    {/* ============================ EDITTING THE COMMENT ============================= */}
    const handleEdit = () => {
        setIsEditting(true);
        setEdittedContent(comment.content)
    }

    {/* ============================ SAVES THE EDITTED COMMENT ============================= */}
    const handleSave = async () => {
        try {
            const res = await fetch(`/api/comment/editComment/${comment._id}`, {
                method: 'PUT', 
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    content: edittedContent
                })
            })

            if(res.ok) {
                setIsEditting(false);
                onEdit(comment, edittedContent)
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <div className='flex p-4 border-b dark:border-gray-600 text-sm'>

            {/* ============================ SHOWS THE PROFILE PICTURE OF THE USER ============================= */}
            <div className='flex-shrink-0 mr-3'>
                <img className='w-10 h-10 rounded-md bg-gray-200' src={user.profilePicture} alt={user.username}></img>
            </div>

            <div className='flex-1'>
                <div className='flex items-center mb-1 '>
                    <span className='font-bold mr-1 text-xs truncate'>{user ? `@${user.username}` : "anonymous user"}</span>

                    <span className='text-gray-500 text-sm'>{moment(comment.createAt).fromNow()}</span>
                </div>

                {isEditting ? (
                    <>
                    {/* ============================ TEXT AREA ============================= */}
                    {/* Here the current logged In user can easily write the comment with a limit of 200 characters */}
                        <Textarea
                            className='mb-2'

                            value={edittedContent}
                            onChange={(e) => setEdittedContent(e.target.value)}
                        />
                        <div className='flex justify-end gap-3 text-sm'>
                            <Button type='button' size='sm' gradientDuoTone='purpleToBlue'
                                onClick={handleSave}
                            >Save</Button>

                            <Button type='button' size='sm' gradientDuoTone='purpleToBlue' outline
                                onClick={() => setIsEditting(false)}
                            >Cancel</Button>
                        </div>

                    </>

                ) : (
                    <>
                        <p className='text-gray-500 pb-2'>
                            {comment.content}
                        </p>
                        
                        {/* ============================ COMMENT LIKE SECTION  ============================= */}
                        <div className='flex items-center pt-2 text-small border-t dark:border-color-700 max-w-fit gap-2'>
                            <button type='button' onClick={() => onLike(comment._id)} className={`text-gray-400 hover:text-blue-500 ${currentUser && comment.likes.includes(currentUser._id) && '!text-blue-500'} `}>
                                <FaThumbsUp className='text-sm' />
                            </button>
                            <p className='text-gray-400'>{
                                comment.numberOfLikes > 0 && comment.numberOfLikes + " " + (comment.numberOfLikes === 1 ? "like" : "likes")
                            }
                            </p>

                            {/* ============================ COMMENT EDITTING SECTION ============================= */}
                            {
                                currentUser && (currentUser._id === comment.userId || currentUser.isAdmin) && (
                                    <>
                                    <button
                                        type='button'
                                        onClick={handleEdit}
                                        className='text-gray-500 hover:text-blue-500' >
                                        Edit
                                    </button>
                            {/* ============================ COMMENT DELETING SECTION ============================= */}
                                    <button
                                        type='button'
                                        onClick={() => onDelete(comment._id)}
                                        className='text-gray-500 hover:text-red-500' >
                                        Delete
                                    </button>
                                    </>
                                )
                            }
                        </div>
                    </>
                )}


            </div>


        </div>
    )
}

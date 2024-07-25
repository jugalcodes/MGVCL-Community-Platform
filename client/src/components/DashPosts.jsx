import { Table, TableHead, Button, Modal } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { HiOutlineExclamationCircle } from 'react-icons/hi'

export default function DashPosts() {

  const { currentUser } = useSelector(state => state.user)
  const [userPosts, setUserPosts] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState('')
  const [comments, setComments] = useState([]);
  const [authorName, setAuthorName] = useState('')
  const [users, setUsers] = useState([])

  // console.log(userPosts)

  {/* =========================== USE-EFFECT TO FETCH POSTS =========================== */}
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`)
        const data = await res.json()
        // console.log(data)

        if (res.ok) {
          setUserPosts(data.posts)
          if (data.posts.length < 9) {
            setShowMore(false)
          }
        }
      } catch (error) {
        console.log(error.message)
      }
    };

    fetchPosts()

  }, [currentUser._id]);

  {/* ========================  HANDLES SHOW MORE =========================== */}
  const handleShowMore = async () => {
    const startIndex = userPosts.length;

    try {
      const res = await fetch(`/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`)
      const data = await res.json();
      if (res.ok) {
        setUserPosts((prev) => [...prev, ...data.posts]);
        if (data.posts.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  {/* ============================= HANDLES DELETE POST ================================ */}
  const handleDeletePost = async () => {
    setShowModal(false);

    try {
      const res = await fetch(`/api/post/deletepost/${postIdToDelete}/${currentUser._id}`,
        {
          method: 'DELETE',
        });

      const data = await res.json();
      if (!res.ok) {
        console.log(data.message)
      }
      else {
        setUserPosts((prev) =>
          prev.filter((post) => post._id !== postIdToDelete)
        );
      }

    } catch (error) {
      console.log(error.message);
    }
  }

  
  {/* ======================== USE EFFECT TO FETCH USERS =========================== */}
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`/api/user/getusers`)
        const data = await res.json()
        // console.log(data)

        if (res.ok) {
          setUsers(data.users)
          if (data.users.length < 9) {
            setShowMore(false)
          }
        }
      } catch (error) {
        console.log(error.message)
      }
    };
    
      fetchUsers()
    
  }, [currentUser._id]);

  
  

  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      {

        userPosts.length > 0 ? (
          <>
          {/* ============================ TABLE CREATION ============================= */}
            <Table hoverable className='shadow-md '>
              <TableHead>
                <Table.HeadCell>Date Updated</Table.HeadCell>
                <Table.HeadCell>Post Image</Table.HeadCell>
                <Table.HeadCell>Post Title</Table.HeadCell>
                <Table.HeadCell>Category</Table.HeadCell>
                
                <Table.HeadCell>Delete</Table.HeadCell>
                <Table.HeadCell>
                  <span>Edit</span>
                </Table.HeadCell>
              </TableHead>
              {userPosts.map((post, user) => (
                <Table.Body className='divide-y' >
                  <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-700'>

                    {/* ============================== UPDATION DATE ========================= */}
                    <Table.Cell>{new Date(post.updatedAt).toLocaleDateString()}</Table.Cell>

                    {/* ============================== IMAGE ============================= */}
                    <Table.Cell>
                      <Link to={`/post/${post.slug}`}>
                        <img
                          src={post.image}
                          alt={post.title}
                          className='w-10 h-10 object-cover bg-gray-500'
                        />
                      </Link>
                    </Table.Cell>

                    {/* ============================ TITLE =========================== */}
                    <Table.Cell>
                      <Link className='font-medium text-gray-900 dark:text-white' to={`/post/${post.slug}`}>{post.title}</Link>
                    </Table.Cell>
                       
                    

                    {/* ============================ CATEGORY ============================== */}
                    <Table.Cell>
                      {post.category}
                    </Table.Cell>


                 
                    {/* ============================== DELETE BUTTON ===================== */}
                    <Table.Cell>
                      <span onClick={() => {
                        setShowModal(true)
                        setPostIdToDelete(post._id);
                      }} className='hover:underline text-red-500 font-medium cursor-pointer'>
                        Delete
                      </span>
                    </Table.Cell>

                    {/* ============================ EDIT BUTTON ================================ */}
                    <Table.Cell>
                      <Link className='text-teal-500 hover:underline' to={`/update-post/${post._id}`}>
                        <span>Edit</span>
                      </Link>
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}

            </Table>

            {/* ==================================== SHOW MORE BUTTON =================================== */}
            {
              showMore && (
                <button onClick={handleShowMore} className='w-full text-teal-500 self-center text-sm py-7'>Show More</button>
              )
            }
          </>
        ) : (
          <p>No Post Found</p>
        )
      }

      {/* ====================================== MODAL CONFIGURATION ======================================= */}
      {/* Here we the help of modal when the user clicks on the delete button a message box will appear that confirms the user regarding deletion of the comment */}
      {/* Thus this handles unwanted or by mistake deletion of the comments from comment section */}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size='md'
      >
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mt-4 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>Are you sure you want to delete your Account?</h3>
            <div className='flex justify-center gap-6' >
              <Button color='failure' onClick={handleDeletePost}>Yes I'm sure</Button>
              <Button color='gray' onClick={() => setShowModal(false)}>No, Cancel</Button>
            </div>
          </div>
        </Modal.Body>

      </Modal>

    </div>


  );
}

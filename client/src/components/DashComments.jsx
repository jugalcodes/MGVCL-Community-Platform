import { Table, TableHead, Button, Modal } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { HiOutlineExclamationCircle } from 'react-icons/hi'
import { FaCheck, FaTimes } from 'react-icons/fa'

export default function DashComments() {

  const { currentUser } = useSelector(state => state.user)
  const [comments, setComments] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [commentIdToDelete, setCommentIdToDelete] = useState('')

  // console.log(userPosts)

  {/* =========================== USE-EFFECT TO FETCH COMMENTS ============================= */}
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/comment/getcomments`)
        const data = await res.json()
        // console.log(data)

        if (res.ok) {
          setComments(data.comments)
          if (data.comments.length < 9) {
            setShowMore(false)
          }
        }
      } catch (error) {
        console.log(error.message)
      }
    };
    if (currentUser.isAdmin) {
      fetchComments()
    }
  }, [currentUser._id]);


  {/* ============================== HANDLE-SHOW MORE  ================================= */}
  const handleShowMore = async () => {
    const startIndex = comments.length;

    try {
      const res = await fetch(`/api/comment/getcomments?startIndex=${startIndex}`)
      const data = await res.json();
      if (res.ok) {
        setComments((prev) => [...prev, ...data.comments]);
        if (data.comments.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message)
    }
  }


  {/* ================================= HANDLE-DELETE USER ================================= */}
  const handleDeleteComment = async () => {
    setShowModal(false);

    try {
      const res = await fetch(`/api/comment/deleteComment/${commentIdToDelete}`,
        {
          method: 'DELETE',
        });

      const data = await res.json();
      if (res.ok) {
        setComments((prev)=> prev.filter((comment) =>comment._id !== commentIdToDelete))
        setShowModal(false)
      }
      else {
        console.log(data.message)
      }

    } catch (error) {
      console.log(error.message);
    }
  }



  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      {
        currentUser.isAdmin && comments.length > 0 ? (
          <>
          {/* ============================ TABLE CREATION ============================= */}
            <Table hoverable className='shadow-md' >
              <TableHead>
                <Table.HeadCell>Date Updated</Table.HeadCell>
                <Table.HeadCell>Comment Content</Table.HeadCell>
                <Table.HeadCell>Number of Likes</Table.HeadCell>
                <Table.HeadCell>PostId</Table.HeadCell>
                <Table.HeadCell>UserId</Table.HeadCell>
                <Table.HeadCell>Delete</Table.HeadCell>

              </TableHead>
              {comments.map((comment) => (
                <Table.Body className='divide-y' key={comment._id}>
                  <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-700'>

                    {/* ======================= UPDATION DATE ======================== */}
                    <Table.Cell>{new Date(comment.updatedAt).toLocaleDateString()}</Table.Cell>

                    {/* ======================= COMMENT 'S DESCRIPTION ======================== */}
                    <Table.Cell>
                       {comment.content}
                    </Table.Cell>

                    {/* ======================= NUMBER OF LIKES ========================== */}
                    <Table.Cell>
                      {comment.numberOfLikes}
                    </Table.Cell>

                    {/* ========================= EMAIL ======================= */}
                    <Table.Cell>
                      {comment.postId}
                    </Table.Cell>

                    {/* ======================== ISADMIN ====================== */}
                    <Table.Cell>
                      {comment.userId}
                    </Table.Cell>

                    {/* ======================= DELETE BUTTON ====================== */}
                    <Table.Cell>
                      <span onClick={() => {
                        setShowModal(true)
                        setCommentIdToDelete(comment._id);
                      }} className='hover:underline text-red-500 font-medium cursor-pointer'>
                        Delete
                      </span>
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}

            </Table>

            {/* ================== SHOW MORE BUTTON ================== */}
            {
              showMore && (
                <button onClick={handleShowMore} className='w-full text-teal-500 self-center text-sm py-7'>Show More</button>
              )
            } 
          </>
        ) : (
          <p>No Comment Found</p>
        )
      }

      {/* ================== MODAL CONFIGURATION ================== */}
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
              <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>Are you sure you want to delete this Comment?</h3>
              <div className='flex justify-center gap-6' >
                <Button color='failure' onClick={handleDeleteComment}>Yes I'm sure</Button>
                <Button color='gray' onClick={() => setShowModal(false)}>No, Cancel</Button>
              </div>
            </div>
          </Modal.Body>
        
      </Modal>

    </div>


  );
}

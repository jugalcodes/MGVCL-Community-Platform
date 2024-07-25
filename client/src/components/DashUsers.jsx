import { Table, TableHead, Button, Modal } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { HiOutlineExclamationCircle } from 'react-icons/hi'
import { FaCheck, FaTimes } from 'react-icons/fa'

export default function DashUsers() {

  const { currentUser } = useSelector(state => state.user)
  const [users, setUsers] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState('')

  // console.log(userPosts)

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
    if (currentUser.isAdmin) {
      fetchUsers()
    }
  }, [currentUser._id]);


  {/* ======================== HANDLE-SHOW MORE  =========================== */}
  const handleShowMore = async () => {
    const startIndex = users.length;

    try {
      const res = await fetch(`/api/user/getusers?startIndex=${startIndex}`)
      const data = await res.json();
      if (res.ok) {
        setUsers((prev) => [...prev, ...data.users]);
        if (data.users.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message)
    }
  }


  {/* ======================== HANDLE-DELETE USER =========================== */}
  const handleDeleteUser = async () => {
    setShowModal(false);

    try {
      const res = await fetch(`/api/user/delete/${userIdToDelete}`,
        {
          method: 'DELETE',
        });

      const data = await res.json();
      if (res.ok) {
        setUsers((prev)=> prev.filter((user) =>user._id !== userIdToDelete))
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
        currentUser.isAdmin && users.length > 0 ? (
          <>
          {/* ============================ TABLE CREATION ============================= */}
            <Table hoverable className='shadow-md' >
              <TableHead>
                <Table.HeadCell>Date Created</Table.HeadCell>
                <Table.HeadCell>User Image</Table.HeadCell>
                <Table.HeadCell>Username</Table.HeadCell>
                <Table.HeadCell>Email</Table.HeadCell>
                <Table.HeadCell>Admin</Table.HeadCell>
                <Table.HeadCell>Delete</Table.HeadCell>

              </TableHead>
              {users.map((user) => (
                <Table.Body className='divide-y' key={user._id}>
                  <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-700'>

                    {/* ================== UPDATION DATE ================== */}
                    <Table.Cell>{new Date(user.createdAt).toLocaleDateString()}</Table.Cell>

                    {/* =================== IMAGE ========================== */}
                    <Table.Cell>
                      
                        <img
                          src={user.profilePicture}
                          alt={user.username}
                          className='w-20 h-10 object-cover bg-gray-500 rounded-full'
                        />
                      
                    </Table.Cell>

                    {/* ===================== USERNAME ==================== */}
                    <Table.Cell>
                      {user.username}
                    </Table.Cell>

                    {/* ====================== EMAIL ===================== */}
                    <Table.Cell>
                      {user.email}
                    </Table.Cell>

                    {/* ===================== ISADMIN ===================== */}

                    <Table.Cell>
                      {user.isAdmin ? (<FaCheck className='text-green-500' />): (<FaTimes className='text-red-500' />)}
                    </Table.Cell>

                    {/* ===================== DELETE BUTTON ===================== */}
                    <Table.Cell>
                      <span onClick={() => {
                        setShowModal(true)
                        setUserIdToDelete(user._id);
                      }} className='hover:underline text-red-500 font-medium cursor-pointer'>
                        Delete
                      </span>
                    </Table.Cell>

                    
                    
                  </Table.Row>
                </Table.Body>
              ))}

            </Table>

            {/* ============================ SHOW MORE BUTTON ================================ */}
            {
              showMore && (
                <button onClick={handleShowMore} className='w-full text-teal-500 self-center text-sm py-7'>Show More</button>
              )
            } 
          </>
        ) : (
          <p>No User Found</p>
        )
      }

      {/* =============================== MODAL CONFIGURATION =================================== */}
      
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
              <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>Are you sure you want to delete this User?</h3>
              <div className='flex justify-center gap-6' >
                <Button color='failure' onClick={handleDeleteUser}>Yes I'm sure</Button>
                <Button color='gray' onClick={() => setShowModal(false)}>No, Cancel</Button>
              </div>
            </div>
          </Modal.Body>
        
      </Modal>

    </div>


  );
}

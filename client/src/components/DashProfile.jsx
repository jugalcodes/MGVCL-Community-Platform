import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Alert, Button, Modal, TextInput } from 'flowbite-react'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase'
import { CircularProgressbar } from 'react-circular-progressbar'; // this package will help us to show the progress bar over the image
import 'react-circular-progressbar/dist/styles.css';
import { updateStart, updateSuccess, updateFailure, deleteUserFailure, deleteUserStart, deleteUserSuccess, signoutSuccess } from '../redux/user/userSlice'
import { useDispatch } from 'react-redux'
import { HiOutlineExclamationCircle } from 'react-icons/hi'
import {Link} from 'react-router-dom'

export default function DashProfile() {

    const { currentUser, error, loading } = useSelector((state) => state.user)
    const [imageFile, setImageFile] = useState(null)
    const [imageFileUrl, setImageFileUrl] = useState(null)
    const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null)
    const [imageFileUploadError, setImageFileUploadError] = useState(null)
    const [imageFileUploading, setImageFileUploading] = useState(false);
    const [updateUserSuccess, setUpdateUserSuccess] = useState(null)
    const [updateUserError, setUpdateUserError] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const filePickerRef = useRef();
    const [formData, setFormData] = useState({});
    const dispatch = useDispatch();

    {/* ============================ HANLDES PROFILE PICTURE CHANGE FUNCTIONALITY ============================= */}
    //here by we are creating a temporary URL for the image so that we can change the image as per our further functionality
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {  // this means that if the file exists then proceed ahead to the conditional statement
            setImageFile(file);
            setImageFileUrl(URL.createObjectURL(file))
        }
    };

    {/* ============================ LOADING EFFECT ============================= */}
    // now giving the loading effect style to the image section using react hook
    useEffect(() => {
        if (imageFile) {
            uploadImage();
        }
    }, [imageFile])

    // now we will create the uploadImage function as it should asynchronous as we need to wait for the image to get uploaded
    const uploadImage = async () => {

        {/* ============================ FIRE BASE CONNECTION CODE FOR OAUTH ============================= */}
        // This are the rules and codes that we put in the "FIREBASE" for the image updation and validation
        // service firebase.storage {
        //     match /b/{bucket}/o {
        //       match /{allPaths=**} {
        //         allow read;
        //         allow write: if	
        //         request.resource.size < 2 * 1024 * 1024 &&
        //         request.resource.contentType.matches('image/.*')
        //       }
        //     }
        //   }

        setImageFileUploading(true);

        setImageFileUploadError(null);

        const storage = getStorage(app);
        const fileName = new Date().getTime() + imageFile.name;  // here if the user reuploads the same fileName or the other user uploads the same file then the fileName will be although same so we added date and time in the fileName which is always unique and will make the file name unique
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, imageFile);  // it is a kind of method through which we will get information about the upload status that is amount of bytes uploaded.
        uploadTask.on(
            'state_changed',
            (snapshot) => {   // snapshot is a kind of piece of progress of the upload it shows amount of bytes uploaded 
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

                // here the progress will give output in decimals so to avoid it we use toFixed(0) thus no decimal will be the part of the decimal
                setImageFileUploadProgress(progress.toFixed(0));
            },

            (error) => {
                setImageFileUploadError('Could not upload the Image');
                setImageFileUploadProgress(null);
                setImageFile(null);
                setImageFileUrl(null);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImageFileUrl(downloadURL);
                    setFormData({ ...formData, profilePicture: downloadURL });
                    setImageFileUploading(false);
                });
            });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };
    // console.log(formData) 

    {/* ============================ HANLDES FINAL DP CHANGE SUBMISSION ============================= */}
    // This is the handle submission after the image change is done and along with bearer authorization token for better security 
    const handleSubmit = async (e) => {
        e.preventDefault();
        setUpdateUserError(null);
        setUpdateUserSuccess(null);
        if (Object.keys(formData).length === 0) {
            setUpdateUserError('No changes made');
            return;
        }

        if (imageFileUploading) {
            setUpdateUserError('Please wait for the Image to Upload')
            return;
        }

        try {
            dispatch(updateStart());

            const token = localStorage.getItem('access_token'); // or however you store your token
            const res = await fetch(`/api/user/update/${currentUser._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();


            if (!res.ok) {
                dispatch(updateFailure(data.message));
                setUpdateUserError(data.message);
            }
            else {
                dispatch(updateSuccess(data))
                setUpdateUserSuccess("User's Profile is updated Successfully")
            }
        } catch (error) {
            dispatch(updateFailure(error.message));
            setUpdateUserError(data.message);
        }
    }
{/* ============================ HANDLES DELETE USER FUNCTIONALITY ============================= */}
    const handleDeleteUser = async () => {
        setShowModal(false);

        try {
            dispatch(deleteUserStart());
            const res = await fetch(`/api/user/delete/${currentUser._id}`, {
                method: 'DELETE',
            });

            const data = await res.json();

            if (!res.ok) {
                dispatch(deleteUserFailure(data.message));
            }
            else {
                dispatch(deleteUserSuccess(data))
            }
        } catch (error) {
            dispatch(deleteUserFailure(error.message))
        }
    };

    {/* ============================ SIGN OUT FUNCTIONALITY ============================= */}
    const handleSignout = async () => {
        try {
            const res = await fetch('/api/user/signout', {
                method: 'POST',
            });

            const data = await res.json();
            if (!res.ok) {
                console.log(data.message);
            }
            else {
                dispatch(signoutSuccess())
                // localStorage.removeItem('access_token');
            }

        } catch (error) {
            console.log(error.message)
        }
    };



    return (
        <div className='max-w-sm mx-auto   p-3 w-full'>
            <h1 className='my-5 text-center font-semibold text-3xl'>Profile</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>

                {/* changing the profile picture or the avatar */}
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    ref={filePickerRef}
                    hidden
                />
                
                {/* ============================ PROGRESS BAR FOR UPLOADING OF IMAGE ============================= */}
                <div className='relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full' onClick={() => filePickerRef.current.click()}>
                    {imageFileUploadProgress && (
                        <CircularProgressbar value={imageFileUploadProgress || 0} text={`${imageFileUploadProgress}%`} strokeWidth={5}
                            styles={
                                {
                                    root: {
                                        width: '100%',
                                        hegith: '100%',
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                    },
                                    path: {
                                        stroke: `rgba(62,152,199, ${imageFileUploadProgress / 100})` // here we have this to dynamic in nature so that it will change as per TRANSPHARENCY that is more progress thus more opaque in nature
                                    },
                                }
                            }
                        />
                    )}
                    <img
                        src={imageFileUrl || currentUser.profilePicture}
                        alt="user"
                        className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${imageFileUploadProgress && imageFileUploadProgress < 100 && 'opacity-50'}`}>
                    </img>
                </div>

                {imageFileUploadError &&

                    <Alert color='failure'>
                        {imageFileUploadError}
                    </Alert>
                }

                {/* ============================ TEXT INPUT AREA FOR BASIC DETAILS ============================= */}
                <TextInput type="text" id='username' placeholder='username' defaultValue={currentUser.username} onChange={handleChange}></TextInput>
                <TextInput type="email" id='email' placeholder='email' defaultValue={currentUser.email} onChange={handleChange}></TextInput>
                <TextInput type="password" id='password' placeholder='password' onChange={handleChange}></TextInput>

                <Button type='submit' gradientDuoTone='purpleToBlue' outline disabled={loading || imageFileUploading}>
                    {loading? 'loading' : 'Update'}
                </Button>

                {/* ============================ LINK TO CREATE POST SECTION ============================= */}
                {
                    (
                        <Link to={'/create-post'}>
                            <Button
                                type="button"
                                gradientDuoTone='purpleToPink'
                                className='w-full'
                            >
                                Create a Post :)
                            </Button>
                        </Link>

                    )
                }

            </form>

            {/* ============================ DELETE USER AND SIGNOUT FUNCTIONLITY  ============================= */}
            <div className='text-red-500 flex justify-between mt-5'>
                <span onClick={() => setShowModal(true)} className='cursor-pointer'>Delete Account</span>
                <span onClick={handleSignout} className='cursor-pointer'>Sign Out</span>
            </div>

            {updateUserSuccess && (
                <Alert color='success' className='mt-5'>
                    {updateUserSuccess}
                </Alert>
            )}

            {updateUserError && (
                <Alert color='failure' className='mt-5'>
                    {updateUserError}
                </Alert>
            )}

            {/* {error && (
                <Alert color='failure' className='mt-5'>
                    {error}
                </Alert>
            )} */}

            {/* ============================ MODAL FOR USER ACCOUTN DELETION ============================= */}
            <Modal
                show={showModal}
                onClose={() => setShowModal(false)}
                popup
                size='md'
            >
                <Modal.Header>
                    <Modal.Body>
                        <div className='text-center'>
                            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mt-4 mb-4 mx-auto' />
                            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>Are you sure you want to delete your Account?</h3>
                            <div className='flex justify-center gap-6' >
                                <Button color='failure' onClick={handleDeleteUser}>Yes I'm sure</Button>
                                <Button color='gray' onClick={() => setShowModal(false)}>No, Cancel</Button>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal.Header>
            </Modal>
        </div>
    );
}

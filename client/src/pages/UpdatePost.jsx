import { Dropdown, FileInput, Select, TextInput, Button, Alert } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getStorage, uploadBytesResumable, ref, getDownloadURL } from 'firebase/storage';
import { app } from '../firebase';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function UpdatePost() {
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    content: '',
    image: ''
  });
  const [publishError, setPublishError] = useState(null);
  const navigate = useNavigate();
  const { postId } = useParams();
  const { currentUser } = useSelector((state) => state.user);

  {/* ============================ FETCHES THE POST THAT IS TO BE EDITED ============================= */}
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/post/getposts?postId=${postId}`);
        const data = await res.json();

        if (!res.ok) {
          console.log(data.message);
          setPublishError(data.message);
          return;
        }

        if (res.ok) {
          setPublishError(null);
          setFormData(data.posts[0]);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchPost();
  }, [postId]);

  {/* ============================ HANDLES EDITED IMAGE SECTION ============================= */}
  const handleUploadImage = async () => {
    if (!file) {
      setImageUploadError('Please select an Image');
      return;
    }

    setImageUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + '-' + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageUploadError('Image upload failed');
        setImageUploadProgress(null);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageUploadError(null);
          setImageUploadProgress(null);
          setFormData((prevData) => ({ ...prevData, image: downloadURL }));
        });
      }
    );
  };

  {/* ============================ HANDLES THE UPDATED VALUE CHANGES ============================= */}
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleContentChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      content: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/post/updatepost/${formData._id}/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      setPublishError(null);
      navigate(`/post/${data.slug}`);
    } catch (error) {
      setPublishError('Something went wrong');
    }
  };

  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-center text-3xl my-5 font-semibold'>Update the Post</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>

        {/* ============================ BASIC DETAILS FOR POST =================================== */}
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
          <TextInput
            type='text'
            id='title'
            name='title'
            placeholder='Title'
            required
            className='flex-1'
            onChange={handleChange}
            value={formData.title}
          />

          {/* ============================ CATEGORY SELECTION SECTION ============================= */}
          <Select
            name='category'
            onChange={handleChange}
            value={formData.category}
          >
            <option value="uncategorized">Select a category</option>
            <option value="smart-meter">Smart Meter</option>
            <option value="transformers">Transformers</option>
            <option value="payment-gateway">Payment Gateway</option>
            <option value="Complain-System">Complain System</option>
          </Select>
        </div>

        {/* ============================ UPLOAD IMAGE SECTION ============================= */}
        <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
          <FileInput type='file' accept='image/*' onChange={(e) => setFile(e.target.files[0])} />
          <Button
            type='button'
            gradientDuoTone='purpleToPink'
            size='sm'
            outline
            onClick={handleUploadImage}
            disabled={!!imageUploadProgress}
          >
            {imageUploadProgress ? (
              <div className='w-16 h-16'>
                <CircularProgressbar value={imageUploadProgress} text={`${imageUploadProgress || 0}%`} />
              </div>
            ) : (
              'Upload Image'
            )}
          </Button>
        </div>
        {imageUploadError && <Alert color='failure'>{imageUploadError}</Alert>}
        {formData.image && (
          <img src={formData.image} alt='upload' className='w-full h-72 object-cover' />
        )}

        {/* ============================ REACT QUILL BOARD FOR CONTENT EDITING ===================== */}
        <ReactQui
          value={formData.content}
          theme='snow'
          placeholder='Main Content here :)'
          className='h-72 mb-12'
          required
          onChange={handleContentChange}
        />

        {/* ============================ SUBMISSION BUTTON ============================= */}
        <Button type='submit' gradientDuoTone='purpleToPink' size='md'>
          Update
        </Button>
        {publishError && <Alert className='mt-5 mb-5' color='failure'>{publishError}</Alert>}
      </form>
    </div>
  );
}

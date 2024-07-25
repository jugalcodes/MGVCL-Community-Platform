import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PostCard from './PostCard';
import TypingAnimation from '../components/TypingAnimation';
import FloatingImage from '../components/FloatingImage';
import AOS from 'aos'
import 'aos/dist/aos.css'

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/post/getposts');
      const data = await res.json();
      setPosts(data.posts);
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    AOS.init({duration: 2000})
  })

  return (
    <div>
      <div className='flex flex-col'>
        <div className='min-h-screen flex flex-col lg:flex-row gap-10 p-3 lg:px-20 max-w-7xl items-center mx-auto'>
          
            <div className='flex flex-col  h-full'>
              <TypingAnimation />
              <br></br>
              <p className='text-gray-500 text-xs sm:text-sm font-serif'>
                Here you will find varieties of articles and topics regarding MGVCL's Core components
              </p>
            </div>
          
          <div className='flex-shrink-0 '>
            <FloatingImage className='p-10'/>
          </div>
        </div>
      </div>

      <div className='max-w-8xl mx-auto p-10 flex flex-col gap-8 py-7 '>
        {posts && posts.length > 0 && (
          <div className='flex flex-col gap-6'>
            <h2 className='text-semibold text-4xl font-serif text-center'>Recent Posts</h2>
            <div data-aos="zoom-in" className=' flex flex-wrap md:flex-row truncate gap-4 justify-center'>
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <Link to={'/search'} className='text-lg sm:text-sm text-teal-500 font-bold hover:underline text-center'>
              View All Posts
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

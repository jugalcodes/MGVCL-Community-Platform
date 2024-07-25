import { Button, Select, TextInput } from 'flowbite-react'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import PostCard from './PostCard';

export default function Search() {

    const [sidebarData, setSidebarData] = useState({
        searhTerm: '',
        sort: 'desc',
        category: 'uncategorized',

    });
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showMore, setShowMore] = useState(false);
    const navigate = useNavigate()
    const location = useLocation();


    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm')
        const sortFromUrl = urlParams.get('sort');
        const categoryFromUrl = urlParams.get('category')
        if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
            setSidebarData({
                ...sidebarData,
                searchTerm: searchTermFromUrl,
                sort: sortFromUrl,
                category: categoryFromUrl,
            })
        }

        {/* ============================ FETCHES THE SEARCHED POST ============================= */}
        const fetchPosts = async () => {
            setLoading(true);
            const searchQuery = urlParams.toString();
            const res = await fetch(`/api/post/getposts?${searchQuery}`);

            if (!res.ok) {
                setLoading(false);
                return;
            }

            if (res.ok) {
                const data = await res.json()
                setPosts(data.posts)
                setLoading(false)

                if (data.posts.length === 9) {
                    setShowMore(true)
                }
                else {
                    setShowMore(false)
                }
            };

        };
        fetchPosts();

    }, [location.search])

    {/* ============================ HANDLES THE CHANGES AS PER SEARCH TERM ============================= */}
    const handleChange = (e) => {
        if (e.target.id === 'searchTerm') {
            setSidebarData({ ...sidebarData, searchTerm: e.target.value });

        }

        if (e.target.id === 'sort') {
            const order = e.target.value || 'desc';
            setSidebarData({ ...sidebarData, sort: order });
        }

        if (e.target.id === 'category') {
            const category = e.target.value || 'uncategorized';
            setSidebarData({ ...sidebarData, category });
        }
    }

    {/* ============================ HANDLES ON SUBMISSION ============================= */}
    const handleSubmit = (e) => {
        e.preventDefault()
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('searchTerm', sidebarData.searchTerm);
        urlParams.set('sort', sidebarData.sort);
        urlParams.set('category', sidebarData.category);

        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);

    }

    {/* ============================ SHOW MORE FUNCTIONALITY ============================= */}
    // Initially it shows only 9 posts and on clicking the show more button it will show more 9 posts
    // once the post count is less than 9 then the show more button will disappear. 
    const handleShowMore = async () => {
        const numberOfPosts = posts.length;
        const startIndex = numberOfPosts;
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('startIndex', startIndex);
        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/post/getposts?${searchQuery}`)

        if (!res.ok) {
            return;
        }

        if (res.ok) {
            const data = await res.json();
            setPosts([...posts, ...data.posts]);
            if (data.posts.length === 9) {
                setShowMore(true);
            }
            else {
                setShowMore(false);
            }
        }
    }

    return (
        <div className='flex flex-col md:flex-row'>
            <div className='p-7 border-b md:border-r md:min-h-screen border-gray-500'>
                <form className='flex flex-col gap-8' onSubmit={handleSubmit}>


                    {/* ======================== SEARCH-SPACE BUTTON ========================= */}
                    <div className=' flex items-center gap-2'>
                        <label className='whitespace-nowrap font-semibold'> Search Term: </label>
                        <TextInput placeholder='Search...'
                            id='searchTerm'
                            type='text'
                            value={sidebarData.searchTerm}
                            onChange={handleChange}
                        />
                    </div>

                    {/* ========================= SORT-BY BUTTON =========================== */}
                    <div className='flex items-center gap-2'>
                        <label className='font-semibold '>Sort:</label>
                        <Select onChange={handleChange} value={sidebarData.sort} id='sort'>
                            <option value='desc'>Latest</option>
                            <option value='asc'>Oldest</option>
                        </Select>
                    </div>

                    {/* ========================== CATEGORY BUTTON =========================== */}
                    <div className='flex items-center gap-2'>
                        <label className='font-semibold '>Category:</label>
                        <Select onChange={handleChange} id='category'>
                            <option value="uncategorized">Select a category </option>
                            <option value="smart-meter">Smart Meter</option>
                            <option value="transformers">Transformers</option>
                            <option value="payment-gateway">Payment Gateway</option>
                            <option value="Complain-System">Complain System</option>
                        </Select>
                    </div>

                    {/* ============================ SUMBIT BUTTON ========================== */}
                    <Button
                        type='submit'
                        outline
                        gradientDuoTone='purpleToPink'
                    >
                        Apply Filters
                    </Button>

                </form>
            </div>

                {/* ============================ IF NO POST FOUND ============================= */}
            <div className='w-full'>
                <h1 className='text-3xl font-semibold sm:border-b border-gray-500 p-3 mt-5 '>Posts Results: </h1>
                <div className='p-7 flex flex-wrap gap-4'>
                    {
                        !loading && posts.length === 0 && (<p className='text-xl text-gray-500'>
                            No Post Found.
                        </p>
                        )}
                    {
                        loading && (
                            <p className='text-xl text-gray-500'>Loading...</p>
                        )
                    }

                    {
                        !loading && posts && posts.map((post) => (
                            <PostCard key={post._id} post={post} />
                        ))
                    }
                    {
                        showMore && <button onClick={handleShowMore} className='text-teal-500 text-lg hover:underline p-7 w-full'> Show More</button>
                    }
                </div>
            </div>
        </div>
    )
}

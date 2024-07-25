import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';
import { signoutSuccess } from '../redux/user/userSlice';
import Logo from "../assets/Images/Logo_MGVCL.webp"
import Gsummit from "../assets/Images/g20.jpeg"
import WhyBlog from '../pages/WhyBlogs';

export default function Header() {

    const { currentUser } = useSelector((state) => state.user);
    const path = useLocation().pathname;
    const dispatch = useDispatch();
    const { theme } = useSelector((state) => state.theme);
    const [searchTerm, setSearchTerm] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    {/* ============================ SEARCH PARAMETER SECTION =========================== */}
    useEffect(() => {

        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm')
        if (searchTermFromUrl) {
            setSearchTerm(searchTermFromUrl)
        }


    }, [location.search]);

{/* ============================ SIGN-OUT SECTION =========================== */}
    const handleSignout = async () => {
        try {
            const res = await fetch(`/api/user/signout`, {
                method: 'POST',
            });

            const data = await res.json();
            if (!res.ok) {
                console.log(data.message);
            } else {
                dispatch(signoutSuccess());
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    {/* ============================ SUBMISSION BUTTON =========================== */}
    const handleSubmit = (e) => {
        e.preventDefault()
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('searchTerm', searchTerm);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    };

    return (
        <Navbar className="border-b-2 ">
            <Link to="/" className="self-centered whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white">
                {/* <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to bg-pink-500 rounded-lg text-white">MGVCL's</span> */}
                <img src={Logo} className='w-12'></img>

            </Link>

            {/* <img src={Gsummit} className='w-10'></img> */}

            {/* ============================ SEARCH SECTION CODE =========================== */}
            <form onSubmit={handleSubmit}>
                <TextInput
                    type="text"
                    placeholder="Search..."
                    rightIcon={AiOutlineSearch}
                    className="hidden lg:inline"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </form>

            <Button className="w-12 h-10 lg:hidden" color='gray' pill value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} onClick={handleSubmit}>
                <AiOutlineSearch />
            </Button>

            {/* ============================ PROFILE DETAILS + SIGNOUT FUNCTIONALITY =========================== */}
            <div className="flex gap-2 md:order-2">
                <Button className='w-12 h-10 hidden sm:inline' color="gray" pill onClick={() => dispatch(toggleTheme())}>
                    {theme === 'light' ? <FaSun /> : <FaMoon />}
                </Button>

                {currentUser ? (
                    <Dropdown
                        arrowIcon={false}
                        inline
                        label={<Avatar alt="user" img={currentUser.profilePicture} rounded />}
                    >
                        <Dropdown.Header>
                            <span className="block text-sm">@{currentUser.username}</span>
                            <span className="block text-sm font-medium truncate">@{currentUser.email}</span>
                        </Dropdown.Header>
                        <Dropdown.Item as={Link} to='/dashboard?tab=profile'>Profile</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={handleSignout}>Sign Out</Dropdown.Item>
                    </Dropdown>
                ) : (
                    <Link to="/sign-in">
                        <Button gradientDuoTone="purpleToBlue" outline>
                            Sign-In
                        </Button>
                    </Link>
                )}

                <Navbar.Toggle />
            </div>

            {/* ============================ TOGGLE BAR FOR RESPONSIVENESS (MOBILE SCREEN) =========================== */}
            <Navbar.Collapse>
                <Navbar.Link active={path === "/"} as={'div'}>
                    <Link to="/">Home</Link>
                </Navbar.Link>
                <Navbar.Link active={path === "/about"} as={'div'}>
                    <Link to="/about">Mission</Link>
                </Navbar.Link>
                <Navbar.Link active={path === "/whyblogs"} as={'div'}>
                    <Link to="/whyblogs">Why Blogs?</Link>
                </Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
    );
}

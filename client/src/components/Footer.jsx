import React from 'react'
import { Footer } from 'flowbite-react'
import { Link } from 'react-router-dom'
import { FooterDivider } from 'flowbite-react'
import { BsFacebook, BsInstagram, BsPaypal, BsTwitterX } from 'react-icons/bs'


export default function FooterCom() {
    return (
        // ====================================== FOOTER SECTION ======================================
        <Footer container className='border border-t-8 border-teal-600'>
            <div className='w-full max-w-7xl mx-auto'>
                <div className='grid w-full justify-between sm:flex md:grid-cols-1' >
                    <div className='mt-5'>
                        <Link to="/" className='self-centered whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white'>

                            {/* in this below it means we are using gradient from _ to right in which the left will be indigo then mid purple and at right it will be pink */}
                            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to bg-pink-500 rounded-lg text-white'>MGVCL's</span>
                            Blog
                        </Link>
                    </div>
                    <div className='grid grid-cols-4 gap-8 mt-4 sm:grid-cols-4 sm:gap-6'>
                        <div>
                            <Footer.Title title='About' />
                            <Footer.LinkGroup col>
                                
                                {/* ==================== MGVCL MAIN PAGE ================= */}
                                <Footer.Link href="https://www.mgvcl.com/" target='_blank' rel="nooppener norefferer">
                                    MGVCL
                                </Footer.Link>

                                {/* ======================== MGVCL'S BLOG PAGE ===================== */}
                                <Footer.Link href="/about" target='_blank' rel="nooppener norefferer">
                                    MGVCL's Blogs
                                </Footer.Link>
                            </Footer.LinkGroup>
                        </div>
                        <div>
                            <Footer.Title title='Details' />
                            <Footer.LinkGroup col>

                                {/* ======================= MGVCL CONTACT US ====================== */}
                                <Footer.Link href="https://www.mgvcl.com/Contact_us" target='_blank' rel="nooppener norefferer">
                                    Contact Us
                                </Footer.Link>
                                {/* ======================= MGVCL CAREER PORTAL ======================= */}
                                <Footer.Link href="https://www.mgvcl.com/Career" target='_blank' rel="nooppener norefferer">
                                    Career
                                </Footer.Link>
                            </Footer.LinkGroup>
                        </div>
                        <div>
                            <Footer.Title title='Links' />
                            <Footer.LinkGroup col>

                                {/* ========================= MGVCL SUPPLIERS LINK ====================== */}
                                <Footer.Link href="https://www.mgvcl.com/Suppliers" target='_blank' rel="nooppener norefferer">
                                   Suppliers
                                </Footer.Link>

                                {/* ========================= MGVCL TENDERS LINK ====================== */}
                                <Footer.Link href="https://tender.guvnl.com/index.html?compcode=91" target='_blank' rel="nooppener norefferer">
                                    Tenders
                                </Footer.Link>
                            </Footer.LinkGroup>
                        </div>
                        <div>
                            <Footer.Title title='Legal' />
                            <Footer.LinkGroup col>

                                {/* ========================= MGVCL PRIVACY POLICY ====================== */}
                                <Footer.Link href="https://www.mgvcl.com/PrivacyPolicyStatement" target='_blank' rel="nooppener norefferer">
                                    Privacy Policy
                                </Footer.Link>

                                <Footer.Link href="#" target='_blank' rel="nooppener norefferer">
                                    Terms &amp; Conditions
                                </Footer.Link>
                            </Footer.LinkGroup>
                        </div>
                    </div>
                </div>
                <FooterDivider />

                {/* ========================= MGVCL SOCIAL MEDIA PLATFORMS LINKS ====================== */}
                <div className='w-full sm:flex sm:items-center sm:justify-between'>
                    <Footer.Copyright href="#" by="Jugal's Blogs" year={new Date().getFullYear()}/>
                    <div className='flex gap-6 sm:mt-0 mt-4 sm:jus'>
                        <Footer.Icon href='https://www.facebook.com/Madhyagujaratvijcompany/' icon={BsFacebook}></Footer.Icon>
                        <Footer.Icon href='https://www.instagram.com/mgvclofficial/' icon={BsInstagram}></Footer.Icon>
                        <Footer.Icon href='https://x.com/MGVCLIT' icon={BsTwitterX}></Footer.Icon>
                        <Footer.Icon href='https://mgvcl.com/Online_Payment_of_Bills' icon={BsPaypal}></Footer.Icon>
                    </div>
                </div>
            </div>
        </Footer>
    )
}

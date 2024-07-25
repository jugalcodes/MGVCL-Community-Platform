import React from 'react'

export default function WhyBlogs() {
    return (
        <div className=' font-serif min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 mt-8 mb-8 '>
            <div className='max-w-3xl mx-auto p-6 bg-white dark:bg-gray-800 shadow-md rounded-md'>
                <h1 className='text-4xl  font-bold text-center my-7 text-teal-600 dark:text-gray-100'>Why Write Blogs?</h1>
                <div className='text-lg text-gray-700 dark:text-gray-300 leading-relaxed'>
                    <p className='mb-6'>
                        Welcome to the MGVCL Blogging Platform! As we embark on this journey of sharing and learning, it's important to understand the immense benefits of writing blogs. Here’s why you should start blogging today:
                    </p>

                    <h2 className='text-2xl font-semibold text-center mb-4 text-teal-600 dark:text-gray-100'>Benefits</h2>
                    <p className='mb-6'>
                        At MGVCL, we believe that sharing Knowledge makes us stronger. Our goal is to create a space where information is shared openly, ideas are exchanged, and learning never stops. This platform is here to:
                    </p>
                    <ul className='space-y-4'>
                        <li>
                            <strong>Knowledge Sharing</strong>
                            <ul className='list-disc list-inside pl-5'>
                                <li>Sharing your insights and expertise can greatly benefit your colleagues. By documenting your experiences, you help others learn and grow. </li>
                                <li>Your unique perspectives and solutions can provide valuable lessons and foster a culture of continuous improvement.</li>
                            </ul>
                        </li>
                        <li>
                            <strong>Personal Growth</strong>
                            <ul className='list-disc list-inside pl-5'>
                                <li>Writing blogs enhances your own understanding of the topics you cover. It encourages you to organize your thoughts and articulate your knowledge clearly.</li>
                                <li> This process can deepen your understanding and sharpen your communication skills.</li>
                            </ul>
                        </li>
                        <li>
                            <strong>Documentation and Reference</strong>
                            <ul className='list-disc list-inside pl-5'>
                                <li>Blogs serve as a valuable archive of knowledge and experiences.

                                </li>
                                <li>They can be referenced by current and future employees, providing a lasting resource that supports ongoing learning and development.</li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

    )
}

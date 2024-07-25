import React from 'react';

export default function About() {
  return (
    <div className=' font-serif min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 mt-8 mb-8 '>
      <div className='max-w-3xl mx-auto p-6 bg-white dark:bg-gray-800 shadow-md rounded-md'>
        <h1 className='text-4xl  font-bold text-center my-7 text-teal-600 dark:text-gray-100'>About MGVCL's Blog Community</h1>
        <div className='text-lg text-gray-700 dark:text-gray-300 leading-relaxed'>
          <p className='mb-6'>
            Welcome to the MGVCL Knowledge Sharing Platform. This is a place for our employees to share ideas, experiences, and knowledge. We aim to create a space where everyone can learn and grow together.
          </p>

          <h2 className='text-2xl font-semibold text-center mb-4 text-teal-600 dark:text-gray-100'>Our Mission</h2>
          <p className='mb-6'>
            At MGVCL, we believe that sharing Knowledge makes us stronger. Our goal is to create a space where information is shared openly, ideas are exchanged, and learning never stops. This platform is here to:
          </p>
          <ul className='space-y-4'>
            <li>
              <strong>Empower Employees</strong>
              <ul className='list-disc list-inside pl-5'>
                <li>Provide our team with useful information and tools to improve their skills and grow in their careers.</li>
              </ul>
            </li>
            <li>
              <strong>Facilitate Collaboration</strong>
              <ul className='list-disc list-inside pl-5'>
                <li>Encourage teamwork and communication across different departments and roles, helping us work better together.</li>
              </ul>
            </li>
            <li>
              <strong>Foster Innovation</strong>
              <ul className='list-disc list-inside pl-5'>
                <li>Share ideas and best practices to drive innovation and continuous improvement.</li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

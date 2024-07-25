//  This page is for TYPING ANIMATION that is applied on the homescreen 

import { TypeAnimation } from 'react-type-animation';

const TypingAnimation = () => {
  return (
    <TypeAnimation className='text-3xl font-bond lg:text-6xl font-serif pt-14' 
      sequence={[
        // Same substring at the start will only be typed out once, initially
        ' Welcome to MGVCL\'s Blogsite ',
        1000, 
        ' Welcome to MGVCL\'s Forum',
        1000,
        
      ]}
      wrapper="span"
      speed={50}
      // style={{ fontSize: '4em', display: 'inline-block' }}
      repeat={Infinity}
    />
  );
};

export default TypingAnimation;
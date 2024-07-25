// this component is used to serve the purpose such as when to route to any page then 
// as soon as we land to that desired page it shows firstly botton but we need to see 
// top first thus we use it

import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import React from 'react'

export default function ScrollToTop() {

    const ScrollOnTop = ()=>{
      const {pathname } = useLocation();
      useEffect(()=>{
        window.scrollTo(0,0);
      }, [pathname ]);
      return null;
    }
 
}



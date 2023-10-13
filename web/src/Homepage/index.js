import React, { useEffect, useRef } from 'react'
import "./index.css"
import Typed from 'typed.js'
const Homepage = () => {
    const el = useRef(null);

    useEffect(() => {
        const typed = new Typed(el.current, {
            strings: ['Assignment Tracker'],
            typeSpeed: 40,
        });
        return () => {
            typed.destroy();
        };
    }, [])


    return (
        <>
            <div className='homepage__container d-flex justify-content-center align-items-center'>
                <span className='homepage__text h1' ref={el} />
            </div>
            <div className='footer'>
                <span className='homepage__text'>Made with </span> 💟 <span className='homepage__text'> by Benjamin</span>
            </div>

        </>
    )
}

export default Homepage

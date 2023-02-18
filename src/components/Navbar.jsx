import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { BsMoonFill, BsFillSunFill } from "react-icons/bs"
import { CountryContext } from '../context/Country';

export default function Navbar() {

    const {currentTheme,setCurrentTheme} = useContext(CountryContext);

    const handleTheme = () => {
        setCurrentTheme(currentTheme === "light" ? "dark" : "light");

        if (currentTheme === "dark") {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme",JSON.stringify("dark"))
        }
        else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme",JSON.stringify("light"))
        }
    }


    return (
        <div className='bg-lightElement text-lightText dark:bg-darkElement dark:text-darkText'>
            <div className='container p-3 flex items-center justify-between'>
                <Link to="/" className="font-extrabold text-2xl">Country App</Link>
                <button onClick={handleTheme} className='flex items-center justify-center gap-x-2 text-sm font-semibold'>
                    {currentTheme === "light" ?
                        <> <BsFillSunFill /> Light Mode</>
                        :
                        <> <BsMoonFill /> Dark Mode</>
                    }
                </button>
            </div>
        </div>
    )
}

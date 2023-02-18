import React, { useContext, useState } from 'react'
import { FiSearch } from "react-icons/fi";
import { BiArrowBack } from "react-icons/bi";
import { CountryContext } from '../context/Country'
import { Link } from 'react-router-dom';
export default function Tools() {

    const [searchIndex,setSearchIndex] = useState("");

    const { handleCategory, countryPage, fetchAllCountries, filtCountries} = useContext(CountryContext);

    const handleInputChange = (e) => {
        setSearchIndex(e.target.value)
        filtCountries(e.target.value)
    }

    const handleSelectCategory = (e) => {
        handleCategory(e);
        setSearchIndex("");

    }


    return (
        <div className='bg-lightBG text-lightText dark:bg-darkBG dark:text-darkText p-6 font-semibold'>
            <div className='container p-1 sm:p-3 flex flex-col items-start gap-y-5  sm:flex-row sm:justify-between'>
                {countryPage === false ?
                    <>
                        <div className='flex items-center gap-x-3 bg-lightElement dark:bg-darkElement py-3 px-4 rounded-md'>
                            <FiSearch className='text-red' />
                            <input id="searchInput" value={searchIndex} onChange={(e) => handleInputChange(e)} placeholder='Search for a country...' className='bg-lightElement dark:bg-darkElement outline-none lg:w-72' type="text" name="searchIndex" />
                        </div>
                        <select onChange={(e) => handleSelectCategory(e)} className='bg-lightElement dark:bg-darkElement text-sm py-3 px-4 rounded-md'>
                            <option className='py-3 px-4' value="" disabled hidden>Filter by Region</option>
                            <option className='py-3 px-4' value="All">All</option>
                            <option className='py-3 px-4' value="Africa">Africa</option>
                            <option className='py-3 px-4' value="America">America</option>
                            <option className='py-3 px-4' value="Asia">Asia</option>
                            <option className='py-3 px-4' value="Europe">Europe</option>
                            <option className='py-3 px-4' value="Oceania">Oceania</option>
                        </select>
                    </>
                    :
                    <Link to="/" className='flex items-center gap-x-2 bg-lightElement dark:bg-darkElement text-sm rounded-md shadow-md py-2 px-8'>
                        <BiArrowBack />
                        Back
                    </Link>
                }
            </div>
        </div>
    )
}

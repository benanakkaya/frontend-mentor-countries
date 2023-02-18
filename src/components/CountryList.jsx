import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { CountryContext } from '../context/Country';

export default function CountryList() {

    const { countryList, setCountryPage, countryPage } = useContext(CountryContext);

    useEffect(() => {
        setCountryPage(false);
    },[])

    return (
        <div className='bg-lightBG dark:bg-darkBG text-lightText dark:text-darkText'>
            <div className='container p-3 grid grid-cols-1 xs:p-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-20'>
                {countryList.map((country) => (
                    <div key={country.name.common} className='bg-lightElement dark:bg-darkElement rounded-md p-1 shadow-md'>
                        <Link to={`/countries/${country.name.offical}`}>
                            <img src={country.flags.png} className="w-full h-40" alt="island" />
                            <div className='p-8 flex flex-col gap-y-4'>
                                <h2 className='text-lg font-bold'>{country.name.common}</h2>
                                <div className='flex flex-col gap-y-1'>
                                    <div className='flex items-center gap-x-2 text-sm'>
                                        <h3 className='font-semibold'>Population:</h3>
                                        <p>{country.population.toLocaleString("en-US")}</p>
                                    </div>
                                    <div className='flex items-center gap-x-2 text-sm'>
                                        <h3 className='font-semibold'>Region:</h3>
                                        <p>{country.region}</p>
                                    </div>
                                    <div className='flex items-center gap-x-2 text-sm'>
                                        <h3 className='font-semibold'>Capital:</h3>
                                        <p>{country.capital}</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>

                ))}
            </div>
        </div>
    )
}

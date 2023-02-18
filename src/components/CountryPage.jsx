import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { CountryContext } from '../context/Country';


export default function CountryPage() {

    const { setCountryPage, countryList } = useContext(CountryContext);

    const [countryDetails, setCountryDetails] = useState({});
    const [nativeCode, setNativeCode] = useState("");
    const [currenciesCode, setCurrenciesCode] = useState("");
    const [languagesCode, setLanguagesCode] = useState("");
    const [borders, setBorders] = useState([]);


    const { countryName } = useParams();

    const fetchCountryDetails = async () => {
        const res = await axios.get(`https://restcountries.com/v3.1/name/${countryName}`);
        const all = await axios.get(`https://restcountries.com/v3.1/all`);
        setCountryDetails(res.data[0])
        setNativeCode(Object.keys(res.data[0].name.nativeName));
        setCurrenciesCode(Object.keys(res.data[0].currencies));
        setLanguagesCode(Object.keys(res.data[0].languages));
        let borderList = [];
        res.data[0].borders.forEach(async (e) => {
            const targetBorder = await all.data.filter((country) => (country.cca3 === e));
            borderList.push(targetBorder[0])
        })
        setBorders(borderList)

    }

    useEffect(() => {
        fetchCountryDetails();
        if (countryName) {
            setCountryPage(true);
        }
    }, [countryName])




    return (
        <div className='bg-lightBG text-lightText dark:bg-darkBG dark:text-darkText p-6 font-semibold'>
            {countryDetails.name?.common ?
                <div className='container p-3 grid grid-cols-1 lg:grid-cols-2 gap-x-36 '>
                    <div className='flex items-center justify-center'>
                        <img className='w-full' src={countryDetails.flags?.png} alt={countryDetails.name?.common} />
                    </div>
                    <div className='flex flex-col gap-y-12 p-6'>
                        <h1 className='text-4xl font-bold'>{countryDetails.name?.common}</h1>
                        <div className='flex flex-col sm:flex-row gap-x-16'>
                            <div className='flex flex-col gap-y-3'>
                                <div className='flex items-center text-sm gap-x-3'>
                                    <h3 className='font-semibold'>Native Name:</h3>
                                    <p className='font-light'>{countryDetails.name?.nativeName[nativeCode[0]].common}</p>
                                </div>
                                <div className='flex items-center text-sm gap-x-3'>
                                    <h3 className='font-semibold'>Population:</h3>
                                    <p className='font-light'>{countryDetails.population?.toLocaleString("en-US")}</p>
                                </div>
                                <div className='flex items-center text-sm gap-x-3'>
                                    <h3 className='font-semibold'>Region:</h3>
                                    <p className='font-light'>{countryDetails.region}</p>
                                </div>
                                <div className='flex items-center text-sm gap-x-3'>
                                    <h3 className='font-semibold'>Sub Region:</h3>
                                    <p className='font-light'>{countryDetails.subregion}</p>
                                </div>
                                <div className='flex items-center text-sm gap-x-3'>
                                    <h3 className='font-semibold'>Capital:</h3>
                                    <p className='font-light'>{countryDetails.capital}</p>
                                </div>

                            </div>
                            <div className='flex flex-col gap-y-3'>
                                <div className='flex items-center text-sm gap-x-3'>
                                    <h3 className='font-semibold'>Top Level Domain:</h3>
                                    <p className='font-light'>{countryDetails.tld[0]}</p>
                                </div>
                                <div className='flex items-center text-sm gap-x-3'>
                                    <h3 className='font-semibold'>Currencies:</h3>
                                    <p className='font-light flex items-center gap-x-3'>
                                        <span>{countryDetails.currencies[currenciesCode[0]]?.symbol}</span>
                                        {countryDetails.currencies[currenciesCode[0]]?.name}
                                    </p>
                                </div>
                                <div className='flex items-center text-sm gap-x-3'>
                                    <h3 className='font-semibold'>Languages:</h3>
                                    <p className='font-light'>
                                        {languagesCode.map((code, ind) => (
                                            countryDetails.languages[languagesCode[ind]] +
                                            (ind !== languagesCode.length - 1 ? ", " : "")
                                        ))}
                                    </p>
                                </div>
                            </div>
                        </div>
                        {borders.length > 1 ?
                            <div className='grid items-center gap-y-4 gap-x-6'>
                                <h3 >Border Countries:</h3>
                                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center gap-3'>
                                    {borders.map((country) => (
                                        <Link className='px-3 py-2 rounded-md text-xs bg-lightElement dark:bg-darkElement' to={`/countries/${country.name?.common}`}>
                                            {country.name?.common}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                            : null}
                    </div>
                </div>
                : null}
        </div>
    )
}

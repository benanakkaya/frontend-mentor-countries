import axios from 'axios';
import React, { useEffect, useState } from 'react'

export const CountryContext = React.createContext();

export default function Country(props) {

    const [countryList, setCountryList] = useState([]);
    const [safeList, setSafeList] = useState([]);
    const [category, setCategory] = useState("");
    const [countryPage, setCountryPage] = useState(false);
    const [currentTheme, setCurrentTheme] = useState("light");

    const fetchAllCountries = async () => {
        const res = await axios.get(`https://restcountries.com/v3.1/all`);
        setCountryList(res.data);
        setSafeList(res.data);
    }

    useEffect(() => {
        //fetch all countries
        fetchAllCountries();

        //theme control
        const theme = JSON.parse(localStorage.getItem("theme"));

        if (theme) {

            if (theme === "dark") {
                document.documentElement.classList.add("dark");
                setCurrentTheme("light")
            }
            else {
                document.documentElement.classList.remove("dark");
                setCurrentTheme("dark")
            }

        }

    }, [])

    const fetchRegionCountries = async (region) => {
        const res = await axios.get(`https://restcountries.com/v3.1/region/${region}`);
        setCountryList(res.data);
        setSafeList(res.data);
    }

    const handleCategory = async (e) => {
        if (e.target.value === "All") {
            fetchAllCountries();
        } else {
            fetchRegionCountries(e.target.value)
        }
    }

    const filtCountries = (value) => {
        let filteredList = safeList;
        value = value.toLowerCase();
        filteredList = filteredList.filter((country) => country.name.common.toLowerCase().includes(value));
        setCountryList(filteredList)
    }



    const values = {
        countryList,
        setCountryList,
        category,
        setCategory,
        fetchAllCountries,
        handleCategory,
        countryPage,
        setCountryPage,
        filtCountries,
        currentTheme,
        setCurrentTheme
    }

    return (
        <CountryContext.Provider value={values}>
            {props.children}
        </CountryContext.Provider>
    )
}

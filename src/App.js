import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Tools from "./components/Tools";
import CountryList from "./components/CountryList";
import Country from "./context/Country";
import CountryPage from "./components/CountryPage";

function App() {
  return (
    <BrowserRouter>
      <Country>
        <div className="App font-nunito bg-lightBG dark:bg-darkBG min-h-screen">
          <Navbar />
          <Tools />
          <Routes>
            <Route path="/" exact element={<CountryList />} />
            <Route path="/countries/:countryName" element={<CountryPage />} />
          </Routes>
        </div>
      </Country>
    </BrowserRouter>
  );
}

export default App;

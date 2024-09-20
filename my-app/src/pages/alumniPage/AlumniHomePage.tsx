import  { useState } from "react";
import NavBar from "../../components/alumni/NavBar";
import AlumniFeed from "../../components/alumni/home-components/AlumniFeed";
import SearchContext from "../../contexts/SearchContext";

function AlumniHomePage() {
  const [searchValue, setSearchValue] = useState("");

  return (
    <>
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <NavBar />
        <AlumniFeed />
      </SearchContext.Provider>
    </>
  );
}

export default AlumniHomePage;

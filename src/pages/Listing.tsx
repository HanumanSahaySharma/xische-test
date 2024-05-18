import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import UniversityInfo, { IUniversity } from "../components/UniversityInfo";
import { LucideSearch } from "lucide-react";
import Loader from "../components/Loader";

const Listing = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const universitiesJSON = localStorage.getItem("universities");
  const [universities, setUniversities] = useState<IUniversity[]>(universitiesJSON ? JSON.parse(universitiesJSON) : []);
  const [sortOrder, setSortOrder] = useState<string>("asc");
  const [searchText, setSearchText] = useState<string>("");

  const getCountries = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://cors-anywhere.herokuapp.com/http://universities.hipolabs.com/search?country=United%20Arab%20Emirates"
      );
      if (response.status === 200) {
        const sortedData = response.data.sort((a: IUniversity, b: IUniversity) => a.name.localeCompare(b.name));
        localStorage.setItem("universities", JSON.stringify(sortedData));
        setUniversities(sortedData);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error fetching universities:", error);
    }
  };

  useEffect(() => {
    if (universities.length === 0) {
      localStorage.removeItem("universities");
      getCountries();
    }
  }, []);

  // Sorted Universities by Alphabatically
  const sortByAlphabetically = (order: string) => {
    const sortedData = [...universities].sort((a: IUniversity, b: IUniversity) => {
      if (order === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
    setUniversities(sortedData);
  };

  // Filter Universities by search keyword
  let filteredUniversities = universities.filter((item: IUniversity) =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const onRemove = (name: string) => {
    const deletedUniversity = universities.filter((item) => item.name !== name);
    setUniversities(deletedUniversity);
    localStorage.setItem("universities", JSON.stringify(deletedUniversity));
  };

  return (
    <div className="container">
      <h2 className="page-title">Listing Page</h2>
      <div className="universities">
        <div className="filters flex items-center justify-between">
          <div className="sort-filter flex items-center">
            <label>Sort by:</label>
            <select
              value={sortOrder}
              onChange={(e) => {
                setSortOrder(e.target.value);
                sortByAlphabetically(e.target.value);
              }}
            >
              <option value="asc">A to Z</option>
              <option value="desc">Z to A</option>
            </select>
          </div>
          <div className="searchbar">
            <form onSubmit={(e) => e.preventDefault()}>
              <input
                type="text"
                placeholder="Search..."
                value={searchText}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setSearchText(e.target.value);
                }}
              />
              <button className="search-submit" type="submit">
                <LucideSearch size={18} />
              </button>
            </form>
          </div>
        </div>
        {loading ? (
          <Loader />
        ) : filteredUniversities.length > 0 ? (
          filteredUniversities.map((university: IUniversity, index: number) => (
            <UniversityInfo key={index} university={university} onRemove={onRemove} />
          ))
        ) : (
          <p className="not-found">Not found!</p>
        )}
      </div>
    </div>
  );
};

export default Listing;

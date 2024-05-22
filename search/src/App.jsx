import { useState, useEffect } from "react";
import "./App.css";
import Suggestions from "./Suggestions";

function App() {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const handleChange = (e) => {
    const input = e.target.value.toLowerCase();
    setSearchInput(input);
    if (input.length > 0) {
      const filteredData =
        users && users.length
          ? users.filter((user) => user.firstName.toLowerCase().includes(input))
          : [];
      setFilteredUsers(filteredData);
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  };

  async function fetchData() {
    try {
      setLoading(true);
      const response = await fetch("https://dummyjson.com/users");
      const data = await response.json();
      console.log(data);
      if (data && data.users && data.users.length > 0) {
        setUsers(data.users);
        setLoading(false);
      }
    } catch (error) {
      setLoading(true);
      console.log(error);
      setError(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="search-autocomplete-container">
        <input type="text" value={searchInput} onChange={handleChange} />
      </div>

      {showDropdown && <Suggestions data={filteredUsers} />}
    </>
  );
}

export default App;

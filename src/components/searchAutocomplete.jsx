import { useEffect, useState } from 'react';
import Suggesstions from './Suggesstions';

function SearchAutocomplete() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState([]);
  const [error, setError] = useState(null);
  const [searchParam, setSearchParam] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);

  function handleChange(event) {
    const query = event.target.value.toLowerCase();
    setSearchParam(query);
    if (query.length > 1) {
      const filteredData =
        user && user.length
          ? user.filter((item) => item.toLowerCase().indexOf(query) > -1)
          : [];
      setFilteredUsers(filteredData);
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  }

  function handleClick(e) {
    setShowDropdown(false);
    setSearchParam(e.target.innerText);
    setFilteredUsers([]);
  }

  async function fetchListOfUsers() {
    try {
      setLoading(true);
      const response = await fetch('https://dummyjson.com/users');
      const data = await response.json();

      console.log(data);
      if (data && data.users && data.users.length) {
        setUser(data.users.map((userItem) => userItem.firstName));
        setLoading(false);
        setError(null);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      setError(error);
    }
  }

  useEffect(() => {
    fetchListOfUsers();
  }, []);

  console.log(user, filteredUsers);

  return (
    <div className=' pt-4 '>
      {loading ? (
        <h1>Loading data! Please wait...</h1>
      ) : (
        <input
          className='border border-gray-300 rounded-md p-1'
          value={searchParam}
          type='text'
          name='search-users'
          placeholder='Search Users Here...'
          onChange={handleChange}
        />
      )}

      {showDropdown && (
        <Suggesstions handleClick={handleClick} data={filteredUsers} />
      )}
    </div>
  );
}

export default SearchAutocomplete;

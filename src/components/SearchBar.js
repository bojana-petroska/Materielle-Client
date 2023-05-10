import React, { useState } from 'react';

function SearchBar(props) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    props.onSearch(searchQuery);
  }

  return (
    <div>
      <input
        type="text"
        placeholder='search'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onClick={handleSearch}    
      />
      {/* <button onClick={handleSearch}>Search</button> */}
    </div>
  );
}

export default SearchBar;

import React, { useState } from 'react';

function SearchBar(props) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    props.onSearch(searchQuery);
  }

  return (
    <div className="nav-search">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.03999 13.28C3.58399 13.28 0.799988 10.496 0.799988 7.04005C0.799988 3.58405 3.58399 0.800049 7.03999 0.800049C10.496 0.800049 13.28 3.58405 13.28 7.04005C13.28 10.496 10.496 13.28 7.03999 13.28ZM7.03999 1.76005C4.11199 1.76005 1.75999 4.11205 1.75999 7.04005C1.75999 9.96805 4.11199 12.32 7.03999 12.32C9.96799 12.32 12.32 9.96805 12.32 7.04005C12.32 4.11205 9.96799 1.76005 7.03999 1.76005Z" fill="#989898"/>
        <path d="M11.6874 11.0081L15.9978 15.3185L15.3191 15.9972L11.0087 11.6868L11.6874 11.0081Z" fill="#989898"/>
      </svg>
      <input
        className="nav-search"
        type="text"
        placeholder='type keywords...'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onClick={handleSearch}    
      />

    </div>
  );
}

export default SearchBar;

import React, { useState } from 'react';
/* import './SearchBar.css';
 */
const SearchBar = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSearch(searchQuery);
    };

    return (
        <form className="search-bar" onSubmit={handleSubmit}>
            <input 
                type="text" 
                placeholder="Search games..." 
                value={searchQuery} 
                onChange={handleChange} 
            />
            <button type="submit">Search</button>
        </form>
    );
};

export default SearchBar;

import React from 'react'

const SearchBox = () => (
  <form method="get" className="searchForm">
      <input className="searchBox" type="text" placeholder="SEARCH" />
      <input className="searchButton" type="submit" value="Search" />
  </form>
)

export default SearchBox
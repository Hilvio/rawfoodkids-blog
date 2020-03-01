import React from 'react'
import searchStyle from './search.module.css'

const Search = ({ handleOnChange, handleOnFocus, handleOnKeyDown }) => {
    return (
        <div>
            <input 
                onChange={handleOnChange} 
                onFocus={handleOnFocus} 
                onKeyDown={handleOnKeyDown} 
                className={searchStyle.search} 
                type="search" 
                placeholder="Search for Recipes" />
        </div>
    )
}

export default Search
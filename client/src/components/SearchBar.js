import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';
import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

function SearchBar() {
  const [input, setInput] = useState();

  // eslint-disable-next-line no-unused-vars
  const submitHandler = (e) => {
    e.preventDefault();
    // navigate(`/searched/${input}`)
    // setInput("");

  }
  return (
    <Search>
      <div>
        <FaSearch />
        <input onChange={(e) => (setInput(e.target.value))} type="text" value={input} />
      </div>
    </Search>
  )
}

export default SearchBar
const Search = styled.form`

margin: 0 20rem;
@media (max-width: 1200px) {
        margin: 0 16rem;
            }

@media (max-width: 1068px) {
        margin: 0 16rem;
            }

@media (max-width: 970px) {
        margin: 0 6rem;
            }
    div{
        width: 80%;
        position: relative;
        margin: 2rem auto;
        
    }
    input{
        border: none;
        background: #1D3557;
        font-size: 1.5rem;
        color: white;
        padding: 1rem 3rem;
        border: none;
        outline: none;
         border-radius: 2rem;
         width: 100%;
         @media (max-width: 740px) {
        padding: 0.5rem 3rem;
            
         }
    }
    svg{
        position: absolute;
        top: 50%;
        left: 0%;
        transform: translate(100%, -50%);
        color: white;
    }
`
import React from 'react';
import Banner from '../components/Banner';
// import SearchBar from '../components/SearchBar';
import PostsList from '../components/PostsList';

function Home() {
  return (
    <div>
     
      <Banner/>
      {/* <SearchBar/> */}
      <PostsList/>
    </div>
  )
}

export default Home
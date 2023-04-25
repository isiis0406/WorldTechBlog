import React from 'react';
import styled from 'styled-components';
import ReactImg from '../assets/Images/ReactJs.jpeg';
import UxDesignImg from '../assets/Images/Design.jpeg';
import DjangoImg from '../assets/Images/UxDesign.jpeg';
import PostCard from '../components/PostCard';

function PostsList() {
  const posts = [
    {
      key: 1,
      title: 'Maîtriser REACT JS pour débutant',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic quas, corporis aliquam ex dolor blandit iisaliquam Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic quas, corporis aliquam ex dolor blandit iisaliquamLorem ipsum dolor sit amet consectetur adipisicing elit. Hic quas, corporis aliquam ex dolor blandit iisaliquam..',
      cover: `${ReactImg}`
    },
    {
      key: 2,
      title: 'Réaliser un design Pro pour un site E-commerce',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic quas, corporis aliquam ex dolor blandit iisaliquam Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic quas, corporis aliquam ex dolor blandit iisaliquamLorem ipsum dolor sit amet consectetur adipisicing elit. Hic quas, corporis aliquam ex dolor blandit iisaliquam..',
      cover: `${UxDesignImg}`
    }
    ,
    {
      key: 3,
      title: 'Django pour les nuls',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic quas, corporis aliquam ex dolor blandit iisaliquam Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic quas, corporis aliquam ex dolor blandit iisaliquamLorem ipsum dolor sit amet consectetur adipisicing elit. Hic quas, corporis aliquam ex dolor blandit iisaliquam..',
      cover: `${DjangoImg}`
    }

  ]
  return (
    <List>
      {posts.map(post =>{
        return (
         <PostCard key={post.key} post = {post}/>
        )
      })}
    </List>
  )
}

export default PostsList

const List = styled.div`
  display: flex;
  flex-direction: column;
`
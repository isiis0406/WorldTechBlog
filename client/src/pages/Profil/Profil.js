import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BannerProfil from '../../components/Profil/BannerProfil';
import PostListProfil from '../../components/Profil/PostListProfil';
import styled from 'styled-components';
import ProfilDetail from '../../components/Profil/ProfilDetail';
// import { MdEdit } from 'react-icons/md';
import { useAuthContext } from "../../hooks/auth/useAuthContext";
import { useParams } from 'react-router-dom';
import EditProfil from './EditProfil';
import Modal from '../../components/Modal';




function Profil() {
  const { user } = useAuthContext();
  const [profilInfos, setProfileInfos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const params = useParams();



  useEffect(() => {
    getUserInfos();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[user])

  //Fetch Profil Data
  const getUserInfos = async () => {
    if(user){
      const localUserInfos = JSON.parse(localStorage.getItem('user'));
      const localProfilInfos = localUserInfos.data.profilInfos
      setProfileInfos(localProfilInfos);
    }
    else{
      try {
        const json = await axios.get(`${process.env.REACT_APP_API_ROUTE}/auth/users/${params.id}/profil`)
        console.log(json);
        setProfileInfos(json.data.profilInfos);

      } catch (error) {
  
      }
    }
  }



  return (

    <>
      <Modal showModal={showModal}> 
      <EditProfil profilInfos={profilInfos} setShowModal={setShowModal} /> 
      </Modal>
      <BannerProfil profilInfos={profilInfos} />
      <Wrapper>
        <div className="editProfil">

        {user &&   <button onClick={() => setShowModal(true)}>Modifier</button>}

        </div>
        <div className='postList'>
          <h3>Posts</h3>
          <PostListProfil />
        </div>
        <div className="profilDetail">
          <ProfilDetail profilInfos={profilInfos} />

        </div>

      </Wrapper>
    </>
  )
}

export default Profil
const Wrapper = styled.div`
display: flex;
justify-content: center;
position: relative;

  
  .postList{
    width: 80%;
  }
  h3{
    padding: 4rem 8rem ;
    font-size: 3rem;
    font-weight: 200; 
    color: #1D3557; 
  }

  .profilDetail{
    
    display: flex;
    margin: 10rem 0;
    flex-direction: column; 
  }
  .profilDetail p{
    font-size: 1.4rem;
    font-weight: 300;

  }
  .editProfil{
    display: flex;
    position: absolute;
    right: 0rem;
  }
  .editProfil button{
    color: white;
    background-color: #1D3557;
    margin: 1rem;
    padding: 0.6rem 2rem;
    border: none;
    outline: none;
    border-radius: 1rem;
    cursor: pointer;
  }
  .editProfil svg{
    font-size: 1rem;
  }
  
`
/* eslint-disable no-unused-vars */
import { useState } from "react";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import swal from 'sweetalert';
import { useAuthContext } from "../auth/useAuthContext";





export function useEditProfil() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const { user, dispatch } = useAuthContext();
    const navigate = useNavigate();
    const params = useParams();



    // eslint-disable-next-line no-unused-vars
    const EditProfil = async (
        paramsId,
        name,
        title,
        hobby,
        facebookUrl,
        instagramUrl,
        linkedInUrl,
        oldProfilImage,
        oldProfilCoverImage,
        profilImage,
        profilCoverImage,

    ) => {
        const profil = {
            name: name.name,
            title: name.title,
            hobby: name.hobby,
            facebookUrl: name.facebookUrl,
            instagramUrl: name.instagramUrl,
            linkedInUrl: name.linkedInUrl,
            oldProfilImage: name.oldProfilImage,
            // oldProfilCoverImage: name.oldProfilCoverImage,
            profilImage: name.profilImage,
            // profilCoverImage: name.profilCoverImage
        }
        try {
            setIsLoading(true);
            setError(false);
            const URL = `${process.env.REACT_APP_API_ROUTE}/auth/users/${paramsId}/edit_profil`;
            const json = await axios.patch(URL, profil, {
                headers: {
                    Authorization: `Bearer ${user.data.token}`
                }
            });

            //Update Local Profil Infos 
            const result = await axios.get(`${process.env.REACT_APP_API_ROUTE}/auth/users/${params.id}/profil`,
                {
                    headers: {
                        Authorization: `Bearer ${user.data.token}`
                    }
                })
                const userInfos = {
                   data: {
                    UserID: params.id,
                    profilInfos : result.data.profilInfos,
                    token :  user.data.token
                   }
                }
            // Save user to the local storage;
            localStorage.setItem('user', JSON.stringify(userInfos));
            // Update AuthContext
            dispatch({ type: 'LOGIN', payload: userInfos });
            
            setIsLoading(false);
            // alert('Registration completed');
            //Alert the Ok response
            swal({
                title: "Succès!",
                text: "Profil modifié",
                icon: "success",
                button: "Ok",
            });
            navigate(`users/${params.id}/profil`)


        } catch (error) {
            setIsLoading(false);
            setError(error.response.data.message);
            //alert(error.response.data.message);
        }

    }
    return { EditProfil, error, isLoading };

}

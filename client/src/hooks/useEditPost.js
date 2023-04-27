/* eslint-disable no-unused-vars */
import { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { useAuthContext } from "./useAuthContext";





export function useEditPost() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const { user } = useAuthContext();
    const navigate = useNavigate();




    // eslint-disable-next-line no-unused-vars
    const EditPost = async (postID, title, category, authorEmail, content, cover) => {

        const post = {title, category, authorEmail, content, cover} 
        try {
            setIsLoading(true);
            setError(false);
            const URL = `${process.env.REACT_APP_API_ROUTE}/posts/${postID}`;
             const json = await axios.patch(URL, post,{
                headers: {
                    Authorization : `Bearer ${user.data.token}`
                }
             });
              
              setIsLoading(false);
             // alert('Registration completed');
             //Alert the Ok response
             swal({
                title: "Succès!",
                text: "Post modifié",
                icon: "success",
                button: "Ok",
            });
                 //Redirect to home Page
                 navigate(`/`);


        } catch (error) {
            setIsLoading(false);
            setError(error.response.data.message);
            //alert(error.response.data.message);
        }

}
return { EditPost, error, isLoading };

}

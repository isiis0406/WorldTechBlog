/* eslint-disable no-unused-vars */
import { useState } from "react";
import axios from 'axios';
import { json, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { useAuthContext } from "../auth/useAuthContext";





export function useAddPost() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const [emptyFiels, setEmptyFields] = useState([]);

    const navigate = useNavigate();
    const { user } = useAuthContext();



    // eslint-disable-next-line no-unused-vars
    const addPost = async (title, category, authorId, content, cover) => {

        const post = {title, category, authorId, content, cover} 
        try {
            setIsLoading(true);
            setError(false);
            const URL = `${process.env.REACT_APP_API_ROUTE}/posts`;
             const json = await axios.post(URL, post,{
                headers: {
                    Authorization : `Bearer ${user.data.token}`
                }
             });
              
              setIsLoading(false);
              setEmptyFields([])

             // alert('Registration completed');
             //Alert the Ok response
             swal({
                title: "Succès!",
                text: "Post publié",
                icon: "success",
                button: "Ok",
            });
            navigate('/');


        } catch (error) {
            setIsLoading(false);
            setEmptyFields(json.emptyFiels);
            setError(error.response.data.message);
            //alert(error.response.data.message);
        }

}
return { addPost, error, isLoading, emptyFiels };

}

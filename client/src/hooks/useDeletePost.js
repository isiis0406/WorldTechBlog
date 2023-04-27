/* eslint-disable no-unused-vars */
import { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { useAuthContext } from "./useAuthContext";





export function useDeletePost() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const navigate = useNavigate();
    const { user } = useAuthContext();



    // eslint-disable-next-line no-unused-vars
    const deletePost = async (postID) => {         
        try {
            const URL = `${process.env.REACT_APP_API_ROUTE}/posts/${postID}`;
            const json = await axios.delete(URL,{
               headers: {
                   Authorization : `Bearer ${user.data.token}`
               }
            });
            
            
            //Alert the Ok response
            swal({
                title: "Success!",
                text: "Post supprimé",
                icon: "success",
                button: "Ok",
              });
              
            //Redirect to home Page
            navigate(`/`);
       }
        catch (error) {
        swal({
            title: "Issued!",
            text: `${error.message}`,
            icon: "error",
            button: "Ok",
          });
       }
    }
    return { deletePost, error, isLoading };
}




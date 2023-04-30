import { useState } from "react";
import axios from 'axios';
// import { useAuthContext } from "./useAuthContext";
import { useNavigate, useParams } from 'react-router-dom';
import swal from 'sweetalert';




export function useResetPassword() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    // const { dispatch } = useAuthContext();
    const navigate = useNavigate();
    const params = useParams();



    // eslint-disable-next-line no-unused-vars
    const reset = async (password, confirmPassword) => {
        try {
            
            setIsLoading(true);
            setError(false);
            const URL = `${process.env.REACT_APP_API_ROUTE}/auth/users/${params.id}/reset_pass/${params.token}`; 
            console.log(URL);
            const json = await axios.post(URL, { password, confirmPassword });
              // Save user to the local storage;
            //   localStorage.setItem('user', JSON.stringify(json));
            //   // Update AuthContext
            //   dispatch({ type: 'LOGIN', payload: json });
              setIsLoading(false);
             // alert('Registration completed');
             //Alert the Ok response
             
             swal({
                title: "Succès!",
                text: json.data.message,
                icon: "success",
                button: "Ok",
            });
            navigate('/auth/login');


        } catch (error) {
            setIsLoading(false);
            console.log(error);
            setError(error.response.data.message);
            }

}
return { reset, error, isLoading };

}

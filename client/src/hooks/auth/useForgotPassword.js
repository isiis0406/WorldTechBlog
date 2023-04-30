import { useState } from "react";
import axios from 'axios';
// import { useAuthContext } from "./useAuthContext";
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';




export function useForgotPassword() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    // const { dispatch } = useAuthContext();
    const navigate = useNavigate();


    // eslint-disable-next-line no-unused-vars
    const emailVerify = async (email) => {

        try {
            setIsLoading(true);
            setError(false);
            const URL = `${process.env.REACT_APP_API_ROUTE}/auth/forgot_pass`; 
            console.log(URL);
            const json = await axios.post(URL, { email });
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
            console.log(error.response.data);
            setError(error.response.data.message);
            }

}
return { emailVerify, error, isLoading };

}

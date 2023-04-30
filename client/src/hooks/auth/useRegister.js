import { useState } from "react";
import axios from 'axios';
// import { useAuthContext } from "./useAuthContext";
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';




export function useRegister() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    // const { dispatch } = useAuthContext();
    const navigate = useNavigate();


    // eslint-disable-next-line no-unused-vars
    const register = async (email, password) => {

        try {
            setIsLoading(true);
            setError(false);
            const URL = `${process.env.REACT_APP_API_ROUTE}/auth/register`;
            const json = await axios.post(URL, { email, password });
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
            setError(error.response.data.message);
            //alert(error.response.data.message);
        }

}
return { register, error, isLoading };

}

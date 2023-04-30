import { useState } from "react";
import axios from 'axios';
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';




export function useLogin() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const { dispatch } = useAuthContext();
    const navigate = useNavigate();


    // eslint-disable-next-line no-unused-vars
    const login = async (email, password) => {

        try {
            setIsLoading(true);
            setError(false);
            const URL = `${process.env.REACT_APP_API_ROUTE}/auth/login`;
            const json = await axios.post(URL, { email, password });
              // Save user to the local storage;
              localStorage.setItem('user', JSON.stringify(json));
              // Update AuthContext
              dispatch({ type: 'LOGIN', payload: json });
              setIsLoading(false);
             // alert('Registration completed');

             //Cookie
            //  setCookies('acces_token', response.data.token);

             //Alert the Ok response
             swal({
                title: "Succès!",
                text: "Un plaisir de vous revoir",
                icon: "success",
                button: "Ok",
            });
             navigate('/');

        } catch (error) {
            setIsLoading(false);
            setError(error.response.data.message);
            //alert(error.response.data.message);
        }
}
return { login, error, isLoading };

}

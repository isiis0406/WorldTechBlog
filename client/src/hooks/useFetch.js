import { useState } from "react";
import axios from 'axios';
import { useAuthContext } from "./auth/useAuthContext";





export function useFetch() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const { user } = useAuthContext();



    // eslint-disable-next-line no-unused-vars
    const fetchData = async (url) => {

        try {
            setIsLoading(true);
            setError(false);
             const posts = await axios.get(url,{
                headers: {
                    Authorization : `Bearer ${user.data.token}`
                }
             });
             setIsLoading(false);
             return posts       
        } catch (error) {
            setIsLoading(false);
            setError(error.response.data.message);
            //alert(error.response.data.message);
        }

}
return { fetchData, error, isLoading };

}

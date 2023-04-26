import { AuthContext } from "../context/authContext";
import { useContext } from "react";

export const useAuthContext = () =>{
    const context = useContext(AuthContext);
    if(!context){
        throw Error('AuthContext must be used inside of AuthContextProvider');
    } 
    return context;
}
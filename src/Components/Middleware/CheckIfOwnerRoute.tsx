import React, { Children, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, Outlet } from 'react-router-dom'
import { AuthResult } from '../../Services/Authentication/login'
import { checkType } from '../../Services/Authentication/checkType'
import Cookies from 'js-cookie'


const getUserRole = () => {
    // Retrieve the 'persist:root' value from localStorage
    const persistRoot = localStorage.getItem('persist:root');

    if (persistRoot) {
        try {
            // Parse the JSON string
            const parsedPersistRoot = JSON.parse(persistRoot);

            // Access the 'user' object and return the role
            const user = JSON.parse(parsedPersistRoot.user);
            console.log("user", user);
            return user?.user?.role || 'guest';  // Default to 'guest' if role is not found
        } catch (error) {
            console.error('Error parsing user role from localStorage:', error);
            return 'guest'; // Return 'guest' if an error occurs
        }
    }

    return 'guest'; // Return 'guest' if persist:root is not found
};
const CheckIfOwnerRoute = ({ children }: any) => {


    const navigate = useNavigate()

    const userRole = getUserRole()
    console.log("userRole", userRole)
    const refreshToken = Cookies.get('refreshToken')
    if (userRole !== "Business") {
        navigate("/")
    }

    if (!refreshToken) {
        navigate("/")
    }

    const userDetails = useSelector((state: any) => state.reducer.user)

    const [userData, setUserData] = useState<AuthResult>()

    useEffect(() => {
        setUserData(userDetails)
        // setTimeout(()=>{
        getUserType()
        // },100)
    }, [])


    const getUserType = async () => {

        try {
            const { type } = await checkType()

            if (type !== "Business") {
                navigate("/")
            }
        } catch (error) {

            navigate("/")
        }
    }

    return (
        <div>
            <Outlet />
            {/* {children} */}
        </div>
    )
}

export default CheckIfOwnerRoute
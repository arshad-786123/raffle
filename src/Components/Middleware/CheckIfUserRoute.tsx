import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, Outlet } from 'react-router-dom'
import { AuthResult } from '../../Services/Authentication/login'
import { checkType } from '../../Services/Authentication/checkType'
import Cookies from 'js-cookie'

const CheckIfUserRoute = ({children}: any) => {


    const navigate = useNavigate()
    const refreshToken = Cookies.get('refreshToken')

    if (!refreshToken) {
         navigate("/")
    }
    const userDetails = useSelector((state: any) => state.reducer.user)

    const [userData, setUserData] = useState<AuthResult>()

    useEffect(() => {
        setUserData(userDetails)
        getUserType()
    }, [])


    const getUserType = async () => {
        const { type } = await checkType()
        if (type !== "Customer") {
            navigate("/")
        }
    }

    return (
        <>
        {...children}
            {/* <Outlet /> */}
        </>
    )
}

export default CheckIfUserRoute
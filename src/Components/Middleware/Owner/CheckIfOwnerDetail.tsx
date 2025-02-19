import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, Outlet } from 'react-router-dom'
import { getSpecificRaffle } from '../../../Services/Owner/getSpecificRaffle'

const CheckIfOwnerDetail = (children: any) => {


    const navigate = useNavigate()

    useEffect(() => {
        getUserType()
    }, [])


    const getUserType = async () => {

        const getID = window.location.pathname
        const ID = (getID.split("/")[getID.split("/").length - 1]);


        const type = await getSpecificRaffle(ID)
        if (!type.success) {
            navigate("/")
        } else {
            return null
        }

    }

    return (
        <div>
            <Outlet />
        </div>
    )
}

export default CheckIfOwnerDetail
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import AdminSidebar from '../../Components/Navbar/AdminSidebar';
import { API_INSTANCE } from '../../API/Instance';
import { API_ENDPOINTS } from '../../constants';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { successToast } from '../../Utils/Toast/success.toast';
import { errorToast } from '../../Utils/Toast/error.toast';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import OwnerSidebar from '../../Components/Navbar/OwnerSidebar';

interface TermsConditionsData {
    _id?: string;
    isActive1: boolean;
    link1: string;
    description1: string;
    isActive2: boolean;
    link2: string;
    // description2: string;
    descriptionPrivacy: string;
    descriptionLegalInfo: string;
    descriptionHelp: string;
    descriptionTerms: string;
    descriptionAcceptableUse: string;
    descriptionCookies: string;
}



const HelpAccessibility = () => {

    const [termsData, setTermsData] = useState<TermsConditionsData | null>(null);

    useEffect(() => {
        const fetchTermsData = async () => {
            try {
                const response = await API_INSTANCE.get(API_ENDPOINTS.GET_TERMS_CONDITIONS);

                if (response.data) {

                    setTermsData(response.data);
                }
            } catch (error) {
                console.error('Error fetching terms and conditions:', error);
            }
        };
        fetchTermsData();
    }, []);


    return (
        <div className='flex footer-manage'>
            <Toaster position="top-right" />
            <div className='w-[100%] lg:w-[95%] mx-auto p-3 lg:p-10 duration-500'>
                <div className='w-[100%] lg:w-[100%] m-auto mt-4 p-4 rounded-md'>
                    <div className='w-[100%] m-auto'>
                        <div className='rounded-md '>

                            <div className='w-[100%] mt-4'>
                                <h4 className='text-md font-medium tracking-wide'>
                                    Help and accessibility
                                </h4>
                                <p className='font-[400] mt-4' dangerouslySetInnerHTML={{ __html: termsData?.descriptionHelp || ""}} />
                            </div>

                            <br />
                            <div className='h-[1px] bg-gray-400'></div>
                            <br />

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HelpAccessibility;

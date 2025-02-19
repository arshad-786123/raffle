import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import AdminSidebar from '../../Components/Navbar/AdminSidebar';
import { API_INSTANCE } from '../../API/Instance';
import { API_ENDPOINTS } from '../../constants';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { successToast } from '../../Utils/Toast/success.toast';
import { errorToast } from '../../Utils/Toast/error.toast';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

// Define the type for termsData
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

const TermsConditions = () => {
    const [termsData, setTermsData] = useState<TermsConditionsData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTermsData = async () => {
            try {
                const response = await API_INSTANCE.get(API_ENDPOINTS.GET_TERMS_CONDITIONS);
                console.log("response", response);
                if (response.data) {

                    setTermsData(response.data);
                }
            } catch (error) {
                console.error('Error fetching terms and conditions:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchTermsData();
    }, []);

    const formik = useFormik({
        initialValues: {
            isActive1: false,
            link1: '',
            description1: '',
            isActive2: false,
            link2: '',
            // description2: '',
            descriptionPrivacy: '',
            descriptionLegalInfo: '',
            descriptionHelp: '',
            descriptionTerms: '',
            descriptionAcceptableUse: '',
            descriptionCookies: '',
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            isActive1: Yup.boolean().required('Status is required'),
            link1: Yup.string().required('Link is required'),
            description1: Yup.string().required('Description is required'),
            isActive2: Yup.boolean().required('Status is required'),
            link2: Yup.string().required('Link is required'),
            // description2: Yup.string().required('Description is required'),
        }),
        onSubmit: async (values) => {
            try {
                let response;
                if (termsData && termsData._id) {
                    response = await API_INSTANCE.post(`${API_ENDPOINTS.UPDATE_TERMS_CONDITIONS}`, values, {
                        headers: {
                            "Content-Type": "application/json",
                        }
                    });
                } else {
                    response = await API_INSTANCE.post(API_ENDPOINTS.UPDATE_TERMS_CONDITIONS, values, {
                        headers: {
                            "Content-Type": "application/json",
                        }
                    });
                }

                if (response.data.success) {
                    successToast('Successfully submitted!');
                    setTermsData(values);  // Update the local state with the latest data
                } else {
                    errorToast('Something went wrong!');
                }
            } catch (error) {
                errorToast('Something went wrong!');
                console.error(error);
            }
        },
    });

    useEffect(() => {
        if (termsData) {
            formik.setValues({
                isActive1: termsData.isActive1,
                link1: termsData.link1,
                description1: termsData.description1,
                isActive2: termsData.isActive2,
                link2: termsData.link2,
                // description2: termsData.description2,
                descriptionPrivacy: termsData.descriptionPrivacy,
                descriptionLegalInfo: termsData.descriptionLegalInfo,
                descriptionHelp: termsData.descriptionHelp,
                descriptionTerms: termsData.descriptionTerms,
                descriptionAcceptableUse: termsData.descriptionAcceptableUse,
                descriptionCookies: termsData.descriptionCookies,
            });
        }
    }, [termsData]);
    console.log("termsData>>", termsData);
    console.log(">>>>", formik.values.link2);

    if (loading) {
        return <div>Loading...</div>; // Show loading indicator while data is being fetched
    }

    return (
        <div className='flex footer-manage' >
            <Toaster position="top-right" />
            <div className='hidden lg:block'>
                <AdminSidebar />
            </div>

            <div className='w-[100%] lg:w-[95%] mx-auto z-10 p-3 lg:p-10 duration-500' style={{ fontFamily: "poppins, sans-serif" }}>
                <div className='m-auto w-[100%] lg:w-[90%]'>
                    <nav aria-label="breadcrumb" className="breadcrumb-container flex justify-between">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link to="/admin/reports" className="breadcrumb-link">Dashboard</Link>
                            </li>
                            <li className='px-2'>{">"}</li>
                            <li className="breadcrumb-item active" aria-current="page">
                                Setting
                            </li>
                        </ol>
                    </nav>
                </div>

                <div className='w-[100%] lg:w-[90%] m-auto bg-[#F9F0F0] mt-4 p-4 rounded-md'>
                    <div className='w-[100%] m-auto'>
                        <form onSubmit={formik.handleSubmit} className='rounded-md bg-[#F9F0F0]'>
                            {/* <h4>{termsData ? 'Edit Terms and Conditions' : 'Update Terms and Conditions'}</h4> */}

                            <div className='w-[100%] mt-4'>
                                {/* <label className='text-md font-medium tracking-wide flex items-center'>
                                    <input
                                        type="checkbox"
                                        name="isActive1"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        checked={formik.values.isActive1}
                                    />
                                    <span className='ml-2'>Active 1</span>
                                </label> */}
                                {formik.touched.isActive1 && formik.errors.isActive1 ? (
                                    <div className="text-red-500">{formik.errors.isActive1}</div>
                                ) : null}
                            </div>

                            <div className='w-[100%] mt-4'>
                                <h4 className='text-md font-medium tracking-wide'>Terms and Conditions (Label)</h4>
                                <input
                                    className='p-3 outline-none rounded-md border-none w-[100%]'
                                    type="text"
                                    placeholder='Link'
                                    name="link1"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.link1}
                                />
                                {formik.touched.link1 && formik.errors.link1 ? (
                                    <div className="text-red-500">{formik.errors.link1}</div>
                                ) : null}
                            </div>

                            <div className='w-[100%] my-4'>
                                <h4 className='text-md font-medium tracking-wide'>Terms and Conditions (Description)</h4>
                                {/* <ReactQuill
                                    value={formik.values.description1}
                                    onChange={(content) => formik.setFieldValue('description1', content)}
                                    style={{ height: "400px" }}
                                /> */}
                                <div className="ckeditor-container" style={{ height: "500px", overflowY: "auto" }}>
                                    <CKEditor
                                        editor={ClassicEditor}
                                        data={formik.values.description1}
                                        onChange={(event, editor) => {
                                            const data = editor.getData();
                                            formik.setFieldValue('description1', data);
                                        }}
                                        config={{
                                            // You can configure CKEditor options here
                                        }}
                                    />
                                </div>
                                {formik.touched.description1 && formik.errors.description1 ? (
                                    <div className="text-red-500">{formik.errors.description1}</div>
                                ) : null}
                            </div>

                            <div className='w-[100%] mt-4'>
                                {/* <label className='text-md font-medium tracking-wide flex items-center'>
                                    <input
                                        type="checkbox"
                                        name="isActive2"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        checked={formik.values.isActive2}
                                    />
                                    <span className='ml-2'>Active 2</span>
                                </label> */}
                                {formik.touched.isActive2 && formik.errors.isActive2 ? (
                                    <div className="text-red-500">{formik.errors.isActive2}</div>
                                ) : null}
                            </div>

                            {/* <div className='w-[100%] mt-10'>
                                <h4 className='text-md font-medium tracking-wide'>Going Live (Label)</h4>
                                <input
                                    className='p-3 outline-none rounded-md border-none w-[100%]'
                                    type="text"
                                    placeholder='Link'
                                    name="link2"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.link2}
                                />
                                {formik.touched.link2 && formik.errors.link2 ? (
                                    <div className="text-red-500">{formik.errors.link2}</div>
                                ) : null}
                            </div> */}

                            {/* <div className='w-[100%] mt-4'>
                                <h4 className='text-md font-medium tracking-wide'>Going Live (Description)</h4>
                                <ReactQuill
                                    value={formik.values.description2}
                                    onChange={(content) => formik.setFieldValue('description2', content)}
                                />
                                {formik.touched.description2 && formik.errors.description2 ? (
                                    <div className="text-red-500">{formik.errors.description2}</div>
                                ) : null}
                            </div> */}


                            <div className='w-[100%] mt-10'>
                                <h4 className='text-md font-medium tracking-wide'>Privacy Policy (Description)</h4>
                                {/* <ReactQuill
                                    value={formik.values.descriptionPrivacy}
                                    onChange={(content) => formik.setFieldValue('descriptionPrivacy', content)}
                                /> */}

                                <div className="ckeditor-container" style={{ height: "500px", overflowY: "auto" }}>
                                    <CKEditor
                                        editor={ClassicEditor}
                                        data={formik.values.descriptionPrivacy}
                                        onChange={(event, editor) => {
                                            const data = editor.getData();
                                            formik.setFieldValue('descriptionPrivacy', data);
                                        }}
                                        config={{
                                            // You can configure CKEditor options here
                                        }}
                                    />
                                </div>
                                {formik.touched.descriptionPrivacy && formik.errors.descriptionPrivacy ? (
                                    <div className="text-red-500">{formik.errors.descriptionPrivacy}</div>
                                ) : null}
                            </div>

                            {/* <div className='w-[100%] mt-10'>
                                <h4 className='text-md font-medium tracking-wide'>FAQ (Description)</h4>
                                <ReactQuill
                                    value={formik.values.descriptionLegalInfo}
                                    onChange={(content) => formik.setFieldValue('descriptionLegalInfo', content)}
                                />
                                {formik.touched.descriptionLegalInfo && formik.errors.descriptionLegalInfo ? (
                                    <div className="text-red-500">{formik.errors.descriptionLegalInfo}</div>
                                ) : null}
                            </div> */}
                            {/* 
                            <div className='w-[100%] mt-10'>
                                <h4 className='text-md font-medium tracking-wide'>Help and accessibility (Description)</h4>
                                <ReactQuill
                                    value={formik.values.descriptionHelp}
                                    onChange={(content) => formik.setFieldValue('descriptionHelp', content)}
                                />
                                {formik.touched.descriptionHelp && formik.errors.descriptionHelp ? (
                                    <div className="text-red-500">{formik.errors.descriptionHelp}</div>
                                ) : null}
                            </div> */}

                            <div className='w-[100%] mt-10'>
                                <h4 className='text-md font-medium tracking-wide'>Terms of Use (Description)</h4>
                                {/* <ReactQuill
                                    value={formik.values.descriptionTerms}
                                    onChange={(content) => formik.setFieldValue('descriptionTerms', content)}
                                /> */}
                                <div className="ckeditor-container" style={{ height: "500px", overflowY: "auto" }}>
                                    <CKEditor
                                        editor={ClassicEditor}
                                        data={formik.values.descriptionTerms}
                                        onChange={(event, editor) => {
                                            const data = editor.getData();
                                            formik.setFieldValue('descriptionTerms', data);
                                        }}
                                        config={{
                                            // You can configure CKEditor options here
                                        }}
                                    />
                                </div>
                                {formik.touched.descriptionTerms && formik.errors.descriptionTerms ? (
                                    <div className="text-red-500">{formik.errors.descriptionTerms}</div>
                                ) : null}
                            </div>
                            <div className='w-[100%] mt-10'>
                                <h4 className='text-md font-medium tracking-wide'>Cookies (Description)</h4>
                                {/* <ReactQuill
                                    value={formik.values.descriptionTerms}
                                    onChange={(content) => formik.setFieldValue('descriptionTerms', content)}
                                /> */}
                                <div className="ckeditor-container" style={{ height: "500px", overflowY: "auto" }}>
                                    <CKEditor
                                        editor={ClassicEditor}
                                        data={formik.values.descriptionCookies}
                                        onChange={(event, editor) => {
                                            const data = editor.getData();
                                            formik.setFieldValue('descriptionCookies', data);
                                        }}
                                        config={{
                                            // You can configure CKEditor options here
                                        }}
                                    />
                                </div>
                                {formik.touched.descriptionCookies && formik.errors.descriptionCookies ? (
                                    <div className="text-red-500">{formik.errors.descriptionCookies}</div>
                                ) : null}
                            </div>
                            <div className='w-[100%] mt-10'>
                                <h4 className='text-md font-medium tracking-wide'>Acceptable Use (Description)</h4>
                                {/* <ReactQuill
                                    value={formik.values.descriptionTerms}
                                    onChange={(content) => formik.setFieldValue('descriptionTerms', content)}
                                /> */}
                                <div className="ckeditor-container" style={{ height: "500px", overflowY: "auto" }}>
                                    <CKEditor
                                        editor={ClassicEditor}
                                        data={formik.values.descriptionAcceptableUse}
                                        onChange={(event, editor) => {
                                            const data = editor.getData();
                                            formik.setFieldValue('descriptionAcceptableUse', data);
                                        }}
                                        config={{
                                            // You can configure CKEditor options here
                                        }}
                                    />
                                </div>
                                {formik.touched.descriptionAcceptableUse && formik.errors.descriptionAcceptableUse ? (
                                    <div className="text-red-500">{formik.errors.descriptionAcceptableUse}</div>
                                ) : null}
                            </div>


                            <br />
                            <div className='h-[1px] bg-gray-400'></div>
                            <br />

                            <button type='submit' className='bg-[#FF6A78] w-[100%] mx-auto p-2 lg:p-3 text-white rounded-md'>
                                Save Changes
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TermsConditions;

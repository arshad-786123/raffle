import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { updateUserPassword } from '../../Services/Admin/getDashboardData';
import { Toaster } from 'react-hot-toast';
import AdminSidebar from '../../Components/Navbar/AdminSidebar';
import { errorToast } from '../../Utils/Toast/error.toast';
import { successToast } from '../../Utils/Toast/success.toast';

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { id } = useParams<{ id: string }>();

    const handlePasswordUpdate = async () => {
        try {
            if (newPassword !== confirmPassword) {
                errorToast('Passwords do not match');
                return;
            }

            await updateUserPassword(id, newPassword);

            successToast('Password updated successfully');
            setNewPassword('');
            setConfirmPassword('');
        } catch (error) {
            console.error('Error updating password:', error);
            errorToast('Failed to update password');
        }
    };

    return (
        <div className='flex footer-manage' >
            <Toaster position='top-right' />
            <div className='hidden lg:block'>
                <AdminSidebar />
            </div>
            <div className='w-[100%] lg:w-[95%] mx-auto z-10 p-3 lg:p-10 duration-500' style={{ fontFamily: "poppins, sans-serif" }}>
                <div className='m-auto w-[100%] lg:w-[90%]'>
                    <nav aria-label="breadcrumb" className="breadcrumb-container ">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link to="/admin/reports" className="breadcrumb-link">Dashboard</Link>
                            </li>
                            <li className='px-2'>{">"}</li>
                            <li className="breadcrumb-item">
                                <Link to="/admin/users" className="breadcrumb-link">Customers</Link>
                            </li>
                            <li className='px-2'>{">"}</li>
                            <li className="breadcrumb-item active" aria-current="page">
                                Change Password
                            </li>
                        </ol>
                    </nav>
                </div>
                <div className='w-[100%] lg:w-[90%] mx-auto z-10 duration-500'>
                    <div className='w-[100%] m-auto'>
                        {/* <div className='border-[#FF6A78] border-[1px]'></div>
                        <br /> */}
                        <div className='bg-[#F9F0F0] mt-4  p-4 rounded-md'>
                            <h3>Change Password</h3>
                            <div className='flex items-center gap-2 w-[100%] mt-8'>
                                <div className='w-[100%]'>
                                    <h4 className='text-md font-medium tracking-wide'>New Password</h4>
                                    <input
                                        className='p-3 rounded-md outline-none border-none w-[100%]'
                                        type="password"
                                        placeholder='Password'
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className='flex items-center gap-2 w-[100%] mt-8'>
                                <div className='w-[100%]'>
                                    <h4 className='text-md font-medium tracking-wide'>Confirm Password</h4>
                                    <input
                                        className='p-3 rounded-md outline-none border-none w-[100%]'
                                        type="password"
                                        placeholder='Password'
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <br />
                        <div className='h-[1px] bg-gray-400'></div>
                        <br />
                        <div className='block lg:flex items-start gap-2 w-[95%] mt-8'>
                            <div className='w-[100%] mt-4 lg:mt-0'>
                                <button
                                    className='bg-[#FF6A78] w-[100%] text-white p-3 rounded-md mt-6'
                                    onClick={handlePasswordUpdate}
                                >
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                    <br />
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;

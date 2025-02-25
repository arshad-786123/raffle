import { Checkbox, Modal } from 'flowbite-react';
import { useCallback, useEffect, useState } from 'react';
import { UserRegister } from '../../../Utils/Interface/register.interface';
import toast, { Toaster } from 'react-hot-toast';
import { errorToast } from '../../../Utils/Toast/error.toast';
import { getGuestRegisteredData } from '../../../Services/Authentication/register';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { storeGuestUser, storeUser } from '@/Redux/User/userSlice';
import Cookies from 'js-cookie';

interface FreeRaffleEntryFormProps {
    isFreeModalOpen: boolean;
    setIsFreeModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setUserRegisterData: React.Dispatch<React.SetStateAction<any>>;
    userRegisterData: any;
    raffleId:string
}

const FreeRaffleEntryForm: React.FC<FreeRaffleEntryFormProps> = ({
    isFreeModalOpen, 
    setIsFreeModalOpen,
    setUserRegisterData,
    userRegisterData,
    raffleId

}) => {

    const [opted, setOpted] = useState<boolean>(true);
    const [isChecked, setIsChecked] = useState(false);
    const dispatch = useDispatch();
    const navigate=useNavigate();
    useEffect(()=>{
        console.log(raffleId);
    },[])
    const handleSign2Step = async () => {
        try {
            if (userRegisterData.firstname === "") {
                return errorToast("Please enter your first name")
            }
            else if (userRegisterData.lastname === "") {
                return errorToast("Please enter your lastname")
            }

            else if (userRegisterData.phone === "") {
                return errorToast("Please enter your phone")
            }
            else if (!isChecked) { 
                return errorToast("You must agree to the terms and conditions");
            }

            // Add the `opted` value to `userRegisterData` before the API call
            const updatedUserData = {
                ...userRegisterData,
                opted, // Include opted state
            };
            debugger;
            const result = await getGuestRegisteredData(updatedUserData);
            
            if (!result.success) {
                if(result.message=='User already Exist. Please verify the user'){
                    Cookies.set('accessToken', result.result.accessToken, {
                        expires: new Date(Date.now() + 3600 * 1000),
                        sameSite: 'strict',
                        secure: false,
                    });
    
                    Cookies.set('refreshToken', result.result.refreshToken, {
                        expires: new Date(Date.now() + 7 * 24 * 3600 * 1000),
                        sameSite: 'strict',
                        secure: false,
                    });
                    dispatch(storeUser(result.result.user));
                    dispatch(storeGuestUser(result.result.user));
                    setIsFreeModalOpen(false);
                    window.location.reload();
                }
                else{
                    return errorToast(result.message)
                }
            }
            else{
                Cookies.set('accessToken', result.result.accessToken, {
                    expires: new Date(Date.now() + 3600 * 1000),
                    sameSite: 'strict',
                    secure: false,
                });

                Cookies.set('refreshToken', result.result.refreshToken, {
                    expires: new Date(Date.now() + 7 * 24 * 3600 * 1000),
                    sameSite: 'strict',
                    secure: false,
                });

                dispatch(storeUser(result.result.user));
                dispatch(storeGuestUser(result.result.user));
                setIsFreeModalOpen(false);
                window.location.reload();
            }
        } catch (error: any) {
            console.log(error.message);
        }
    }   

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setUserRegisterData((prev: UserRegister) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const handleSelectDialCode = (e: any): void => {
        const selectedOption = e.target.selectedOptions[0];
        const name = selectedOption.getAttribute('data-name');
        const dialCode = selectedOption.getAttribute('data-dialcode');
        setUserRegisterData((prev: UserRegister) => {
            return {
                ...prev,
                dialCode: {
                    country: name,
                    code: e.target.value,
                    dial_code: dialCode
                }
            }
        })
    }
   const handleModal=() => {
    setIsFreeModalOpen(false);
    }
    return (
        <div >
            <Toaster position="top-right"
                reverseOrder={false} />
            <Modal
                className='bg-[#160B3A]'
                dismissible
                position="center"
                show={isFreeModalOpen}
                      
                onClose={handleModal}
                popup
            >
                <div className='rounded-md'>
                    <Modal.Header className='bg-white m-2  rounded-t-md' style={{ color: "black", fontFamily: "poppins, sans-serif" }}> Add your contact details.  </Modal.Header> 
                    <Modal.Body className="bg-white text-secondary  h-full xs:h-auto rounded-b-md" style={{ fontFamily: "poppins, sans-serif" }}>
                        {/* <div className='mt-1' style={{ color: "black", fontFamily: "poppins, sans-serif" }}>
                            <h3 className='text-center text-md lg:text-lg font-bold tracking-wider'>Add your contact details.</h3>
                        </div> */}
                        <div className='mt-4' style={{ color: "black", fontFamily: "poppins, sans-serif" }}>
                            <p className='text-sm lg:text-md'>First Name</p>
                            <div className='flex items-center gap-4 rounded-md p-2 lg:p-2 border-[1px] mt-2'>
                                <input onChange={handleChange} value={userRegisterData.firstname} className='border-none outline-none w-[100%]' type="text" placeholder='Enter your first name' name="firstname" id="firstname" />
                            </div>
                            <p className='mt-4 text-sm lg:text-md'>Last Name</p>
                            <div className='flex items-center justify-between  gap-4 rounded-md p-2 lg:p-2 border-[1px] mt-2'>
                                <input onChange={handleChange} value={userRegisterData.lastname} className='border-none outline-none w-[100%]' type="text" placeholder='Enter your last name' name="lastname" id="lastname" />
                            </div>
                            <p className='mt-4 text-sm lg:text-md'>Phone Number</p>
                            <div className='flex mb-2 items-center gap-4'>
                                <div className='w-[100%] flex items-center justify-between gap-4 rounded-md p-2 lg:p-2 border-[1px] mt-2'>
                                    <input onChange={(e)=>{handleChange(e);handleSelectDialCode(e)}} value={userRegisterData.phone} className='border-none outline-none w-full' type="number" placeholder='Enter your Phone Number' name="phone" id="phone" />
                                </div>
                            </div>

                            <p className='text-xs'>We use this number to verify your account and will never contact you  for marketing purposes unless opted in via marketing preferences.</p>
                            <p className='mt-4 text-sm lg:text-md'>Email</p>
                            <div className='flex mb-2 items-center gap-4'>

                                <div className='w-[100%] flex items-center justify-between gap-4 rounded-md p-2 lg:p-2 border-[1px] mt-2'>
                                    <input onChange={handleChange} value={userRegisterData.email} className='border-none outline-none w-full' type="email" placeholder='Enter your Email' name="email" id="email" />
                                </div>
                            </div>
                            <div className="flex items-start gap-2 text-xs mt-2">
                                <Checkbox
                                    id="contactForOffers"
                                    checked={opted} // Bind to state
                                    onChange={(e) => setOpted(e.target.checked)} // Update state
                                    defaultChecked
                                />
                                <p>
                                    I agree to receiving emails and SMS messages about prizes from Raffily and third parties
                                </p>
                            </div>
                            <div className="flex items-start gap-2 text-xs mt-2">
                                <Checkbox
                                    id="accept"
                                    checked={isChecked}
                                    onChange={(e) => setIsChecked(e.target.checked)}
                                />
                                <p>I am over 18 years of age and agree to the terms and conditions</p>
                            </div>

                        </div>
                        <div onClick={handleSign2Step} className='text-center bg-[#20124C] p-4 rounded-md flex items-center text-white gap-4 font-bold mt-4 cursor-pointer'>
                            <p className='text-center w-full text-xl font-medium'>Continue</p>
                        </div>

                        <div className=' mt-4 w-[100%] m-auto text-left text-xs ' style={{ color: "black", fontFamily: "poppins, sans-serif" }}>
                            By creating an account you agree that you are at least 18 years of age, and accept and agree to the &nbsp;
                            <span className='text-[#EB4C60] font-bold'><a
                                href="/terms-and-conditions"
                                className="text-[#EB4C60] font-bold"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Terms and Conditions
                            </a></span>
                            &nbsp;and&nbsp;
                            <span className='text-[#EB4C60] font-bold'> <a
                                href="/privacy-policy"
                                className="text-[#EB4C60] font-bold"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Privacy Policy
                            </a></span>
                        </div>
                    </Modal.Body>
                </div>
            </Modal>
        </div>
    )
}

export default FreeRaffleEntryForm
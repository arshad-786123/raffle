import React, { useEffect, useState } from 'react'
import { Modal, Radio, Label } from 'flowbite-react';
import paypal from '../../assets/payment/paypal.png'
import google_pay from '../../assets/payment/google_pay.png'
import apple_pay from '../../assets/payment/apple_pay.png'
import visa from '../../assets/payment/visa.png'
import ikea from '../../assets/cart/ikea.png'
import zara from '../../assets/cart/zara.png'
import { useDispatch, useSelector } from 'react-redux';
import { CONSTANT_DATA } from '../../constants';
import { createOrder } from '../../Services/Authentication/purchase';
import { getUserData } from '../../Services/Authentication/getUserData';
import { User } from '../../Utils/Interface/Customer';
import { useLocation, useNavigate } from 'react-router-dom';
import { errorToast } from '../../Utils/Toast/error.toast';
import Confetti from 'react-confetti'
import useWindowSize from 'react-use/lib/useWindowSize'
import { clearCart } from '../../Redux/Cart/cartSlice';
import Sucess from './Components/Sucess';
import noimage from '../../assets/no-image.png';
import { updateRaffleStatus } from '../../Services/Admin/getDashboardData';
import { paymentSuccessToast } from '../../Utils/Toast/paymentsuccess.toast';

const UserPayment = () => {

    const [isPaymentDone, setIsPaymentDone] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isThankYou, setIsThankYou] = useState(false)
    const [paymentMethod, setPaymentMethod] = useState('acquired');
    const navigate = useNavigate()
    const { width, height } = useWindowSize()
    const { state, pathname } = useLocation()
    console.log('state', state);


    const [userDetails, setUserDetails] = useState<User>({
        _id: "",
        firstname: '',
        lastname: '',
        email: '',
        role: '',
        dialCode: {
            country: '',
            code: '',
            dial_code: ''
        },
        phone: '',
        landline: '',
        referralCode: '',
        businessName: '',
        businessAddress: '',
        businessEmailNote: '',
        businessEmailVerify: '',
        description: '',
        VATNumber: '',
        companyNumber: '',
        image: null,
        websites: '',
        companyName: '',
        createdAt: '',
        wallet: {
            _id: '',
            cardDetails: [],
            balance: '',
            revenue: [],
            profits: '',
            userID: '',
            createdAt: '',
            updatedAt: ''
        },
        country: '',
        city: '',
        address: '',
        region: '',
        postcode: ""
    })

    const onClose = (): void => {
        setIsPaymentDone(false);
    };

    const onClose2 = (): void => {
        setIsTableReady(false)
        setIsPaymentDone(false);
    };

    const userCart = useSelector((state: any) => state.reducer?.cart?.cartItems)
    const userData = useSelector((state: any) => state.reducer.user)
    const dispatch = useDispatch()


    const totalPrice = userCart.reduce((total: any, item: any) => {
        const itemTotal = parseFloat(item.ticket_price) * item.qty;
        return total + itemTotal;
    }, 0);

    const [dataSet, setDataSet] = useState<{ result: any[]; raffleData: any[] }>({ result: [], raffleData: [] });
    const [isTableReady, setIsTableReady] = useState(false)

    const handlePurchase = async () => {
        try {

            setIsLoading(true)
            console.log(">>>>>", state?.discount);

            let coupon;
            if (state?.discount) {
                coupon = state?.discount;
            }

            const paymentData = {
                raffleData: userCart,
                paymentMethod,
                paymentInfo: {
                },
                totalPrice,
                coupon
            };

            const a = await createOrder(paymentData)
            // const a = await purchaseRaffle(paymentData)

            console.log("a>", a);


            if (paymentMethod === 'acquired' && a.result.result.paymentLink) {
                window.location.href = a.result.result.paymentLink; // Redirect to Acquired for payment approval
            }

            if (Array.isArray(a?.result?.raffleData)) {

                for (const raffle of a.result?.raffleData) {
                    if (raffle?.ticket_set_prize == raffle?.totalPurchasedTicket) {
                        console.log("UPDATE STATUS", raffle);
                        await updateRaffleStatus(raffle?._id, 2);
                    }
                }
            }

            setIsLoading(false)
            if (!a.success) return errorToast(a.message)

            // setIsPaymentDone(true);
            // successToast('Payment Successful!');
            // successToast('success', 'Payment Successful!', 'Get 1 more free ticket by simply sharing this link!', 'Share', '#FF6A78');
            // paymentSuccessToast();
            setDataSet(a.result)
            setIsTableReady(true)
            setIsThankYou(true)

            // Clear raffle from cart
            dispatch(clearCart());

            // setIsPaymentDone(true)
        } catch (error: any) {

            errorToast(error.message)
        }
    }

    const handlePaymentMethodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPaymentMethod(e.target.value);

    };

    useEffect(() => {
        const countries = async () => {
            const userData = await getUserData();
            setUserDetails(userData.result);
        }
        countries()
    }, [])


    const handleDashboard = () => {
        navigate("/user")
    }

    const [isWinner, setIsWinner] = useState(false)

    // const ModalTable = ({ dataSet }: any) => {
    const { result, raffleData } = dataSet
    const purchasedRaffle = result;

    const getOverallTotalQuantity = () => {
        return result?.reduce((total: any, item: any) => total + item?.quantity, 0);
    };

    const getOverallTotalPrice = () => {
        return raffleData.reduce((total: any, raffleItem: any) => {
            const subtotal = result
                ?.filter((item: any) => item.raffleID === raffleItem._id?.toString())
                .reduce((subTotal: any, item: any) => subTotal + item.quantity * raffleItem.ticket_price, 0);
            return total + subtotal;
        }, 0);
    };

    // instant_prizes 's Id match with result 's id then win
    const hasInstantWin = raffleData?.some((raffleItem: any) =>
        raffleItem?.instant_prizes?.some((prize: any) =>
            result.some((item: any) => prize.ticketID?.toString() === item.ticketID?.toString())
        )
    );

    if (hasInstantWin) {
        setIsWinner(true)

        setTimeout(() => {
            setIsWinner(false)
        }, 5000)
    }

    return (
        <>
            {
                !isThankYou ? <div className='w-[98%] m-auto mt-12 footer-manage' style={{ fontFamily: "poppins, sans-serif" }}>
                    {
                        isWinner &&
                        <div className='fixed top-0 zHigh'>
                            <Confetti
                                width={width}
                                height={height}
                            />
                        </div>
                    }
                    <div className='hidden lg:flex gap-8'>
                        <div className='w-[70%]'>
                            {/* <div className='bg-[#F9F0F0] p-8'>
                                <div className='flex items-center gap-2'>
                                    <svg width="22" height="24" viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M11.0698 1.90332C9.17159 1.90332 7.31598 2.49465 5.73766 3.60253C4.15931 4.7104 2.92917 6.28511 2.20275 8.12744C1.47633 9.96977 1.28626 11.997 1.65659 13.9529C2.02692 15.9087 2.941 17.7052 4.28325 19.1153C5.62551 20.5254 7.33566 21.4857 9.19741 21.8747C11.0592 22.2637 12.989 22.064 14.7427 21.3009C16.4964 20.5378 17.9954 19.2455 19.05 17.5874C20.1046 15.9294 20.6675 13.98 20.6675 11.9859C20.6649 9.31266 19.6529 6.7497 17.8535 4.85945C16.0542 2.9692 13.6145 1.90606 11.0698 1.90332ZM11.0698 21.2067C9.33385 21.2067 7.63682 20.6658 6.19339 19.6527C4.74997 18.6395 3.62496 17.1994 2.96062 15.5145C2.29628 13.8296 2.12246 11.9756 2.46114 10.187C2.79981 8.39831 3.63577 6.75532 4.86331 5.46578C6.09086 4.17623 7.65483 3.29804 9.35744 2.94225C11.0601 2.58647 12.8249 2.76907 14.4288 3.46697C16.0326 4.16487 17.4035 5.34672 18.3679 6.86307C19.3324 8.37942 19.8472 10.1621 19.8472 11.9859C19.8446 14.4305 18.919 16.7743 17.2735 18.5029C15.628 20.2316 13.3969 21.2039 11.0698 21.2067Z" fill="#FF7385" />
                                        <path d="M16.9107 7.11194C16.6298 6.85872 16.2649 6.73284 15.8958 6.76193C15.5267 6.79102 15.1837 6.97268 14.942 7.26706L10.1842 13.065C10.1317 13.1288 10.067 13.1805 9.99446 13.2166C9.92188 13.2527 9.84293 13.2726 9.76264 13.2748C9.68235 13.2771 9.60252 13.2618 9.5282 13.2298C9.45388 13.1978 9.38671 13.1499 9.33103 13.0891L7.149 10.6762C7.02464 10.5291 6.87337 10.4099 6.70422 10.3256C6.53507 10.2413 6.35149 10.1936 6.16442 10.1854C5.97736 10.1772 5.79062 10.2087 5.6154 10.278C5.44015 10.3472 5.28 10.4529 5.14445 10.5885C5.0089 10.7242 4.90075 10.8872 4.82646 11.0677C4.75214 11.2483 4.71319 11.4426 4.71194 11.6393C4.7107 11.836 4.74715 12.0309 4.81914 12.2125C4.89113 12.3941 4.99722 12.5586 5.13103 12.6961L8.81259 16.7602C8.94312 16.9037 9.09996 17.018 9.27364 17.0962C9.44731 17.1744 9.63425 17.2148 9.82321 17.2152H9.85603C10.0506 17.2099 10.242 17.1617 10.4178 17.0738C10.5936 16.986 10.7498 16.8603 10.8765 16.705L17.0551 9.18016C17.2965 8.88554 17.4169 8.5024 17.3898 8.11472C17.3628 7.72699 17.1905 7.3664 16.9107 7.11194Z" fill="#FF7385" />
                                    </svg>
                                    <h5 className='font-medium text-md'>1. ADDRESS</h5>
                                </div>
                                <div className='h-[0.5px] w-full bg-[#A1A1A1] mt-4'></div>
                                <div className='flex items-center w-[100%] justify-between mt-2'>
                                    <div className='mt-2 w-[48%]'>
                                        <p >First Name*</p>
                                        <input value={userDetails?.firstname} className='w-[100%] p-3 rounded-md mt-2' type="text" name="" id="" />
                                    </div>
                                    <div className='mt-2 w-[48%]'>
                                        <p >Last Name*</p>
                                        <input value={userDetails?.lastname} className='w-[100%] p-3 rounded-md mt-2' type="text" name="" id="" />
                                    </div>
                                </div>
                                <div className='flex items-center w-[100%] justify-between mt-2'>
                                    <div className='mt-2 w-[48%]'>
                                        <p >Country*</p>
                                        <input value={userDetails?.country} className='w-[100%] p-3 rounded-md mt-2' type="text" name="" id="" />
                                    </div>
                                    <div className='mt-2 w-[48%]'>
                                        <p >Region*</p>
                                        <input value={userDetails?.region} className='w-[100%] p-3 rounded-md mt-2' type="text" name="" id="" />
                                    </div>
                                </div>
                                <div className='flex items-center w-[100%] justify-between mt-2'>
                                    <div className='mt-2 w-[48%]'>
                                        <p >City*</p>
                                        <input value={userDetails?.city} className='w-[100%] p-3 rounded-md mt-2' type="text" name="" id="" />
                                    </div>
                                    <div className='mt-2 w-[48%]'>
                                        <p >Email address*</p>
                                        <input value={userDetails.email} className='w-[100%] p-3 rounded-md mt-2' type="text" name="" id="" />
                                    </div>
                                </div>
                                <div className='flex items-center w-[100%] justify-between mt-2'>
                                    <div className='mt-2 w-[48%]'>
                                        <p >Home Address*</p>
                                        <textarea value={userDetails.address} placeholder='Street/ Apartment/ Building/ Postal Code' name="" id="" cols={10} rows={5} className='w-[100%] p-3 rounded-md mt-2'></textarea>
                                    </div>
                                    <div className='mt-2 w-[48%] flex flex-col justify-between'>
                                        <div>
                                            <p >Phone Number*</p>
                                            <input value={userDetails.phone} className='w-[100%] p-3 rounded-md mt-2' type="text" name="" id="" />
                                        </div>
                                        <br />
                                        <div className='cursor-pointer w-[100%] text-center p-3 rounded-md bg-[#F66E6A]'>
                                            <button className='text-white'>REGISTER</button>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                            <div className='bg-[#F9F0F0] p-8'>
                                <div className='flex items-center gap-2'>
                                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M11.2275 1.38965C9.3293 1.38965 7.47369 1.95254 5.89538 3.00714C4.31703 4.06173 3.08689 5.56071 2.36047 7.31444C1.63404 9.06817 1.44398 10.9979 1.8143 12.8597C2.18463 14.7215 3.09872 16.4316 4.44096 17.7739C5.78322 19.1161 7.49338 20.0302 9.35513 20.4006C11.2169 20.7709 13.1467 20.5808 14.9004 19.8544C16.6541 19.128 18.1531 17.8978 19.2077 16.3195C20.2623 14.7412 20.8252 12.8855 20.8252 10.9873C20.8226 8.44266 19.8106 6.00295 18.0112 4.20362C16.2119 2.40427 13.7722 1.39225 11.2275 1.38965ZM11.2275 19.7646C9.49156 19.7646 7.79453 19.2499 6.35111 18.2854C4.90769 17.3209 3.78267 15.9501 3.11834 14.3463C2.454 12.7424 2.28018 10.9776 2.61885 9.27492C2.95753 7.57228 3.79349 6.0083 5.02102 4.78079C6.24857 3.55325 7.81255 2.71729 9.51515 2.37861C11.2178 2.03994 12.9826 2.21376 14.5865 2.8781C16.1903 3.54243 17.5612 4.66745 18.5256 6.11088C19.4901 7.5543 20.0049 9.25129 20.0049 10.9873C20.0023 13.3144 19.0767 15.5455 17.4312 17.1909C15.7857 18.8364 13.5546 19.7621 11.2275 19.7646Z" fill="#CCCCCC" />
                                        <path d="M17.0684 6.34784C16.7876 6.1068 16.4226 5.98697 16.0535 6.01466C15.6845 6.04236 15.3414 6.21528 15.0997 6.4955L10.3419 12.0146C10.2894 12.0753 10.2248 12.1245 10.1522 12.1589C10.0796 12.1933 10.0006 12.2122 9.92036 12.2144C9.84006 12.2165 9.76023 12.2019 9.68591 12.1715C9.61159 12.141 9.54442 12.0954 9.48874 12.0375L7.30671 9.74065C7.18235 9.60068 7.03108 9.48718 6.86194 9.40692C6.69279 9.32669 6.5092 9.28131 6.32214 9.27354C6.13507 9.26573 5.94834 9.29572 5.77312 9.36164C5.59787 9.42756 5.43771 9.52809 5.30216 9.65724C5.16661 9.78639 5.05846 9.94153 4.98418 10.1134C4.90986 10.2852 4.87091 10.4703 4.86966 10.6575C4.86841 10.8447 4.90487 11.0303 4.97686 11.2031C5.04885 11.3759 5.15493 11.5325 5.28874 11.6635L8.9703 15.5321C9.10083 15.6687 9.25768 15.7775 9.43135 15.8519C9.60503 15.9263 9.79196 15.9649 9.98093 15.9652H10.0137C10.2083 15.9601 10.3997 15.9143 10.5755 15.8307C10.7513 15.747 10.9076 15.6274 11.0342 15.4796L17.2128 8.31659C17.4542 8.03614 17.5746 7.67143 17.5475 7.30239C17.5205 6.93331 17.3482 6.59006 17.0684 6.34784Z" fill="#CCCCCC" />
                                    </svg>
                                    <h5 className='font-medium text-md'>PAYMENT</h5>
                                </div>
                                {/* <div className='h-[0.5px] w-full bg-[#A1A1A1] mt-4'></div> */}
                                {/* <div className='mt-3 flex items-center '>
                                    <h3 className=' text-sm font-medium tracking-wider'>How would you like to proceed with the payment</h3>
                                </div> */}

                                {/* <div className='flex items-cener gap-24 mt-6'>
                                    <div className="flex items-center gap-2 text-black cursor-pointer">
                                        <Radio id="acquired" name="payment" value="acquired" defaultChecked onChange={handlePaymentMethodChange} />
                                        <Label htmlFor="paypal" style={{ color: 'black', cursor: 'pointer' }}>
                                            <div>
                                                <div className='flex items-center gap-4'>
                                                    <img src={paypal} alt="paypal" />
                                                    <p className='font-bold'>Acquired</p>
                                                </div>
                                                <p className='mt-1'>Pay with PayPal</p>
                                            </div>
                                        </Label>
                                    </div>
                                    <div className="flex items-center gap-2 text-black cursor-pointer">
                                        <Radio id="applepay" name="payment" value="applepay" onChange={handlePaymentMethodChange} />
                                        <Label htmlFor="applepay" style={{ color: 'black', cursor: 'pointer' }}>
                                            <div>
                                                <div className='flex items-center gap-4'>
                                                    <img src={apple_pay} alt="apple_pay" />
                                                    <p className='font-bold'>Apple Pay</p>
                                                </div>
                                                <p className='-mt-1'>Pay with apple pay</p>
                                            </div>
                                        </Label>
                                    </div>
                                    <div className="flex items-center gap-2 text-black ">
                                        <Radio id="googlepay" name="payment" value="googlepay" onChange={handlePaymentMethodChange} />
                                        <Label htmlFor="googlepay" style={{ color: 'black', cursor: 'pointer' }}>
                                            <div>
                                                <div className='flex items-center gap-2'>
                                                    <img src={google_pay} alt="google_pay" />
                                                    <p className='font-bold'>Google Pay</p>
                                                </div>
                                                <p className='mt-2'>Pay with google pay</p>
                                            </div>
                                        </Label>
                                    </div>
                                </div> */}
                                {/* <div className='h-[.1px] w-full bg-[#A1A1A1] my-6'></div>

                                <div>
                                    <div className="flex items-center gap-2 text-black ">
                                        <Radio id="visa" name="payment" value="visa" onChange={handlePaymentMethodChange} />
                                        <Label htmlFor="visa" style={{ color: 'black', cursor: 'pointer' }}>
                                            <div >
                                                <div className='flex items-center gap-4'>
                                                    <img src={visa} alt="visa" />
                                                    <p className='font-bold'>Payment by credit card</p>
                                                </div>
                                                <p className='mt-1'>Secured Payment</p>
                                            </div>
                                        </Label>
                                    </div>
                                    <div className='mt-6'>
                                        <div className='border-[1px] bg-white border-[#D7D7D7] rounded-md p-3 relative'>
                                            <p className='absolute top-[-10px] bg-[#D7D7D7] px-1 text-xs'>Card Number
                                                <span className='text-[red]'> *</span>
                                            </p>
                                            <input className='border-none outline-none w-[100%]' type="text" placeholder='1234 1234 1234 1234' name="" id="" />
                                        </div>
                                    </div>
                                    <div className='flex items-center w-[100%] gap-[2%] mt-8'>
                                        <div className='border-[1px] border-[#D7D7D7] bg-white rounded-md p-3 relative w-[58%]'>
                                            <p className='absolute top-[-10px] bg-[#D7D7D7] px-1 text-xs'>Expiration Date
                                                <span className='text-[red]'> *</span>
                                            </p>
                                            <input className='border-none outline-none w-[100%]' type="text" placeholder='MM/YYYY' name="" id="" />
                                        </div>
                                        <div className='border-[1px] bg-white border-[#D7D7D7] rounded-md p-3 relative w-[40%]'>
                                            <p className='absolute top-[-10px] bg-[#D7D7D7] px-1 text-xs'>Security Code
                                                <span className='text-[red]'> *</span>
                                            </p>
                                            <input className='border-none outline-none w-[100%]' type="text" placeholder='123' name="" id="" />
                                        </div>
                                    </div>

                                </div> */}
                                {/* <div className='h-[0.5px] w-full bg-[#A1A1A1] mt-4'></div> */}

                                <div className='h-[.1px] w-full bg-[#A1A1A1] my-6'></div>
                                <div className='flex items-center justify-between'>
                                    <h4 className='text-[gray]'>Sub-Total</h4>
                                    <h4 className='font-bold'>£{totalPrice.toFixed(2)}</h4>
                                </div>
                                <div className='flex items-center justify-between mt-4'>
                                    <h4 className='text-[black] font-medium'>Discount</h4>
                                    <h4 className='font-bold text-[#E11425]'>£{state?.discount.toFixed(2)}</h4>
                                </div>
                                <div className='h-[.1px] w-full bg-[#A1A1A1] my-6'></div>
                                <div className='flex items-center justify-between mt-4'>
                                    <h4 className='text-[black] font-medium'>Total</h4>
                                    <h4 className='font-bold text-[#E11425]'>£{(totalPrice - state?.discount).toFixed(2)}</h4>
                                </div>
                                <div onClick={handlePurchase} className='text-center bg-[#F66E6A] p-3 rounded-md flex items-center text-white gap-4 font-bold mt-4 cursor-pointer'>
                                    <p className='text-center w-full text-lg font-medium tracking-wider'>PROCEED WITH ORDER</p>
                                </div>
                            </div>
                        </div>
                        <div className='w-[26%]'>
                            <div className='border-2 p-6 rounded-md border-[#FF6A78]'>
                                <h4 className='font-medium text-lg'>YOUR ORDER ({userCart.length})</h4>
                                <div className='h-[.1px] w-full bg-[#A1A1A1] my-6'></div>
                                <div className='flex items-center justify-start  mt-4'>
                                    <h4 className='text-[gray]'>Customer Name : &nbsp; </h4>
                                    <h4 className='font-bold'> {userDetails?.firstname} {' '} {userDetails?.lastname}</h4>
                                </div>
                                <div className='flex items-center justify-start  mt-4'>
                                    <h4 className='text-[gray]'>Email : &nbsp; </h4>
                                    <h4 className='font-bold'> {userDetails?.email} </h4>
                                </div>
                                {
                                    userCart.length > 0 ?
                                        userCart.map((item: any, i: any) => (
                                            <>
                                                <div className='h-[.1px] w-full bg-[#A1A1A1] my-6'></div><div className='flex items-start gap-4 mt-4'>
                                                    <img src={item ? CONSTANT_DATA.IMAGE_BASE_URL + item.images[0] : noimage} className='w-20' alt="ikea" onError={(e) => {
                                                        const target = e.target as HTMLImageElement;
                                                        target.onerror = null;
                                                        target.src = noimage;
                                                    }} />
                                                    <div>
                                                        <p>{item.raffle_name}</p>
                                                        <p>Qty: {item.qty}</p>
                                                        <p className='font-bold text-[#E11425]'>£{item.ticket_price}</p>
                                                    </div>
                                                </div>
                                            </>
                                        )) :
                                        <><div>
                                            <h3 className='text-center text-xl font-medium tracking-wide'>No Cart Items Found</h3>
                                        </div></>
                                }

                                <div className='h-[.1px] w-full bg-[#A1A1A1] my-6'></div>

                                <div className='flex items-center justify-between'>
                                    <h4 className='text-[gray]'>Sub-Total</h4>
                                    <h4 className='font-bold'>£{totalPrice.toFixed(2)}</h4>
                                </div>
                                <div className='flex items-center justify-between mt-4'>
                                    <h4 className='text-[black] font-medium'>Discount</h4>
                                    <h4 className='font-bold text-[#E11425]'>£{state?.discount.toFixed(2)}</h4>
                                </div>
                                <div className='h-[.1px] w-full bg-[#A1A1A1] my-6'></div>
                                <div className='flex items-center justify-between mt-4'>
                                    <h4 className='text-[black] font-medium'>Total</h4>
                                    <h4 className='font-bold text-[#E11425]'>£{(totalPrice - state?.discount).toFixed(2)}</h4>
                                </div>
                                <p className='font-medium text-[#FF6A78] text-center mt-4' onClick={() => navigate("/user/cart")}> <a href="#"> Return to Cart</a></p>
                            </div>
                            {/* <div className='border-2 p-6 rounded-md border-[#D8D8D8] mt-6'>
                    <h4 className='font-medium text-lg'>YOUR ORDER ({userCart?.length} RAFFLES)</h4>
                    <div className='h-[.1px] w-full bg-[#A1A1A1] my-4'></div>
                    <h4 className='text-sm font-medium'>Contact our experts</h4>
                    <div className='text-center border-2 border-[#D8D8D8] p-3 rounded-md flex items-center  gap-4  mt-4 cursor-pointer'>
                        <p className='text-[#F66E6A] text-center w-full text-xl font-medium tracking-wider'>CHAT</p>
                    </div>
                </div> */}
                            {/* <div className='border-2 p-6 rounded-md border-[#D8D8D8] mt-6'>
                    <h4 className='font-medium text-lg'>REFUND POLICY</h4>
                    <div className='h-[.1px] w-full bg-[#A1A1A1] my-4'></div>
                    <p className='text-sm'>1Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut, ipsa nihil, molestias neque, vel voluptates quo at consequuntur facere ea sapiente natus vitae nisi minus provident omnis harum id consectetur?</p>
                </div> */}
                        </div>
                    </div>
                    <div className='block lg:hidden gap-8'>
                        <div className='w-[95%] m-auto'>
                            <div className='border-2 p-6 rounded-md border-[#FF6A78]'>
                                <h4 className='font-medium text-lg'>YOUR ORDER ({userCart.length} RAFFLES)</h4>
                                <div className='h-[.1px] w-full bg-[#A1A1A1] my-6'></div>
                                <div className=' items-center justify-start  mt-4'>
                                    <h4 className='text-[gray]'>Customer Name : &nbsp; </h4>
                                    <h4 className=''> {userDetails?.firstname} {' '} {userDetails?.lastname}</h4>
                                </div>
                                <div className=' items-center justify-start  mt-4'>
                                    <h4 className='text-[gray]'>Email : &nbsp; </h4>
                                    <h4 className=''> {userDetails?.email} </h4>
                                </div>
                                {
                                    userCart.length > 0 ?
                                        userCart.map((item: any, i: any) => (
                                            <>
                                                <div className='h-[.1px] w-full bg-[#A1A1A1] my-6'></div><div className='flex items-start gap-4 mt-4'>
                                                    <img src={CONSTANT_DATA.IMAGE_BASE_URL + item.images[0]} className='w-20' alt="ikea" />
                                                    <div>
                                                        <p>{item.raffle_name}</p>
                                                        <p>Qty: {item.qty}</p>
                                                        <p className='font-bold text-[#E11425]'>£{item.ticket_price}</p>
                                                    </div>
                                                </div>
                                            </>
                                        )) :
                                        <><div>
                                            <h3 className='text-center text-xl font-medium tracking-wide'>No Cart Items Found</h3>
                                        </div></>
                                }

                                <div className='flex items-center justify-between'>
                                    <h4 className='text-[gray]'>Sub-Total</h4>
                                    <h4 className='font-bold'>£{totalPrice.toFixed(2)}</h4>
                                </div>
                                <div className='flex items-center justify-between mt-4'>
                                    <h4 className='text-[black] font-medium'>Discount</h4>
                                    <h4 className='font-bold text-[#E11425]'>£{state?.discount.toFixed(2)}</h4>
                                </div>
                                <div className='h-[.1px] w-full bg-[#A1A1A1] my-6'></div>
                                <div className='flex items-center justify-between mt-4'>
                                    <h4 className='text-[black] font-medium'>Total</h4>
                                    <h4 className='font-bold text-[#E11425]'>£{(totalPrice - state?.discount).toFixed(2)}</h4>
                                </div>
                                <p className='font-medium text-[#FF6A78] text-center mt-4' onClick={() => navigate("/user/cart")}> <a href="#"> Return to Cart</a></p>
                            </div>
                            {/* <div className='border-2 p-6 rounded-md border-[#D8D8D8] mt-6'>
                    <h4 className='font-medium text-lg'>YOUR ORDER ({userCart.length} RAFFLES)</h4>
                    <div className='h-[.1px] w-full bg-[#A1A1A1] my-4'></div>
                    <h4 className='text-sm font-medium'>Contact our experts</h4>
                    <div className='text-center border-2 border-[#D8D8D8] p-3 rounded-md flex items-center  gap-4  mt-4 cursor-pointer'>
                        <p className='text-[#F66E6A] text-center w-full text-xl font-medium tracking-wider'>CHAT</p>
                    </div>
                </div> */}
                            {/* <div className='border-2 p-6 rounded-md border-[#D8D8D8] mt-6'>
                    <h4 className='font-medium text-lg'>REFUND POLICY</h4>
                    <div className='h-[.1px] w-full bg-[#A1A1A1] my-4'></div>
                    <p className='text-sm'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut, ipsa nihil, molestias neque, vel voluptates quo at consequuntur facere ea sapiente natus vitae nisi minus provident omnis harum id consectetur?</p>
                </div> */}
                        </div>
                        <div className='w-[95%] m-auto mt-10'>
                            {/* <div className='bg-[#F9F0F0] p-2 lg:p-8'>
                                <div className='flex items-center gap-2'>
                                    <svg width="22" height="24" viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M11.0698 1.90332C9.17159 1.90332 7.31598 2.49465 5.73766 3.60253C4.15931 4.7104 2.92917 6.28511 2.20275 8.12744C1.47633 9.96977 1.28626 11.997 1.65659 13.9529C2.02692 15.9087 2.941 17.7052 4.28325 19.1153C5.62551 20.5254 7.33566 21.4857 9.19741 21.8747C11.0592 22.2637 12.989 22.064 14.7427 21.3009C16.4964 20.5378 17.9954 19.2455 19.05 17.5874C20.1046 15.9294 20.6675 13.98 20.6675 11.9859C20.6649 9.31266 19.6529 6.7497 17.8535 4.85945C16.0542 2.9692 13.6145 1.90606 11.0698 1.90332ZM11.0698 21.2067C9.33385 21.2067 7.63682 20.6658 6.19339 19.6527C4.74997 18.6395 3.62496 17.1994 2.96062 15.5145C2.29628 13.8296 2.12246 11.9756 2.46114 10.187C2.79981 8.39831 3.63577 6.75532 4.86331 5.46578C6.09086 4.17623 7.65483 3.29804 9.35744 2.94225C11.0601 2.58647 12.8249 2.76907 14.4288 3.46697C16.0326 4.16487 17.4035 5.34672 18.3679 6.86307C19.3324 8.37942 19.8472 10.1621 19.8472 11.9859C19.8446 14.4305 18.919 16.7743 17.2735 18.5029C15.628 20.2316 13.3969 21.2039 11.0698 21.2067Z" fill="#FF7385" />
                                        <path d="M16.9107 7.11194C16.6298 6.85872 16.2649 6.73284 15.8958 6.76193C15.5267 6.79102 15.1837 6.97268 14.942 7.26706L10.1842 13.065C10.1317 13.1288 10.067 13.1805 9.99446 13.2166C9.92188 13.2527 9.84293 13.2726 9.76264 13.2748C9.68235 13.2771 9.60252 13.2618 9.5282 13.2298C9.45388 13.1978 9.38671 13.1499 9.33103 13.0891L7.149 10.6762C7.02464 10.5291 6.87337 10.4099 6.70422 10.3256C6.53507 10.2413 6.35149 10.1936 6.16442 10.1854C5.97736 10.1772 5.79062 10.2087 5.6154 10.278C5.44015 10.3472 5.28 10.4529 5.14445 10.5885C5.0089 10.7242 4.90075 10.8872 4.82646 11.0677C4.75214 11.2483 4.71319 11.4426 4.71194 11.6393C4.7107 11.836 4.74715 12.0309 4.81914 12.2125C4.89113 12.3941 4.99722 12.5586 5.13103 12.6961L8.81259 16.7602C8.94312 16.9037 9.09996 17.018 9.27364 17.0962C9.44731 17.1744 9.63425 17.2148 9.82321 17.2152H9.85603C10.0506 17.2099 10.242 17.1617 10.4178 17.0738C10.5936 16.986 10.7498 16.8603 10.8765 16.705L17.0551 9.18016C17.2965 8.88554 17.4169 8.5024 17.3898 8.11472C17.3628 7.72699 17.1905 7.3664 16.9107 7.11194Z" fill="#FF7385" />
                                    </svg>
                                    <h5 className='font-medium text-md'>1. ADDRESS</h5>
                                </div>
                                <div className='h-[0.5px] w-full bg-[#A1A1A1] mt-4'></div>
                                <div className='block lg:flex items-center w-[100%] justify-between mt-2'>
                                    <div className='mt-2 w-[100%] lg:w-[48%]'>
                                        <p >First Name*</p>
                                        <input value={userDetails?.firstname} className='w-[100%] p-3 rounded-md mt-2' type="text" name="" id="" />
                                    </div>
                                    <div className='mt-2 w-[100%] lg:w-[48%]'>
                                        <p >Last Name*</p>
                                        <input value={userDetails?.lastname} className='w-[100%] p-3 rounded-md mt-2' type="text" name="" id="" />
                                    </div>
                                </div>
                                <div className='block lg:flex items-center w-[100%] justify-between mt-2'>
                                    <div className='mt-2 w-[100%] lg:w-[48%]'>
                                        <p >Country*</p>
                                        <input value={userDetails?.country} className='w-[100%] p-3 rounded-md mt-2' type="text" name="" id="" />
                                    </div>
                                    <div className='mt-2 w-[100%] lg:w-[48%]'>
                                        <p >Region*</p>
                                        <input value={userDetails?.region} className='w-[100%] p-3 rounded-md mt-2' type="text" name="" id="" />
                                    </div>
                                </div>
                                <div className='block lg:flex items-center w-[100%] justify-between mt-2'>
                                    <div className='mt-2 w-[100%] lg:w-[48%]'>
                                        <p >City*</p>
                                        <input value={userDetails?.city} className='w-[100%] p-3 rounded-md mt-2' type="text" name="" id="" />
                                    </div>
                                    <div className='mt-2 w-[100%] lg:w-[48%]'>
                                        <p >Email address*</p>
                                        <input value={userDetails.email} className='w-[100%] p-3 rounded-md mt-2' type="text" name="" id="" />
                                    </div>
                                </div>
                                <div className='block lg:flex items-center w-[100%] justify-between mt-2'>
                                    <div className='mt-2 w-[100%] lg:w-[48%]'>
                                        <p >Home Address*</p>
                                        <textarea value={userDetails.address} placeholder='Street/ Apartment/ Building/ Postal Code' name="" id="" cols={10} rows={5} className='w-[100%] p-3 rounded-md mt-2'></textarea>
                                    </div>
                                    <div className='mt-2 w-[100%] lg:w-[48%] flex flex-col justify-between'>
                                        <div>
                                            <p >Phone Number*</p>
                                            <input value={userDetails.phone} className='w-[100%] p-3 rounded-md mt-2' type="text" name="" id="" />
                                        </div>
                                        <br />
                                        <div className='cursor-pointer w-[100%] text-center p-3 rounded-md bg-[#F66E6A]'>
                                            <button className='text-white'>REGISTER</button>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                            <div className='bg-[#F9F0F0] p-8'>
                                <div className='flex items-center gap-2'>
                                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M11.2275 1.38965C9.3293 1.38965 7.47369 1.95254 5.89538 3.00714C4.31703 4.06173 3.08689 5.56071 2.36047 7.31444C1.63404 9.06817 1.44398 10.9979 1.8143 12.8597C2.18463 14.7215 3.09872 16.4316 4.44096 17.7739C5.78322 19.1161 7.49338 20.0302 9.35513 20.4006C11.2169 20.7709 13.1467 20.5808 14.9004 19.8544C16.6541 19.128 18.1531 17.8978 19.2077 16.3195C20.2623 14.7412 20.8252 12.8855 20.8252 10.9873C20.8226 8.44266 19.8106 6.00295 18.0112 4.20362C16.2119 2.40427 13.7722 1.39225 11.2275 1.38965ZM11.2275 19.7646C9.49156 19.7646 7.79453 19.2499 6.35111 18.2854C4.90769 17.3209 3.78267 15.9501 3.11834 14.3463C2.454 12.7424 2.28018 10.9776 2.61885 9.27492C2.95753 7.57228 3.79349 6.0083 5.02102 4.78079C6.24857 3.55325 7.81255 2.71729 9.51515 2.37861C11.2178 2.03994 12.9826 2.21376 14.5865 2.8781C16.1903 3.54243 17.5612 4.66745 18.5256 6.11088C19.4901 7.5543 20.0049 9.25129 20.0049 10.9873C20.0023 13.3144 19.0767 15.5455 17.4312 17.1909C15.7857 18.8364 13.5546 19.7621 11.2275 19.7646Z" fill="#CCCCCC" />
                                        <path d="M17.0684 6.34784C16.7876 6.1068 16.4226 5.98697 16.0535 6.01466C15.6845 6.04236 15.3414 6.21528 15.0997 6.4955L10.3419 12.0146C10.2894 12.0753 10.2248 12.1245 10.1522 12.1589C10.0796 12.1933 10.0006 12.2122 9.92036 12.2144C9.84006 12.2165 9.76023 12.2019 9.68591 12.1715C9.61159 12.141 9.54442 12.0954 9.48874 12.0375L7.30671 9.74065C7.18235 9.60068 7.03108 9.48718 6.86194 9.40692C6.69279 9.32669 6.5092 9.28131 6.32214 9.27354C6.13507 9.26573 5.94834 9.29572 5.77312 9.36164C5.59787 9.42756 5.43771 9.52809 5.30216 9.65724C5.16661 9.78639 5.05846 9.94153 4.98418 10.1134C4.90986 10.2852 4.87091 10.4703 4.86966 10.6575C4.86841 10.8447 4.90487 11.0303 4.97686 11.2031C5.04885 11.3759 5.15493 11.5325 5.28874 11.6635L8.9703 15.5321C9.10083 15.6687 9.25768 15.7775 9.43135 15.8519C9.60503 15.9263 9.79196 15.9649 9.98093 15.9652H10.0137C10.2083 15.9601 10.3997 15.9143 10.5755 15.8307C10.7513 15.747 10.9076 15.6274 11.0342 15.4796L17.2128 8.31659C17.4542 8.03614 17.5746 7.67143 17.5475 7.30239C17.5205 6.93331 17.3482 6.59006 17.0684 6.34784Z" fill="#CCCCCC" />
                                    </svg>
                                    <h5 className='font-medium text-md'>PAYMENT</h5>
                                </div>
                                {/* <div className='h-[0.5px] w-full bg-[#A1A1A1] mt-4'></div> */}
                                {/* <div className='mt-3 flex items-center '>
                                    <h3 className=' text-sm font-medium tracking-wider'>How would you like to proceed with the payment</h3>
                                </div>

                                <div className='grid lg:flex  items-cener gap-12 lg:gap-24 mt-6'>
                                    <div className="flex items-center gap-2 text-black cursor-pointer">
                                        <Radio id="paypal" name="payment" value="paypal" defaultChecked />
                                        <Label htmlFor="paypal" style={{ color: 'black', cursor: 'pointer' }}>
                                            <div>
                                                <div className='flex items-center gap-4'>
                                                    <img src={paypal} alt="paypal" />
                                                    <p className='font-bold'>Paypal</p>
                                                </div>
                                                <p className='mt-1'>Pay with PayPal</p>
                                            </div>
                                        </Label>
                                    </div>
                                    <div className="flex items-center gap-2 text-black cursor-pointer">
                                        <Radio id="applepay" name="payment" value="applepay" />
                                        <Label htmlFor="applepay" style={{ color: 'black', cursor: 'pointer' }}>
                                            <div>
                                                <div className='flex items-center gap-4'>
                                                    <img src={apple_pay} alt="apple_pay" />
                                                    <p className='font-bold'>Apple Pay</p>
                                                </div>
                                                <p className='-mt-1'>Pay with apple pay</p>
                                            </div>
                                        </Label>
                                    </div>
                                    <div className="flex items-center gap-2 text-black ">
                                        <Radio id="googlepay" name="payment" value="googlepay" />
                                        <Label htmlFor="googlepay" style={{ color: 'black', cursor: 'pointer' }}>
                                            <div>
                                                <div className='flex items-center gap-2'>
                                                    <img src={google_pay} alt="google_pay" />
                                                    <p className='font-bold'>Google Pay</p>
                                                </div>
                                                <p className='mt-2'>Pay with google pay</p>
                                            </div>
                                        </Label>
                                    </div>
                                </div>
                                <div className='h-[.1px] w-full bg-[#A1A1A1] my-6'></div>

                                <div>
                                    <div className="flex items-center gap-2 text-black ">
                                        <Radio id="visa" name="payment" value="visa" />
                                        <Label htmlFor="visa" style={{ color: 'black', cursor: 'pointer' }}>
                                            <div >
                                                <div className='flex items-center gap-4'>
                                                    <img src={visa} alt="visa" />
                                                    <p className='font-bold'>Payment by credit card</p>
                                                </div>
                                                <p className='mt-1'>Secured Payment</p>
                                            </div>
                                        </Label>
                                    </div>
                                    <div className='mt-6'>
                                        <div className='border-[1px] bg-white border-[#D7D7D7] rounded-md p-3 relative'>
                                            <p className='absolute top-[-10px] bg-[#D7D7D7] px-1 text-xs'>Card Number
                                                <span className='text-[red]'> *</span>
                                            </p>
                                            <input className='border-none outline-none' type="text" placeholder='1234 1234 1234 1234' name="" id="" />
                                        </div>
                                    </div>
                                    <div className='grid lg:flex items-center w-[100%] gap-8 lg:gap-[2%] mt-8'>
                                        <div className='border-[1px] border-[#D7D7D7] bg-white rounded-md p-3 relative w-[100%] lg:w-[58%]'>
                                            <p className='absolute top-[-10px] bg-[#D7D7D7] px-1 text-xs'>Expiration Date
                                                <span className='text-[red]'> *</span>
                                            </p>
                                            <input className='border-none outline-none' type="text" placeholder='MM/YYYY' name="" id="" />
                                        </div>
                                        <div className='border-[1px] bg-white border-[#D7D7D7] rounded-md p-3 relative w-[100%] lg:w-[40%]'>
                                            <p className='absolute top-[-10px] bg-[#D7D7D7] px-1 text-xs'>Security Code
                                                <span className='text-[red]'> *</span>
                                            </p>
                                            <input className='border-none outline-none w-[100%]' type="text" placeholder='123' name="" id="" />
                                        </div>
                                    </div>

                                </div> */}
                                {/* <div className='h-[0.5px] w-full bg-[#A1A1A1] mt-4'></div> */}
                                {/* <div className='mt-2'>
                        <p >Add additional notes</p>
                        <textarea name="" id="" cols={10} rows={5} className='w-[100%] p-3 rounded-md mt-2'></textarea>
                    </div> */}
                                <div className='h-[.1px] w-full bg-[#A1A1A1] my-6'></div>
                                <div className='flex items-center justify-between'>
                                    <h4 className='text-[gray]'>Sub-Total</h4>
                                    <h4 className='font-bold'>£{totalPrice.toFixed(2)}</h4>
                                </div>
                                <div className='flex items-center justify-between mt-4'>
                                    <h4 className='text-[black] font-medium'>Discount</h4>
                                    <h4 className='font-bold text-[#E11425]'>£{state?.discount.toFixed(2)}</h4>
                                </div>
                                <div className='h-[.1px] w-full bg-[#A1A1A1] my-6'></div>
                                <div className='flex items-center justify-between mt-4'>
                                    <h4 className='text-[black] font-medium'>Total</h4>
                                    <h4 className='font-bold text-[#E11425]'>£{(totalPrice - state?.discount).toFixed(2)}</h4>
                                </div>
                                <div onClick={handlePurchase} className='text-center bg-[#F66E6A] p-3 rounded-md flex items-center text-white gap-4 font-bold mt-4 cursor-pointer'>
                                    <p className='text-center w-full text-lg font-medium tracking-wider'>PROCEED WITH ORDER </p>
                                </div>
                            </div>
                        </div>

                    </div>
                    {/* <Modal
                        className='bg-[#160B3A]'
                        dismissible
                        position="center"
                        show={isPaymentDone}
                        onClose={onClose}
                        popup
                    >
                        <div className='rounded-md'>
                            <Modal.Header className='bg-white  rounded-t-md' />

                            <Modal.Body className="bg-white text-secondary  h-full xs:h-auto rounded-b-md">
                                <div className='flex flex-col justify-center items-center'>
                                    <svg width="82" height="78" viewBox="0 0 82 78" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M77.8723 45.7917L77.8482 45.8036C75.0032 47.9591 73.7977 51.6272 74.8104 55.0215L74.8224 55.0454C76.4377 60.4404 72.4357 65.8828 66.7456 66.0259H66.7216C63.1293 66.1211 59.9709 68.3838 58.7775 71.7305V71.7423C56.8727 77.0539 50.3875 79.138 45.6982 75.9342C42.7864 73.9699 38.9371 73.8674 35.8735 75.9342H35.8615C31.1724 79.126 24.6868 77.0537 22.7942 71.7303C21.5901 68.3754 18.4364 66.1208 14.8502 66.0257H14.8261C9.13634 65.8827 5.13402 60.4402 6.74944 55.0452L6.76144 55.0214C7.77381 51.627 6.56837 47.9589 3.72367 45.8034L3.69952 45.7916C-0.821063 42.3615 -0.821063 35.6447 3.69952 32.2148L3.72367 32.2029C6.56837 30.0474 7.77381 26.3792 6.74944 22.985V22.9611C5.12187 17.5663 9.13618 12.1235 14.8261 11.9806H14.8502C18.4304 11.8854 21.6008 9.6225 22.7942 6.27604V6.26419C24.6867 0.952603 31.1724 -1.13151 35.8615 2.07226H35.8735C38.8268 4.08494 42.7325 4.08494 45.6982 2.07226C50.4347 -1.15922 56.8839 0.984474 58.7775 6.26419V6.27604C59.9709 9.61065 63.1291 11.8855 66.7216 11.9806H66.7456C72.4355 12.1235 76.4377 17.5663 74.8224 22.9611L74.8104 22.985C73.7977 26.3792 75.0032 30.0474 77.8482 32.2029L77.8723 32.2148C82.3929 35.6447 82.3929 42.3616 77.8723 45.7917Z" fill="#F66E6A" />
                                        <path d="M40.786 61.1851C53.1875 61.1851 63.2409 51.2529 63.2409 39.0008C63.2409 26.7487 53.1875 16.8164 40.786 16.8164C28.3845 16.8164 18.3311 26.7487 18.3311 39.0008C18.3311 51.2529 28.3845 61.1851 40.786 61.1851Z" fill="#F66E6A" />
                                        <path opacity="0.1" d="M58.0274 24.8002C54.1435 21.6436 49.1743 19.7462 43.7573 19.7462C31.3559 19.7462 21.297 29.6839 21.297 41.9358C21.297 47.2876 23.2175 52.1969 26.4125 56.0341C21.4778 51.9672 18.3345 45.8497 18.3345 39.0005C18.3345 26.7484 28.3848 16.8193 40.7861 16.8193C47.7189 16.8193 53.911 19.9248 58.0274 24.8002Z" fill="white" />
                                        <path d="M35.4436 47.6852L30.478 42.466C29.1775 41.099 29.2447 38.9495 30.6279 37.6647C32.0112 36.3783 34.1879 36.4474 35.4872 37.8135L37.8575 40.3039L47.9331 28.9268C49.182 27.5148 51.3543 27.3716 52.7846 28.6072C54.2137 29.8429 54.358 31.9883 53.108 33.4002L40.5356 47.5957C39.1962 49.1064 36.8325 49.146 35.4436 47.6852Z" fill="white" />
                                    </svg>
                                    <h4 className='mt-2 font-bold text-xl tracking-wide'>Payment Successful!</h4>
                                    <p className='mt-2 font-medium text-sm tracking-wide'>Get 1 more free ticket by simply sharing this link!</p>
                                    <button onClick={handleDashboard} className='mt-5 p-3 font-medium tracking-wide text-black border-2 border-[#FF6A78]  w-[60%] rounded-md'>
                                        Go To Dashboard
                                    </button>
                                    <button className='mt-2 p-3 bg-[#FF6A78] text-white w-[60%] rounded-md'>
                                        Share
                                    </button>
                                </div>

                            </Modal.Body>

                        </div>
                    </Modal> */}
                    <Modal
                        className='bg-[#160B3A]'
                        position="center"
                        show={isLoading}
                        popup
                    >
                        <div className='rounded-md'>
                            <Modal.Header className='bg-white  rounded-t-md' />

                            <Modal.Body className="bg-white text-secondary  h-full xs:h-auto rounded-b-md">
                                <div className='flex flex-col justify-center items-center'>

                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
                                        <radialGradient id="a11" cx=".66" fx=".66" cy=".3125" fy=".3125" gradientTransform="scale(1.5)">
                                            <stop offset="0" stop-color="#FF6A78"></stop>
                                            <stop offset=".3" stop-color="#FF6A78" stop-opacity=".9"></stop>
                                            <stop offset=".6" stop-color="#FF6A78" stop-opacity=".6"></stop>
                                            <stop offset=".8" stop-color="#FF6A78" stop-opacity=".3"></stop>
                                            <stop offset="1" stop-color="#FF6A78" stop-opacity="0"></stop>
                                        </radialGradient>
                                        <circle transform-origin="center" fill="none" stroke="url(#a11)" stroke-width="8" stroke-linecap="round" stroke-dasharray="100 500" stroke-dashoffset="0" cx="50" cy="50" r="35">
                                            <animateTransform type="rotate" attributeName="transform" calcMode="spline" dur="2" values="360;0" keyTimes="0;1" keySplines="0 0 1 1" repeatCount="indefinite"></animateTransform>
                                        </circle>
                                        <circle transform-origin="center" fill="none" opacity=".2" stroke="#FF6A78" stroke-width="8" stroke-linecap="round" cx="50" cy="50" r="35"></circle>
                                    </svg>

                                    <h6 className='mt-2 font-bold text-xl tracking-wide'>Please wait!</h6>
                                    <h4 className='mt-2 font-bold text-xl tracking-wide'>Payment Processing</h4>

                                </div>

                            </Modal.Body>

                        </div>
                    </Modal>
                    {/* <Modal
            className='bg-[#160B3A] '
            position="center"
            dismissible
            show={isTableReady}
            onClose={onClose2}
            popup
        >
            <div className='rounded-md h-[80vh] w-[70vw] m-auto absolute' style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}>
                <Modal.Header className='bg-white  rounded-t-md' />

                <Modal.Body className="bg-white text-secondary  h-full xs:h-auto rounded-b-md overflow-y-scroll">
                    <ModalTable dataSet={dataSet} />
                </Modal.Body>

            </div>
        </Modal> */}
                </div>
                    : <div className="w-full h-[850px] relative bg-white overflow-hidden flex flex-col items-start justify-start pt-0 px-0 pb-[0.1px] box-border gap-[75px] leading-[normal] tracking-[normal] lg:h-auto mq450:gap-[19px] mq750:gap-[37px]">
                        {/* <Sucess userDetails={userDetails} raffleData={raffleData} result={result} discount={state?.discount} /> */}
                        {/* <Sucess /> */}
                    </div>
                // <div style={{ fontFamily: 'Helvetica, Arial, sans-serif', minWidth: '1000px', overflow: 'auto', lineHeight: 2 }}>
                //     <div style={{ margin: '50px auto', width: '70%', padding: '20px 0' }}>
                //         <div style={{ borderBottom: '1px solid #eee' }}>

                //         </div>
                //         <p style={{ fontSize: '1.1em' }}>
                //             Hi {purchasedRaffle[0]?.userID?.firstname} {purchasedRaffle[0]?.userID?.lastname},
                //         </p>
                //         <p>Thank you for purchasing Tickets in Raffly.</p>
                //         {raffleData?.map((raffleItem: any) => (
                //             <div key={raffleItem._id} style={{ background: 'white', border: '#00466a', margin: '0 auto', width: 'max-content', padding: '0 10px', color: '#000', borderRadius: '4px' }}>
                //                 <h3 style={{ marginTop: '30px' }}>{raffleItem.raffle_name}</h3>
                //                 <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
                //                     <thead>
                //                         <tr>
                //                             <th style={{ border: '2px solid #00466a', color: 'black' }}>SI. No</th>
                //                             <th style={{ border: '2px solid #00466a', color: 'black' }}>Raffle Name</th>
                //                             <th style={{ border: '2px solid #00466a', color: 'black' }}>TicketID</th>
                //                             <th style={{ border: '2px solid #00466a', color: 'black' }}>Qty</th>
                //                             <th style={{ border: '2px solid #00466a', color: 'black' }}>Price</th>
                //                             {/* <th style={{ border: '2px solid #00466a', color: 'black' }}>Instant Win</th> */}
                //                         </tr>
                //                     </thead>
                //                     <tbody>
                //                         {result.map((item: any, index: any) => (
                //                             raffleItem._id?.toString() === item.raffleID?.toString() && (
                //                                 <tr key={item._id}>
                //                                     <td style={{ border: '1px solid #00466a', padding: '8px', color: 'black' }}>{index + 1}</td>
                //                                     <td style={{ border: '1px solid #00466a', padding: '8px', color: 'black' }}>{raffleItem?.raffle_name}</td>
                //                                     <td style={{ border: '1px solid #00466a', padding: '8px', color: 'black' }}>{item?.ticketID}</td>
                //                                     <td style={{ border: '1px solid #00466a', padding: '8px', color: 'black' }}>{item?.quantity}</td>
                //                                     <td style={{ border: '1px solid #00466a', padding: '8px', color: 'black' }}>{raffleItem?.ticket_price}</td>
                //                                 </tr>
                //                             )
                //                         ))}
                //                         <tr>
                //                             <td colSpan={3} style={{ border: '1px solid #00466a', padding: '8px', color: 'black' }}>Total:</td>
                //                             <td style={{ border: '1px solid #00466a', padding: '8px', color: 'black' }}>{result.filter((item: any) => item?.raffleID === raffleItem?._id?.toString())?.reduce((total: any, item: any) => total + item.quantity, 0)}</td>
                //                             <td style={{ border: '1px solid #00466a', padding: '8px', color: 'black' }}>{result.filter((item: any) => item?.raffleID === raffleItem?._id?.toString())?.reduce((total: any, item: any) => total + item.quantity * raffleItem.ticket_price, 0)}</td>
                //                         </tr>
                //                     </tbody>
                //                 </table>
                //             </div>
                //         ))}
                //         <div style={{ position: 'relative', marginTop: '10px', marginLeft: '20px', marginBottom: '10px' }}>
                //             <h4>Overall Total Quantity: {getOverallTotalQuantity()}</h4>
                //             <h4>Overall Total Price: {getOverallTotalPrice()}</h4>
                //         </div>
                //         {hasInstantWin ? (
                //             <p className='text-xl font-bold text-center text-yellow-400 my-4'>Congratulations! You won an instant prize. Please wait for the main draw as well.</p>
                //         ) : (
                //             <p className='text-xl font-bold text-center text-yellow-400 my-4'>Don't worry, please wait for the main draw.</p>
                //         )}
                //         <p style={{ fontSize: '0.9em' }}>Regards,<br />Raffly</p>
                //         <hr style={{ border: 'none', borderTop: '1px solid #eee' }} />
                //         <div style={{ float: 'right', padding: '8px 0', color: '#aaa', fontSize: '0.8em', lineHeight: 1, fontWeight: 300 }}>
                //             <p>Raffly Inc</p>
                //         </div>
                //     </div>
                // </div>
            }

        </>
    )
}

export default UserPayment
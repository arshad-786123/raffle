import React, { useEffect, useState } from 'react'
import IkeaBack from '../../assets/owner/ikea_back.png'
import Ikea from '../../assets/homepage/featured/ikea.png'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { getSpecificRaffle } from '../../Services/Owner/getSpecificRaffle'
import { IRaffle } from '../../Utils/Interface/raffle.interface'
import { useSelector } from 'react-redux'
import { CONSTANT_DATA } from '../../constants'
import { initialFormData } from './Create'
import { Props } from 'react-confetti'
import moment from 'moment'
import noimage from '../../assets/no-image.png'

const Details = (props: Props) => {

    const navigate = useNavigate()
    const { state, pathname } = useLocation()
    const [raffleData, setRaffleData] = useState<IRaffle>(initialFormData)
    const userData = useSelector((state: any) => state.reducer.user)
    const handleNavigate = () => {
        navigate("/owner")
    }
    const formattedDate = moment(raffleData.time_set_prize).format('DD MMM, YYYY');
    const remainingTickets = parseFloat(raffleData.ticket_set_prize) - raffleData?.totalPurchasedTicket;
    const ticket_set_prize = parseFloat(raffleData.ticket_set_prize);
    const totalPurchasedTicket = raffleData.totalPurchasedTicket;
    // const remainingTickets = ticket_set_prize - totalPurchasedTicket;

    // Calculate percentage
    const soldTicketPercentage = Math.min((totalPurchasedTicket / ticket_set_prize) * 100, 100);

    useEffect(() => {
        getUserType()
    }, [])

    type MediaItem = {
        data: string | null;
        index: number | null;
    };

    const [selectedImage, setSelectedImage] = useState<MediaItem>({ data: null, index: null });
    const [selectedVideo, setSelectedVideo] = useState<MediaItem>({ data: null, index: null });
    const getUserType = async () => {

        const getID = window.location.pathname
        const ID = (getID.split("/")[getID.split("/")?.length - 1]);

        const type = await getSpecificRaffle(ID)

        if (!type.success) {
            navigate("/")
        } else {
            setSelectedImage({ data: type.result?.images[0], index: 0 })
            setSelectedVideo({ data: type.result?.videos[0], index: 0 })
            setRaffleData(type.result)
        }

    }

    const data = [1, 2, 3, 4, 5, 6, 7, 12, 213, 32]

    const handleSelectedImage = (item: string, index: number) => {
        setSelectedImage({ data: item, index });
        setSelectedVideo({ data: null, index: null });
    };

    const handleSelectedVideos = (item: string, index: number) => {
        setSelectedVideo({ data: item, index });
        setSelectedImage({ data: null, index: null });
    };
    console.log("raffleData", raffleData);

    return (
        <div className={`bg-[#F9F0F0] footer-manage h-fit ${data.length > 4 ? "lg:fit pb-12" : "lg:h-[100vh]"} `}>
            <div className='pt-16 m-auto w-[80%]'>
                <div onClick={handleNavigate} className='hidden lg:block cursor-pointer lg:flex items-center gap-2 text-[13px]'>
                    <svg width="18" height="13" viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M0.686523 6.50472C0.686523 6.36287 0.744961 6.2274 0.842178 6.1254L6.10102 0.813434C6.30874 0.60359 6.64502 0.604121 6.85221 0.813434C7.05993 1.02275 7.05993 1.36275 6.85221 1.57206L2.49968 5.96815H17.1553C17.4485 5.96815 17.6865 6.20828 17.6865 6.50472C17.6865 6.80115 17.4485 7.04128 17.1553 7.04128H2.50021L6.85221 11.4374C7.05993 11.6467 7.0594 11.9867 6.85221 12.196C6.64449 12.4053 6.30821 12.4053 6.10102 12.196L0.842178 6.88403C0.742836 6.78362 0.688118 6.6455 0.686523 6.50472Z" fill="black" />
                    </svg>
                    <p>Back to dashboard</p>
                </div>
                <br />
                <div>
                    <div>
                        <h1 className='text-[16px] lg:text-[20] font-[700]'>{raffleData.raffle_name}</h1>
                        <div className='flex items-center justify-between '>
                            <div className='flex w-[100%] lg:w-fit justify-between gap-6 mt-2'>
                                <div className='flex items-center gap-2'>
                                    <p className='font-bold text-sm lg:text-md'>Website: </p>
                                    {/* <p className='text-[#F66E6A] font-[600] underline text-xs lg:text-md'>{raffleData?.websites}</p> */}
                                    <a
                                        href={raffleData?.websites.startsWith('http') ? raffleData?.websites : `http://${raffleData?.websites}`}
                                        target='_blank'
                                        rel='noopener noreferrer'
                                        className='text-[#F66E6A] font-[600] underline text-xs lg:text-md'
                                    >
                                        {raffleData?.websites}
                                    </a>
                                </div>
                            </div>
                            <div className='hidden lg:block lg:flex gap-2 items-end'>
                                <div className='flex gap-2 items-end'>
                                    <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M20.3594 14.66V20C20.3594 20.5304 20.1487 21.0391 19.7736 21.4142C19.3985 21.7893 18.8898 22 18.3594 22H4.35938C3.82894 22 3.32023 21.7893 2.94516 21.4142C2.57009 21.0391 2.35938 20.5304 2.35938 20V6C2.35938 5.46957 2.57009 4.96086 2.94516 4.58579C3.32023 4.21071 3.82894 4 4.35938 4H9.69938" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M18.3594 2L22.3594 6L12.3594 16H8.35938V12L18.3594 2Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                    <p className='font-medium'>Edit</p>
                                </div>
                                <div className='flex gap-2 items-end'>
                                    <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4.34961 12V20C4.34961 20.5304 4.56032 21.0391 4.9354 21.4142C5.31047 21.7893 5.81918 22 6.34961 22H18.3496C18.88 22 19.3887 21.7893 19.7638 21.4142C20.1389 21.0391 20.3496 20.5304 20.3496 20V12" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M16.3496 6L12.3496 2L8.34961 6" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M12.3496 2V15" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                    <p className='font-medium'>Share</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='block lg:flex gap-5 justify-between mt-8 mb-20 lg:mb-0'>
                    <div className='block lg:flex gap-5'>
                        <div >
                            <div className='responsive-container1'>
                                {selectedImage.data ? (
                                    <img
                                        className='responsive-content'
                                        src={selectedImage.data ? CONSTANT_DATA.IMAGE_BASE_URL + selectedImage.data : noimage}
                                        alt="ikea"
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement;
                                            console.log('Image failed to load:', target.src);
                                            target.onerror = null;
                                            target.src = noimage;
                                            console.log('Set fallback image:', noimage);
                                        }}
                                        onLoad={() => console.log('Image loaded successfully')}
                                    />
                                ) : (
                                    <video
                                        className='responsive-content'
                                        src={CONSTANT_DATA.IMAGE_BASE_URL + selectedVideo.data}
                                        controls
                                        autoPlay
                                    />
                                )}
                            </div>

                            <div className='mt-4  grid grid-cols-3 lg:grid-cols-5 gap-6'>
                                {raffleData?.images?.map((item, i) => (
                                    <img
                                        key={`image-${i}`}
                                        onClick={() => { handleSelectedImage(item, i) }}
                                        className={`w-[100px] h-[70px] rounded-lg cursor-pointer border-black ${selectedImage.index === i && "border-2 p-1"}`}
                                        src={CONSTANT_DATA.IMAGE_BASE_URL + item}
                                        alt={raffleData?.raffle_name}
                                    />
                                ))}
                                {raffleData?.videos?.map((item, i) => (
                                    <video
                                        key={`video-${i}`}
                                        onClick={() => { handleSelectedVideos(item, i) }}
                                        className={`w-[100px] h-[70px] rounded-lg cursor-pointer border-black ${selectedVideo.index === i && "border-2 p-1"}`}
                                        src={CONSTANT_DATA.IMAGE_BASE_URL + item}
                                        title={raffleData?.raffle_name}
                                        muted
                                    />
                                ))}
                            </div>
                        </div>
                        <div className='w-[100%] lg:w-[70%]'>
                            <div className='hidden lg:block flex items-center gap-2'>
                                <img src={Ikea} alt="ikea" />
                                <p className='font-bold'>{userData.user.firstname}</p>
                            </div>
                            <div className='block lg:hidden flex justify-between items-center'>
                                <div className=' flex items-center gap-2'>
                                    <img src={Ikea} alt="ikea" />
                                    <p className='font-bold'>{userData.user.firstname}</p>
                                </div>
                                <div className=' flex gap-4 items-end'>
                                    <div className='flex gap-2 items-end'>
                                        <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M20.3594 14.66V20C20.3594 20.5304 20.1487 21.0391 19.7736 21.4142C19.3985 21.7893 18.8898 22 18.3594 22H4.35938C3.82894 22 3.32023 21.7893 2.94516 21.4142C2.57009 21.0391 2.35938 20.5304 2.35938 20V6C2.35938 5.46957 2.57009 4.96086 2.94516 4.58579C3.32023 4.21071 3.82894 4 4.35938 4H9.69938" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M18.3594 2L22.3594 6L12.3594 16H8.35938V12L18.3594 2Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                        <p className='font-medium underline'>Edit</p>
                                    </div>
                                    <div className='flex gap-2 items-end'>
                                        <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M4.34961 12V20C4.34961 20.5304 4.56032 21.0391 4.9354 21.4142C5.31047 21.7893 5.81918 22 6.34961 22H18.3496C18.88 22 19.3887 21.7893 19.7638 21.4142C20.1389 21.0391 20.3496 20.5304 20.3496 20V12" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M16.3496 6L12.3496 2L8.34961 6" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M12.3496 2V15" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                        <p className='font-medium underline'>Share</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h3 className='font-bold tracking-wide mt-4 lg:mt-0'>About this Raffle</h3>
                                <p className='font-medium text-md mt-4 lg:mt-0'>{raffleData.raffle_description}</p>
                            </div>
                        </div>
                    </div>
                    <div className='w-[100%] lg:w-[300px]'>
                        <br />
                        <div className='p-4 border-[#FF6A78] border-2 bg-white rounded-md w-[100%] lg:w-[300px]'>
                            <div className='flex items-center justify-between'>
                                {/* <p className='font-bold tracking-wide'>£{(Number(raffleData.ticket_price) * Math.round(state.sold))}</p> */}
                                <div className='flex gap-2 items-center'>
                                    <p className='text-[#FFBA01] font-bold'>  {raffleData.raffle_type == "TIME" ? `Ends When ${formattedDate}` : `Ends When ${remainingTickets} Ticket Sold`
                                    }</p>
                                </div>
                            </div>
                            <div className='mt-4'>
                                {/* <h3 className='font-bold'>£20k Valentines Day Instant Win!</h3> */}
                                <div className='mt-2'>
                                    <p>
                                        {raffleData.raffle_type == "TICKET" && soldTicketPercentage.toFixed(0) + "%" + " " + "Tickets sold"}
                                    </p>
                                    <div className='w-[95%] bg-[#D9D9D9] h-2 rounded-xl '>
                                        {
                                            raffleData.raffle_type == "TIME" &&
                                            <div className='bg-[#FF6A78]  h-2 rounded-xl' style={{ width: 50 + "%", maxWidth: '100%' }}></div>
                                        }
                                        {
                                            raffleData.raffle_type == "TICKET" &&
                                            <div className='bg-[#FF6A78]  h-2 rounded-xl' style={{ width: soldTicketPercentage + "%", maxWidth: '100%' }}></div>
                                        }
                                    </div>
                                </div>
                                <div className='flex mt-4 justify-between'>
                                    <p className='text-[#FFBA01] font-bold'></p>
                                    <div>
                                        {/* <p className='text-sm'>Cash Alternative: £{raffleData?.ticket_price}</p> */}

                                        <p className='text-sm'>Number of Prizes: {raffleData?.main_prizes?.length}</p>
                                    </div>
                                </div>
                                {/* {console.log(raffleData.revenue_set_prize, raffleData., 'state.sold')} */}
                            </div>

                            <div className='mt-6 flex items-end justify-between text-white'>
                                <button className='bg-[#FF6A78] py-3 px-16 rounded-lg text-lg font-medium tracking-wide w-full'>Enter Now</button>
                            </div>

                            <div className='mt-4'>
                                <div className='flex mt-4 justify-between'>
                                    <p className='text-[#FF6A78] ' style={{ cursor: "pointer" }}>Terms and conditions </p>
                                    <div>
                                        <p className='text-sm' style={{ cursor: "pointer" }}>Postal Entry</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    raffleData?.main_prizes.length > 0 && (

                        <div>
                            <div className='bg-[#F9F0F0] mt-0 lg:mt-10 '>
                                <h1 className='text-[16px] lg:text-[20] font-[700]'>Winners</h1>

                                <div className='w-[100%] bg-white overflow-x-scroll mt-4 p-1 lg:p-10 border-[#FF6A78] border-2 rounded-md'>
                                    <table className='w-[100%] '>
                                        <thead className='border-b-2'>
                                            <th className='text-[8px] lg:text-[16px] font-normal p-4'>Index</th>
                                            <th className='text-[8px] lg:text-[16px] font-normal p-4'>Ticket</th>
                                            <th className='text-[8px] lg:text-[16px] font-normal p-4'>Prize</th>
                                            <th className='text-[8px] lg:text-[16px] font-normal p-4'>Winner Name</th>

                                        </thead>

                                        <tbody className='mt-2'>
                                            {raffleData.main_prizes && raffleData.main_prizes.map((prize, index) => (
                                                <tr key={index}>
                                                    <td className='text-[8px] lg:text-[16px] text-center pt-3'>{index + 1}</td>
                                                    <td className='text-[8px] lg:text-[16px] text-center pt-3'>{prize?.prize_name}</td>
                                                    <td className='text-[8px] lg:text-[16px] text-center pt-3'>£{prize?.prize_value}</td>
                                                    <td className='text-[8px] lg:text-[16px] text-center pt-3'>{prize?.firstname}{" "} {prize?.lastname}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Details
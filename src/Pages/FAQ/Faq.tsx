import React, { useState } from 'react'
import faq from '../../assets/faq.png'
import faqMobile from '../../assets/faq_mobile.png'
import { Accordion } from 'flowbite-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setFAQValue } from '../../Services/Authentication/setFAQValue'

const Faq = () => {

    const userData = useSelector((state:any)=>state.reducer.user)
    const navigate = useNavigate()

    const [data, setData] = useState([
        {
            title: "Lorem ipsum dolor sit amet, consectetur adipiscing eli?",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
            isActive: false
        },
        {
            title: "Lorem ipsum dolor sit amet, consectetur adipiscing eli?",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
            isActive: false
        },
        {
            title: "Lorem ipsum dolor sit amet, consectetur adipiscing eli?",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
            isActive: false
        },
        {
            title: "Lorem ipsum dolor sit amet, consectetur adipiscing eli?",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
            isActive: false
        },
        {
            title: "Lorem ipsum dolor sit amet, consectetur adipiscing eli?",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
            isActive: false
        },
        {
            title: "Lorem ipsum dolor sit amet, consectetur adipiscing eli?",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
            isActive: false
        },
    ])


    const handleExpand = (i: Number) => {
        setData((prev) => {
            return prev.map((item, index) => {
                if (i == index) {
                    return {
                        title: item.title,
                        description: item.description,
                        isActive: !item.isActive
                    }
                } else {
                    return { ...item }
                }
            })
        })
    }

    const handleNavigate = async ()=>{

        await setFAQValue()
        if(userData.user.role==="Business"){
            window.location.href = "/owner"
        }else{
            window.location.href = "/user"
        }
    }

    return (
        <div>
            <div className='relative'>
                <img className='hidden sm:block w-[100%]' src={faq} alt="faq" />
                <img className='block sm:hidden w-[100%] h-96' src={faqMobile} alt="faq" />
                <div className='absolute top-[45%] md:top-[20%]  lg:top-[50%]  w-[70%] sm:w-[40%] lg:w-[35%] left-14 lg:left-[15%]'>
                    <h4 className='text-xl lg:text-2xl font-medium text-white '>Here's how to run a raffle and to get live.</h4>
                    <button onClick={handleNavigate} className='outline-none border-none bg-black text-white text-xs lg:text-sm py-3 px-6 rounded-md mt-3'>Go to my Dashboard</button>
                </div>
                <div className='absolute top-[70%] left-[10%]'>
                    <svg width="54" height="160" viewBox="0 0 54 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M38.5777 153.847C41.6604 155.598 44.9449 157.361 48.0991 158.965C50.6519 160.403 53.9366 157.685 52.8938 154.879C52.4244 153.464 51.9244 152.058 51.4411 150.647C49.9729 146.543 48.3394 142.288 46.6102 138.279C44.2474 132.822 41.6732 127.364 38.5308 122.292C38.4247 122.122 38.1221 122.242 38.1958 122.452L40.9224 130.863C42.6319 136.02 46.8364 148.678 48.5936 153.97C32.7823 137.723 20.2863 118.305 12.643 96.9471C3.70149 72.0304 1.57535 44.7886 6.14065 18.7312C6.89219 14.3161 7.86414 9.94877 8.91222 5.58561C9.05842 4.21808 10.7391 -0.555881 9.75806 0.178752C-11.0711 53.4783 4.59211 118.068 48.593 154.97C43.5615 152.455 31.4968 146.41 26.6157 143.973L18.8568 140.156C18.8161 140.138 18.7701 140.134 18.7271 140.147C18.6841 140.159 18.6469 140.186 18.6221 140.223C18.5974 140.261 18.5867 140.305 18.592 140.35C18.5972 140.394 18.6182 140.435 18.651 140.466C24.8174 145.587 31.6555 149.853 38.5777 153.847Z" fill="black" />
                    </svg>
                </div>
            </div>
            <div className='w-[90%] m-auto mt-12'>
                <div className='grid lg:flex grid-cols-1 m-auto items-start gap-6 '>
                    <div className='w-[80%] lg:w-[30%]'>
                        <h2 className='bg-[#F4F4F4] w-fit p-4 rounded-3xl m-none font-bold'>1</h2>
                        <h4 className='font-bold  tracking-wide text-md'>List your raffle</h4>
                        <p className='text-sm'>You only pay once your raffle closes as a final vlaue</p>
                    </div>
                    <div className='w-[80%] lg:w-[30%]'>
                        <h2 className='bg-[#F4F4F4] w-fit p-4 rounded-3xl font-bold'>2</h2>
                        <h4 className='font-bold  tracking-wide text-md'>Sell simply</h4>
                        <p className='text-sm'>We'll advise the best photo and description and help you get the biggest exposure to it</p>
                    </div>
                    <div className='w-[80%] lg:w-[40%]'>
                        <h2 className='bg-[#F4F4F4] w-fit p-4 rounded-3xl font-bold'>3</h2>
                        <h4 className='font-bold  tracking-wide text-md'>Rewards and protection</h4>
                        <p className='text-sm'>Not only are you protected by our terms and policy but you get more than just the revenue from your sale You'll get the data from all the people who are interested in your products to download.</p>
                    </div>
                </div>
                <h4 className='font-bold text-lg mt-12 mb-4'>Create a great listing</h4>
                <div className=' grid grid-cols-1 lg:grid-cols-3 gap-4'>
                    <div className='bg-[#F66E6A] bg-opacity-20 p-5 rounded-md'>
                        <h3 className='font-bold'>Write a standout title </h3>
                        <p className='mt-4 text-sm font-medium'>We’ll recommend search terms that buyers often use, so be sure to add these in the title to help your listing stand out. Avoid all caps and focus on specific details like brand, model, size and colour.</p>
                    </div>
                    <div className='bg-[#0052B4] bg-opacity-20 p-5 rounded-md'>
                        <h3 className='font-bold'>Take high-quality photos </h3>
                        <p className='mt-4 text-sm font-medium'>
                            Snap your items from multiple angles in a well-lit place, and capture any blemishes for transparency. On the eBay app, you can clean up your images and add a white background.</p>
                    </div>
                    <div className='bg-[#FFBA01] bg-opacity-20 p-5 rounded-md'>
                        <h3 className='font-bold'>Pick a purchase format</h3>
                        <p className='mt-4 text-sm font-medium'>
                            If you want to sell your item quickly, Buy it now is probably the best format for you. Otherwise, if you want buyers to compete.</p>
                    </div>
                </div>
                <div className='mt-12'>
                    <div className='grid lg:flex items-center justify-between'>
                        <h4 className='font-bold text-lg'>FAQ</h4>
                        <div className='grid lg:flex items-center gap-2'>
                            <p className='text-sm font-medium'>Question not answered?</p>
                            <button className='bg-[#F66E6A] text-white py-2 px-6 rounded-md'>Ask a Question</button>
                        </div>
                    </div>
                    <div >
                        {
                            data.map((item, i) => (
                                <div className='transition-all ease-in-out duration-500 bg-[#ECECEC] p-4 rounded-lg mt-4'>
                                    <div onClick={() => handleExpand(i)} className='transition-all ease-in-out duration-500  flex items-center justify-between cursor-pointer'>
                                        <h3 className='font-medium tracking-wide text-sm'>{item.title}</h3>
                                        <svg className={`${item.isActive ? "rotate-180 transition-all duration-300" : "rotate-0 transition-all duration-300"}`} width="16" height="13" viewBox="0 0 22 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M2.32332 0.00274649L0.183837 2.13562L10.7492 12.6812L21.3145 2.13562L19.175 0.00274575L10.7492 8.40879L2.32332 0.00274649Z" fill="black" />
                                        </svg>
                                    </div>
                                    <div className='transition-all ease-in-out duration-500 '>
                                        {
                                            item.isActive &&
                                            <p className='transition-all ease-in-out duration-500  text-sm mt-4'>{item.description}</p>
                                        }
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Faq
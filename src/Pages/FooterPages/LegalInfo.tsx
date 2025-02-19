import React, { useState } from 'react'
import faq from '../../assets/faq.png'
import faqMobile from '../../assets/faq_mobile.png'
import { Accordion } from 'flowbite-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setFAQValue } from '../../Services/Authentication/setFAQValue'

const LegalInfo = () => {

    const userData = useSelector((state: any) => state.reducer.user)
    const navigate = useNavigate()

    const [data, setData] = useState([
        {
            title: "How do I enter the competition?",
            description: `First, ensure you have opened and account on our website. First, ensure you have opened and account on our website. Then choose the competition you wish to enter. <br /> Complete and submit the online entry form or follow the instructions on how to enter for free.  <br /> When you have paid your entry fee, you will be told if you have answered the question correctly. If you have, your name will be entered in the draw with all of the other correct entries. If you have not answered correctly, you will not be entered into the draw.
 <br /> You will also receive an email confirming whether your answer is right or wrong and confirming if you have been entered into the draw.
 <br /> Anyone entering for free will not be told whether they have answered the question correctly and will not receive confirmation that they are entered into the draw.
 <br /> However, an entry list is published and therefore all entrants should check this to ensure they have been entered into the draw for the competition they have entered. 

 `,
            isActive: false
        },
        {
            title: "How will I know if I have won?",
            description: "We will notify the winner via telephone or email within [7] days of the closing date of the competition. If you change any of your contact details prior to the closing date, you must inform us. We will try to contact you using the information you have supplied us with. If we cannot reach you within [14] days of the closing date we reserve the right to choose another winner and you will lose your right to claim the prize.",
            isActive: false
        },
        {
            title: "How long is the competition open for?",
            description: "The opening and closing date of the competitions are stated on the website. If we have to change either of these dates for any reason, we will update the website accordingly. We will only change the dates if we have to for reasons outside of our control.",
            isActive: false
        },
        {
            title: "Can anyone enter the competition?",
            description: "The competition is open to residents of the United Kingdom only who are 18 years or older.  <br /> We do not except entries from anyone outside of these areas as the laws for running competitions vary. This competition has been organised to comply with the laws of England, and Wales. <br /> Also, you cannot enter this competition if you are a relative of any of our suppliers.",
            isActive: false
        },
        {
            title: "What are the prizes?",
            description: "The prizes are described fully on the website. You can find out more details by clicking here [www.raffily.com/terms-conditions]. <br /> We reserve the right to offer an alternative prize of an equal or higher value if the prize is unavailable for any reason.",
            isActive: false
        },
        {
            title: "Can I sell the prize if I don’t want it?",
            description: "If you are the winner, the prize will be yours. You can do what ever you wish with it, including selling it.",
            isActive: false
        },
        {
            title: "How do you use my personal data?",
            description: "We need to use your data to administer the competition and award prizes. We do not use your data for any other purpose. <br /> We do not share your data with any third parties unless this is necessary for administering the competition. <br /> Full details of how we use your data are included in our Privacy Policy which you can read here www.raffily.com-privacy-policy <br /> If you are the winner, we may have to share your details with the Advertising Standards Authority to confirm that we have administered the competition and awarded the prizes fairly. <br/> You have the right to opt out from us using your data at any time. However, if you do ask us to remove your details from our database prior to the closing date, you will be withdrawing from the competition. You will not be entitled to a refund of any entry fees you have paid.",
            isActive: false
        },
        {
            title: "If I win, do I have to participate in promotional exercises?",
            description: "No, this is not compulsory. However, with your permission, we would love to share your excitement on our website and social media pages. <br /> Even if you do not want to participate in any promotional exercises, we may have may have to provide your details to the Advertising Standards Authority to prove we have administered the competition and awarded the prize fairly.",
            isActive: false
        },
        {
            title: "What happens if I get the question wrong?",
            description: "Whilst this may be disappointing, you have to remember that this is a competition and we have deliberately made the question tough to comply with the law. www.raffily.com/terms-conditions <br /> If you get the question wrong, you will not be entered into the draw so you will not have the chance to win the prize. You will not be entitled to a refund of your entry fees. If you want to, you can try again",
            isActive: false
        },
        {
            title: "Can I try again?",
            description: "You can enter the competition as many times as you wish up to any limit we specify. Your entries may be restricted if we reach the maximum number of entries. <br /> Whilst this isn’t gambling, we still urge you to keep this fun and not spend more than you can afford",
            isActive: false
        },
        {
            title: "How is the winner decided?",
            description: "Everyone who gets the answer to the question correct will be entered into a draw. The winner will then be chosen at random from all the correct entries.",
            isActive: false
        },
        {
            title: "What are my chances of winning?",
            description: "The maximum number of entries is stated on each competition so your chances of winning will vary from competition to competition. As an example, if entries are capped at a maximum of 3000, this means that if you purchase 1 entry and get the answer correct, your chances of winning will be no worse than 1 in 3,000.  <br /> You can increase your chances of winning by purchasing more entries. For example, if you purchase 10 entries in the example above and you get the answer correct, your chances of winning will be no worse than 1 in 300. <br /> We say “no worse than” because we expect a significant number of people to get the answer to the question wrong. We cannot predict how many this will be but say 500 people got the answer wrong and they each purchased 1 entry each. Your chances of winning with a single correct entry will now improve to 1 in 2,500.",
            isActive: false
        },
        {
            title: "Why is the question so hard?",
            description: "This is not a lottery or a free prize draw. It is a prize competition and the law says that to be in with a chance of winning, you must demonstrate your skill, knowledge or judgement. <br /> The law says that the question should be sufficiently difficult that a significant number of people either get the answer wrong or are put off entering. However, this means that the odds of winning are actually increased for those who get the answer correct.",
            isActive: false
        },
        {
            title: "I haven’t received an email confirming whether I am right or wrong.",
            description: "If you haven’t received an email from us confirming your entry and whether you got the question right or wrong, please check your spam folder. If it is not in there, please email us at complaints@raffily.com",
            isActive: false
        },
        {
            title: "Can I get a refund of my entry fee?",
            description: "We do not offer refunds of entry fees if you get the answer to the question wrong, or if you are disqualified from the competition for any reason. ",
            isActive: false
        },
        {
            title: "My question hasn’t been answered here",
            description: "If you have any questions that have not been answered here, please email us at complaints@raffily.com and we will happily answer them for you.",
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

    const handleNavigate = async () => {

        await setFAQValue()
        if (userData.user.role === "Business") {
            window.location.href = "/owner"
        } else {
            window.location.href = "/user"
        }
    }

    return (
        <div>

            <div className='w-[90%] m-auto mt-12'>


                <div className='mt-12'>
                    <div className='grid lg:flex items-center justify-between'>
                        <h2 className='font-bold ' style={{ fontSize: "26px" }} >FAQ</h2>

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
                                            <p
                                                className='transition-all ease-in-out duration-500 text-sm mt-4'
                                                dangerouslySetInnerHTML={{ __html: item.description.replace(/\n/g, '<br />') }}
                                            ></p>
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

export default LegalInfo
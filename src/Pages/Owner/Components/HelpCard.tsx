
import idea from '../../../assets/idea.png'

const HelpCard = () => {
    return (
        <div className='bg-[#F9F0F0] mt-4 p-4 rounded-md'>

            <div className='flex items-center gap-2'>
                <img src={idea} alt="idea" />
                <h3 className='text-lg font-medium'>Help</h3>
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4'>
                <div className='cursor-pointer pb-2 flex items-center justify-between border-b-[1px] border-black'>
                    <p>How to start a raffle?</p>
                    <svg width="18" height="13" viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M17.1021 6.29768C17.1021 6.15584 17.0436 6.02037 16.9464 5.91837L11.6876 0.606402C11.4798 0.396559 11.1435 0.39709 10.9364 0.606402C10.7286 0.815715 10.7286 1.15571 10.9364 1.36503L15.2889 5.76112H0.633301C0.340051 5.76112 0.102051 6.00125 0.102051 6.29768C0.102051 6.59412 0.340051 6.83425 0.633301 6.83425H15.2884L10.9364 11.2303C10.7286 11.4397 10.7292 11.7797 10.9364 11.989C11.1441 12.1983 11.4804 12.1983 11.6876 11.989L16.9464 6.677C17.0457 6.57659 17.1005 6.43847 17.1021 6.29768Z" fill="#FF6A78" />
                    </svg>
                </div>
                <div className=' cursor-pointer pb-2 flex items-center justify-between border-b-[1px] border-black'>
                    <p>How to check my account?</p>
                    <svg width="18" height="13" viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M17.1021 6.29768C17.1021 6.15584 17.0436 6.02037 16.9464 5.91837L11.6876 0.606402C11.4798 0.396559 11.1435 0.39709 10.9364 0.606402C10.7286 0.815715 10.7286 1.15571 10.9364 1.36503L15.2889 5.76112H0.633301C0.340051 5.76112 0.102051 6.00125 0.102051 6.29768C0.102051 6.59412 0.340051 6.83425 0.633301 6.83425H15.2884L10.9364 11.2303C10.7286 11.4397 10.7292 11.7797 10.9364 11.989C11.1441 12.1983 11.4804 12.1983 11.6876 11.989L16.9464 6.677C17.0457 6.57659 17.1005 6.43847 17.1021 6.29768Z" fill="#FF6A78" />
                    </svg>
                </div>
                <div className='cursor-pointer pb-2 flex items-center justify-between border-b-[1px] border-black'>
                    <p>How to duplicate a raffle</p>
                    <svg width="18" height="13" viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M17.1021 6.29768C17.1021 6.15584 17.0436 6.02037 16.9464 5.91837L11.6876 0.606402C11.4798 0.396559 11.1435 0.39709 10.9364 0.606402C10.7286 0.815715 10.7286 1.15571 10.9364 1.36503L15.2889 5.76112H0.633301C0.340051 5.76112 0.102051 6.00125 0.102051 6.29768C0.102051 6.59412 0.340051 6.83425 0.633301 6.83425H15.2884L10.9364 11.2303C10.7286 11.4397 10.7292 11.7797 10.9364 11.989C11.1441 12.1983 11.4804 12.1983 11.6876 11.989L16.9464 6.677C17.0457 6.57659 17.1005 6.43847 17.1021 6.29768Z" fill="#FF6A78" />
                    </svg>
                </div>
                <div className='cursor-pointer pb-2 flex items-center justify-between border-b-[1px] border-black'>
                    <p>How to delete account?</p>
                    <svg width="18" height="13" viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M17.1021 6.29768C17.1021 6.15584 17.0436 6.02037 16.9464 5.91837L11.6876 0.606402C11.4798 0.396559 11.1435 0.39709 10.9364 0.606402C10.7286 0.815715 10.7286 1.15571 10.9364 1.36503L15.2889 5.76112H0.633301C0.340051 5.76112 0.102051 6.00125 0.102051 6.29768C0.102051 6.59412 0.340051 6.83425 0.633301 6.83425H15.2884L10.9364 11.2303C10.7286 11.4397 10.7292 11.7797 10.9364 11.989C11.1441 12.1983 11.4804 12.1983 11.6876 11.989L16.9464 6.677C17.0457 6.57659 17.1005 6.43847 17.1021 6.29768Z" fill="#FF6A78" />
                    </svg>
                </div>
                <div className='cursor-pointer pb-2 flex items-center justify-between border-b-[1px] border-black'>
                    <p>How to Increase visibility?</p>
                    <svg width="18" height="13" viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M17.1021 6.29768C17.1021 6.15584 17.0436 6.02037 16.9464 5.91837L11.6876 0.606402C11.4798 0.396559 11.1435 0.39709 10.9364 0.606402C10.7286 0.815715 10.7286 1.15571 10.9364 1.36503L15.2889 5.76112H0.633301C0.340051 5.76112 0.102051 6.00125 0.102051 6.29768C0.102051 6.59412 0.340051 6.83425 0.633301 6.83425H15.2884L10.9364 11.2303C10.7286 11.4397 10.7292 11.7797 10.9364 11.989C11.1441 12.1983 11.4804 12.1983 11.6876 11.989L16.9464 6.677C17.0457 6.57659 17.1005 6.43847 17.1021 6.29768Z" fill="#FF6A78" />
                    </svg>
                </div>
                <div className='cursor-pointer pb-2 flex items-center justify-between border-b-[1px] border-black'>
                    <p>How to withdraw the Funds?</p>
                    <svg width="18" height="13" viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M17.1021 6.29768C17.1021 6.15584 17.0436 6.02037 16.9464 5.91837L11.6876 0.606402C11.4798 0.396559 11.1435 0.39709 10.9364 0.606402C10.7286 0.815715 10.7286 1.15571 10.9364 1.36503L15.2889 5.76112H0.633301C0.340051 5.76112 0.102051 6.00125 0.102051 6.29768C0.102051 6.59412 0.340051 6.83425 0.633301 6.83425H15.2884L10.9364 11.2303C10.7286 11.4397 10.7292 11.7797 10.9364 11.989C11.1441 12.1983 11.4804 12.1983 11.6876 11.989L16.9464 6.677C17.0457 6.57659 17.1005 6.43847 17.1021 6.29768Z" fill="#FF6A78" />
                    </svg>
                </div>
            </div>
        </div>
    )
}

export default HelpCard
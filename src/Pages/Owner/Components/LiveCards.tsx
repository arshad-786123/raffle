import RaffleCard from './RaffleCard'

// import RaffleCard from './../../Home/Components/RaffleCard';
import { useKeenSlider } from 'keen-slider/react'
import { IRaffle } from '../../../Utils/Interface/raffle.interface'

const LiveCards = ({ raffleData, raffleType }: any) => {

    const [ref2] = useKeenSlider<HTMLDivElement>({
        loop: true,
        mode: "free-snap",
        slides: {
            perView: 1,
            spacing: 15,
        }
    })

    return (
        <div className={`${raffleData?.length > 0 ? "h-fit" : "h-[400px]"} `}>
            {
                raffleData?.length > 0 ?
                    <div className='hidden lg:grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3  gap-4 w-[95%] mt-10 m-auto'>
                        {
                            raffleData?.map((item: IRaffle, i: number) => (
                                <RaffleCard item={item} i={i} raffleType={raffleType} />
                            ))
                        }
                    </div>

                    :
                    <h3 className='text-gray-500 h-56 text-center pt-12'>Start a Raffle!</h3>
            }
            <div className='block md:hidden lg:hidden xl:hidden w-[95%] m-auto'>
                <div ref={ref2} className=' keen-slider   mt-10 m-auto'>
                    {
                        raffleData?.map((item: any) => (
                            <RaffleCard item={item} raffleType={raffleType} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default LiveCards
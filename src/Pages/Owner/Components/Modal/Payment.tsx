import React, { useState } from 'react'
import { Modal } from 'flowbite-react';
import facebook from '../../../../assets/authentication/facebook.png'

const Boost = ({ isBoostModalOpen, setIsBoostModalOpen }: any) => {



    const onClose = (): void => {
        setIsBoostModalOpen(false);
    };


    return (
        <div>
            <Modal
                className='bg-[#160B3A]'
                dismissible
                position="center"
                show={isBoostModalOpen}
                onClose={onClose}
                popup
            >
                <div className='rounded-md'>
                    <Modal.Header className='bg-white  rounded-t-md' />
                    <Modal.Body className="bg-white text-secondary  h-full xs:h-auto rounded-b-md">


                        <div className='mt-0 flex items-center justify-center'>
                            <h3 className='text-center text-lg font-bold tracking-wider'>Increase sales with Facebook Ads</h3>
                            <img src={facebook} alt="facebook" className='-mt-2' />
                        </div>
                        <div className='w-[70%] m-auto relative'>
                            <div className='flex justify-between gap-8 mt-8'>
                                <button className='border-[1px] rounded-md py-2 px-8 text-lg font-bold text-[#F66E6A]'>
                                    £99
                                </button>
                                <button className='border-[1px] rounded-md py-2 px-8 text-lg font-bold text-[#F66E6A]'>
                                    £249
                                </button>
                                <button className='border-[1px] rounded-md py-2 px-8 text-lg font-bold text-[#F66E6A]'>
                                    £499
                                </button>
                            </div>
                            <div className='text-center bg-[#F66E6A] p-3 rounded-md flex items-center text-white gap-4 font-bold mt-4 cursor-pointer'>
                                <p className='text-center w-full text-xl font-medium tracking-wider'>Boost now</p>
                            </div>
                        </div>
                    </Modal.Body>
                </div>
            </Modal>
        </div>
    )
}

export default Boost
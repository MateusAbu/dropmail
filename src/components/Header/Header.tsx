import React from 'react'
import CopiarInput from '../TextCopy/TextCopy'
import GetSessionData from '../GetSessionData/GetSessionData'

const Header = () => {

    return (
        <div className='justify-start pt-5 pb-16 border-b w-full'>
            <div className='flex flex-col justify-center items-center'>
                <div className='justify-start'>
                    <h3 className='font-light text-sm'>Your temporary email address</h3>
                </div>
                <CopiarInput />
                <div className='pt-2'>
                    <GetSessionData />
                </div>
            </div>
        </div>
    )
}

export default Header
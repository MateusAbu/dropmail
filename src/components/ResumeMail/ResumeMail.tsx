import React from 'react'

interface MailProps {
    from: string
    subject: string
    text: string
    onClick: () => void
}

const ResumeMail = ({ from, subject, text, onClick }: MailProps) => {

    return (
        <div className='flex flex-col border pl-3 pb-1 cursor-pointer' onClick={onClick}>
            <div className='font-bold truncate'>{from}</div>
            <div className='text-sm text-blue-600 font-bold truncate'>{subject}</div>
            <div className='text-xs font-semibold text-gray-500 truncate'>{text}</div>
        </div>
    )
}

export default ResumeMail
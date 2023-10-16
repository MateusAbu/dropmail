import React from 'react'

interface MailProps {
    from: string
    subject: string
    text: string
}

const Mail = ({ from, subject, text }: MailProps) => {

    function formatTextWithLineBreaks(text: string) {
        const lines = text.split('\r\n')
        return lines.map((line: any, index: number) => <div className='email-text' key={index}>{line}</div>)
    }

    const formattedText = formatTextWithLineBreaks(text)

    return (
        <div className='h-full'>
            <div className='text-lg font-bold pl-5 pt-2'>{subject}</div>
            <div className='m-2 border bg-white max-h-full h-5/6'>
                <div className='text-md p-3'>{formattedText}</div>
            </div>
        </div>
    )
}

export default Mail
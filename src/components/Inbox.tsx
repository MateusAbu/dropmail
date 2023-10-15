import React, { useState } from 'react'
import ResumeMail from './ResumeMail'
import { useSelector } from 'react-redux'
import Mail from './Mail'

interface MailProps {
    from: string
    subject: string
    text: string
}

const Inbox = () => {
    const sessionData = useSelector((state: any) => state.session)
    const mails = sessionData.mails

    const [selectedMail, setSelectedMail] = useState<MailProps | null>(null)

    const handleMailClick = (from: string, subject: string, text: string) => {
        setSelectedMail({ from, subject, text })
    }

    return (
        <div className='w-full flex'>
            <div className='w-2/5 md:w-1/5'>
                <h3 className='pl-3 border-b py-2'>Inbox</h3>
                {mails.length > 0 ? (
                    mails.map((mail: any, i: number) => (
                        <div key={i}>
                            <ResumeMail
                                from={mail.fromAddr}
                                subject={mail.headerSubject}
                                text={mail.text}
                                onClick={() => handleMailClick(mail.fromAddr, mail.headerSubject, mail.text)}
                            />
                        </div>
                    ))
                ) : (
                    <div className='p-3'>No emails in inbox.</div>
                )}
            </div>
            <div className='w-3/5 md:w-4/5'>
                <div className='bg-gray-100 p-5 border-l'></div>
                <div className='bg-gray-100 border-gray-300 border-t border-l h-screen'>
                    {selectedMail && (
                        <div className='h-full'>
                            <Mail
                                from={selectedMail.from}
                                subject={selectedMail.subject}
                                text={selectedMail.text} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Inbox

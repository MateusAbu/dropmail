import React from 'react'
import { render, screen } from '@testing-library/react'
import ResumeMail from './ResumeMail'

describe('ResumeMail component', () => {
    const mockMail = {
        from: 'sender@example.com',
        subject: 'Test Subject',
        text: 'This is the email content.',
        onClick: jest.fn(),
    }

    test('renders correctly with mail information', () => {
        render(<ResumeMail {...mockMail} />)

        const fromElement = screen.getByText(mockMail.from)
        const subjectElement = screen.getByText(mockMail.subject)
        const textElement = screen.getByText(mockMail.text)

        expect(fromElement).toBeInTheDocument()
        expect(subjectElement).toBeInTheDocument()
        expect(textElement).toBeInTheDocument()
    })

})

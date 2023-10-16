import React from 'react'
import { render, screen } from '@testing-library/react'
import Mail from './Mail'

test('Renderiza o componente Mail', () => {
    const mailProps = {
        from: 'sender@example.com',
        subject: 'Assunto do Email',
        text: 'Texto do email.\r\nOutra linha.'
    }

    render(<Mail {...mailProps} />)

    const subjectElement = screen.getByText(mailProps.subject)
    const textLine1 = screen.getByText('Texto do email.')
    const textLine2 = screen.getByText('Outra linha.')

    expect(subjectElement).toBeInTheDocument()
    expect(textLine1).toBeInTheDocument()
    expect(textLine2).toBeInTheDocument()
})

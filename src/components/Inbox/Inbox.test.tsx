import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import Inbox from './Inbox'

const createMockStore = configureStore([])
const mockStore = createMockStore({
    session: {
        mails: [
            {
                fromAddr: 'sender@example.com',
                headerSubject: 'Assunto do Email 1',
                text: 'Texto do email 1.',
            },
            {
                fromAddr: 'sender2@example.com',
                headerSubject: 'Assunto do Email 2',
                text: 'Texto do email 2.',
            },
        ],
    },
})

test('Renderiza o componente Inbox com a lista de e-mails', () => {
    render(
        <Provider store={mockStore}>
            <Inbox />
        </Provider>
    )

    const inboxTitle = screen.getByText('Inbox')
    const email1 = screen.getByText('Assunto do Email 1')
    const email2 = screen.getByText('Assunto do Email 2')

    expect(inboxTitle).toBeInTheDocument()
    expect(email1).toBeInTheDocument()
    expect(email2).toBeInTheDocument()
})

test('Exibe o email selecionado após o clique', () => {
    render(
        <Provider store={mockStore}>
            <Inbox />
        </Provider>
    )

    const email1 = screen.getByText('Assunto do Email 1')

    fireEvent.click(email1)

    const selectedEmail = screen.getByText('Texto do email 1.', { selector: '.email-text' })
    expect(selectedEmail).toBeInTheDocument()
})

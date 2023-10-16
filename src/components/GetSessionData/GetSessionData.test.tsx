import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { MockedProvider } from '@apollo/client/testing'
import GetSessionData from './GetSessionData'
import { gql } from '@apollo/client'

const createMockStore = configureStore([])
const mockStore = createMockStore({
    user: {
        id: '123',
    },
})

const GET_SESSION_DATA = gql`
  query GetSessionData($id: String!) {
    session(id: $id) {
      mails {
        rawSize
        fromAddr
        toAddr
        downloadUrl
        text
        headerSubject
      }
    }
  }
`

const mocks = [
    {
        request: {
            query: GET_SESSION_DATA,
            variables: {
                id: '123',
            },
        },
        result: {
            data: {
                session: {
                    mails: [
                        {
                            rawSize: 100,
                            fromAddr: 'example@example.com',
                            toAddr: 'user@example.com',
                            downloadUrl: 'download-link',
                            text: 'Test email text',
                            headerSubject: 'Test Email Subject',
                        },
                    ],
                },
            },
        },
    },
]

test('Exibe os elementos esperados no GetSessionData', async () => {
    render(
        <Provider store={mockStore}>
            <MockedProvider mocks={mocks} addTypename={false}>
                <GetSessionData />
            </MockedProvider>
        </Provider>
    )

    await screen.findByText('AutoRefresh in')

    expect(screen.getByText('AutoRefresh in')).toBeInTheDocument()
    expect(screen.getByText('Refresh')).toBeInTheDocument()
    expect(screen.getByText('Allow Notifications')).toBeInTheDocument()

    fireEvent.click(screen.getByText('Refresh'))

})

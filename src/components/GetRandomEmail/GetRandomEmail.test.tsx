import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { MockedProvider } from '@apollo/client/testing'
import GetRandomEmail from './GetRandomEmail'
import { gql } from '@apollo/client'

const createMockStore = configureStore([])
const mockStore = createMockStore({})

const INTRODUCE_SESSION_MUTATION = gql`
  mutation {
    introduceSession {
      id
      expiresAt
      addresses {
        address
      }
    }
  }
`

const mocks = [
    {
        request: {
            query: INTRODUCE_SESSION_MUTATION,
        },
        result: {
            data: {
                introduceSession: {
                    id: 'testId',
                    expiresAt: '2023-12-31T23:59:59Z',
                    addresses: [{ address: 'test@example.com' }],
                },
            },
        },
    },
]

test('GetRandomEmail component test', async () => {
    render(
        <Provider store={mockStore}>
            <MockedProvider mocks={mocks} addTypename={false}>
                <GetRandomEmail />
            </MockedProvider>
        </Provider>
    )

    await new Promise((resolve) => setTimeout(resolve, 0))

})

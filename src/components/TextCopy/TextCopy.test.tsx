import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import toast, { Toaster } from 'react-hot-toast'
import CopiarInput from './TextCopy'
import configureStore from 'redux-mock-store'

jest.mock('@mui/icons-material/ContentCopy', () => {
    return () => <div data-testid="copy-icon" />
})

jest.mock('../GetRandomEmail/GetRandomEmail', () => {
    return () => <div data-testid="get-random-email" />
})

jest.mock('react-hot-toast', () => ({
    __esModule: true,
    default: {
        success: jest.fn(),
        error: jest.fn(),
    },
    Toaster: jest.fn(() => null),
}))

Object.assign(navigator, {
    clipboard: {
        writeText: jest.fn(),
    },
})

const mockStore = configureStore()
const initialState = {
    user: {
        email: 'test@test.com',
    },
}

describe('CopiarInput component', () => {
    test('renders correctly with the user email', () => {
        // Render the component with the mock store
        const store = mockStore(initialState)
        render(
            <Provider store={store}>
                <CopiarInput />
            </Provider>
        )

        expect(Toaster).toHaveBeenCalled()

        expect(screen.getByTestId('get-random-email')).toBeInTheDocument()

        expect(screen.getByRole('textbox')).toHaveValue('test@test.com')

        expect(screen.getByRole('button')).toContainElement(
            screen.getByTestId('copy-icon')
        )
    })

    test('copies the user email to clipboard and shows success toast when button is clicked', async () => {
        const store = mockStore(initialState)
        render(
            <Provider store={store}>
                <CopiarInput />
            </Provider>
        )

        navigator.clipboard.writeText = async (text) => {
        }

        fireEvent.click(screen.getByRole('button'))

        await waitFor(() => {
            expect(toast.success).toHaveBeenCalledWith('Email copiado com sucesso! test@test.com')
        })
    })
})

import React from 'react'
import { render, screen } from '@testing-library/react'
import CircleCountdown from './CircleCountdown'

test('Exibe o CircleCountdown corretamente', () => {
    const countdown = 10
    render(<CircleCountdown countdown={countdown} />)

    const circleCountdown = screen.getByTestId('circle-countdown')
    const countdownText = screen.getByTestId('countdown-text')

    expect(circleCountdown).toBeInTheDocument()
    expect(countdownText).toBeInTheDocument()

    expect(countdownText).toHaveTextContent('10')
})

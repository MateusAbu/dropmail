import React, { useEffect } from 'react'
import { gql, useMutation } from '@apollo/client'
import { useDispatch } from 'react-redux'
import { setUser } from '../redux/userSlice'

const GetRandomEmail = () => {
  const query = gql`
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
  const [mutateFunction] = useMutation(query)
  const dispatch = useDispatch()

  const handleMutation = async () => {
    try {
      const { data } = await mutateFunction()
      const email = data.introduceSession.addresses[0].address
      const expiresAt = data.introduceSession.expiresAt
      const id = data.introduceSession.id

      localStorage.setItem('email', email)
      localStorage.setItem('expiresAt', expiresAt)
      localStorage.setItem('id', id)

      dispatch(setUser({ email, expiresAt, id }))
    } catch (error) {
      console.error('Erro na Mutação:', error)
    }
  }

  useEffect(() => {
    const storedEmail = localStorage.getItem('email')
    const storedExpiresAt = localStorage.getItem('expiresAt')
    const storedId = localStorage.getItem('id')

    if (storedEmail && storedExpiresAt && storedId) {
      const currentTime = new Date().getTime()
      if (new Date(storedExpiresAt).getTime() > currentTime) {
        dispatch(setUser({ email: storedEmail, expiresAt: storedExpiresAt, id: storedId }))
      } else {
        localStorage.removeItem('email')
        localStorage.removeItem('expiresAt')
        localStorage.removeItem('id')
      }
    } else {
      handleMutation()
    }
  }, [dispatch])

  return null
}

export default GetRandomEmail

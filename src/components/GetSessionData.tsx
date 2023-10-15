import React, { useEffect, useState } from 'react'
import { gql, useQuery } from '@apollo/client'
import { useDispatch, useSelector } from 'react-redux'
import { setSessionData } from '../redux/sessionSlice'
import RefreshIcon from '@mui/icons-material/Refresh'
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive'
import NotificationAddIcon from '@mui/icons-material/NotificationAdd'
import CircleCountdown from './CircleCountdown'

const GetSessionData = () => {
  const userData = useSelector((state: any) => state.user)
  const userId = userData.id

  const query = gql`
    query {
      session(id: "${userId}") {
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

  const { data, loading, error, refetch } = useQuery(query, {
    variables: { id: userId },
    pollInterval: 15000,
  })

  const dispatch = useDispatch()

  const [countdown, setCountdown] = useState(15)
  const [notificationPermission, setNotificationPermission] = useState('default')

  useEffect(() => {
    if ('Notification' in window) {
      if (Notification.permission === 'granted') {
        setNotificationPermission('granted')
      }
    }
  }, [])

  const requestNotificationPermission = () => {
    if ('Notification' in window) {
      Notification.requestPermission().then((permission) => {
        setNotificationPermission(permission)
      })
    }
  }

  useEffect(() => {
    if (!loading && !error) {
      const sessionData = data?.session
      if (sessionData) {
        dispatch(setSessionData(sessionData))

        if (sessionData.mails.length > 0 && notificationPermission === 'granted') {
          const lastMail = sessionData.mails[sessionData.mails.length - 1]
          new Notification('New Email', {
            body: `From: ${lastMail.fromAddr}`,
          })
        }
      }
    }
  }, [data, loading, error, dispatch, notificationPermission])

  useEffect(() => {
    const interval = setInterval(() => {
      if (countdown === 0) {
        refetch()
        setCountdown(15)
      } else {
        setCountdown(countdown - 1)
      }
    }, 1000);

    return () => clearInterval(interval)
  }, [countdown, refetch]);

  return (
    <div className='flex justify-center items-center'>
      <div className='flex justify-center items-center pr-5'>
        <div className='pr-2'>AutoRefresh in</div>
        <CircleCountdown countdown={countdown} />
      </div>
      <button onClick={() => refetch()}>
        Refresh <RefreshIcon />
      </button>
      <button
        onClick={requestNotificationPermission}
        disabled={notificationPermission === 'granted'}
      >
        <div className='pl-3'>
          {notificationPermission === 'default'
            ? <div>Allow Notifications <NotificationAddIcon /></div>
            : <div><NotificationsActiveIcon /></div>}
        </div>
      </button>
    </div>
  )
}

export default GetSessionData

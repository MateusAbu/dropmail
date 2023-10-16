import React from 'react'
import Header from './components/Header/Header'
import Inbox from './components/Inbox/Inbox'

function App() {

  return (
    <div className='border rounded-md m-3'>
      <Header />

      <div className='flex'>
        <Inbox />
      </div>
    </div>
  )
}

export default App

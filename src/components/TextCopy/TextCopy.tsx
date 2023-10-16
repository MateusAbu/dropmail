import React from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useSelector } from 'react-redux'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import GetRandomEmail from '../GetRandomEmail/GetRandomEmail'

const CopiarInput = () => {
  const userData = useSelector((state: any) => state.user)

  const handleCopyClick = () => {
    navigator.clipboard.writeText(userData.email).then(
      () => {
        toast.success(`Email copiado com sucesso! ${userData.email}`)
      },
      (err) => {
        toast.error('Erro ao copiar texto.', err)
      }
    )
  }

  return (
    <div>
      <Toaster />
      <GetRandomEmail />
      <input
        className="border rounded-l-md p-2 w-80 font-semibold"
        type="text"
        value={userData.email ? userData.email : "Loading..."}
        readOnly
      />
      <button
        className="border rounded-r-md p-2"
        onClick={handleCopyClick}
      >
        <ContentCopyIcon />
      </button>
    </div>
  )
}

export default CopiarInput

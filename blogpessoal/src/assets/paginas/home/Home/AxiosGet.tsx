import axios from 'axios'
import { useEffect, useState } from 'react'

function AxiosGet() {
  const [usuarios, setUsuarios] = useState<any[]>([])

  useEffect(() => {
    axios.get<any[]>('https://blogpessoal-9ded.onrender.com')
      .then(response => {
        console.log(response.data)
        setUsuarios(response.data)
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error)
      })
  }, [])

  return (
    <div>
      {usuarios.map((usuario, index) => (
        <p key={index}>{usuario.name}</p>
      ))}
    </div>
  )
}

export default AxiosGet

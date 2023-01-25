import Head from 'next/head'
import LoginForm from '@/components/LoginForm'
import { useEffect, useState } from 'react';
import {api, mockApi} from '@/lib/axios';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function Home() {
  // States
  const [error, setError] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  
  // Hooks
  const router = useRouter()

  // Handlers
  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const cpf = event.currentTarget.elements.namedItem('CPF').value.replaceAll('.','').replaceAll('-','')
    const password = event.currentTarget.elements.namedItem('password').value

    try {
      setIsLoading(true)
      const logged = await mockApi.post('panel/auth', { cpf, password }, {withCredentials: true})

      setError(false)
      router.push('/')
    } catch (error) {
      setError(true)
      console.log(error)
    } finally {
      setIsLoading(false)
    }

  }

  // Caso já esteja logado, usuário é redirecionado à tela principal
  useEffect(()=>{
    (async()=>{
      setIsLoading(true)
      await mockApi.get('/panel/me')
      .then(res=>{setIsLoading(false);router.push('/')})
      .catch(err=>console.log(err))
    })()
  },[])

  return (
    <>
      <Head>
        <title>Clinica - Login</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <section className='w-screen h-screen flex justify-center items-center bg-gray-200'>
        <LoginForm handleSubmit={handleSubmit} isLoading={isLoading} error={error} />
      </section>
    </>
  )
}

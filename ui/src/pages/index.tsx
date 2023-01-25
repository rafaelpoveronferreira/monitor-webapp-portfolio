import Head from 'next/head'
import * as fs from 'fs'
import { Inter } from '@next/font/google'
import WaitingList from '@/components/WatingList'
import AttendingList from '@/components/AttendingList'
import Ad from '@/components/Ad'
import Header from '@/components/Header'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react'
import axios from 'axios'
import { MOCKAPI_URL } from '@/global'
import { mockApi } from '@/lib/axios'

const inter = Inter({ subsets: ['latin'] })

interface Props {
  srcArray: Array<string>
}

export default function Home({srcArray}: Props) {
  const router = useRouter()
  const [healthUnity, setHealthUnity] = useState('Clínica')

  // Caso não esteja logado, usuário é redirecionado à tela de Login
  // Fetch realizado sem SSR pois token está armazenado no localStorage
  useEffect(()=>{
    (async()=>{
      var user = null

      await mockApi.get('/panel/me', {withCredentials: true})
      .then(res=>{
        user=res.data.user
        setHealthUnity(res.data.health_unit_name)
      })
      .catch(err=>console.log(err))

      if(!user) {
        router.push('/login')
        return
      }
    })()
  },[])

  return (
    <>
      <Head>
        <title>Clinica</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className='w-screen h-[12.5vh] flex '>
        <Header healthUnity={healthUnity}/>
      </div>

      <div className='w-screen h-[87.5vh] flex '>
        <WaitingList />

        <div className='w-1/2 h-full'>
          <AttendingList />
          <Ad srcArray={srcArray}/>
        </div>
      </div>


    </>
  )
}


// Aqui estou tirando proveito do SSR para usar o Node para gerar uma array com todas imagens de anúncios armazenadas em /public/ads/
// Assim, todas imagens armazenada em /public/ads serão exibidas pelo componente Ad
export const getServerSideProps: GetServerSideProps = async () => {
  const files = await fs.promises.readdir('./public/ads/', null)
  const srcArray = files.map((e: string)=>`/ads/${e}`)

  return { props: { srcArray } }

}
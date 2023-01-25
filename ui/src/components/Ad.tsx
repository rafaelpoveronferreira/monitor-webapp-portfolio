import { AD_INTERVAL } from '@/global'
import Image from 'next/image'
import { useEffect, useState } from 'react'
 
interface Props {
    srcArray: Array<string>,
}

function Ad({srcArray}: Props) {
    const [adSrc, setAdSrc] = useState('/ads/1.jpg')

    useEffect(()=>{
        if (srcArray.length>1) {
            let i = 0
            const timerId = setInterval(()=>{
                i+1===srcArray.length?i=0:i++
                setAdSrc(srcArray[i])
            },AD_INTERVAL)

            return function cleanUp() {
                clearInterval(timerId)
            }
        }
    },[])
    return(
        <section className="h-[48%] w-full p-5 bg-clip-content relative">
            <Image src={adSrc} alt='ad' fill sizes='100vh' style={{objectFit: 'contain', backgroundClip: 'content-box'}}/>
        </section>
    )
}

export default Ad
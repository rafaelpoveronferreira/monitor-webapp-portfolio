import { POPUP_MS, SWR_REFRESH_INTERVAL, USE_MOCKAPI } from '@/global';
import { fetcherGET, fetcherMockAPIGET } from '@/lib/axios';
import { useEffect, useRef, useState } from 'react';
import useSWR from 'swr';
import Alert from './Alert';
import DataGridConfig from './DataGridConfig';

const AttendingList = () => {
    const fetcher = USE_MOCKAPI?fetcherMockAPIGET:fetcherGET
    const { data } = useSWR(()=>`/panel/patients?status=in_attendance`, fetcher, {refreshInterval:SWR_REFRESH_INTERVAL})
    
    // Estes states e ref controlam o Popup de chamada de pacientes
    const [newCalledPatients, setNewCalledPatients] = useState<{cidadao_nome:string, tipo:string}[]>([])
    const [isPopup, togglePopup] = useState(false)
    const [timerId, setTimerId] = useState<null | NodeJS.Timeout>(null)

    const prevData = useRef({data: []})
    
    // Este useEffect controla o Popup de chamada de pacientes
    useEffect(()=>{
        // A cada modificação de Data, verifica pacientes novos na lista
        if(data && prevData) {
                // Compara estado data anterior com nova data e retorna array com novos pacientes na variável newPatients
                const newPatients = data.data.filter((row:any)=>!prevData.current.data.some((e:any)=>e.id===row.id))

                if(newPatients.length == 0) {return}

                // Atualiza state com novos pacientes
                setNewCalledPatients(prevState=>[...prevState, ...newPatients])
                togglePopup(true)

                // clearTimeOut e timerId servem para resetar o cronômetro do chamado do painel caso um novo paciente seja chamado quando um paciente ainda está sendo chamado no painel
                if (timerId) {
                    clearTimeout(timerId)
                }

                const id = setTimeout(()=>{
                    togglePopup(false)
                    setTimerId(null)
                    setNewCalledPatients([])
                },POPUP_MS)

                setTimerId(id)             

            }
            // atualiza ref com state anterior
            prevData.current.data = data?.data || []
    }, [data])

    return (
        <section id='attending-list' className="flex flex-col h-1/2 w-full p-5 bg-clip-content bg-custom-gray">
            <h2 className='w-full bg-white flex justify-center text-3xl  pb-4'>ÚLTIMOS CHAMADOS</h2>
            <DataGridConfig rows={data?.data || []} type='attendance'/>
            {isPopup && <Alert patients={newCalledPatients}/>}
        </section>
    )
}

export default AttendingList
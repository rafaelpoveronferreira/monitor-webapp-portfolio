import { SWR_REFRESH_INTERVAL } from '@/global';
import { fetcherMockAPIGET } from '@/lib/axios';
import useSWR from 'swr';
import DataGridConfig from './DataGridConfig';

const WaitingList = () => {
    const { data } = useSWR(()=>`/panel/patients?status=is_awaiting`, fetcherMockAPIGET, {refreshInterval:SWR_REFRESH_INTERVAL})

    return (
        <section id='waiting-list' className="flex flex-col h-full w-1/2 p-5 bg-clip-content bg-custom-gray">
            <h2 className='w-full bg-white flex justify-center text-3xl pb-4'>PACIENTES EM ESPERA</h2>
            <DataGridConfig rows={data?.data || []} type='awaiting'/>
        </section>
    )
}

export default WaitingList
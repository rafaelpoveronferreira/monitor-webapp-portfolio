import { useEffect } from "react"

interface Props {
    patients: {cidadao_nome:string, tipo:string}[],
}

const Alert = ({patients}:Props) => {
    const audio = new Audio('/alert.mp3')
    useEffect(()=>{
        audio.play()

        /*
        const synth = window.speechSynthesis;
        const utterThis = new SpeechSynthesisUtterance(patients.slice(-1).cidadao_nome);
        synth.speak(utterThis)
        */

    },[patients])

    return (
        <div className="text-white p-5 py-16 text-4xl w-[65%] min-h-max z-50 flex justify-center items-center bg-custom-red/90 rounded-md absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex-col">
            {patients.map(patient => 
                <div key={patient.cidadao_nome+patient.tipo}>
                    <h2 className="my-3">{`${patient.cidadao_nome} dirija-se a `.toUpperCase()}<span className="font-extrabold">{`${patient.tipo}`.toUpperCase()}</span></h2>
                </div>
                )}
            
        </div>
    )
}

export default Alert
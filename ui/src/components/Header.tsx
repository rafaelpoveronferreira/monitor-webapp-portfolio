import { DateTime } from "luxon"
import { useEffect, useState } from "react"

const Header = ({healthUnity}: any) => {
    // É necessário inicilizar o State com um valor estático (aqui, DateTime.local(1999)).
    // Caso o state seja inicilizado com o dinâmico .now(), o Next.JS identificará uma diferença entre o SSR e o HTML do cliente e não conseguirá performar a hidratação
    const [hour, setHour] = useState(DateTime.local(1999).setLocale('pt-BR'))
    const today = hour.toLocaleString({ weekday: "long", day: 'numeric', month: 'long' })

    useEffect(() => {
        //OTIMIZAR. NÂO PRECISO USAR DATETIME.NOW() A CADA ATUALIZAÇÃO... TALVEZ economize performance não usar
        const timerId = setInterval(() => {
            setHour(DateTime.now())
        }, 1000)

        return function cleanup() {
            clearInterval(timerId);
          };
    }, [])

    return (
        <header className='bg-custom-blue text-white h-full w-full flex justify-between items-center px-12'>
            <h1>{healthUnity}</h1>
            <div className="flex flex-col text-center tracking-wide">
                <div className="text-4xl">{hour.toLocaleString(DateTime.TIME_24_WITH_SECONDS)}</div>
                <div className="text-2xl">{today}</div>
            </div>
        </header>
    )
}

export default Header
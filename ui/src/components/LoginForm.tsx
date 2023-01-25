import { cpfMask } from "@/utils/mask"
import clsx from "clsx"
import { FormEvent, useState } from "react"

interface Props {
    handleSubmit: (event: FormEvent)=>void,
    isLoading: boolean,
    error: boolean
}

function LoginForm({handleSubmit, isLoading, error}: Props) {
    const [cpf, setCpf] = useState('')

    const handleCPF= (e: any) => {
        setCpf(cpfMask(e.target.value))
    }

    return(
        <>
            <form id="form-root" aria-describedby="description" aria-labelledby="title" 
                className="bg-white rounded-md shadow-md w-1/3 max-h-max"
                tabIndex={-1} onSubmit={handleSubmit}>
                <h2 id="title"
                    className="px-6 py-3 font-semibold tracking-widest rounded-t-md text-xl w-full h-1/6 bg-custom-blue/90 flex justify-center items-center text-white">
                    LOGIN
                </h2>
                <p id="description" className="px-5 my-4 text-gray-700">
                    Insira credenciais para acessar o painel de espera
                </p>
                <span className={clsx({"text-custom-red text-sm w-full flex justify-center mb-4":error},
                                {"invisible":!error})}>
                    Credenciais incorretas!
                </span>
                <fieldset className="px-6 leading-8 text-gray-700 text-lg w-full flex gap-5 mb-4">
                    <label htmlFor="CPF" className="text-right w-1/5">CPF</label>
                    <input id="CPF" className="border rounded-md border-gray-700/50 border-solid px-2"
                    placeholder="123.456.789-00" onChange={handleCPF} value={cpf}/>
                </fieldset>
                <fieldset className="px-6 leading-8 text-gray-700 text-lg w-full flex gap-5">
                    <label htmlFor="password" className="text-right w-1/5">Senha</label>
                    <input id="password" className="border rounded-md border-gray-700/50 border-solid px-2" type="password" placeholder="senha123" />
                </fieldset>
                <div className="p-6 leading-10 text-gray-700 flex w-full justify-end">
                    <button type="submit" 
                    className={clsx({"rounded-md px-3 text-white transition-all":true,
                                "bg-custom-blue/80 hover:bg-custom-blue":!isLoading,
                                "bg-gray-700/80 hover:bg-gray-700 cursor-not-allowed":isLoading})}>
                    Entrar
                    </button>
                </div>
            </form>
        </>
    )
}

export default LoginForm
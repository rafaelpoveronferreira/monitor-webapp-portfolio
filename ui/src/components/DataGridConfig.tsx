import { useEffect, useState } from "react"
import { Hidden } from '@mui/material';
import { DataGrid, GridColumns, GridValueFormatterParams } from '@mui/x-data-grid';
import { DateTime } from "luxon";

interface Props {
    rows: Array<object>,
    type: string,
}

function DataGridConfig({rows, type}: Props) {
    const [width, setWidth] = useState(270)

    useEffect(()=>{
        // Após a renderização no server, já podemos acessar o window.innerWidth por meio de um useEffect hook.
        // Assim, calcularemos a largura ideal de cada coluna
        setWidth(window.innerWidth/2-(35))
        window.addEventListener('resize',()=>{
            setWidth(window.innerWidth/2-(35))
        })
    },[])


    const valueFormatter = (params: GridValueFormatterParams<string>) => {
        if (params.value == null) {
            return '';
        }
        const valueFormatted = DateTime.fromISO(params.value).setLocale('pt-BR').toLocaleString({hour: 'numeric', minute: 'numeric'});
        return `${valueFormatted}`;
    }

    const columns: GridColumns<object> = generateColumns(type)

    function generateColumns(type: string) {
        if(type=='awaiting') {
            const columns: GridColumns<object> = [
                { field: 'cidadao_nome', headerName: 'NOME', width: width*0.8, align: 'center', headerAlign: 'center', headerClassName: 'text-xl border-r border-gray-300', cellClassName: 'border-solid border-r border-r-gray-300 border-b border-b-gray-300' },
                { field: 'data_atualizacao_situacao', width: width*0.2, valueFormatter, headerName: 'HORA',  align: 'center', headerAlign: 'center', headerClassName: 'text-xl border-r border-gray-300', cellClassName: 'border-solid border-r border-r-gray-300 border-b border-b-gray-300' },
            ]
            return columns
        } else {
            const columns: GridColumns<object> = [
                { field: 'cidadao_nome', headerName: 'NOME', width:width*(3/6), align: 'center', headerAlign: 'center', headerClassName: 'text-xl border-r border-gray-300', cellClassName: 'border-solid border-r border-r-gray-300 border-b border-b-gray-300' },
                { field: 'tipo', width:width*(2/6), headerName: 'LOCAL', align: 'center', headerAlign: 'center', headerClassName: 'text-xl', cellClassName: 'border-solid border-b border-b-gray-300' },
                { field: 'data_atualizacao_situacao', width:width*(1/6), valueFormatter, headerName: 'HORA',  align: 'center', headerAlign: 'center', headerClassName: 'text-xl border-r border-gray-300', cellClassName: 'border-solid border-r border-r-gray-300 border-b border-b-gray-300' },
            ]
            return columns
        }
    }
    
    

    return (
        <>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={100}
                components={{ Footer: Hidden, NoRowsOverlay: ()=><></> }}
                sx={{ fontSize: '1.1rem', textAlign: 'center' }}
                disableColumnMenu
                initialState={{
                    sorting: {
                      sortModel: [{ field: 'data_atualizacao_situacao', sort: 'desc' }],
                    },
                  }}
            />
        </>
    )
}
//                

export default DataGridConfig
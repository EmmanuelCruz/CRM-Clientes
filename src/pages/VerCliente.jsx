import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const VerCliente = () => {

    const { id } = useParams()
    const [cliente, setCliente] = useState({})
    const [cargando, setCargando] = useState(false)

    useEffect(() => {
        setCargando(!cargando)
        const obtenCliente = async () => {
            try {
                const respuesta = await fetch(`${import.meta.env.VITE_URL_CLIENTES}/${id}`)
                const resultado = await respuesta.json()
                setCliente(resultado)
            } catch (error) {
                console.error(error)
            } finally{
                setCargando(false)
            }
        }
        obtenCliente()
    }, [])

    return (
        <div>
            {
                Object.keys(cliente).length === 0 ? 'No hay información de este cliente' : 
                cargando ? 'Cargando...' : (
                    <>
                        <h1 className='font-black text-4xl text-blue-900 '>{`Cliente ${cliente.nombre}`}</h1>
                        <p className='mt-3'>
                            Información de cliente
                        </p>
            
                        <p className='text-gray-600 text-2xl mt-4'>
                            <span className='uppercase font-bold text-gray-700'>Cliente: </span>{cliente.nombre}
                        </p>
                        <p className='text-gray-700 text-2xl mt-4'>
                            <span className='uppercase font-bold text-gray-700'>Empresa: </span>{cliente.empresa}
                        </p>
                        <p className='text-gray-700 text-2xl mt-4'>
                            <span className='uppercase font-bold text-gray-700'>E-mail: </span>{cliente.email}
                        </p>
                        <p className='text-gray-700 text-2xl mt-4'>
                            <span className='uppercase font-bold text-gray-700'>Teléfono: </span>{cliente.telefono}
                        </p>
                        {
                            cliente.notas && 
                            <p className='text-gray-700 text-2xl mt-4'>
                                <span className='uppercase font-bold text-gray-700'>Notas: </span>{cliente.notas}
                            </p>
                        }
                    </>
                )
            }
        </div>
    )
}

export default VerCliente

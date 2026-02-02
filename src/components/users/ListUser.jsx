import React, { useEffect, useState, useRef } from 'react'

export const ListUser = () => {

    const [customerList, setCustomerList] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [loading, setLoading] = useState(false)
    const [copiedCell, setCopiedCell] = useState(null)
    const [visiblePasswords, setVisiblePasswords] = useState(new Set())
    const timeoutRef = useRef(null)

    const fetchCustomers = async (query = '') => {
    setLoading(true)
    try {
        const url = `http://localhost:9000/customers/search?q=${encodeURIComponent(query)}&page=0&size=20`
        
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        
        const data = await response.json()
        setCustomerList(data.content || data) // En caso de que la búsqueda devuelva un objeto con 'content'
    } catch (error) {
        console.error('Error fetching customers:', error)
        setCustomerList([])
    } finally {
        setLoading(false)
    }
}

    const handleSearch = (e) => {
        const value = e.target.value
        setSearchTerm(value)
        
        // Limpiar el timeout anterior si existe
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }
        
        // Crear nuevo timeout
        timeoutRef.current = setTimeout(() => {
            // Solo buscar si hay 3 o más caracteres, sino mostrar todos
            if (value.trim().length >= 3) {
                fetchCustomers(value)
            } else {
                fetchCustomers('') // Query vacío para obtener todos los clientes
            }
        }, 500)
    }

    const copyToClipboard = async (text, customerId, column) => {
        try {
            await navigator.clipboard.writeText(text)
            setCopiedCell(`${customerId}-${column}`)
            // Ocultar la confirmación después de 2 segundos
            setTimeout(() => setCopiedCell(null), 2000)
        } catch (err) {
            console.error('Error al copiar al portapapeles:', err)
        }
    }

    const togglePasswordVisibility = (customerId) => {
        setVisiblePasswords(prev => {
            const newSet = new Set(prev)
            if (newSet.has(customerId)) {
                newSet.delete(customerId)
            } else {
                newSet.add(customerId)
            }
            return newSet
        })
    }

    useEffect(() => {
        fetchCustomers()
    }, [])

    return (
        <>
        <style>
            {`
                #listCustomersTable,
                #listCustomersTable th,
                #listCustomersTable td {
                    border-color: #dee2e6 !important;
                }
                .clickable-cell {
                    cursor: pointer;
                    position: relative;
                }
                .clickable-cell:hover {
                    background-color: #f8f9fa !important;
                }
                .copy-feedback {
                    position: absolute;
                    top: 50%;
                    right: 5px;
                    transform: translateY(-50%) translateY(8px);
                    color: #fcfcfc;
                    font-size: 0.75rem;
                    opacity: 0.8;
                    background: rgba(3, 2, 2, 0.9);
                    padding: 1px 4px;
                    border-radius: 3px;
                    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
                }
            `}
        </style>

            <div>
                <div className="mt-5">
                    <div className="card">
                        <div className="card-header">
                            <h5 className="card-title mb-0">LISTA DE CLIENTES</h5>
                        </div>
                        <div className="card-body">
                            <div className="mb-3">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="input-group">
                                            <span className="input-group-text">
                                                <i className="bi bi-search"></i>
                                            </span>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Buscar por razón social, RUC, responsable..."
                                                value={searchTerm}
                                                onChange={handleSearch}
                                            />
                                            {searchTerm && (
                                                <button
                                                    className="btn btn-outline-secondary"
                                                    type="button"
                                                    onClick={() => {
                                                        setSearchTerm('')
                                                        fetchCustomers()
                                                    }}
                                                >
                                                    <i className="bi bi-x"></i>
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {loading && (
                                <div className="text-center mb-3">
                                    <div className="spinner-border spinner-border-sm" role="status">
                                        <span className="visually-hidden">Buscando...</span>
                                    </div>
                                </div>
                            )}
                            <table id="listCustomersTable" className="table table-striped table-hover table-bordered">
                                <thead>
                                    <tr>
                                        <th>Razón Social</th>
                                        <th>Responsable</th>
                                        <th>RUC</th>
                                        <th>DNI</th>
                                        <th>Usuario</th>
                                        <th>Clave</th>
                                        <th>Celular</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {customerList.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" className="text-center">
                                            {loading ? 'Cargando...' : searchTerm ? 'No se encontraron resultados' : 'No hay clientes'}
                                        </td>
                                    </tr>
                                    ) : (
                                        customerList.map((customer) => (
                                            <tr key={customer.id}>
                                                <td 
                                                    className="clickable-cell" 
                                                    onClick={() => copyToClipboard(customer.companyName, customer.id, 'companyName')}
                                                    title="Clic para copiar"
                                                >
                                                    {customer.companyName}
                                                    {copiedCell === `${customer.id}-companyName` && (
                                                        <span className="copy-feedback">Copiado!</span>
                                                    )}
                                                </td>
                                                <td 
                                                    className="clickable-cell" 
                                                    onClick={() => copyToClipboard(customer.generalManager, customer.id, 'generalManager')}
                                                    title="Clic para copiar"
                                                >
                                                    {customer.generalManager}
                                                    {copiedCell === `${customer.id}-generalManager` && (
                                                        <span className="copy-feedback">Copiado!</span>
                                                    )}
                                                </td>
                                                <td 
                                                    className="clickable-cell" 
                                                    onClick={() => copyToClipboard(customer.ruc, customer.id, 'ruc')}
                                                    title="Clic para copiar"
                                                >
                                                    {customer.ruc}
                                                    {copiedCell === `${customer.id}-ruc` && (
                                                        <span className="copy-feedback">Copiado!</span>
                                                    )}
                                                </td>
                                                <td 
                                                    className="clickable-cell" 
                                                    onClick={() => copyToClipboard(customer.dni, customer.id, 'dni')}
                                                    title="Clic para copiar"
                                                >
                                                    {customer.dni}
                                                    {copiedCell === `${customer.id}-dni` && (
                                                        <span className="copy-feedback">Copiado!</span>
                                                    )}
                                                </td>
                                                <td 
                                                    className="clickable-cell" 
                                                    onClick={() => copyToClipboard(customer.sunatUser, customer.id, 'sunatUser')}
                                                    title="Clic para copiar"
                                                >
                                                    {customer.sunatUser}
                                                    {copiedCell === `${customer.id}-sunatUser` && (
                                                        <span className="copy-feedback">Copiado!</span>
                                                    )}
                                                </td>
                                                <td className="clickable-cell position-relative">
                                                    <div className="d-flex align-items-center py-0">
                                                        <span 
                                                            className="me-2 flex-grow-1"
                                                            onClick={() => copyToClipboard(customer.sunatPassword, customer.id, 'sunatPassword')}
                                                            title="Clic para copiar contraseña"
                                                            style={{ cursor: 'pointer' }}
                                                        >
                                                            {visiblePasswords.has(customer.id) 
                                                                ? customer.sunatPassword 
                                                                : '••••••••'
                                                            }
                                                        </span>
                                                        <button
                                                            className="btn btn-link p-0"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                togglePasswordVisibility(customer.id);
                                                            }}
                                                            title={visiblePasswords.has(customer.id) ? "Ocultar contraseña" : "Mostrar contraseña"}
                                                            style={{ border: 'none', fontSize: '0.875rem', minWidth: 'auto', lineHeight: '1' }}
                                                        >
                                                            <i className={`bi ${visiblePasswords.has(customer.id) ? 'bi-eye-slash' : 'bi-eye'} text-muted`}></i>
                                                        </button>
                                                    </div>
                                                    {copiedCell === `${customer.id}-sunatPassword` && (
                                                        <span className="copy-feedback">Copiado!</span>
                                                    )}
                                                </td>
                                                <td 
                                                    className="clickable-cell" 
                                                    onClick={() => copyToClipboard(customer.phoneNumber, customer.id, 'phoneNumber')}
                                                    title="Clic para copiar"
                                                >
                                                    {customer.phoneNumber}
                                                    {copiedCell === `${customer.id}-phoneNumber` && (
                                                        <span className="copy-feedback">Copiado!</span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

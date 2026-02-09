import React, { useEffect, useState, useRef } from 'react'
import { CustomerDetailsModal } from './CustomerDetailsModal'
import { buildApiUrl } from '../../config/apiConfig'

export const ListUser = () => {

    const [customerList, setCustomerList] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [loading, setLoading] = useState(false)
    const [copiedCell, setCopiedCell] = useState(null)
    const [visiblePasswords, setVisiblePasswords] = useState(new Set())
    const [selectedCustomer, setSelectedCustomer] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [currentPage, setCurrentPage] = useState(0)
    const [pagination, setPagination] = useState(null)
    const pageSize = 10
    const timeoutRef = useRef(null)

    const fetchCustomers = async (query = '', page = 0) => {
    setLoading(true)
    try {
        const url = `${buildApiUrl('/customers/search')}?q=${encodeURIComponent(query)}&page=${page}&size=${pageSize}`
        
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        
        const result = await response.json()
        
        // Manejar nueva estructura con statusCode y paginación
        if (result.statusCode === 200) {
            setCustomerList(result.data.customers || [])
            setPagination(result.data.pagination)
            setCurrentPage(page)
        } else {
            console.error('Error from API:', result.message)
            setCustomerList([])
            setPagination(null)
        }
    } catch (error) {
        console.error('Error fetching customers:', error)
        setCustomerList([])
        setPagination(null)
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
            // Resetear a página 0 cuando se busca
            setCurrentPage(0)
            // Solo buscar si hay 3 o más caracteres, sino mostrar todos
            if (value.trim().length >= 3) {
                fetchCustomers(value, 0)
            } else {
                fetchCustomers('', 0) // Query vacío para obtener todos los clientes
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

    const showDetailsModal = (customer) => {
        setSelectedCustomer(customer)
        setShowModal(true)
    }

    const closeModal = () => {
        setSelectedCustomer(null)
        setShowModal(false)
    }

    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < (pagination?.totalPages || 1)) {
            fetchCustomers(searchTerm, newPage)
        }
    }

    const clearSearch = () => {
        setSearchTerm('')
        setCurrentPage(0)
        fetchCustomers('', 0)
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
                                                    onClick={clearSearch}
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
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {customerList.length === 0 ? (
                                    <tr>
                                        <td colSpan="8" className="text-center">
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
                                                <td>
                                                    <button
                                                        className="btn btn-sm btn-outline-primary"
                                                        onClick={() => showDetailsModal(customer)}
                                                        title="Ver detalles del cliente"
                                                    >
                                                        <i className="bi bi-zoom-in me-1"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                            
                            {/* Paginación */}
                            {pagination && (
                                <div className="d-flex justify-content-between align-items-center mt-3">
                                    <div className="text-muted">
                                        Mostrando {pagination.numberOfElements} de {pagination.totalElements} clientes
                                        {pagination.totalPages > 1 && ` - Página ${currentPage + 1} de ${pagination.totalPages}`}
                                    </div>
                                    {pagination.totalPages > 1 && (
                                        <nav aria-label="Paginación de clientes">
                                            <ul className="pagination mb-0">
                                                <li className={`page-item ${pagination.first ? 'disabled' : ''}`}>
                                                    <button 
                                                        className="page-link" 
                                                        onClick={() => handlePageChange(0)}
                                                        disabled={pagination.first}
                                                    >
                                                        <i className="bi bi-chevron-double-left"></i>
                                                    </button>
                                                </li>
                                                <li className={`page-item ${pagination.first ? 'disabled' : ''}`}>
                                                    <button 
                                                        className="page-link" 
                                                        onClick={() => handlePageChange(currentPage - 1)}
                                                        disabled={pagination.first}
                                                    >
                                                        <i className="bi bi-chevron-left"></i>
                                                    </button>
                                                </li>
                                                
                                                {/* Números de página */}
                                                {Array.from({ length: pagination.totalPages }, (_, i) => i)
                                                    .filter(page => 
                                                        page === 0 || 
                                                        page === pagination.totalPages - 1 || 
                                                        Math.abs(page - currentPage) <= 2
                                                    )
                                                    .map((page, index, array) => {
                                                        if (index > 0 && array[index - 1] !== page - 1) {
                                                            return [
                                                                <li key={`ellipsis-${page}`} className="page-item disabled">
                                                                    <span className="page-link">...</span>
                                                                </li>,
                                                                <li key={page} className={`page-item ${page === currentPage ? 'active' : ''}`}>
                                                                    <button 
                                                                        className="page-link" 
                                                                        onClick={() => handlePageChange(page)}
                                                                    >
                                                                        {page + 1}
                                                                    </button>
                                                                </li>
                                                            ]
                                                        }
                                                        return (
                                                            <li key={page} className={`page-item ${page === currentPage ? 'active' : ''}`}>
                                                                <button 
                                                                    className="page-link" 
                                                                    onClick={() => handlePageChange(page)}
                                                                >
                                                                    {page + 1}
                                                                </button>
                                                            </li>
                                                        )
                                                    })
                                                }
                                                
                                                <li className={`page-item ${pagination.last ? 'disabled' : ''}`}>
                                                    <button 
                                                        className="page-link" 
                                                        onClick={() => handlePageChange(currentPage + 1)}
                                                        disabled={pagination.last}
                                                    >
                                                        <i className="bi bi-chevron-right"></i>
                                                    </button>
                                                </li>
                                                <li className={`page-item ${pagination.last ? 'disabled' : ''}`}>
                                                    <button 
                                                        className="page-link" 
                                                        onClick={() => handlePageChange(pagination.totalPages - 1)}
                                                        disabled={pagination.last}
                                                    >
                                                        <i className="bi bi-chevron-double-right"></i>
                                                    </button>
                                                </li>
                                            </ul>
                                        </nav>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <CustomerDetailsModal 
                customer={selectedCustomer}
                isOpen={showModal}
                onClose={closeModal}
            />
        </>
    )
}

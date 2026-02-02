import React, { useState } from 'react'

export const CustomerDetailsModal = ({ customer, isOpen, onClose }) => {
    const [visiblePasswords, setVisiblePasswords] = useState(new Set())
    const [visibleRnpPasswords, setVisibleRnpPasswords] = useState(new Set())
    const [visibleAfpPasswords, setVisibleAfpPasswords] = useState(new Set())

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

    const toggleRnpPasswordVisibility = (customerId) => {
        setVisibleRnpPasswords(prev => {
            const newSet = new Set(prev)
            if (newSet.has(customerId)) {
                newSet.delete(customerId)
            } else {
                newSet.add(customerId)
            }
            return newSet
        })
    }

    const toggleAfpPasswordVisibility = (customerId) => {
        setVisibleAfpPasswords(prev => {
            const newSet = new Set(prev)
            if (newSet.has(customerId)) {
                newSet.delete(customerId)
            } else {
                newSet.add(customerId)
            }
            return newSet
        })
    }

    if (!isOpen || !customer) return null

    return (
        <>
            <div className="modal-backdrop fade show"></div>
            <div className="modal fade show d-block" tabIndex="-1">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">
                                <i className="bi bi-info-circle me-2"></i>
                                Detalles del Cliente
                            </h5>
                            <button type="button" className="btn-close" onClick={onClose}></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-4">
                                <div className="bg-secondary text-white p-2 rounded-top">
                                    <h6 className="mb-0">INFORMACIÓN GENERAL</h6>
                                </div>
                                <div className="border border-top-0 p-3 rounded-bottom">
                                    <div className="row g-3">
                                        <div className="col-md-12">
                                            <strong>Razón Social:</strong> <span className="text-muted">{customer.companyName || 'N/A'}</span>
                                        </div>
                                        <div className="col-md-6">
                                            <strong>Responsable:</strong> <span className="text-muted">{customer.generalManager || 'N/A'}</span>
                                        </div>
                                        <div className="col-md-6">
                                            <strong>RUC:</strong> <span className="text-muted">{customer.ruc || 'N/A'}</span>
                                        </div>
                                        <div className="col-md-6">
                                            <strong>DNI:</strong> <span className="text-muted">{customer.dni || 'N/A'}</span>
                                        </div>
                                        <div className="col-md-6">
                                            <strong>Email:</strong> <span className="text-muted">{customer.email || 'N/A'}</span>
                                        </div>
                                        <div className="col-md-6">
                                            <strong>Teléfono:</strong> <span className="text-muted">{customer.phoneNumber || 'N/A'}</span>
                                        </div>
                                        <div className="col-md-6">
                                            <strong>Régimen:</strong> <span className="text-muted">{customer.regime || 'N/A'}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-4">
                                <div className="bg-secondary text-white p-2 rounded-top">
                                    <h6 className="mb-0">CREDENCIALES SUNAT</h6>
                                </div>
                                <div className="border border-top-0 p-3 rounded-bottom">
                                    <div className="row g-3">
                                        <div className="col-md-6">
                                            <strong>Usuario SUNAT:</strong> <span className="text-muted">{customer.sunatUser || 'N/A'}</span>
                                        </div>
                                        <div className="col-md-6">
                                            <strong>Contraseña SUNAT:</strong> 
                                            <span className="text-muted">
                                                {visiblePasswords.has(customer.id) 
                                                    ? customer.sunatPassword 
                                                    : '••••••••'
                                                }
                                            </span>
                                            <button
                                                className="btn btn-link btn-sm p-0 ms-2"
                                                onClick={() => togglePasswordVisibility(customer.id)}
                                                title={visiblePasswords.has(customer.id) ? "Ocultar" : "Mostrar"}
                                            >
                                                <i className={`bi ${visiblePasswords.has(customer.id) ? 'bi-eye-slash' : 'bi-eye'} text-muted`}></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-0">
                                <div className="bg-secondary text-white p-2 rounded-top">
                                    <h6 className="mb-0">CREDENCIALES ADICIONALES</h6>
                                </div>
                                <div className="border border-top-0 p-3 rounded-bottom">
                                    <div className="row g-3">
                                        <div className="col-md-6">
                                            <strong>Contraseña RNP:</strong> 
                                            <span className="text-muted">
                                                {visibleRnpPasswords.has(customer.id) 
                                                    ? customer.rnpPassword 
                                                    : '••••••••'
                                                }
                                            </span>
                                            <button
                                                className="btn btn-link btn-sm p-0 ms-2"
                                                onClick={() => toggleRnpPasswordVisibility(customer.id)}
                                                title={visibleRnpPasswords.has(customer.id) ? "Ocultar" : "Mostrar"}
                                            >
                                                <i className={`bi ${visibleRnpPasswords.has(customer.id) ? 'bi-eye-slash' : 'bi-eye'} text-muted`}></i>
                                            </button>
                                        </div>
                                        <div className="col-md-6">
                                            <strong>Usuario AFP:</strong> <span className="text-muted">{customer.afpUser || 'N/A'}</span>
                                        </div>
                                        <div className="col-md-6">
                                            <strong>Contraseña AFP:</strong> 
                                            <span className="text-muted">
                                                {visibleAfpPasswords.has(customer.id) 
                                                    ? customer.afpPassword 
                                                    : '••••••••'
                                                }
                                            </span>
                                            <button
                                                className="btn btn-link btn-sm p-0 ms-2"
                                                onClick={() => toggleAfpPasswordVisibility(customer.id)}
                                                title={visibleAfpPasswords.has(customer.id) ? "Ocultar" : "Mostrar"}
                                            >
                                                <i className={`bi ${visibleAfpPasswords.has(customer.id) ? 'bi-eye-slash' : 'bi-eye'} text-muted`}></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={onClose}>
                                <i className="bi bi-x-circle me-1"></i>
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
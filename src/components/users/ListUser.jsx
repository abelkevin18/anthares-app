import React, { useEffect, useState } from 'react'

export const ListUser = () => {

    const [customerList, setCustomerList] = useState([])

    useEffect(() => {
        fetch('http://localhost:9000/customers')
            .then(res => res.json())
            .then(data => setCustomerList(data))
            .catch(() => setCustomerList([]))
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
            `}
        </style>

            <div>
                <div className="mt-5">
                    <div className="card">
                        <div className="card-header">
                            <h5 className="card-title mb-0">LISTA DE CLIENTES</h5>
                        </div>
                        <div className="card-body">
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
                                        <td colSpan="7" className="text-center">No hay clientes</td>
                                    </tr>
                                    ) : (
                                        customerList.map((customer) => (
                                            <tr key={customer.id}>
                                                <td>{customer.companyName}</td>
                                                <td>{customer.generalManager}</td>
                                                <td>{customer.ruc}</td>
                                                <td>{customer.dni}</td>
                                                <td>{customer.sunatUser}</td>
                                                <td>{customer.sunatPassword}</td>
                                                <td>{customer.phoneNumber}</td>
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

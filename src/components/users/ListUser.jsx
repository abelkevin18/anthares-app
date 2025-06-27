import React from 'react'

export const ListUser = () => {
    return (
        <>
        <style>
            {`
                #listUsersTable,
                #listUsersTable th,
                #listUsersTable td {
                    border-color: #dee2e6 !important;
                }
            `}
        </style>

            <div>
                <div className="container mt-5">
                    <div className="card">
                        <div className="card-header">
                            <h5 className="card-title mb-0">LISTA DE CLIENTES</h5>
                        </div>
                        <div className="card-body">
                            <table id="listUsersTable" className="table table-striped table-hover table-bordered">
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
                                    <tr>
                                        <td>Empresa S.A.C.</td>
                                        <td>Juan Pérez</td>
                                        <td>12345678901</td>
                                        <td>12345678</td>
                                        <td>juanperez</td>
                                        <td>clave123</td>
                                        <td>987654321</td>
                                    </tr>
                                    <tr>
                                        <td>Compañía Ltda.</td>
                                        <td>Ana Gómez</td>
                                        <td>10987654321</td>
                                        <td>87654321</td>
                                        <td>anagomez</td>
                                        <td>clave456</td>
                                        <td>123456789</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

import React from 'react';

export function AboutUs() {

    return (
        <>
        <div className="container">
            <div className="row">
                <h2>Grupo 5</h2>
            </div>
            <div className="divider"></div>
            <table className='centered highlight responsive-table'>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Carnet</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Edin Emanuel Montenegro Vásquez</td>
                        <td>201709311</td>
                    </tr>
                    <tr>
                        <td>Jorge Mario Castañeda Cragua</td>
                        <td>201809938</td>
                    </tr>
                    <tr>
                        <td>Wilson Kevin Javier Chávez Cabrera</td>
                        <td>201807428</td>
                    </tr>
                    <tr>
                        <td>Alvaro Emmanuel Socop Perez</td>
                        <td>202000194</td>
                    </tr>
                    <tr>
                        <td>Angel Marcos David Lopez Chacon</td>
                        <td>201807299</td>
                    </tr>
                </tbody>
            </table>
        </div>
        </>
    )
}

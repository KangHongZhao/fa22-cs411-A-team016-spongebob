import React from 'react';


export const TagRow =({row})=>{

    return (
        <tr className='setrow'>
            <td>{row.companyName}</td>
            <td>{row.companyId}</td>
            <td>{row.state}</td>
            <td>{row.city}</td>
            <td>{row.street}</td>
            <td>{row.zipCode}</td>
            <td>{row.jobTitle}</td>

        </tr>
    )

}


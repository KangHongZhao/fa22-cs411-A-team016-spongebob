import React from 'react';
import {TagRow} from './TagRow';



export const Tag = ({companyInfo}) =>{

    return (
        <div>
            <table border="1" cellSpacing="5">
            <tr className='setrow'>
                <th>Company_Name</th>
                <th>Company_ID</th>
                <th>State</th>
                <th>City</th>
                <th>Street</th>
                <th>Zipcode</th>
                <th>Job_Title</th>  
            </tr>
                {companyInfo.map((tmp) => (
                    <TagRow row={tmp}/>
                )
                )}
            </table>            
        </div>
    )
}
import React,{useState} from 'react';
import axios from 'axios';
import {Form} from "../Forms/Form";
import {Tag} from '../Tags/Tag';
import { Layout} from 'antd';
const { Header, Footer, Content } = Layout;

const client = axios.create({
    baseURL: "http://localhost:3000/"
})


const CompanyInfo = () =>{
    const [companyInfo, setCompnayInfo] = useState([
        {
        companyName:"CNA",
        companyId:1,
        state:"Illinois",
        city:"Champaign",
        street:"708 Sth northe adafahdfuiosdhafiu",
        zipCode:61820,
        jobTitle:"SDE"
    }
]);

const [error, setError] = React.useState(null);




if (error) return `Error: ${error.message}`;

    const handleSubmit = async (formdata) => {
		try {
            // alert(formdata)
            // alert(`/${formdata}`);

			const res = await client.get("/test.json");
            // const res = await client.get(`/${formdata}`);
            const temp = [];
            for (const [k,v] of Object.entries(res.data)){
                temp.push(v);
            }
            setCompnayInfo(temp);

		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};

    return(
          <>
            <Layout>
                <Header className='space-align-block'>Search Supported Companies!</Header>
                <Content className='space-align-block'><Form handleSubmit={handleSubmit}/></Content>
                <Footer className='space-align-block'><Tag companyInfo={companyInfo}/></Footer>
            </Layout>
          </>
    )

}

export default CompanyInfo;
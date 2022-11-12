import React,{useState} from 'react';
import axios from 'axios';
import {Form} from "../Forms/Form";
import {Tag} from '../Tags/Tag';
import { Layout} from 'antd';
import { CompanyInfoTable } from '../CompanyInfoTable';

const { Header, Footer, Content } = Layout;


const client = axios.create({
    baseURL: "http://localhost:80/"
})


const CompanyInfo = () =>{
    const [companyInfo, setCompnayInfo] = useState([
        {
        // CompanyName:"CNA",
        // CompanyId:1,
        // State:"Illinois",
        // City:"Champaign",
        // Street:"708 Sth northe adafahdfuiosdhafiu",
        // Zipcode:61820,
        // JobTitle:"SDE"
        companyname:"CNA",
        companyid:1,
        state:"Illinois",
        city:"Champaign",
        street:"708 Sth northe adafahdfuiosdhafiu",
        zipcode:61820,
        JobTitle:"SDE"
    }
]);
    const [zipCompany, setZipCompany] = useState([
        {
            companyname:"CNA",
            zipcode:61820
        }
    ])



    const [jobCompany, setjobCompany] = useState([
        {        
            companyId: 1,
            companyname:"CNA",
            h1b_counts:10
        }
    ])

const [error, setError] = React.useState(null);

const companyInfoPlaceholder="Please input your company name";
const zipCodePlaceholder="Please input your zipcode";
const jobTitlePlaceholder="Please input your job title";


if (error) return `Error: ${error.message}`;

    const handleSubmit = async (formdata) => {
		try {
            // alert(formdata)
            // alert(`/${formdata}`);

			// const res = await client.get("/test.json");
            // const res = await client.get(`/search?${formdata}`);
            const res = await client.get(`/search_company?CompanyName=${encodeURIComponent(formdata)}`);
            console.log(res.data);
            const temp = [];
            for (const [k,v] of Object.entries(res.data)){
                temp.push(v);
            }
            const tmp=[];

            for (let index = 0; index < Math.min(temp.length, 5); index++) {
                tmp.push(temp[index]);
                
            }

            setCompnayInfo(tmp);
            // setCompnayInfo(res.data);


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

    const SubmitZipcode = async (formdata) => {
		try {
            // alert(formdata)
            // alert(`/${formdata}`);

			// const res = await client.get("/test1.json");
            const res = await client.get(`/search_zipcode?zipcode=${encodeURIComponent(formdata)}`);

            const temp = [];
            for (const [k,v] of Object.entries(res.data)){
                temp.push(v);
            }
            const tmp=[];

            for (let index = 0; index < Math.min(temp.length, 5); index++) {
                tmp.push(temp[index]);
                
            }            

            setZipCompany(tmp);


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

    const SubmitJobTitle = async (formdata) => {
		try {
            // alert(formdata)
            // alert(`/${formdata}`);

			// const res = await client.get("/test2.json");
            const res = await client.get(`/search_keyword?jobtitle=${encodeURIComponent(formdata)}`);

            const temp = [];
            for (const [k,v] of Object.entries(res.data)){
                temp.push(v);
            }
            const tmp=[];

            for (let index = 0; index < Math.min(temp.length, 5); index++) {
                tmp.push(temp[index]);
                
            }                  
            setjobCompany(tmp);


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


    const deleteCompanyInfo = async (id) =>{
        try {
            // await client.delete(`/${id}`);
            alert(id);
            await client.delete(`/delete_fav?FavoriteId=${encodeURIComponent(id)}`);
            const cur= companyInfo.filter(info => info.companyid !== id);
            setCompnayInfo(cur);
        } catch (error) {
            
        }

    }




    return(
          <>
            <Layout>
                <Header className='space-align-block'>Search Supported Companies!</Header>
                <Content className='space-align-block'><Form handleSubmit={handleSubmit} placeholder={companyInfoPlaceholder}/></Content>
                <Footer className='space-align-block'>
                    <Tag Info={companyInfo} deleteCompanyInfo={deleteCompanyInfo}/>
                    {/* <CompanyInfoTable companyInfo={companyInfo}/> */}
                </Footer>
                <Content className='space-align-block'><Form handleSubmit={SubmitZipcode} placeholder={zipCodePlaceholder}/></Content>
                <Footer className='space-align-block'>
                    <Tag Info={zipCompany} />
                    {/* <CompanyInfoTable companyInfo={companyInfo}/> */}
                </Footer>
                <Content className='space-align-block'><Form handleSubmit={SubmitJobTitle} placeholder={jobTitlePlaceholder}/></Content>
                <Footer className='space-align-block'>
                    <Tag Info={jobCompany} />
                    {/* <CompanyInfoTable companyInfo={companyInfo}/> */}
                </Footer>

            </Layout>
          </>
    )

}

export default CompanyInfo;
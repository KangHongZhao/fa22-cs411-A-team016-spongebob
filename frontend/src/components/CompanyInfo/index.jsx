import React,{useState} from 'react';
import axios from 'axios';
// import {Form1} from "../Forms/Form";
// import {Tag} from '../Tags/Tag';
import styles from './index.module.css' 
import { Link, useNavigate } from "react-router-dom";


import { SearchOutlined,UserOutlined } from '@ant-design/icons';

import { Layout, Button, Form, Input,Table} from 'antd';
const { Header, Content, Footer } = Layout;


const client = axios.create({
    baseURL: "http://localhost:80/"
})

const columns = [
  {
    title: 'CompanyName',
    dataIndex: 'companyname',
    align:'center',
    width: 150
  },
  {
    title: 'CompanyId',
    dataIndex: 'companyid',
    align:'center',
    width:150

  },
  {
    title: 'State',
    dataIndex: 'state',
    align:'center',
    width:150

  },
  {
    title: 'City',
    dataIndex: 'city',
    align:'center',
    width:150

  },
  {
    title: 'Street',
    dataIndex: 'street',
    align:'center',
    width:200

  },
  {
    title: 'ZipCode',
    dataIndex: 'zipcode',
    align:'center',
    width:150

  },
  {
    title: 'JobTitle',
    dataIndex: 'JobTitle',
    align:'center',
    width:150

  },
];
const columns2 = [
  {
    title: 'CompanyName',
    dataIndex: 'CompanyName',
    align:'center',
    width: 150
  },
  {
    title: 'Fav_Num',
    dataIndex: 'Fav_Num',
    align:'center',
    width:150

  },

];



const CompanyInfo = () =>{

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [justify, setJustify] = useState(false) ;

  

  
    const [companyInfo, setCompnayInfo] = useState([]);

const [error, setError] = React.useState(null);

const companyInfoPlaceholder="Please input your company name";
const zipCodePlaceholder="Please input your zipcode";
const jobTitlePlaceholder="Please input your job title";


if (error) return `Error: ${error.message}`;
   
      const start = () => {

        addFavorite();


        setLoading(true);
        // // ajax request after empty completing
        setTimeout(() => {
          // setSelectedRowKeys([]);
          setLoading(false);
        }, 1000);
      };

      const onSelectChange = (newSelectedRowKeys) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
      };

      const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
      };
      const hasSelected = selectedRowKeys.length > 0;


      const addFavorite = async ()=>{
        // alert(selectedRowKeys);
        let userid = localStorage.getItem("UserKey");
        let id = companyInfo;
        console.log(id);
        console.log(selectedRowKeys)


        var newArray = id.filter(function (el) {
          return (el.key in selectedRowKeys)
        });
        console.log(newArray)

        let store = [];
        for (let idx of selectedRowKeys){
          id.forEach((value,index)=>{
            if (idx === value.key){
              // alert(value.companyid)
              // client.post(`/delete_fav?CompanyId=${encodeURIComponent(value.companyid)}&UserId=${encodeURIComponent(userid)}`);
              //  let res = id.filter(function(el) { return el.key !== idx; }); 
               store.push(value.companyid)
            }
          })
        }
        // console.log(store)
        for ( let index of store ){
          await client.post(`/insertFav?CompanyId=${encodeURIComponent(index)}&UserId=${encodeURIComponent(userid)}`);

        }
        // for (int  )

        // alert(a)
      }
      // let countcols ;

    const handlenewSubmit = async (values)=>{
      try {
        const CompanyName = values.companyname;
        const zipcode = values.zipcode ;
        const jobtitle =  values.jobtitle ;


        const res = await client.get(`/search?CompanyName=${encodeURIComponent(CompanyName)}&zipcode=${encodeURIComponent(zipcode)}&jobtitle=${encodeURIComponent(jobtitle)}`);
        console.log(res.data);
        console.log(localStorage.getItem("UserKey"))
        
        // justify =  Object.keys(res.data).find(key => res.data[key] === "procedure");
        // console.log(typeof res.data)
        setJustify(res.data['procedure']) 
        console.log(justify)
        if ( justify){
          let newdata = Object.assign({},Object.values(res.data)[0]) ;
          console.log(newdata)
          res.data = newdata
        }

        // countcols = Object.keys(Object.values(Object.values(res.data)[0])[0]).length
        // console.log(countcols)
        const temp = [];
        let i = 1;
        for (const [k,v] of Object.entries(res.data)){
          if (k !== "procedure"){
            v['key'] = i;
            i +=1;
            temp.push(v);
          }

        }
        const tmp=[];
  
        for (let index = 0; index < temp.length; index++) {
            tmp.push(temp[index]);                
        }
        console.log(tmp)
  
        setCompnayInfo(tmp);
        
      } catch (error) {
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status <= 500
        ) {
          setError(error.response.data.message);
        }
      }

    }

    return(
      

      // <div className={styles.body}>
        <Layout className={styles.layout} customLayout>
          <Header className={styles.header}>
            {/* <div className={styles.logo} /> */}
            <p className={styles.title}>H1B Search</p>
            <Link to="/main">
            <p className={styles.personal}><UserOutlined /></p>
				    </Link>
          </Header>
          <Content className={styles.content}>
            <div className={styles.searchbutton}>
            <Form  layout='vertical' onFinish={handlenewSubmit} className={styles.form}>
              <Form.Item label="Company Name:" name="companyname" 
              // tooltip="This is a required field" 
               className={styles.formitem}>
                <Input placeholder={companyInfoPlaceholder}  className={styles.inputstyle} style={{ width: 250 }} />
              </Form.Item>
              <Form.Item
                label="Zip Code:"
                name="zipcode"
                className={styles.formitem}
              >
                <Input placeholder={zipCodePlaceholder} className={styles.inputstyle}   style={{ width: 250 }}/>
              </Form.Item>
              <Form.Item
                label="Job Title:"
                name="jobtitle"
                className={styles.formitem}
              >
                <Input placeholder={jobTitlePlaceholder} className={styles.inputstyle} style={{ width: 250 }} />
              </Form.Item>
              <Form.Item className={styles.formbutton}>
                <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
                  Search
                </Button>
              </Form.Item>
            </Form>        
            </div>
                <div className={styles.tabpag}>
                <div
                    style={{
                      marginBottom: 16,
                    }}
                  >
                    <Button type="primary" onClick={start} disabled={!hasSelected} loading={loading}>
                      Add Favorites
                    </Button>
                    <span
                      style={{
                        marginLeft: 8,
                      }}
                    >
                      {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                    </span>
                  </div>
                  {
                    justify === true ? 
                    <Table 
                    bordered='true'
                     rowSelection={rowSelection} columns={columns2} dataSource={companyInfo} hideOnSinglePage={true} size={'small'}
                     pagination = {{
                       defaultCurrent: 10 ,
                       total:companyInfo.length,
                       style:{ textAlign:'center', marginTop: '16px',size:'5px',justifyContent:'flex-end ' },
                     }}
                     className={styles.table}
                     />     
                    :
                    <Table 
                    bordered='true'
                     rowSelection={rowSelection} columns={columns} dataSource={companyInfo} hideOnSinglePage={true} size={'small'}
                     pagination = {{
                       defaultCurrent: 10 ,
                       total:companyInfo.length,
                       style:{ textAlign:'center', marginTop: '16px',size:'5px',justifyContent:'flex-end ' },
                     }}
                     className={styles.table}
                     />     
                  }
 
                  {/* <Pagination simple={true} total={10} className={styles.pagstyle} size={"small"} align={"center"}/> */}
            </div>
          </Content>
          <Footer className={styles.footer}>
              Created by SpongeBob Team
          </Footer>
        </Layout>
      // </div>

    )

}

export default CompanyInfo;
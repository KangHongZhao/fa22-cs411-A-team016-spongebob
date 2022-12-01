import React,{useState} from 'react';
import { Layout,Table,Menu, Button} from 'antd';


export const FavoriteTab = () =>{
    useState([]);

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [loading, setLoading] = useState(false);


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
		  dataIndex: 'jobtitle',
		  align:'center',
		  width:150
	  
		},
	  ];

	  const [companyInfo, setCompnayInfo] = useState([
        {
          key:1,
        companyname:"CNA",
        companyid:0,
        state:"Illinois",
        city:"Champaign",
        street:"708 Sth northe adafahdfuiosdhafiu",
        zipcode:61820,
        JobTitle:"SDE"
    },
    {
      key:2,
      companyname:"CNA",
      companyid:1,
      state:"Illinois",
      city:"Champaign",
      street:"708 Sth northe adafahdfuiosdhafiu",
      zipcode:61820,
      JobTitle:"SDE"
  },
  {
    key:3,
    companyname:"CNA",
    companyid:2,
    state:"Illinois",
    city:"Champaign",
    street:"708 Sth northe adafahdfuiosdhafiu",
    zipcode:61820,
    JobTitle:"SDE"
},
{
  key:4,
  companyname:"CNA",
  companyid:3,
  state:"Illinois",
  city:"Champaign",
  street:"708 Sth northe adafahdfuiosdhafiu",
  zipcode:61820,
  JobTitle:"SDE"
}   
]);

const start = () => {
	alert(selectedRowKeys);
	for (let index in selectedRowKeys){
		let tmp = companyInfo[index].JobTitle;
		alert(tmp)
	}
	setLoading(true);
	// ajax request after empty completing
	setTimeout(() => {
	  setSelectedRowKeys([]);
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



const handlenewSubmit = (values)=>{
//   submitCompanyName(values.companyname);
//   submitZipcode(values.zipcode);
//   submitJobTitle(values.jobtitle)
}


return(
    // className={styles.tabpag
    <div >
    <div
        style={{
          marginBottom: 16,
        }}
      >
        <Button type="primary" onClick={start} disabled={!hasSelected} loading={loading}>
          Delete Favorites
        </Button>
        <span
          style={{
            marginLeft: 8,
          }}
        >
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
        </span>
      </div>
      <Table 
           bordered='true'
            rowSelection={rowSelection} columns={columns} dataSource={companyInfo} hideOnSinglePage={true} size={'small'}
            pagination = {{
              defaultCurrent: 6 ,
              total:500,
              style:{ textAlign:'center', marginTop: '16px',size:'5px',justifyContent:'flex-end ' },

            }}
            // className={styles.table}
            />      
      {/* <Pagination simple={true} total={10} className={styles.pagstyle} size={"small"} align={"center"}/> */}
</div>
)

}
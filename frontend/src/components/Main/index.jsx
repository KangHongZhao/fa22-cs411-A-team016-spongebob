import React, { useState } from "react";
import axios from "axios";
import {
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	UploadOutlined,
	UserOutlined,
	VideoCameraOutlined,
  } from '@ant-design/icons';
import { Link, useNavigate } from "react-router-dom";
import { SearchOutlined,InfoCircleOutlined } from '@ant-design/icons';
import { FavoriteTab } from "../FavoriteTable/FavoriteTable";

import { Layout,Table,Menu} from 'antd';
const { Header, Content, Sider } = Layout;

const Main = () => {

	const [choice, setChoice] = useState(0);

	const [collapsed, setCollapsed] = useState(false);


	const [data, setData] = useState({
		UserId: "",
		NewPassword: "",
	});
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			// console.log(data.NewPassword);
			const url = `http://localhost:80/update_password?UserId=${encodeURIComponent(data.UserId)}&NewPassword=${encodeURIComponent(data.NewPassword)}`;
			const { data: res } = await axios.post(url, data);
			navigate("/login");
			console.log(res.message);
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

	const handleChoice=(p)=>{
		setChoice(p.key);
	}



	return (
		

		<div>
			    <Layout>
					<Sider trigger={null} collapsible collapsed={collapsed}>
						<div className="logo" />
						<h1 style={{color: 'white',paddingLeft: '23px',paddingTop:'10px',fontFamily:"sans-serif",fontSize:'20px'}}> Info</h1>
						<Menu
						theme="dark"
						mode="inline"
						defaultSelectedKeys={['1']}
						onClick={handleChoice}
						items={[
							{
								key: '1',
								icon: <InfoCircleOutlined />,
								label: 'Update Passward',
								},
							{
							key: '2',
							icon: <UserOutlined />,
							label: 'Favorite Companies',
							}

						]}
						/>
					</Sider>
						<Layout className="site-layout">
							<Header
							className="site-layout-background"
							style={{
								paddingLeft: '10px',
								marginTop:'-8px',
								fontSize:"18px",
								color: "white",
								
							}}
							>
							{React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
								className: 'trigger',
								onClick: () => setCollapsed(!collapsed),
							})}
							<Link to="/search" style={{color:"white",paddingLeft:"1335px",fontSize:'large'}}><SearchOutlined/></Link>
							</Header>
							<Content
							className="site-layout-background"
							style={{
								margin: '24px 16px',
								padding: 24,
								minHeight: 280,
							}}
							>
							{choice == 2 ? <FavoriteTab/>:
										<form onSubmit={handleSubmit}>
										<h1>Personal Information</h1>
										<input
											type="UserId"
											placeholder="UserId"
											name="UserId"
											onChange={handleChange}
											value={data.UserId}
										/>
										<input
											type="NewPassword"
											placeholder="NewPassword"
											name="NewPassword"
											onChange={handleChange}
											value={data.NewPassword}
										/>
										<button type="submit">
												reset password
										</button>
										<div>
										<Link to="/search">
										<button type = 'button'>
											go to search
										</button>
										</Link>
										</div>
									</form>
							}
						</Content>
					</Layout>
				</Layout>
		</div>
	);
};

export default Main;
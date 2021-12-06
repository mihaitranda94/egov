import "./App.css";
import "antd/dist/antd.css";
import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Divider,
  Layout,
  Menu,
  Breadcrumb,
} from "antd";

import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import FormSizeDemo from "./components/FormSizeDemo";
import Report from "./components/Report";
import {BrowserRouter as Router, Routes , Route, Link } from "react-router-dom";

const { Header, Content, Footer } = Layout;

function App() {
  return (
    <>
      <Layout className="layout" style={{ minHeight: "100vh" }}>
        <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
          
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["0"]}>
            <Menu.Item key="1">
              <Link to='/'>
                Home
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to='/report'>
                Report
              </Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to='/'>
                Form
              </Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Content
          className="site-layout"
          style={{ padding: "0 50px", marginTop: 64 }}
        >
          
          <Routes>
            <Route exact path='/' element={<FormSizeDemo></FormSizeDemo>}></Route>
            <Route exact path='/report' element={<Report/>}></Route>
          </Routes>
          {/* <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Buy Ticket</Breadcrumb.Item>
            <Breadcrumb.Item>User Form</Breadcrumb.Item>
          </Breadcrumb>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 380 }}
          >
            <h3>Bucharest Transport User Form</h3>
            <Divider></Divider>
            <FormSizeDemo></FormSizeDemo>
          </div> */}
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Demo Form © 2021 Created by Mihai Trandafirescu
        </Footer>
      </Layout>
    </>
  );
}

export default App;

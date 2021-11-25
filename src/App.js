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
  Switch,
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

const { Header, Content, Footer } = Layout;

function App() {
  return (
    <>
      <Layout className="layout" style={{ minHeight: "100vh" }}>
        <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
          
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["0"]}>
            <Menu.Item key="1">Home</Menu.Item>
            <Menu.Item key="2">About</Menu.Item>
            <Menu.Item key="3">Buy Ticket</Menu.Item>
          </Menu>
        </Header>
        <Content
          className="site-layout"
          style={{ padding: "0 50px", marginTop: 64 }}
        >
          <Breadcrumb style={{ margin: "16px 0" }}>
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
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Demo Form © 2021 Created by Mihai Trandafirescu
        </Footer>
      </Layout>
    </>
  );
}

export default App;

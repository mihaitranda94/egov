import React, { useEffect, useState } from "react";
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";
import axios from "axios";
import exportFromJSON from "export-from-json";
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';


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
  notification,
  Space,
  Card,
  Affix,
  Statistic,
} from "antd";

const FormSizeDemo = (props) => {
  const [componentSize, setComponentSize] = useState("default");
  const [firstName, setFirstName] = useState(undefined);
  const [lastName, setLastName] = useState(undefined);
  const [email, setEmail] = useState(undefined);
  const [metroSwitch, setMetroSwitch] = useState(false);
  const [busSwitch, setBusSwitch] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [selectValue, setSelectValue] = useState(0);
  const [adultTickets, setAdultTickets] = useState(0);
  const [studentTickets, setStudentTickets] = useState(0);
  const [childrenTickets, setChildrenTickets] = useState(0);
  const [age, setAge] = useState(undefined);
  const [price, setPrice] = useState(0);
  const [submit, setSubmit] = useState(undefined);

  const container = React.useRef(null);
  const pdfExportComponent = React.useRef(null);

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };

  const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#E4E4E4'
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1
    }
  });

  const MyDocument = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>Ticket type</Text>
        </View>
        <View style={styles.section}>
          <Text>Section #2</Text>
        </View>
      </Page>
    </Document>
  );

  const handleMetroChange = (checked) => {
    console.log(checked);
    setMetroSwitch(checked);
    if (checked === true && busSwitch === false) {
      setTickets([
        {
          label: "1 ride (2.5 RON)",
          value: 2.5,
        },
        {
          label: "2 rides (5 RON)",
          value: 5,
        },
        {
          label: "10 rides (25 RON)",
          value: 25,
        },
        {
          label: "1 month (45 RON)",
          value: 45,
        },
      ]);
    } else if (checked === false && busSwitch === false) {
      notification.warning({
        message: "Please choose a mode of transportation",
      });
      setTickets([]);
      setSelectValue(undefined);
    } else if (checked === true && busSwitch === true) {
      notification.error({
        message:
          "Cannot select both modes of transportation. (different companies)",
      });
      setTickets([]);
      setSelectValue(undefined);
    } else {
      setTickets([
        {
          label: "24h (5 RON)",
          value: 5,
        },
        {
          label: "72h (12 RON)",
          value: 12,
        },
        {
          label: "7 DAYS (25 RON)",
          value: 25,
        },
        {
          label: "1 month (50 RON)",
          value: 50,
        },
        {
          label: "6 months (150 RON)",
          value: 150,
        },
        {
          label: "12 months (500 RON)",
          value: 500,
        },
      ]);
    }
  };

  const handleBusChange = (checked) => {
    console.log(checked);
    setBusSwitch(checked);
    if (checked === false && metroSwitch === true) {
      setTickets([
        {
          label: "1 ride (2.5 RON)",
          value: 2.5,
        },
        {
          label: "2 rides (5 RON)",
          value: 5,
        },
        {
          label: "10 rides (25 RON)",
          value: 25,
        },
        {
          label: "1 month (45 RON)",
          value: 45,
        },
      ]);
    } else if (checked === false && metroSwitch === false) {
      notification.warning({
        message: "Please choose a mode of transportation",
      });
      setTickets([]);
      setSelectValue(undefined);
    } else if (checked === true && metroSwitch === true) {
      notification.error({
        message:
          "Cannot select both modes of transportation. (different companies)",
      });
      setTickets([]);
      setSelectValue(undefined);
    } else {
      setTickets([
        {
          label: "24h (5 RON)",
          value: 5,
        },
        {
          label: "72h (12 RON)",
          value: 12,
        },
        {
          label: "7 DAYS (25 RON)",
          value: 25,
        },
        {
          label: "1 month (50 RON)",
          value: 50,
        },
        {
          label: "6 months (150 RON)",
          value: 150,
        },
        {
          label: "12 months (500 RON)",
          value: 500,
        },
      ]);
    }
  };

  const handleSelectChange = (selectedValue) => {
    console.log(selectedValue);

    setSelectValue(selectedValue);
  };

  const handleAgeChange = (value) => {
    setAge(value);
  };

  const handleSubmit = async () => {
    console.log(firstName.target.value + lastName.target.value);
    console.log(email.target.value);
    console.log(age);
    console.log(busSwitch);
    console.log(parseInt(adultTickets + studentTickets + childrenTickets));
    const body = {
      firstName: firstName.target.value,
      lastName: lastName.target.value,
      email: email.target.value,
      age: age,
      ticketType: busSwitch ? "bus" : "metro",
      adultsTickets: adultTickets,
      studentsTickets: studentTickets,
      childrenTickets: childrenTickets,
      price: price
    };
    const data = [
      { firstname: firstName.target.value.toString() },
      { lastname: lastName.target.value.toString() },
      { email: email.target.value.toString() },
      { age: age.toString() },
      { tickettype: busSwitch ? "bus" : "metro" },
      {
        numberOftickets: (
          adultTickets +
          studentTickets +
          childrenTickets
        ).toString(),
      },
    ];
    const daba = [{ foo: "foo" }, { bar: "bar" }];
    console.log(daba);
    console.log(data);
    const exportType = "xml";
    const fileName = props.fileName ? props.fileName : "exported";
    let fields = props.fields ? props.fields : [];
    const xml_resp = exportFromJSON({ data, fileName, exportType });
    console.log(xml_resp);

    const response = await axios.post("http://localhost:3001/form", body);
    console.log(response);

    if (response.status !== 200) {
      notification.error({
        message: "Something went wrong while sending the form data",
      });
    } else {
      notification.success({
        message: "The form data has been successfully sent to the database",
      });
    }
  };

  const exportPDFWithMethod = () => {
    let element = container.current || document.body;
    savePDF(element, {
      paperSize: "auto",
      margin: 40,
      fileName: `Report for ${new Date().getFullYear()}`,
    });
    notification.success({
      message: "Current form was exported as a PDF on your system.",
    });
  };

  useEffect(() => {
    if (submit) {
      handleSubmit();
      setSubmit(false);
    }
  }, [submit]);

  return (
    <>
      <Affix offsetTop={100}>
        <Button type="primary" onClick={exportPDFWithMethod}>
          Export to PDF
        </Button>
      </Affix>
      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        initialValues={{
          size: componentSize,
        }}
        onValuesChange={onFormLayoutChange}
        size={componentSize}
        validateMessages={validateMessages}
      >
        <Form.Item label="Form Size" name="size">
          <Radio.Group>
            <Radio.Button value="small">Small</Radio.Button>
            <Radio.Button value="default">Default</Radio.Button>
            <Radio.Button value="large">Large</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Divider />
        <Form.Item
          label="First Name"
          name={["user", "firstName"]}
          rules={[{ required: true }]}
        >
          <Input
            onChange={(value) => {
              setFirstName(value);
            }}
          />
        </Form.Item>
        <Form.Item
          label="Last Name"
          name={["user", "lastName"]}
          rules={[{ required: true }]}
        >
          <Input
            onChange={(value) => {
              setLastName(value);
            }}
          />
        </Form.Item>
        <Form.Item
          label="Email"
          name={["user", "email"]}
          rules={[{ type: "email", required: true }]}
        >
          <Input
            onChange={(value) => {
              setEmail(value);
            }}
            type="email"
          ></Input>
        </Form.Item>
        <Divider />
        <p>Ticket will be valid for</p>
        <Form.Item label="Metro">
          <Switch checked={metroSwitch} onChange={handleMetroChange}></Switch>
        </Form.Item>
        <Form.Item label="Bus">
          <Switch checked={busSwitch} onChange={handleBusChange}></Switch>
        </Form.Item>
        <Divider />
        <Form.Item label="Select Type of Ticket">
          <Select
            allowClear={true}
            value={selectValue}
            options={tickets}
            onChange={handleSelectChange}
          ></Select>
        </Form.Item>
        <Form.Item label="Number of tickets">
          <Card title="Adults" style={{ width: 250 }}>
            <InputNumber
              onChange={(value) => {
                setPrice(selectValue * adultTickets + 0.2 * selectValue * studentTickets)
                setAdultTickets(value)}}
              min={0}
              max={20}
              addonAfter="Adults"
              defaultValue={0}
            />
          </Card>
          <Card title="Students (20% discount)" style={{ width: 250 }}>
            <InputNumber
              onChange={(value) => {
                setPrice(selectValue * adultTickets + 0.2 * selectValue * studentTickets)
                setStudentTickets(value)}}
              min={0}
              max={20}
              addonBefore="Students"
              defaultValue={0}
            />
          </Card>
          <Card title="Children (< 12 FREE) " style={{ width: 250 }}>
            <InputNumber
              onChange={(value) => {
                
                setChildrenTickets(value)}}
              min={0}
              max={20}
              addonBefore="Children"
              defaultValue={0}
            />
          </Card>
        </Form.Item>
        <Form.Item
          label="Age"
          name={["user", "tickets"]}
          rules={[{ type: "number", min: 1, max: 99 }]}
        >
          <InputNumber onChange={(value) => setAge(value)} />
        </Form.Item>
        <Form.Item
          name={["user", "tickets"]}
          rules={[{ type: "number", min: 1, max: 99 }]}
        >
          <Statistic
            title="Transaction"
            value="Pending"
            style={{
              marginRight: 32,
              marginLeft: 240,
              marginTop: 10,
              marginBottom: 10,
            }}
          />
          <Statistic
            title="Price"
            suffix="RON"
            value={
              price
            }
            style={{
              marginRight: 32,
              marginLeft: 240,
              marginTop: 10,
              marginBottom: 10,
            }}
          />
        </Form.Item>
        <Form.Item label="Agree to Privacy Policy" valuePropName="checked">
          <Switch
            
          />
        </Form.Item>
        <Form.Item label="Submit Data">
          <Button
            onClick={() => {
              setSubmit(true);
            }}
          >
            Confirm
          </Button>
        </Form.Item>
      </Form>
      
    </>
  );
};

export default FormSizeDemo;

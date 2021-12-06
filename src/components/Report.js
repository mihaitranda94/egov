import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";
import axios from "axios";
import { Divider } from "antd";

export default function Report() {
  const [adultTickets, setAdultTickets] = useState(0);
  const [studentTickets, setStudentTickets] = useState(0);
  const [childrenTickets, setChildrenTickets] = useState(0);
  const [adultTickets2, setAdultTickets2] = useState(0);
  const [studentTickets2, setStudentTickets2] = useState(0);
  const [childrenTickets2, setChildrenTickets2] = useState(0);
  const [ages, setAges] = useState([]);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Tickets details by mode of transportation",
      },
    },
  };

  const options2 = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Total Spent on Tickets Grouped by Age",
      },
    },
  };

  const getData = async () => {
    const respData = await axios.get("http://localhost:3001/");
    console.log(respData.data);

    const adults = respData.data.map(function (val, idx) {
      if (val.tickettype === "metro") {
        return val.adultstickets;
      } else return null;
    });
    const adults2 = respData.data.map(function (val, idx) {
      if (val.tickettype === "bus") {
        console.log(val.adultstickets);
        return val.adultstickets;
      } else return null;
    });
    const adultsCount = adults.reduce(function (a, b) {
      return a + b;
    }, 0);
    const adultsCount2 = adults2.reduce(function (a, b) {
      return a + b;
    }, 0);
    setAdultTickets(adultsCount);
    setAdultTickets2(adultsCount2);

    const students = respData.data.map(function (val, idx) {
      if (val.tickettype === "metro") {
        return val.studentstickets;
      } else return null;
    });
    const students2 = respData.data.map(function (val, idx) {
      if (val.tickettype === "bus") {
        return val.studentstickets;
      } else return null;
    });
    const studentsCount = students.reduce(function (a, b) {
      return a + b;
    }, 0);
    const studentsCount2 = students2.reduce(function (a, b) {
      return a + b;
    }, 0);
    setStudentTickets(studentsCount);
    setStudentTickets2(studentsCount2);

    const children = respData.data.map(function (val, idx) {
      if (val.tickettype === "metro") {
        return val.childrentickets;
      } else return null;
    });
    const children2 = respData.data.map(function (val, idx) {
      if (val.tickettype === "bus") {
        console.log(val.childrentickets);
        return val.childrentickets;
      } else return null;
    });
    const childrenCount = children.reduce(function (a, b) {
      return a + b;
    }, 0);
    const childrenCount2 = children2.reduce(function (a, b) {
      return a + b;
    }, 0);
    setChildrenTickets(childrenCount);
    setChildrenTickets2(childrenCount2);

    let ages = []
    for (var e in respData.data){
        let findResult = ages.find(({age}) => age === respData.data[e].age ) 
        if( findResult === undefined ){
            ages.push({age: respData.data[e].age, price: respData.data[e].price, i: ages.length})
            console.log("adaugam " + respData.data[e].age)
        } else{
            console.log(ages[respData.data[e].age] + " vs " + respData.data[e].age)
            ages[findResult.i].price = ages[findResult.i].price + respData.data[e].price
        }
    }
    console.info(ages)
    setAges(ages)
  };

  const labels = ["METRO", "BUS"];

  useEffect(() => {
    getData();
  }, []);

  const data = {
    labels,
    datasets: [
      {
        label: "Adult Tickets",
        data: [adultTickets, adultTickets2],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Student Tickets",
        data: [studentTickets, studentTickets2],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "Children Tickets",
        data: [childrenTickets, childrenTickets2],
        borderColor: "rgb(25, 99, 132)",
        backgroundColor: "rgba(25, 99, 132, 0.5)",
      },
    ],
  };

  ChartJS.register(ArcElement, Tooltip, Legend);


  const data2 = {
    labels: ages.map((val, index) => 'Age ' +  val.age),
    datasets: [
      {
        label: 'Total Spent on Tickets Grouped by Age',
        data: ages.map((val, index) => val.price),
        backgroundColor: ages.map((val, index) => `rgba(${Math.random() * (254 - 100) + 100}, ${Math.random() * (254 - 100) + 100}, ${Math.random() * (254 - 100) + 100})`),
        borderWidth: 0,
      },
    ],
  };

  return (
    <>
      <Bar options={options} data={data} style={{ height: 100, width: 100 }} />
      <Divider></Divider>
      <Doughnut options={options2}  data={data2} /> 
    </>
  );
}

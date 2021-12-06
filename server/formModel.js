const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "lab1_egov",
  password: "",
  port: 5432,
});

const getForm = () => {
  return new Promise(function (resolve, reject) {
    pool.query("SELECT * FROM form ", (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });
};
const createForm = async (body) => {
  return new Promise(function (resolve, reject) {
    const { firstName, lastName, email, age, ticketType, adultsTickets, studentsTickets, childrenTickets, price } = body;
    pool.query(
      "INSERT INTO form (firstname, lastname, email, age, tickettype, adultsTickets, studentsTickets, childrenTickets, price) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
      [firstName, lastName, email, age, ticketType, adultsTickets, studentsTickets, childrenTickets, price],
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(`A new form has been added: ${results}`);
      }
    );
  });
};
const deleteForm = () => {
  return new Promise(function (resolve, reject) {
    const id = parseInt(request.params.id);
    pool.query(
      "DELETE FROM form WHERE id = $1",
      [id],
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(`form deleted with ID: ${id}`);
      }
    );
  });
};

module.exports = {
  getForm,
  createForm,
  deleteForm,
};

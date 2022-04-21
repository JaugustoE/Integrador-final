const pool = require("../db");

//funcion para traer datos

const getProducts = async () => {
  try {
    const query = "select * FROM products";
    const rows = await pool.query(query);
    return rows;
  } catch (error) {
    console.log(error);
  }
};
//Funcion para traer un producto segun su id

const getProduct = async (id) => {
  try {
    const query = "select * FROM products where id = ?";
    const row = await pool.query(query, [id]);
    return row;
  } catch (errr) {
    console.log(error);
  }
};

const addProduct = async (data) => {
  try {
    const query = "insert into products set ?";
    const row = await pool.query(query, [data]);
    return row;
  } catch (error) {
    console.log(error);
  }
};

const deleteProduct = async (id) => {
  const query = "delete FROM products where id = ?";
  const row = await pool.query(query, [id]);
  return row;
};

// func para modificar un registro en la BD, recibe un objeto con los nuevos
//valores y el id
async function modifyProduct(data, id) {
  try {
    const query = "update products set ? where id = ?";
    const row = await pool.query(query, [data, id]);
    return row;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getProducts,
  addProduct,
  getProduct,
  deleteProduct,
  modifyProduct,
};

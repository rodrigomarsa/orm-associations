const { Address, Employee } = require('../models/');
const Sequelize = require('sequelize');
const config = require('../config/config');

const env = process.env.NODE_ENV || 'development';
// Ajustamos para usar a configuração correta para nosso ambiente
const sequelize = new Sequelize(config[env]);

const getAll = async () => {
  const users = await Employee.findAll({
    include: { model: Address, as: 'addresses' },
  });

  return users;
};

// Eager Loading
// const getById = async (id) => {
//   const employee = await Employee.findOne({
//       where: { id },
//       include: [{
//         model: Address, as: 'addresses', attributes: { exclude: ['number'] },
//       }],
//     });
//   return employee;
// };

// Lazy Loading
const getById = async (id) => {
  const employee = await Employee.findOne({
    where: { id },
  });
  return employee;
};

// Lazy Laoding 1
// Employee.findAll().then((employees) => {
//   employees.forEach((employee) => {
//     console.log(employee);
//   });
// });

// Lazy Loading 2
// Employee.findAll().then((employees) => {
//   employees
//     .filter((employee) => employee.firstName === 'Fred')
//     .forEach((employee) => {
//       Address.findAll({ where: { employee_id: employee.id }})
//         .then((addresses) => {
//           console.log(`${employee.firstName} ${employee.lastName}:`);
//           console.log(addresses);
//         });
//     });
// });

const insert = async ({ firstName, lastName, age, city, street, number }) => {
  const result = await sequelize.transaction(async (t) => {
    const employee = await Employee.create({
      firstName, lastName, age
    }, { transaction: t });

    await Address.create({
      city, street, number, employeeId: employee.id
    }, { transaction: t });
    return employee;
  });

  return result;
  // Se chegou até aqui é porque as operações foram concluídas com sucesso,
  // não sendo necessário finalizar a transação manualmente.
  // `result` terá o resultado da transação, no caso um empregado e o endereço cadastrado
};

module.exports = {
  getAll,
  getById,
  insert,
 };
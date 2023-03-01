const { Address, Employee } = require('../models/');

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

module.exports = {
  getAll,
  getById,
 };
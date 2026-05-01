const Role = require('./schemas/roles.schema');

exports.findByRoleCode = async (code) => {
  const role = await Role.findOne({ code: code, isActive: true });
  return role;
};

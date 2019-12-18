'use strict'
const db = require('../config/sequelize.config')
const generalHelpingMethods = require('./general.helper')

// Get Roles against companyId
function getRoles (companyId, permissions) {
  // Check if user has permissions to perform an action (get role)
  const hasPermission = generalHelpingMethods.checkIfUserHasPermission('teamManagement', permissions)
  if (!hasPermission) {
    // User has no permission
    return generalHelpingMethods.rejectPromise([{
      field: '',
      error: 5047,
      message: 'User has no permission to get roles.'
    }])
  }
  return db.User.findOne({
    _id: companyId,
    isDeleted: false
  })
    .then(company => {
      if (!company) {
        return generalHelpingMethods.rejectPromise([{
          field: 'companyId',
          error: 5048,
          message: 'Company not exists against given companyId.'
        }])
      }
      return db.Role.find({
        CompanyId: companyId,
        isDeleted: false
      })
    })
    .catch(generalHelpingMethods.catchException)
}

// Add role
function addRole (userId, companyId, userPermissions, input) {
  // Check if user has permissions to perform an action (add role)
  const hasPermission = generalHelpingMethods.checkIfUserHasPermission('teamManagement', userPermissions)
  if (!hasPermission) {
    // User has no permission
    return generalHelpingMethods.rejectPromise([{
      field: '',
      error: 5508,
      message: 'User has no permission to create a role.'
    }])
  }

  // Find company, check if it is exits in db or not
  return db.User.findOne({
    _id: companyId,
    isDeleted: false
  })
    .then(company => {
      if (!company) {
        return generalHelpingMethods.rejectPromise([{
          field: 'CreatedBy',
          error: 5516,
          message: 'Company not exists against given CreatedBy.'
        }])
      }

      // Find role, if it is already exists or not
      return db.Role.findOne({
        name: input.name,
        CompanyId: companyId,
        isDeleted: false
      })
    })
    .then(role => {
      if (role) {
        // Role already found against same company
        // Return with error of role already exists
        return generalHelpingMethods.rejectPromise([{
          field: 'name',
          error: 5507,
          message: 'Role with same name already exists.'
        }])
      }

      // Create new role
      return db.Role.create({
        name: input.name,
        description: input.description,
        permissions: input.permissions,
        CreatedBy: userId,
        CompanyId: companyId,
        isActive: true,
        isDeleted: false
      })
    }).then(createdRole => {

      // return created role
      return createdRole
    })
    .catch(generalHelpingMethods.catchException)
}

// update Role
function updateRole (userId, userCompanyId, userPermissions, roleId, updateRoleData) {
  // Check if user has permissions to perform an action (delete role)
  const hasPermission = generalHelpingMethods.checkIfUserHasPermission('teamManagement', userPermissions)
  if (!hasPermission) {
    // User has no permission
    return generalHelpingMethods.rejectPromise([{
      field: '',
      error: 5547,
      message: 'User has no permission to update a role.'
    }])
  }

  // Assign companyId
  // userCompanyId have value only if logged in user is employee,
  // otherwise it will be null or undefined and the logged in user will be an admin
  const companyId = userCompanyId || userId

  return db.Role.findOne({
    _id: roleId,
    CompanyId: companyId,
    isDeleted: false
  })
    .then(async role => {
      if (!role) {
        // No role found to update, return error.
        return generalHelpingMethods.rejectPromise([{
          field: '',
          error: 5548,
          message: 'No role found to update.'
        }])
      }

      // Update role, and save
      role.set(updateRoleData)
      await role.save()

      // Return role
      return role
    })
    .catch(generalHelpingMethods.catchException)
}

// delete Role
function deleteRole (userId, userCompanyId, userPermissions, roleId, password) {
  // Check if user has permissions to perform an action (delete role)
  const hasPermission = generalHelpingMethods.checkIfUserHasPermission('teamManagement', userPermissions)
  if (!hasPermission) {
    // User has no permission
    return generalHelpingMethods.rejectPromise([{
      field: '',
      error: 5545,
      message: 'User has no permission to delete a role.'
    }])
  }

  return db.User.findOne({
    _id: userId,
    isDeleted: false
  })
    .then(user => {
      // Check user enter a valid password or not
      if (!user.authenticate(password)) {
        return generalHelpingMethods.rejectPromise([{
          field: '',
          error: 5553,
          message: 'Invalid password.'
        }])
      }

      // Assign companyId
      // userCompanyId have value only if logged in user is employee,
      // otherwise it will be null or undefined and the logged in user will be an admin
      const companyId = userCompanyId || userId

      // Find role
      return db.Role.findOne({
        _id: roleId,
        CompanyId: companyId,
        isDeleted: false
      })
    })
    .then(role => {
      if (!role) {
        // No role found to delete, return error.
        return generalHelpingMethods.rejectPromise([{
          field: '',
          error: 5546,
          message: 'No role found to delete.'
        }])
      }

      // Role found, update role isDelete to true and save.
      role.isDeleted = true
      role.save()

      // Return role
      return role
    })
    .catch(generalHelpingMethods.catchException)
}

module.exports = {
  addRole,
  getRoles,
  updateRole,
  deleteRole
}

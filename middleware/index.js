const auth = require('./auth'),
    customerAuth = require('./customerAuth'),
    grantAccess = require('./grantAccess'),
    permissionAccess = require('./permissionAccess')


module.exports = {
    Auth: auth,
    customerAuth: customerAuth,
    GrantAccess: grantAccess,
    permissionAccess :permissionAccess
}
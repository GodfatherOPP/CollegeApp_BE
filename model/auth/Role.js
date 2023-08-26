const mongoose = require('mongoose')

const RoleSchema = mongoose.Schema({
    id: {
        type: Number
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String
    }
})

// export model Role with RolesSchema
module.exports = mongoose.model('Role', RoleSchema)
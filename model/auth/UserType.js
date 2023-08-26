const mongoose = require('mongoose')

const UserTypeSchema = mongoose.Schema({
    id: {
        type: Number
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    user_type: {
        type: String
    }
})

// export model Role with RolesSchema
module.exports = mongoose.model('UserType', UserTypeSchema)
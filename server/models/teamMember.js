var mongoose = require('mongoose');

var teamMemberSchema = mongoose.Schema({
    name: String,
    email: String,
    image: String,
    created_at: Date,
    updated_at: Date
});


teamMemberSchema.pre('save', function(next) {
    now = new Date();
    this.updated_at = now;
    if (!this.created_at) {
        this.created_at = now;
    }
    next();
});

module.exports = mongoose.model('TeamMember', teamMemberSchema);
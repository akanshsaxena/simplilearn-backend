const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    courseId: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('courses', courseSchema);
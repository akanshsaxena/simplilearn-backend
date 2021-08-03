const router = require("express").Router();
const User = require("../model/User");
const Course = require("../model/Course")
router.post("/add", async (req, res) => {
    const {
        userId,
        courseId
    } = req.body
    const ifCourseAlreadyAdded = await Course.findOne({
        userId,
        courseId
    })
    if (ifCourseAlreadyAdded) return res.json({
        status: "failure",
        message: "Course already purchased"
    })
    else {
        try {
            const newCourse = new Course({
                userId,
                courseId
            })
            const addNewCourse = await newCourse.save();
            if (addNewCourse) return res.json({
                status: "success",
                message: "Course purchased successfully. Visit 'My Courses' to checkout all courses"
            })
        } catch (err) {
            return res.json({
                status: "failure",
                message: "Something went wrong"
            })
        }
    }
})

router.get("/getAllCourse", async (req, res) => {
    const {
        userId
    } = req.query
    if (userId === "") return res.json({
        status: "failure",
        message: "Please provide user details"
    })
    else {
        try {
            const getCourse = await Course.find({
                userId
            })
            return res.json([...getCourse])
        } catch (err) {
            return res.json({
                status: "failure",
                message: "Something went wrong"
            })
        }
    }
})

module.exports = router
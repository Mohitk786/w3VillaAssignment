const express = require("express")
const router = express.Router()

const {login,signup} = require("../controllres/auth")
const {addTask, updateTask, fetchUsers, deleteTask, addList, deleteList, fetchTaskLists, fetchAllLists, deleteUser, getAssignedTasks} = require("../controllres/taskMangement")

const {auth, isAdmin} = require("../middlewares/auth")

router.post("/auth/login", login)
router.post("/auth/signup", signup)

router.post('/addTaskList', auth,  addList)
router.delete('/deleteList/:listId', auth, deleteList)
router.get('/taskLists', auth, fetchTaskLists)

router.post('/add-task/:listId',auth, addTask)
router.put('/task/update/:taskId',auth, updateTask)
router.delete('/task/delete/:taskId',auth, deleteTask)
router.get('/tasks/assignedTasks', auth, getAssignedTasks)

router.get('/users',auth,  fetchUsers)
router.get('/all-tasks', auth, isAdmin, fetchAllLists)
router.delete('/delete-user/:userId', auth, isAdmin, deleteUser)


module.exports = router
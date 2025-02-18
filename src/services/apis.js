const BASE_URL = "https://task-management-p5e8.onrender.com"


export const Authendpoints = {
    SIGNUP_API: BASE_URL + "/auth/signup",
    LOGIN_API: BASE_URL + "/auth/login",
}


export const TaskListEndpoints = {
  FETCH_TASK_LIST: BASE_URL+"/taskLists",
  ADD_TASK_LIST: BASE_URL+"/addTaskList",
  DELETE_LIST: BASE_URL+`/deleteList`,
  GET_ALL_LISTS:BASE_URL+`/all-tasks`,
}

export const TASK_Endpoints = {
  ADD_TASK: BASE_URL+`/add-task`,
  DELETE_TASK: BASE_URL+`/task/delete`,
  UPDATE_TASK: BASE_URL+`/task/update`,
  GET_ASSIGNED_TASKS:BASE_URL+`/tasks/assignedTasks`
}

export const User_EndPoints={
  GET_ALL_USERS: BASE_URL+'/users',
  DELETE_USER : BASE_URL+'/delete-user'
}


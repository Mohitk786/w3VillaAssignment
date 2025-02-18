import { toast } from "react-hot-toast"
import { apiConnector } from "../apiconnector"
import { Authendpoints, TaskListEndpoints, TASK_Endpoints, User_EndPoints } from "../apis"


const {
  GET_ALL_USERS,
  DELETE_USER
} = User_EndPoints


const {
  SIGNUP_API,
  LOGIN_API,
} = Authendpoints

const {
  DELETE_LIST,
  ADD_TASK_LIST,
  FETCH_TASK_LIST,
  GET_ALL_LISTS
} = TaskListEndpoints


const {
  ADD_TASK,
  UPDATE_TASK,
  DELETE_TASK,
  GET_ASSIGNED_TASKS
} = TASK_Endpoints

export function signUp(
    {accountType,
    firstName,
    lastName,
    email,
    password,
    confirmPassword}, navigate
   
  ) {
    return async () => {
      const toastId = toast.loading("Loading...")
      try {
        
        const response = await apiConnector("POST", SIGNUP_API, {
          accountType,
          firstName,
          lastName,
          email,
          password,
          confirmPassword,
        })

  
        if (!response?.data?.success) {
          throw new Error(response?.data?.message)
        }
  
        toast.success("Signup Successfull")
        toast.dismiss(toastId)
        navigate("/login")
        
      } catch (error) {
        toast.error(error.response?.data.message)
        toast.dismiss(toastId)
        navigate("/signup")
      }
    }
}

export function login(email, password, navigate) {
  return async () => {
    const toastId = toast.loading("Loading...")
    
    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      })


      if (!response?.data.success) {
        throw new Error(response?.data.message)
      }

      toast.success("Login Successful")
      
      localStorage.setItem("token", JSON.stringify(response?.data.token))
      localStorage.setItem("user", JSON.stringify(response?.data.user))
      toast.dismiss(toastId)
      navigate("/")

    }catch (error) {
      toast.dismiss(toastId)
      toast.error(error?.response?.data?.message);
      console.log("LOGIN API ERROR", error.message)
    }
    
  }
}



//TASK LIST OPERATIONS

export function deleteList(listId){
  return async ()=> {
    try {
      await apiConnector("DELETE", `${DELETE_LIST}/${listId}`);
      toast.success("List deletd successfully")

    } catch (error) {
      console.error("Error deleting task list:", error);
  }
}
}

export function addList(name, taskLists, setTaskLists){
  return async()=>{
      try {
        const response = await apiConnector("POST", ADD_TASK_LIST, {name} )
        const newTask = await response?.data;
        setTaskLists([...taskLists, newTask]); 
      } catch (error) {
        console.error("Error adding task:", error);
      }
  }
}

export function getUserLists(setTaskLists){
  return async ()=>{
    try {
      const response = await apiConnector("GET", FETCH_TASK_LIST)
      const taskLists = response?.data.taskLists
      setTaskLists(taskLists); 
    } catch (error) {
      console.error("Error fetching task lists:", error.message);
    }
  }
}

export function getAllLists(setAllTasks){
  return async()=>{
    try{
      const allLists = await apiConnector("GET", GET_ALL_LISTS)
      setAllTasks(allLists.data)

    }catch(err){
      console.log(err.message);
    }
  }
}


//TASK OPERATIONS
export  function AddTask(setTasks, tasks, formData, taskList) {
  return async () => {
    const toastId = toast.loading("Please wait");
    try {
      const response = await apiConnector("POST", `${ADD_TASK}/${taskList._id}`, {formData});  // Await the apiConnector call
      const newTask = await response?.data;
      
      if (!newTask || !newTask._id) {
        throw new Error("Invalid task data from the server");
      }
      setTasks([...tasks, newTask]); 
      toast.dismiss(toastId);
      toast.success("Task added successfully");

    } catch (error) {
      toast.dismiss(toastId);
      toast.error(error.response?.data.message);
      console.error("Error adding task:", error);
    }
  }
}

export function updateTask(taskId, newStatus, setTasks, tasks){
  return async () => {
      try {
        await apiConnector("PUT", `${UPDATE_TASK}/${taskId}`,  {newStatus});
        setTasks(
          tasks.map((task) =>
            task._id === taskId ? { ...task, status: newStatus } : task
          )
        );
      } catch (error) {
        console.error("Error updating task status:", error);
    };
  }
}

export function DeleteTask(taskId, tasks, setTasks){
  return async () => {
    const updatedTasks = tasks.filter((task) => task._id !== taskId);
    setTasks(updatedTasks)
    try {
      await apiConnector("DELETE", `${DELETE_TASK}/${taskId}`)
      toast.success("Task removed successfully")
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };
}



//all users
export function getAllUsers(setAllUsers){
  return async () => {
   
    try{
      const users = await apiConnector("GET", GET_ALL_USERS);
      setAllUsers(users.data);

    }catch(err){
      console.log(err.message)
    }
  }
}

export function DeleteUser(userId, allUsers, setAllUsers){
  return async () => {
    const rest_users = allUsers.filter(user => user._id !== userId);
    setAllUsers(rest_users);
    try{
      await apiConnector("DELETE", `${DELETE_USER}/${userId}`);
      toast.success("User Deleted successfully")

    }catch(err){
      console.log(err.message)
    }
  }
}

export function getAssignedTasks(setAssignedTasks){
  return async () => {
    try{
      console.log("making call")
      const response = await apiConnector("GET", GET_ASSIGNED_TASKS);
      setAssignedTasks(response?.data.data);
      
    }catch(err){
      toast.error(err.response?.data.message)
    }
  }
}

import ProtectedRoute from "./components/ProtectedRoute";
import TaskManagement from "./components/TaskManagement";
import AdminDashboard from "./components/Admin/AdminDashboard"
import Login from "./pages/Login";
import Signup from "./pages/Signup"
import { Route, Routes } from "react-router-dom";

function App(){
  return (
    <div>
      <Routes>
        <Route  path="/" element={
          <ProtectedRoute>
              <TaskManagement/>
          </ProtectedRoute>
          } 
        />

        <Route path="/admin" element={
          <ProtectedRoute path={"/admin"}>
            <AdminDashboard/>
          </ProtectedRoute>
        }
        />
          
        
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>} />
      </Routes>
    </div>
  );
};


export default App;
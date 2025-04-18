import Newtask from "../components/Newtask";
import Thetask from "../components/Thetask";
import { useState, useEffect } from "react";
import api from "../api";

export default function Homepage(){
    const [task, setTask] = useState([]);
    const [title, setTitle] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [currentTaskId, setCurrentTaskId] = useState(null);

    useEffect(() => {
        getTask();
    }, []);
    
    const getTask = () => {
        api
          .get("/api/tasks/")
          .then((res) => res.data)
          .then((data) => {
            const sorted = data.sort((a, b) => {
              const dateA = new Date(`${a.created_date}T${a.created_time}`);
              const dateB = new Date(`${b.created_date}T${b.created_time}`);
              return dateB - dateA; 
            });
            setTask(sorted);
          })
          .catch((err) => alert(err));
    };

    const onGoingTask = task.filter((task) => task.status === "on_going");
    const completedTask = task.filter((task) => task.status === "completed");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!title.trimEnd()) return;
        if(!isEditing){
          try {
            const res = await api.post("/api/tasks/", { title });
            if (res.status === 201) {
              alert("Task created successfully");
              setTitle(""); 
              getTask();  
            } else {
              alert("Failed to create task");
            }
          } catch (error) {
            console.error("Create error:", error);
            if (error.response && error.response.data) {
              alert(`Error: ${JSON.stringify(error.response.data)}`);
            } else {
              alert("Something went wrong");
            }
          }
        }else{
            const updatedTasks = task.map(task =>
              task.id === currentTaskId ? { ...task, title } : task
            );
            setTask(updatedTasks);
            setIsEditing(false);
            setTitle("");
            setCurrentTaskId(null);
          };
        }
      
        const handleEdit = (id) => {
          const taskToEdit = task.find(task => task.id === id);
          if (taskToEdit) {
            setTitle(taskToEdit.title);
            setIsEditing(true);
            setCurrentTaskId(id);
          }
        };

    const deleteTask = async (id) => {
        try {
          const res = await api.delete(`/api/tasks/${id}/`);
          if (res.status === 204 || res.status === 200) {
            alert("Task deleted successfully");
            getTask();  // refresh setelah berhasil
          } else {
            alert("Failed to delete task");
          }
        } catch (error) {
          // console.error("Delete error:", error);
          alert("Error deleting task");
        }
      };

      
      
      const updateStatus = async (id) =>{
        const taskById = task.find((task) => task.id === id);
        if(!taskById) return;

        try {
          const res = await api.patch(`/api/tasks/${id}/`, { status: "completed" });
          if (res.status === 204 || res.status === 200) {
            alert("Task updated successfully");
            getTask();  // refresh setelah berhasil
          } else {
            alert("Failed to update task");
          }
        } catch (error) {
          console.error("update error:", error);
          alert("Error update task");
        }
      }

      const state= {task, setTask, title, setTitle, isEditing, setIsEditing, currentTaskId, setCurrentTaskId, handleEdit};

    return(
        <div className="flex flex-col items-center justify-start h-screen w-full">
            <label className="font-sm text-5xl my-10">Task Management</label>
            <div className="flex flex-col justify-center w-9/12">
                <Newtask onsubmit={handleSubmit} content={state}/>
                <div>
                    <label className="font-extrabold">Ongoing Task</label>
                    <div className="flex flex-col items-start w-full">
                        {onGoingTask.map((task) => (
                            <Thetask key={task.id} content={task} state={state} ondelete={deleteTask} updateStatus={updateStatus}/>
                        ))}
                    </div>
                </div>
                <div>
                    <label className="font-extrabold">Completed Task</label>
                    <div className="flex flex-col items-start w-full">
                        {completedTask.map((task) => (
                            <Thetask key={task.id} content={task} state={state} ondelete={deleteTask} updateStatus={updateStatus}/>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
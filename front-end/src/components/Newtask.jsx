import { useEffect } from "react";
import Button from "./Button";

export default function Newtask({onsubmit, content}){

    const {
        title, 
        setTitle, 
        isEditing, 
        setIsEditing, 
        currentTaskId, 
        setCurrentTaskId
    } = content;

    
      
      const handleCancel = () => {
        setIsEditing(false);
        setTitle("");
        setCurrentTaskId(null);
      };
      
    return(
        <div className="w-full flex flex-col items-center justify-center">
            <div className="flex flex-col w-full">
                <form onSubmit={onsubmit}>
                    <div className="w-full">
                        <label>Title</label>
                        <input 
                            className="my-1 w-full h-10 rounded-md ring-1 ring-black px-2" 
                            type="text" 
                            placeholder="Enter task title" 
                            name="title" 
                            id="title" 
                            value={title} 
                            required 
                            onChange={(e)=> setTitle(e.target.value)}/>
                    </div>
                    <div className="flex flex-row items-center justify-center w-full">
                        {isEditing? (
                            <>
                                <Button type="submit" name="Update Task"/>
                                <Button type="button" name="Cancel" onClick={handleCancel}/>
                            </>
                        ):(
                            <>
                                <Button type="submit" name="Add Task"/>                               
                            </>
                        )}
                    </div>
                </form>
            </div>
        </div>
    )
}
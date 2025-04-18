import { Pencil, CircleX, Circle, CircleCheck } from 'lucide-react';
import formatDate from '../helpers/formatDate';
export default function Thetask({content, ondelete, updateStatus, state}){

    const {handleEdit} = state;
    // const {updateStatus} = onstatus
    

    return(
        <div className="flex flex-row items-center justify-center w-full bg-gray-200 rounded-xl p-3 my-3">
            <div className="w-11/12">
                
                    <h3 className="font-medium">{content.title}<button className="ml-3" onClick={()=> handleEdit(content.id)}><Pencil width={15} height={15}/></button></h3>
                    
                <p className="text-xs">{formatDate(content.created_date)}</p>
            </div>
            <div className="w-1/12 flex flex-row items-center justify-center">
            <button onClick={() => ondelete(content.id)} className="mr-1">
                <CircleX width={15} height={15}/>
            </button> 
                {content.status === "completed" ? 
                <CircleCheck width={15} height={15}/>
                : <button onClick={() => updateStatus(content.id)}> <Circle width={15} height={15}/> </button>
            }
            </div>
        </div>
    )
}
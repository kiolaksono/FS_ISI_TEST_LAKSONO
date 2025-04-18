import { Pencil, CircleX, Circle, CircleCheck } from 'lucide-react';

export default function Thetask({content, ondelete, updateStatus, state}){

    const {handleEdit} = state;
    // const {updateStatus} = onstatus
    

    return(
        <div className="flex flex-row items-center justify-center w-full bg-gray-200 rounded-xl p-3 my-3">
            <div className="w-11/12">
                
                    <h3 className="font-medium">{content.title}<button className="ml-3" onClick={()=> handleEdit(content.id)}><Pencil width={15} height={15}/></button></h3>
                    
                <p className="text-xs">{content.created_date}</p>
            </div>
            <div className="w-1/12">
            <button onClick={() => ondelete(content.id)}>
                <CircleX width={15} height={15}/>
            </button> <button onClick={() => updateStatus(content.id)}>
                {content.status === "completed" ? <CircleCheck width={15} height={15}/> : <Circle width={15} height={15}/>}
            </button>
            </div>
        </div>
    )
}
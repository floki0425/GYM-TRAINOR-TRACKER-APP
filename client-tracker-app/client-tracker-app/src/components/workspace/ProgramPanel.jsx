import React, { useEffect, useState } from 'react'
import { getProgram, getProgramId } from '../../api/programApi';

const ProgramPanel = ({selectedClientId,selectedClient}) => {
  const [program,setProgram] = useState([])
  const [loading,setLoading] = useState(false);
  const [error, setError] = useState(null);


const clientProgram = program.find((p)=>p.clientId === selectedClientId)




  useEffect(()=>{
    let ignore = false;

    async function loadingProgram() {
      
      try{  
        setLoading(true)
        setError(null)

        const data = await getProgramId(selectedClientId);

        if(!ignore) setProgram(data);
      }catch(err){
        if(!ignore) setError(err?.message ?? "Failed to load")
      }finally{
        if(!ignore) setLoading(false);
      }

  

    }

    loadingProgram()

    return ()=>{
       ignore = true
    }


  },[selectedClientId])


  console.log(program)
   if(loading) return <div>loading...</div>
   if(error) return <div>Error</div>
  return (
    
    <div className='tab-panel'>
      {!clientProgram ? (<div className="program-header">
         <h3>Program</h3>
            <div className="program-actions">
                <button>+ New Program</button>
                <button>Edit</button>
            </div>
        </div>):(

          
           <div className='program-body'>
            {clientProgram.program.map((program, programIndex)=>{
             return <div key={programIndex} className='Program-days'>
                <p>
                 {program.day}
                </p>
                <div className='Program-exercises'>
                 {program.exercises.map((exercises, exercisesIndex)=>{
                  return <div key={exercisesIndex}>
                            <p>{exercises}</p>
                          </div> 
                 })} 
                </div>
             </div>
            })} 
           </div>

        )}

     
    </div>
  )
}

export default ProgramPanel

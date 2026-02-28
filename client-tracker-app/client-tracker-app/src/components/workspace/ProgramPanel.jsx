import React, { useCallback, useEffect, useRef, useState } from 'react'
import { getProgram, getProgramId } from '../../api/programApi';
import { useOutletContext } from 'react-router-dom';

const ProgramPanel = () => {
  const [program,setProgram] = useState([])
  const [loading,setLoading] = useState(false);
  const [error, setError] = useState(null);
const {selectedClientId} = useOutletContext()

const ignoreRef = useRef(false);


const clientProgram = program.find((p)=>p.clientId === selectedClientId)



         const loadingProgram = useCallback(async() => {

            try{  
              setLoading(true)
              setError(null)

              const data = await getProgramId(selectedClientId);

              if(!ignoreRef.current) setProgram(data);
            }catch(err){
              if(!ignoreRef.current) setError(err?.message ?? "Failed to load")
            }finally{
              if(!ignoreRef.current) setLoading(false);
            }
    },[])


  useEffect(()=>{
    ignoreRef.current = false
    loadingProgram()

    return ()=>{
      ignoreRef.current = true
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

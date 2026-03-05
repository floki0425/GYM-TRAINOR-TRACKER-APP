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
    
 <div className="tab-panel rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
  {!clientProgram ? (
    <div className="program-header flex items-start justify-between gap-4">
      <div>
        <h3 className="text-lg font-semibold text-slate-900">Program</h3>
        <p className="mt-1 text-sm text-slate-600">
          No program yet. Create one to start tracking workouts.
        </p>
      </div>

      <div className="program-actions flex gap-2">
        <button className="rounded-xl bg-teal-600 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-700 active:bg-teal-800">
          + New Program
        </button>
        <button className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
          Edit
        </button>
      </div>
    </div>
  ) : (
    <div className="program-body space-y-5">
      {/* Top header row */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Program</h3>
          <p className="mt-1 text-sm text-slate-600">Weekly split overview</p>
        </div>

        <div className="flex gap-2">
          <button className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
            Edit
          </button>
        </div>
      </div>

      {/* Days list */}
      <div className="space-y-3">
        {clientProgram.program.map((program, programIndex) => {
          return (
            <div
              key={programIndex}
              className="Program-days rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-slate-900">
                  {program.day}
                </p>

                {/* badge */}
                <span className="rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700">
                  {program.exercises.length} exercises
                </span>
              </div>

              <div className="Program-exercises mt-4 space-y-2">
                {program.exercises.map((exercise, exercisesIndex) => {
                  return (
                    <div
                      key={exercisesIndex}
                      className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2"
                    >
                      <p className="text-sm text-slate-800">{exercise}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  )}
</div>
  )
}

export default ProgramPanel

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { deleteProgram, getProgramId } from '../../api/programApi';
import { Outlet, useLocation, useNavigate, useOutletContext, useParams } from 'react-router-dom';

const ProgramPanel = () => {
  const [program,setProgram] = useState([])
  const [loading,setLoading] = useState(false);
  const [error, setError] = useState(null);
  const {programId} = useParams();
  const selectedProgramId = programId? programId : null;
  const navigate = useNavigate();
  const ignoreRef = useRef(false);
  const {selectedClientId,addProgram} = useOutletContext()
  const location = useLocation()
  const showDetails = location.pathname.endsWith("/programdetails")

  const programList = (id)=>{
    navigate(`/clients/${selectedClientId}/workspace/programs/${id}`)
  }

  const openProgramDetails = (id)=>{
    navigate(`/clients/${selectedClientId}/workspace/programs/${id}/programdetails`);
  }



  const removeProgram = async(id)=>{
    await deleteProgram(id)
    const remainingProgram = program.filter((p)=>p.id !== id)
    const nextProgram = remainingProgram[0];
    setProgram(remainingProgram);

    if (remainingProgram.length > 0) {
      navigate(`/clients/${selectedClientId}/workspace/program/${nextProgram.id}`);
    } else {
      navigate(`/clients/${selectedClientId}/workspace/program`);
    }
  } 





const clientProgram = program.find((p)=> p.clientId === selectedClientId)



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
    },[selectedClientId])


  useEffect(()=>{
    ignoreRef.current = false
    loadingProgram()

    return ()=>{
      ignoreRef.current = true
    }
  },[loadingProgram])


 
   if(loading) return <div>loading...</div>
   if(error) return <div>Error</div>
   if(!clientProgram)
     return 
        <div className="space-y-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Program</h3>
              <p className="mt-1 text-sm text-slate-600">
                No program yet. Create one to start tracking workouts.
              </p>
            </div>

            <div className="flex gap-2">
              <button className="rounded-xl bg-teal-600 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-700 active:bg-teal-800">
                Add Program
              </button>
              <button className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                Edit
              </button>
            </div>
          </div>
        </div>
  


  const outletContext = {
    clientProgram,navigate
  }

  return (
    

 
    <div className=" p-4 ">
        {!showDetails && (
           <div className="flex items-center justify-between gap-4 mb-4 p-6">
            
      <div className="mb-4 flex items-center justify-between gap-4 p-2">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Program</h3>
          <p className="mt-1 text-sm text-slate-600">Weekly split overview</p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={addProgram}
            className="rounded-xl bg-teal-600 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-700 active:bg-teal-800"
          >
            Add Program
          </button>
          <button className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
            Edit
          </button>
        </div>
      </div>
  
          </div> 
         )}
         
     {!showDetails? ( <div className="space-y-5">
           {program.map((c) => {
          const isSelected = c.id === selectedProgramId;

          return (
            <div
              key={c.id}
              onClick={() => programList(c.id)}
              className={`cursor-pointer rounded-2xl border p-5 shadow-sm transition ${
                isSelected
                  ? "border-teal-300 bg-teal-50"
                  : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                {/* Left */}
                <div className="min-w-0 space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-semibold tracking-wide text-slate-900">
                      CHECK-IN
                    </p>

                    <span className="rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                      {c.date}
                    </span>
                  </div>

                  <p className="text-sm text-slate-600">
                    Goal: {" "}
                    <span className="text-slate-300">|</span>{" "}
                    
                  </p>
                </div>

                {/* Right */}
                <div className="flex flex-wrap items-center gap-2 md:justify-end">
                  {/* Status badge only */}
                  <span className="inline-flex items-center rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700">
                    On Track
                  </span>

                  {/* Actions */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                       openProgramDetails(c.id)
                     
                    }}
                    className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    View Details
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    Edit
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeProgram(c.id)
                   
                    }}
                    className="rounded-xl border border-red-200 bg-white px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
       </div>
      ):( 
      <Outlet context={outletContext}/>
    )}


       
       
    </div>


  )
}

export default ProgramPanel

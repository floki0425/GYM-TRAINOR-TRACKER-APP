import React, { useCallback, useEffect, useRef, useState } from 'react'
import AddCheckin from '../modal/AddCheckin'
import { getCheckinByClientId } from '../../api/checkinApi'
import { Outlet, useNavigate, useOutletContext, useParams } from 'react-router-dom'

const CheckinsPanel = () => {
const [checkin,setCheckin] = useState([])
const [loading,setLoading] = useState(false)
const [error,setError] = useState(null);
const {checkinId} = useParams()
const selectedCheckinId = checkinId ? checkinId : null;
const navigate = useNavigate()
const ignoreRef = useRef(false);

const {selectedClientId,selectedClient} = useOutletContext();

const openList = (id) =>{
  navigate(`${id}`)
}

const checkInClient = checkin.find((f)=>f.clientId === selectedClientId)

console.log(checkInClient)

const loadCheckin = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getCheckinByClientId(selectedClientId);

      if(!ignoreRef.current)  setCheckin(data);
    } catch (error) {
      if(!ignoreRef.current)  setError(error?.message ?? "failed to load");
    } finally{
      if(!ignoreRef.current)  setLoading(false);
    }



  },[])



useEffect(()=>{
  ignoreRef.current = false
  loadCheckin();

  return () =>{
    ignoreRef.current = true;
  }
},[selectedClientId])

if(loading)return <div>loading..</div>
if(error) return <p>{error}</p>
if (!checkInClient) return  <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-900">No check-ins yet</h3>
      <p className="mt-2 text-sm text-slate-600">
        Add the first weekly check-in to start tracking progress.
      </p>

      <div className="mt-6 rounded-xl border border-dashed border-slate-200 bg-slate-50 p-6 text-sm text-slate-500">
        Tip: Track <span className="font-semibold text-slate-700">weight</span> +
        <span className="font-semibold text-slate-700"> waist</span> +{" "}
        <span className="font-semibold text-slate-700">adherence</span> for the fastest insights.
      </div>

      <div className="mt-6 flex gap-2">
        <button className="rounded-xl bg-teal-600 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-700 active:bg-teal-800">
          + Add Check-in
        </button>
        <button className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
          Learn More
        </button>
      </div>
    </div>

 const outletContext = {
  selectedClientId,selectedClient
}

  return (
 <div className="min-h-screen  p-6">
  {/* PAGE CONTAINER */}
  {!selectedCheckinId ? (
    <div className="mx-auto max-w-5xl space-y-4">
      {checkin.map((c) => {
        return (
          <div
            key={c.id}
            onClick={() => openList(c.id)}
            className="cursor-pointer rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:bg-slate-50"
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              {/* Left: Title + Meta */}
              <button className="text-left">
                <div className="space-y-1">
                   <p>
                      Check in   
                      <span className="ml-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-s font-semibold text-indigo-700 ">
                        {c.date}         
                      </span> 
                    </p> 
                  <p className="text-sm text-slate-600 mt-2">
                    Goal: {selectedClient.goalType}{" "}
                    <span className="text-slate-300">|</span>{" "}
                    {selectedClient.status}{" "}
                    <span className="text-slate-300">|</span> Last Check-in: 9 days ago
                  </p>
                </div>
              </button>

              {/* Right: Actions */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700">
                  <span className="text-sm">🔥</span> On Track
                </span>

                <button className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50">
                  Edit
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  ) : (
    <Outlet context={outletContext} />
  )}
</div>
    
  )
}

export default CheckinsPanel

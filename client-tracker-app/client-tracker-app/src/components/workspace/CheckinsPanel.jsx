import React, { useCallback, useEffect, useRef, useState } from 'react'
import AddCheckin from './AddCheckin'
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




const selectedCheckin = checkin.find(x => x.id === selectedCheckinId)




const openList = (id) =>{
  navigate(`${id}`)
}


 

 


const checkInClient = checkin.find((f)=>Number(f.clientId) === selectedClientId)



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
if (!checkInClient) return "Select a client"

 const outletContext = {
  loadCheckin,selectedClientId,selectedClient
}

  return (
 <div className="min-h-screen bg-slate-50 p-6">
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
                  <h2 className="text-lg font-semibold text-slate-900">
                    Weekly Check-In — {c.id}
                  </h2>
                  <p className="text-sm text-slate-600">
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

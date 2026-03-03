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
   <div className="min-h-screen bg-gray-100 p-6 ">
   
      {/* PAGE CONTAINER */}
      
         {!selectedCheckinId ? <div>  {checkin.map((c)=>{
      return  <div key={c.id} onClick={()=>{openList(c.id)}} className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm cursor-pointer">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            {/* Left: Title + Meta */}
            <button>
              <div className="space-y-1">
              <h2 className="text-lg font-semibold text-gray-900">
                Weekly Check-In — {c.id}
              </h2>
              <p className="text-sm text-gray-600">
                Goal: {selectedClient.goalType} <span className="text-gray-300">|</span> {selectedClient.status}
                 <span className="text-gray-300">|</span> Last Check-in: 9 days ago
              </p>
            </div>
            </button>
            

            {/* Right: Actions */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-100">
                <span className="text-sm">🔥</span> On Track
              </span>

              

              <button className="inline-flex items-center justify-center rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
                Edit
              </button>
          


            </div>
          </div>
        </div>
     })
      
     }</div> : <Outlet context={outletContext}/> }
     
     
   
   
     
      
    </div>
    
  )
}

export default CheckinsPanel

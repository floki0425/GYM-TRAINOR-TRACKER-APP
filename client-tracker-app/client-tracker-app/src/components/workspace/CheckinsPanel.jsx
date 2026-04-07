import React, { useCallback, useEffect, useRef, useState } from 'react'
import { deleteCheckin,  getCheckinByClientId } from '../../api/checkinApi'
import { Outlet, useLocation, useNavigate, useOutletContext, useParams } from 'react-router-dom'

const CheckinsPanel = () => {
const [checkin,setCheckin] = useState([])
const [loading,setLoading] = useState(false)
const [error,setError] = useState(null);
const {checkinId} = useParams()
const selectedCheckinId = checkinId ? checkinId : null;
const navigate = useNavigate();
const location = useLocation();
const ignoreRef = useRef(false);
const {selectedClientId,selectedClient,closeDrawer} = useOutletContext();
const selectedCheckin = checkin.find((f)=>String(f.id) === String(selectedCheckinId));
const checkInClient = checkin.find((f)=>f.clientId === selectedClientId);
const showDetails = location.pathname.endsWith("/details");
const showEditDetails = location.pathname.endsWith("/editcheckin");




const checkinList = (id)=>{
  navigate(`/clients/${selectedClientId}/workspace/checkins/${id}`)

}

const openDetails = (id)=>{
  navigate(`/clients/${selectedClientId}/workspace/checkins/${id}/details`)
}

const editCheckin = (id)=>{
   navigate(`/clients/${selectedClientId}/workspace/checkins/${id}/editcheckin`)
}




const removeCheckin = async (id)=>{
 try {
    await deleteCheckin(id)
    const remainingCheckins = checkin.filter((c)=>c.id !== id)
    const nextCheckin = remainingCheckins[0]
    setCheckin(remainingCheckins)


  if (remainingCheckins.length > 0) {
      navigate(`/clients/${selectedClientId}/workspace/checkins/${nextCheckin.id}`);
    } else {
      navigate(`/clients/${selectedClientId}/workspace/checkins`);
    }
 } catch (error) {
    setError(error?.message ?? "Failed to delete checkin") 
 }

}







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



  },[selectedClientId])



useEffect(()=>{
  ignoreRef.current = false
  loadCheckin();

  return () =>{
    ignoreRef.current = true;
  }
},[loadCheckin])

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
  selectedClientId,selectedClient,closeDrawer,checkin,selectedCheckin,loadCheckin,navigate
}

  return (
    <div className="min-h-screen p-6">
  {!showDetails && !showEditDetails? (
    <div className="mx-auto max-w-5xl space-y-6">
      {/* Header */}
      <div className="rounded-2xl  bg-white p-5 ">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="space-y-3">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Check-ins</h2>
              <p className="text-sm text-slate-500">Manage and review client check-ins</p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                className="rounded-xl bg-teal-600 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-700"
              >
                + Add Check-in
              </button>

              
            </div>
          </div>


        {/* HIDDEN FEATURES */}
          <div className=" flex-col gap-3 md:items-end hidden">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700">
                All
              </span>
              <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700">
                Needs Review
              </span>
              <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700">
                On Track
              </span>
            </div>

            <div className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700">
              Newest ▼
            </div>
          </div>
        </div>
      </div>

      {/* List */}
      <div className="space-y-4">
        {checkin.map((c) => {
          const isSelected = c.id === selectedCheckinId;

          return (
            <div
              key={c.id}
              onClick={() => checkinList(c.id)}
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
                    Goal: {selectedClient.goalType}{" "}
                    <span className="text-slate-300">|</span>{" "}
                    {selectedClient.status}
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
                      openDetails(c.id);
                    }}
                    className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    View Details
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      editCheckin(c.id);
                    }}
                    className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    Edit
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeCheckin(c.id);
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
    </div>
  ) : (
    <Outlet context={outletContext} />
  )}
</div>
    
  )
}

export default CheckinsPanel

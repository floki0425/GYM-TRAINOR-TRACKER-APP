import React, {  useState } from 'react'
import {  useOutletContext } from 'react-router-dom'
import { createClients } from '../../api/clientApi';

const AddClient = ({}) => {

 const [error,setError] = useState(false);
 const [form,setForm] = useState({

     name:"",
     goalType:"",
     status:"",
     startDate: "2026-07-04"
})



console.log(form)

const saveClients = async () => {
  const nextErrors = {};

    if(!form.name) nextErrors.name = "Name is required";
    if(!form.goalType) nextErrors.goalType = "Goal is required"
    if(!form.status) nextErrors.status = "Status is required"
    if(!form.startDate) nextErrors.startDate = "Date is required"

    if(Object.keys(nextErrors).length > 0){
      setError(nextErrors);
      return
    }

    const payload ={
      name: form.name,
      goalType: form.goalType,
      status:form.status,
      startDate: form.startDate

    }
    

    try {
      await createClients(payload);
      await loadClients();

      setError({});
      closeDrawer();
    } catch (error) {
      setError({_form: error?.message?? "Failed to save clients"})
    };

};

const updateField = (client,value)=>{
  setForm(prevForm=>({
    ...prevForm, 
    [client]: value
  }))
}

const {
  selectedClient,
  selectedClientId,
  loadClients,
  closeDrawer
} = useOutletContext();




  return (
   <div className="fixed inset-0 z-50">
  {/* Overlay */}
  <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm" />

  {/* Modal */}
  <div className="absolute inset-0 flex items-center justify-center p-4">
    <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white shadow-2xl">
      {/* Header */}
      <div className="flex items-start justify-between border-b border-slate-200 p-6">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Add Client</h2>
          <p className="mt-1 text-sm text-slate-600">
            Create a new client profile.
          </p>
        </div>

        <button className="rounded-xl p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700">
          ✕
        </button>
      </div>

      {/* Body */}
      <div className="space-y-5 bg-white p-6">
        
            <div className="text-right">
              {error.name && (
                <p className="text-sm font-semibold text-red-500">{error.name}</p>
              )}
              {error.goalType && (
                <p className="text-sm font-semibold text-red-500">{error.goalType}</p>
              )}
              {error.status && (
                <p className="text-sm font-semibold text-red-500">{error.status}</p>
              )}
              {error.startDate && (
                <p className="text-sm font-semibold text-red-500">{error.startDate}</p>
              )}   
            </div>
        {/* Name */}
        <div>
          <label className="text-xs font-semibold text-slate-700">Client Name</label>
          <input
            value={form.name}
            onChange={(e)=>updateField("name", e.target.value)}
            type="text"
            placeholder="e.g. John Doe"
            className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-200"
          />
        </div>

        {/* Goal + Status */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="text-xs font-semibold text-slate-700">Goal Type</label>
            <select
             value={form.goalType}
            onChange={(e)=>updateField("goalType", e.target.value)}
            className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-200">
              <option>NONE</option>
              <option>CUT</option>
              <option>LEAN BULK</option>
              <option>MAINTAIN</option>
              <option>RECOMP</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700">Status</label>
            <select
             value={form.status}
             onChange={(e)=>updateField("status", e.target.value)}
             className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-200">
              <option>NONE</option>
              <option>PAUSED</option>
              <option>ACTIVE</option>
            </select>
          </div>
        </div>

        {/* Start date (optional but MVP-useful) */}
        <div>
          <label className="text-xs font-semibold text-slate-700">Start Date</label>
          <input
            value={form.date}
            onChange={(e)=>{"date",e.target.value}}
            type="date"
            className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-200"
          />
          <p className="mt-2 text-xs text-slate-500">
            Optional. Helps track timeline (Since…).
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-slate-200 bg-white p-6">
        <button
          onClick={closeDrawer}
          className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
          Cancel
        </button>

        <button
         onClick={()=>{saveClients()}}
         className="rounded-xl bg-teal-600 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-700 active:bg-teal-800">
          Save Client
        </button>
      </div>
    </div>
  </div>
</div>
  )
}

export default AddClient

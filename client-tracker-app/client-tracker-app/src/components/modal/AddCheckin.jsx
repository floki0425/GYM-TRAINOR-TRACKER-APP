import React, { useState } from 'react'
import CheckinsPanel from '../workspace/CheckinsPanel'
import { createCheckin } from '../../api/checkinApi'
import { useOutletContext } from 'react-router-dom'

const AddCheckin = ({}) => {
const [error,setError] = useState({})
const [form,setForm] = useState({
        date:"2026-02-24", 
        weightKg:"", 
        waistIn:"", 
        bodyFatPct:"", 
        trainingDays:"0-7", 
        stepsAvg:"", 
        sleepAvg:"", 
        caloriesTarget:"", 
        adherence:"", 
        energy:"", 
        stress:"", 
        hunger:"", 
        clientNotes:"", 
        trainerNotes:""

})
const { closeDrawer,loadCheckin,selectedClientId} = useOutletContext()






 const saveCheckin = async () =>{
    const nextErrors = {};

    
      if(!form.date) nextErrors.date = "Date is required";
      if(String(form.weightKg).trim() === "")  nextErrors.weightKg= "Weight is required";
      
      if (Object.keys(nextErrors).length > 0) {
       setError(nextErrors);
       return;
      }
      
      

    const payload = {
      clientId:selectedClientId,
      date: form.date,
      weightKg: Number(form.weightKg)
    };

    try {
      await createCheckin(payload);
         setError({});
         closeDrawer();
      await loadCheckin();

   
     
    } catch (error) {
      setError({_form: error?.message ?? "Failed to save check-in"})
    } 
  };
  




const updateField =  (name,value) => {
  setForm(prevForm =>({
    ...prevForm, 
    [name]: value
  }))
}



  return (
<div>
  <div className="fixed inset-0 z-50">
    <div
      className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm"
      onClick={closeDrawer}
    />

    <div className="absolute inset-y-0 right-0 flex w-full max-w-2xl flex-col bg-white shadow-2xl">
      {/* Header */}
      <div className="border-b border-slate-200 bg-white p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Add Check-in</h2>
            <p className="mt-1 text-sm text-slate-600">Log weekly progress.</p>
          </div>

          <button
            onClick={closeDrawer}
            className="rounded-xl p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
            aria-label="Close drawer"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 space-y-5 overflow-y-auto bg-slate-50 p-6">
        {/* Required fields */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-sm font-semibold text-slate-900">Check-in Info</h3>
              <p className="mt-1 text-xs text-slate-500">Required: weight and date</p>
            </div>

            <div className="text-right">
              {error.weightKg && (
                <p className="text-sm font-semibold text-red-500">{error.weightKg}</p>
              )}
              {error.date && (
                <p className="text-sm font-semibold text-red-500">{error.date}</p>
              )}
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <input
              value={form.weightKg}
              onChange={(e) => updateField("weightKg", e.target.value)}
              type="number"
              placeholder="Weight (kg)"
              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-200"
            />

            <input
              value={form.date}
              onChange={(e) => updateField("date", e.target.value)}
              type="date"
              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-200"
            />
          </div>
        </div>

        {/* Core metrics */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-900">Core Metrics</h3>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <input
              type="number"
              placeholder="Waist (in)"
              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-200"
            />

            <input
              type="number"
              placeholder="Training Days (0–7)"
              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-200"
            />

            <input
              type="number"
              placeholder="Steps Avg"
              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-200"
            />

            <input
              type="number"
              placeholder="Sleep Avg (hrs)"
              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-200"
            />
          </div>
        </div>

        {/* Feedback */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-900">Feedback</h3>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <select className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-200">
              <option>Plan Adherence (1–5)</option>
            </select>

            <select className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-200">
              <option>Energy (1–5)</option>
            </select>
          </div>
        </div>

        {/* Notes */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-900">Notes</h3>

          <textarea
            rows={4}
            placeholder="Coach notes..."
            className="mt-3 w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-200"
          />
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-slate-200 bg-white p-6">
        <div className="flex items-center justify-between gap-3">
          <button
            onClick={closeDrawer}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            onClick={() => {
              saveCheckin();
            }}
            className="rounded-xl bg-teal-600 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-700 active:bg-teal-800"
          >
            Save Check-in
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
  )
}

export default AddCheckin

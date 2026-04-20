import React, { useState } from 'react'
import CheckinsPanel from '../workspace/CheckinsPanel'
import { createCheckin } from '../../api/checkinApi'
import { useOutletContext } from 'react-router-dom'

const AddCheckin = () => {
const [error,setError] = useState({})
const [form,setForm] = useState({
        date:"", 
        goal:"",
        weightKg:"", 
        waistIn:"", 
        bodyFatPct:"", 
        trainingDays:"", 
        stepsAvg:"", 
        sleepAvg:"", 
        caloriesTarget:"", 
        adherence:"", 
        hunger:"",
        trainerNotes:"",
        

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
      goal:String(form.goal),
      weightKg: Number(form.weightKg),
      waistIn:Number(form.waistIn), 
      bodyFatPct:form.bodyFatPct, 
      trainingDays:Number(form.trainingDays), 
      stepsAvg:Number(form.stepsAvg), 
      sleepAvg:Number(form.sleepAvg), 
      caloriesTarget:Number(form.caloriesTarget), 
      adherence:Number(form.adherence), 
      hunger:Number(form.hunger),
      trainerNotes:String(form.trainerNotes)
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
              value={form.caloriesTarget}
              onChange={(e) => updateField("caloriesTarget", e.target.value)}
              type="number"
              placeholder="Calories Target"
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
              value={form.waistIn}
              onChange={(e) => updateField("waistIn", e.target.value)}
              type="number"
              placeholder="Waist (in)"
              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-200"
            />

            <input
              value={form.bodyFatPct}
              onChange={(e) => updateField("bodyFatPct", e.target.value)}
              type="number"
              placeholder="Body Fat %"
              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-200"
            />

            <select
              value={form.trainingDays}
              onChange={(e) => updateField("trainingDays", e.target.value)}
              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-200"
            >
              <option value="0-7">Training Days (0–7)</option>
              <option value="0">0 days</option>
              <option value="1">1 day</option>
              <option value="2">2 days</option>
              <option value="3">3 days</option>
              <option value="4">4 days</option>
              <option value="5">5 days</option>
              <option value="6">6 days</option>
              <option value="7">7 days</option>
            </select>

            <input
              value={form.stepsAvg}
              onChange={(e) => updateField("stepsAvg", e.target.value)}
              type="number"
              placeholder="Steps Avg"
              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-200"
            />

            <input
              value={form.sleepAvg}
              onChange={(e) => updateField("sleepAvg", e.target.value)}
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
            <select
              value={form.adherence}
              onChange={(e) => updateField("adherence", e.target.value)}
              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-200"
            >
              <option value="">Plan Adherence (1–5)</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>

            <select
              value={form.hunger}
              onChange={(e) => updateField("hunger", e.target.value)}
              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-200"
            >
              <option value="">Hunger (1–5)</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
        </div>

        {/* Notes */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-900">Notes</h3>

          <textarea
            rows={4}
            value={form.trainerNotes}
            onChange={(e) => updateField("trainerNotes", e.target.value)}
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

import React, { useState } from 'react'
import CheckinsPanel from './CheckinsPanel'
import { createCheckin } from '../../api/checkinApi'
import { useOutletContext } from 'react-router-dom'

const AddCheckin = ({}) => {
const [error,setError] = useState({})
const [form,setForm] = useState({date:"2026-02-24", 
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
const { openDrawer,closeDrawer,loadCheckin,selectedClientId} = useOutletContext()






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
      await createCheckin(payload)
      await loadCheckin();

      setError({});
     closeDrawer();
    } catch (error) {
      setError({_form: error?.message ?? "Failed to save check-in"})
    } 
  };
  

console.log(form)


const updateField =  (name,value) => {
  setForm(prevForm =>({
    ...prevForm, 
    [name]: value
  }))
}



  return (
  <div>
  {/* ===== Overlay ===== */}
  <div className="fixed inset-0 z-50">
    {/* Background */}
    <div
      className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm"
      onClick={closeDrawer}
    />

    {/* Drawer Container */}
    <div className="absolute inset-y-0 right-0 flex w-full max-w-3xl flex-col bg-white shadow-2xl">
      {/* ===== Sticky Header ===== */}
      <div className="sticky top-0 z-10 border-b border-slate-200 bg-white p-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Add Check-in</h2>
            <p className="mt-1 text-sm text-slate-600">
              Log this week’s progress and feedback.
            </p>
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

      {/* ===== Scrollable Body ===== */}
      <div className="flex-1 overflow-y-auto bg-slate-50 p-6 space-y-6">
        {/* Body Metrics */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-sm font-semibold text-slate-900">Body Metrics</h3>
              <p className="mt-1 text-xs text-slate-500">Required: weight + date</p>
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
              type="number"
              placeholder="Waist (in)"
              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-200"
            />

            <input
              type="number"
              placeholder="Body Fat (%)"
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

        {/* Objective Metrics */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-900">Objective</h3>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
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
            <input
              type="number"
              placeholder="Calories Target"
              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-200"
            />
          </div>
        </div>

        {/* Subjective */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-900">Subjective Feedback</h3>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <select className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-200">
              <option>Adherence (1–5)</option>
            </select>

            <select className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-200">
              <option>Energy (1–5)</option>
            </select>

            <select className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-200">
              <option>Stress (1–5)</option>
            </select>

            <select className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-200">
              <option>Hunger (1–5)</option>
            </select>
          </div>
        </div>

        {/* Notes */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-900">Notes</h3>

          <textarea
            rows={4}
            placeholder="Client Notes..."
            className="mt-3 w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-200"
          />

          <textarea
            rows={3}
            placeholder="Trainer Notes..."
            className="mt-4 w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-200"
          />
        </div>
      </div>

      {/* ===== Sticky Footer ===== */}
      <div className="sticky bottom-0 border-t border-slate-200 bg-white p-6 flex items-center justify-between">
        <button
          onClick={closeDrawer}
          className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
        >
          Cancel
        </button>

        <div className="flex gap-2">
          <button className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
            Save Draft
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

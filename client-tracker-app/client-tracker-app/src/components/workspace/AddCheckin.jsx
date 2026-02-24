import React, { useState } from 'react'
import CheckinsPanel from './CheckinsPanel'

const AddCheckin = ({onClose}) => {
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






  return (
    <div>
      {/* ===== Overlay ===== */}
<div className="fixed inset-0 z-50">
  {/* Background */}


  {/* Drawer Container */}
  <div className="absolute inset-y-0 right-0 w-full max-w-3xl bg-white shadow-2xl flex flex-col">

    {/* ===== Sticky Header ===== */}
    <div className="sticky top-0 z-10 border-b border-gray-200 bg-white p-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Add Check-in
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            Log this week’s progress and feedback.
          </p>
        </div>

        <button onClick={onClose}  className="rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
          ✕
        </button>
      </div>
    </div>

    {/* ===== Scrollable Body ===== */}
    <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50">

      {/* Body Metrics */}
      <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-900">Body Metrics</h3>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <input
            value={form.weightKg}
            onChange={(e)=>setForm(e.target.value)}
            type="number"
            placeholder="Weight (kg)"
            className="rounded-md border border-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <input
            type="number"
            placeholder="Waist (in)"
            className="rounded-md border border-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <input
            type="number"
            placeholder="Body Fat (%)"
            className="rounded-md border border-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <input
            type="date"
            className="rounded-md border border-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Objective Metrics */}
      <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-900">Objective</h3>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <input
            type="number"
            placeholder="Training Days (0–7)"
            className="rounded-md border border-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <input
            type="number"
            placeholder="Steps Avg"
            className="rounded-md border border-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <input
            type="number"
            placeholder="Sleep Avg (hrs)"
            className="rounded-md border border-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <input
            type="number"
            placeholder="Calories Target"
            className="rounded-md border border-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Subjective */}
      <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-900">Subjective Feedback</h3>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <select className="rounded-md border border-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none">
            <option>Adherence (1–5)</option>
          </select>

          <select className="rounded-md border border-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none">
            <option>Energy (1–5)</option>
          </select>

          <select className="rounded-md border border-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none">
            <option>Stress (1–5)</option>
          </select>

          <select className="rounded-md border border-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none">
            <option>Hunger (1–5)</option>
          </select>
        </div>
      </div>

      {/* Notes */}
      <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-900">Notes</h3>

        <textarea
          rows={4}
          placeholder="Client Notes..."
          className="mt-3 w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

        <textarea
          rows={3}
          placeholder="Trainer Notes..."
          className="mt-4 w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

    </div>

    {/* ===== Sticky Footer ===== */}
    <div className="sticky bottom-0 border-t border-gray-200 bg-white p-6 flex items-center justify-between">
      <button className="rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
        Cancel
      </button>

      <div className="flex gap-2">
        <button className="rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
          Save Draft
        </button>
        <button className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
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

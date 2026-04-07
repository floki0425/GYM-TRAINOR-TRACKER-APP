import React from 'react'
import { Outlet, useOutletContext } from 'react-router-dom'
const CheckinListContent = () => {
const {selectedClient,closeDrawer,selectedCheckin,navigate,selectedClientId} = useOutletContext();

  const editButton = ()=>{
    navigate(`/clients/${selectedClientId}/workspace/checkins/${selectedCheckin.id}/editcheckin`)
  }


  return (
    

 
   <div className="">
  <div className="mx-auto max-w-6xl space-y-6 p-6">
    <button
      onClick={closeDrawer}
      className="rounded-xl bg-teal-600 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-700 active:bg-teal-800"
    >
      {`<`}
    </button>

    {/* Header */}
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <button className="text-left">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold text-slate-900">
              Weekly Check-In — {selectedClient.date || "—"}
            </h2>
            <p className="text-sm text-slate-600">
              Goal: {selectedClient.goalType} <span className="text-slate-300">|</span>{" "}
              {selectedClient.status}
            </p>
          </div>
        </button>

        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700">
            <span className="text-sm">🔥</span> On Track
          </span>
          <button
          onClick={editButton} 
          className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50">
            Edit
          </button>
        </div>
      </div>
    </div>

    {/* Top metrics */}
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-xs font-medium text-slate-500">Weight</p>
        <h3 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
          {selectedCheckin.weightKg || "—"}{" "}
          <span className="text-base font-medium text-slate-500">kg</span>
        </h3>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-xs font-medium text-slate-500">Waist</p>
        <h3 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
          {selectedCheckin.waistIn || "—"}{" "}
          <span className="text-base font-medium text-slate-500">in</span>
        </h3>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-xs font-medium text-slate-500">Plan Adherence</p>
        <h3 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
          {selectedCheckin.adherence || "—"}%
        </h3>
      </div>
    </div>

    {/* Main grid */}
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12 space-y-6 lg:col-span-8">
        {/* Key metrics */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-900">Key Metrics</h3>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-medium text-slate-500">Body Fat</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">
                {selectedCheckin.bodyFatPct || "—"}%
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-medium text-slate-500">Steps Avg</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">
                {selectedCheckin.stepsAvg || "—"}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-medium text-slate-500">Sleep Avg</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">
                {selectedCheckin.sleepAvg || "—"}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-medium text-slate-500">Training Days</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">
                {selectedCheckin.trainingDays || "—"}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-medium text-slate-500">Calories Target</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">
                {selectedCheckin.caloriesTarget || "—"}
              </p>
            </div>
          </div>
        </div>

        {/* Subjective feedback */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-900">Subjective Feedback</h3>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 p-4">
              <p className="text-xs font-medium text-slate-500">Hunger</p>
              <p className="mt-2 text-sm font-semibold text-slate-900">
                {selectedCheckin.hunger || "—"}
              </p>
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className="rounded-2xl border border-indigo-200 bg-indigo-50/40 p-6 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-900">Coach Note</h3>
          <p className="mt-3 text-sm text-slate-700">
            {selectedCheckin.trainerNotes || "—"}
          </p>

          <div className="mt-4 rounded-2xl border border-indigo-200 bg-white p-4">
            <p className="text-xs font-semibold text-slate-500">Calories Target</p>
            <p className="mt-1 text-sm font-semibold text-slate-900">
              {selectedCheckin.caloriesTarget || "—"}
            </p>
          </div>
        </div>
      </div>

      <div className="col-span-12 space-y-6 lg:col-span-4">
        {/* Progress photos */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-900">Progress Photos</h3>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="flex h-28 items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 text-xs font-semibold text-slate-600">
              Front
            </div>
            <div className="flex h-28 items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 text-xs font-semibold text-slate-600">
              Side
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-900">Quick Actions</h3>
          <div className="mt-4 space-y-2">
            <button className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
              View History
            </button>
            <button className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
              Export PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

    
    
  )
}

export default CheckinListContent

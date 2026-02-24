import React, { useEffect, useState } from 'react'
import AddCheckin from './AddCheckin'
import { getCheckinByClientId } from '../../api/checkinApi'

const CheckinsPanel = ({selectedClientId}) => {
const [checkin,setCheckin] = useState([])
const [loading,setLoading] = useState(false)
const [isDrawerOpen,setIsDrawerOpen] = useState(false);
const [saving,setSaving] = useState(false);
const [error,setError] = useState(null);




const openDrawer = ()=>{
  setIsDrawerOpen(true);
 }

 const closeDrawer = ()=>{
  setIsDrawerOpen(false);
 }

const checkInClient = checkin.find((f)=>f.clientId === selectedClientId)



useEffect(()=>{
  let ignore = false;

  async function loadCheckin () {
    try {
      setLoading(true);
      setError(null);
      const data = await getCheckinByClientId(selectedClientId);

      if(!ignore)  setCheckin(data);
    } catch (error) {
      if(!ignore)  setError(err?.message ?? "failed to load");
    } finally{
      if(!ignore)  setLoading(false);
    }
  }
loadCheckin();

return () =>{
  ignore = true;
}
},[selectedClientId])

if(loading)return <div>loading..</div>
if(error) return <div>error</div>

  return (
   <div className="min-h-screen bg-gray-100 p-6 ">
      {/* PAGE CONTAINER */}
      <div className="mx-auto max-w-6xl space-y-6">
        {/* ================= HEADER ================= */}
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            {/* Left: Title + Meta */}
            <div className="space-y-1">
              <h2 className="text-lg font-semibold text-gray-900">
                Weekly Check-In — Feb 23, 2026
              </h2>
              <p className="text-sm text-gray-600">
                Goal: Fat Loss <span className="text-gray-300">|</span> Active{" "}
                <span className="text-gray-300">|</span> Last Check-in: 9 days ago
              </p>
            </div>

            {/* Right: Actions */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-100">
                <span className="text-sm">🔥</span> On Track
              </span>

              <button  onClick={openDrawer}
                        disabled={!selectedClientId}
              className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700">
                + Add Check-In
              </button>

              <button className="inline-flex items-center justify-center rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
                Edit
              </button>
            </div>
          </div>
        </div>

        {/* ================= 4 WEEK TREND ================= */}
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-900">4 Week Trend</h3>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Weight + Sparkline */}
            <div className="rounded-md border border-gray-200 bg-white p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-medium text-gray-500">Weight</p>
                  <p className="mt-1 text-sm font-semibold text-emerald-700">
                    ↓ -2.1 kg
                  </p>
                </div>

                {/* Sparkline placeholder */}
                <div className="flex h-10 w-28 items-center justify-center rounded-md bg-gray-50 text-xs text-gray-500 ring-1 ring-gray-200">
                  mini graph
                </div>
              </div>
            </div>

            <div className="rounded-md border border-gray-200 bg-white p-4">
              <p className="text-xs font-medium text-gray-500">Waist</p>
              <p className="mt-1 text-sm font-semibold text-emerald-700">
                ↓ -1.8 in
              </p>
            </div>

            <div className="rounded-md border border-gray-200 bg-white p-4">
              <p className="text-xs font-medium text-gray-500">Adherence</p>
              <p className="mt-1 text-sm font-semibold text-gray-900">87% Avg</p>
            </div>

            <div className="rounded-md border border-gray-200 bg-white p-4">
              <p className="text-xs font-medium text-gray-500">Strength</p>
              <p className="mt-1 text-sm font-semibold text-gray-900">
                Maintained
              </p>
            </div>
          </div>
        </div>

        {/* ================= MAIN GRID ================= */}
        <div className="grid grid-cols-12 gap-6">
          {/* LEFT COLUMN (70%) */}
          <div className="col-span-12 space-y-6 lg:col-span-8">
            {/* A) HERO METRIC */}
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-500">Current Weight</p>
                  <h1 className="mt-1 text-4xl font-semibold tracking-tight text-gray-900">
                    84.2 <span className="text-lg font-medium text-gray-500">kg</span>
                  </h1>
                  <p className="mt-2 text-sm font-medium text-emerald-700">
                    ↓ 1.3 kg from last week
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-2 text-sm text-gray-700 sm:grid-cols-2 sm:gap-x-6">
                  <p>
                    <span className="text-gray-500">Waist:</span> 31 in{" "}
                    <span className="font-medium text-emerald-700">(↓0.5)</span>
                  </p>
                  <p>
                    <span className="text-gray-500">Body Fat:</span> 21.8%{" "}
                    <span className="font-medium text-emerald-700">(↓0.3)</span>
                  </p>
                </div>
              </div>
            </div>

            {/* B) OBJECTIVE METRICS */}
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-900">Objective Metrics</h3>
              </div>

              <div className="mt-4 overflow-hidden rounded-md border border-gray-200">
                {/* Header row */}
                <div className="grid grid-cols-4 bg-gray-50 px-4 py-3 text-xs font-semibold text-gray-600">
                  <div>Metric</div>
                  <div>Previous</div>
                  <div>Current</div>
                  <div>Change</div>
                </div>

                {/* Rows */}
                <div className="divide-y divide-gray-200 text-sm">
                  <div className="grid grid-cols-4 px-4 py-3 text-gray-800">
                    <div className="font-medium">Weight</div>
                    <div className="text-gray-600">85.5</div>
                    <div className="text-gray-900">84.2</div>
                    <div className="font-medium text-emerald-700">↓1.3kg</div>
                  </div>

                  <div className="grid grid-cols-4 px-4 py-3 text-gray-800">
                    <div className="font-medium">Body Fat</div>
                    <div className="text-gray-600">22.1%</div>
                    <div className="text-gray-900">21.8%</div>
                    <div className="font-medium text-emerald-700">↓0.3%</div>
                  </div>

                  <div className="grid grid-cols-4 px-4 py-3 text-gray-800">
                    <div className="font-medium">Steps (Avg)</div>
                    <div className="text-gray-600">8,200</div>
                    <div className="text-gray-900">10,500</div>
                    <div className="font-medium text-gray-900">↑2,300</div>
                  </div>

                  <div className="grid grid-cols-4 px-4 py-3 text-gray-800">
                    <div className="font-medium">Sleep (Avg)</div>
                    <div className="text-gray-600">6.5h</div>
                    <div className="text-gray-900">7.2h</div>
                    <div className="font-medium text-gray-900">↑0.7h</div>
                  </div>
                </div>
              </div>
            </div>

            {/* C) SUBJECTIVE FEEDBACK */}
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="text-sm font-semibold text-gray-900">Subjective Feedback</h3>

              {/* Adherence bar */}
              <div className="mt-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-800">Adherence</p>
                  <p className="text-sm font-semibold text-gray-900">80%</p>
                </div>
                <div className="mt-2 h-2 w-full rounded-full bg-gray-100 ring-1 ring-gray-200">
                  <div className="h-2 w-4/5 rounded-full bg-blue-600" />
                </div>
              </div>

              {/* Dot scales */}
              <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-md border border-gray-200 p-4">
                  <p className="text-xs font-medium text-gray-500">Energy</p>
                  <p className="mt-2 text-sm font-semibold text-gray-900">
                    ●●●●○ <span className="text-gray-500">(4/5)</span>
                  </p>
                </div>

                <div className="rounded-md border border-gray-200 p-4">
                  <p className="text-xs font-medium text-gray-500">Stress</p>
                  <p className="mt-2 text-sm font-semibold text-gray-900">
                    ●●○○○ <span className="text-gray-500">(2/5)</span>
                  </p>
                </div>

                <div className="rounded-md border border-gray-200 p-4">
                  <p className="text-xs font-medium text-gray-500">Hunger</p>
                  <p className="mt-2 text-sm font-semibold text-gray-900">
                    ●●●○○ <span className="text-gray-500">(3/5)</span>
                  </p>
                </div>
              </div>
            </div>

            {/* D) SYSTEM INSIGHT */}
            <div className="rounded-lg border border-blue-100 bg-blue-50/40 p-6 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-blue-600 text-white shadow-sm">
                  🧠
                </div>

                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-gray-900">System Insight</h3>
                  <p className="mt-1 text-sm text-gray-700">
                    Client is responding well to current calorie deficit. Strength maintained.
                  </p>

                  <div className="mt-4 rounded-md border border-blue-100 bg-white p-4">
                    <p className="text-xs font-semibold text-gray-500">Recommendation</p>
                    <p className="mt-1 text-sm font-semibold text-gray-900">
                      Maintain 2,200 kcal for 1 more week.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* E) TRAINER NOTES */}
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="text-sm font-semibold text-gray-900">Trainer Notes</h3>
              <p className="mt-3 text-sm leading-6 text-gray-700">
                Great progress this week. Increasing steps to 11k daily. Keep calories steady.
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN (30%) */}
          <div className="col-span-12 space-y-6 lg:col-span-4">
            {/* Progress Photos */}
            <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-gray-200 p-4">
                <h3 className="text-sm font-semibold text-gray-900">Progress Photos</h3>
                <button className="text-sm font-medium text-gray-600 hover:text-gray-900">
                  ▼
                </button>
              </div>

              <div className="p-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex h-28 items-center justify-center rounded-md border border-dashed border-gray-300 bg-gray-50 text-xs font-medium text-gray-600">
                    Front
                  </div>
                  <div className="flex h-28 items-center justify-center rounded-md border border-dashed border-gray-300 bg-gray-50 text-xs font-medium text-gray-600">
                    Side
                  </div>
                  <div className="flex h-28 items-center justify-center rounded-md border border-dashed border-gray-300 bg-gray-50 text-xs font-medium text-gray-600">
                    Back
                  </div>
                  <div className="flex h-28 items-center justify-center rounded-md border border-dashed border-gray-300 bg-gray-50 text-xs font-medium text-gray-600">
                    Compare
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between rounded-md border border-gray-200 bg-gray-50 px-4 py-3">
                  <p className="text-xs font-medium text-gray-700">Compare w/ Last</p>
                  <div className="h-5 w-9 rounded-full bg-gray-200 p-0.5">
                    <div className="h-4 w-4 rounded-full bg-white shadow" />
                  </div>
                </div>

                <p className="mt-3 text-xs text-gray-500">
                  Tip: Add photos weekly for best comparison.
                </p>
              </div>
            </div>

            {/* Optional: Secondary right-card slot */}
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="text-sm font-semibold text-gray-900">Quick Actions</h3>
              <div className="mt-4 space-y-2">
                <button className="w-full rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                  View Check-in History
                </button>
                <button className="w-full rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                  Export PDF
                </button>
              </div>
              <p className="mt-4 text-xs text-gray-500">
                Optional panel for future features.
              </p>
            </div>
          </div>
        </div>
      </div>
      
    {/* Drawer */}
   {isDrawerOpen && <AddCheckin onClose={closeDrawer}/>}
   
     
     
    </div>
    
  )
}

export default CheckinsPanel

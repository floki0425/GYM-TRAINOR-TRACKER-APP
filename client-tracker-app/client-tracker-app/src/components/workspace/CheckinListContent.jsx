import React from 'react'
import { Outlet, useOutletContext } from 'react-router-dom'
const CheckinListContent = () => {
const {openDrawer, closeDrawer,loadCheckin,selectedClientId,selectedClient} = useOutletContext();

const outletContext = {
  openDrawer,closeDrawer,loadCheckin,selectedClientId,selectedClient
}




  return (
  <div className="bg-slate-50">
  <div className="mx-auto max-w-6xl space-y-6 p-6">
    {/* ================= HEADER ================= */}
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        {/* Left: Title + Meta */}
        <button className="text-left">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold text-slate-900">
              Weekly Check-In — Feb 23, 2026
            </h2>
            <p className="text-sm text-slate-600">
              Goal: {selectedClient.goalType} <span className="text-slate-300">|</span>{" "}
              {selectedClient.status} <span className="text-slate-300">|</span> Last Check-in: 9
              days ago
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

    {/* ================= 4 WEEK TREND ================= */}
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-900">4 Week Trend</h3>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Weight + Sparkline */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-medium text-slate-500">Weight</p>
              <p className="mt-1 text-sm font-semibold text-teal-700">↓ -2.1 kg</p>
            </div>

            {/* Sparkline placeholder */}
            <div className="flex h-10 w-28 items-center justify-center rounded-xl bg-slate-50 text-xs text-slate-500 ring-1 ring-slate-200">
              mini graph
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <p className="text-xs font-medium text-slate-500">Waist</p>
          <p className="mt-1 text-sm font-semibold text-teal-700">↓ -1.8 in</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <p className="text-xs font-medium text-slate-500">Adherence</p>
          <p className="mt-1 text-sm font-semibold text-slate-900">87% Avg</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <p className="text-xs font-medium text-slate-500">Strength</p>
          <p className="mt-1 text-sm font-semibold text-slate-900">Maintained</p>
        </div>
      </div>
    </div>

    {/* ================= MAIN GRID ================= */}
    <div className="grid grid-cols-12 gap-6">
      {/* LEFT COLUMN (70%) */}
      <div className="col-span-12 space-y-6 lg:col-span-8">
        {/* A) HERO METRIC */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500">Current Weight</p>
              <h1 className="mt-1 text-4xl font-semibold tracking-tight text-slate-900">
                84.2 <span className="text-lg font-medium text-slate-500">kg</span>
              </h1>
              <p className="mt-2 text-sm font-semibold text-teal-700">
                ↓ 1.3 kg from last week
              </p>
            </div>

            <div className="grid grid-cols-1 gap-2 text-sm text-slate-700 sm:grid-cols-2 sm:gap-x-6">
              <p>
                <span className="text-slate-500">Waist:</span> 31 in{" "}
                <span className="font-semibold text-teal-700">(↓0.5)</span>
              </p>
              <p>
                <span className="text-slate-500">Body Fat:</span> 21.8%{" "}
                <span className="font-semibold text-teal-700">(↓0.3)</span>
              </p>
            </div>
          </div>
        </div>

        {/* B) OBJECTIVE METRICS */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-900">Objective Metrics</h3>
          </div>

          <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200">
            {/* Header row */}
            <div className="grid grid-cols-4 bg-slate-50 px-4 py-3 text-xs font-semibold text-slate-600">
              <div>Metric</div>
              <div>Previous</div>
              <div>Current</div>
              <div>Change</div>
            </div>

            {/* Rows */}
            <div className="divide-y divide-slate-200 text-sm">
              <div className="grid grid-cols-4 px-4 py-3 text-slate-800">
                <div className="font-medium">Weight</div>
                <div className="text-slate-600">85.5</div>
                <div className="text-slate-900">84.2</div>
                <div className="font-semibold text-teal-700">↓1.3kg</div>
              </div>

              <div className="grid grid-cols-4 px-4 py-3 text-slate-800">
                <div className="font-medium">Body Fat</div>
                <div className="text-slate-600">22.1%</div>
                <div className="text-slate-900">21.8%</div>
                <div className="font-semibold text-teal-700">↓0.3%</div>
              </div>

              <div className="grid grid-cols-4 px-4 py-3 text-slate-800">
                <div className="font-medium">Steps (Avg)</div>
                <div className="text-slate-600">8,200</div>
                <div className="text-slate-900">10,500</div>
                <div className="font-semibold text-slate-900">↑2,300</div>
              </div>

              <div className="grid grid-cols-4 px-4 py-3 text-slate-800">
                <div className="font-medium">Sleep (Avg)</div>
                <div className="text-slate-600">6.5h</div>
                <div className="text-slate-900">7.2h</div>
                <div className="font-semibold text-slate-900">↑0.7h</div>
              </div>
            </div>
          </div>
        </div>

        {/* C) SUBJECTIVE FEEDBACK */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-900">Subjective Feedback</h3>

          {/* Adherence bar */}
          <div className="mt-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-800">Adherence</p>
              <p className="text-sm font-semibold text-slate-900">80%</p>
            </div>
            <div className="mt-2 h-2 w-full rounded-full bg-slate-100 ring-1 ring-slate-200">
              <div className="h-2 w-4/5 rounded-full bg-teal-600" />
            </div>
          </div>

          {/* Dot scales */}
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 p-4">
              <p className="text-xs font-medium text-slate-500">Energy</p>
              <p className="mt-2 text-sm font-semibold text-slate-900">
                ●●●●○ <span className="text-slate-500">(4/5)</span>
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 p-4">
              <p className="text-xs font-medium text-slate-500">Stress</p>
              <p className="mt-2 text-sm font-semibold text-slate-900">
                ●●○○○ <span className="text-slate-500">(2/5)</span>
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 p-4">
              <p className="text-xs font-medium text-slate-500">Hunger</p>
              <p className="mt-2 text-sm font-semibold text-slate-900">
                ●●●○○ <span className="text-slate-500">(3/5)</span>
              </p>
            </div>
          </div>
        </div>

        {/* D) SYSTEM INSIGHT */}
        <div className="rounded-2xl border border-indigo-200 bg-indigo-50/40 p-6 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm">
              🧠
            </div>

            <div className="flex-1">
              <h3 className="text-sm font-semibold text-slate-900">System Insight</h3>
              <p className="mt-1 text-sm text-slate-700">
                Client is responding well to current calorie deficit. Strength maintained.
              </p>

              <div className="mt-4 rounded-2xl border border-indigo-200 bg-white p-4">
                <p className="text-xs font-semibold text-slate-500">Recommendation</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">
                  Maintain 2,200 kcal for 1 more week.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* E) TRAINER NOTES */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-900">Trainer Notes</h3>
          <p className="mt-3 text-sm leading-6 text-slate-700">
            Great progress this week. Increasing steps to 11k daily. Keep calories steady.
          </p>
        </div>
      </div>

      {/* RIGHT COLUMN (30%) */}
      <div className="col-span-12 space-y-6 lg:col-span-4">
        {/* Progress Photos */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-200 p-4">
            <h3 className="text-sm font-semibold text-slate-900">Progress Photos</h3>
            <button className="text-sm font-semibold text-slate-600 hover:text-slate-900">
              ▼
            </button>
          </div>

          <div className="p-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="flex h-28 items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 text-xs font-semibold text-slate-600">
                Front
              </div>
              <div className="flex h-28 items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 text-xs font-semibold text-slate-600">
                Side
              </div>
              <div className="flex h-28 items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 text-xs font-semibold text-slate-600">
                Back
              </div>
              <div className="flex h-28 items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 text-xs font-semibold text-slate-600">
                Compare
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              <p className="text-xs font-semibold text-slate-700">Compare w/ Last</p>
              <div className="h-5 w-9 rounded-full bg-slate-200 p-0.5">
                <div className="h-4 w-4 rounded-full bg-white shadow" />
              </div>
            </div>

            <p className="mt-3 text-xs text-slate-500">Tip: Add photos weekly for best comparison.</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-900">Quick Actions</h3>
          <div className="mt-4 space-y-2">
            <button className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
              View Check-in History
            </button>
            <button className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
              Export PDF
            </button>
          </div>
          <p className="mt-4 text-xs text-slate-500">Optional panel for future features.</p>
        </div>
      </div>
    </div>
  </div>

  {/* Drawer */}
</div> 
  )
}

export default CheckinListContent

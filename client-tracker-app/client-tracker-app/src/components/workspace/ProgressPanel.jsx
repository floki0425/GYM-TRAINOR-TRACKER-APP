import React from 'react'

const ProgressPanel = () => {
  return (
   <div className="tab-panel rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
  {/* Header */}
  <div className="flex items-start justify-between gap-4">
    <div>
      <h3 className="text-lg font-semibold text-slate-900">Progress</h3>
      <p className="mt-1 text-sm text-slate-600">
        Overview of current stats and recent trends.
      </p>
    </div>

    <div className="flex gap-2">
      <button className="rounded-xl bg-teal-600 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-700 active:bg-teal-800">
        + Add Check-in
      </button>
      <button className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
        View History
      </button>
    </div>
  </div>

  {/* Metrics */}
  <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
    <div className="metric-card rounded-2xl border border-slate-200 bg-slate-50 p-5">
      <p className="text-xs font-medium text-slate-500">Weight</p>
      <p className="mt-1 text-2xl font-semibold text-slate-900">78.2 kg</p>
      <p className="mt-1 text-xs font-semibold text-teal-700">↓ 1.8 kg</p>
    </div>

    <div className="metric-card rounded-2xl border border-slate-200 bg-slate-50 p-5">
      <p className="text-xs font-medium text-slate-500">Waist</p>
      <p className="mt-1 text-2xl font-semibold text-slate-900">34 in</p>
      <p className="mt-1 text-xs font-semibold text-teal-700">↓ 1.0 in</p>
    </div>

    <div className="metric-card rounded-2xl border border-slate-200 bg-slate-50 p-5">
      <p className="text-xs font-medium text-slate-500">Adherence</p>
      <p className="mt-1 text-2xl font-semibold text-slate-900">80%</p>
      <p className="mt-1 text-xs text-slate-600">Latest check-in</p>
    </div>
  </div>

  {/* 2-column MVP content */}
  <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
    {/* Quick Trend */}
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-slate-900">4-Week Trend</p>
        <span className="rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
          MVP
        </span>
      </div>

      <div className="mt-4 space-y-3">
        <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2">
          <p className="text-sm text-slate-700">Weight</p>
          <p className="text-sm font-semibold text-teal-700">↓ -2.1 kg</p>
        </div>
        <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2">
          <p className="text-sm text-slate-700">Waist</p>
          <p className="text-sm font-semibold text-teal-700">↓ -1.8 in</p>
        </div>
        <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2">
          <p className="text-sm text-slate-700">Steps Avg</p>
          <p className="text-sm font-semibold text-slate-900">10,500</p>
        </div>

        {/* Graph placeholder */}
        <div className="mt-2 flex h-24 items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 text-xs font-medium text-slate-500">
          mini graph placeholder
        </div>
      </div>
    </div>

    {/* Latest Check-in Summary */}
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <p className="text-sm font-semibold text-slate-900">Latest Check-in</p>
      <p className="mt-1 text-sm text-slate-600">Quick highlights to review fast.</p>

      <div className="mt-4 space-y-2">
        <div className="rounded-xl border border-teal-200 bg-teal-50 px-3 py-2 text-sm text-teal-800">
          🔥 On track — consistency improving
        </div>
        <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700">
          💪 Training days: <span className="font-semibold">4/7</span>
        </div>
        <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700">
          💤 Sleep avg: <span className="font-semibold">7.2h</span>
        </div>
        <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700">
          🚶 Steps avg: <span className="font-semibold">10.5k</span>
        </div>
      </div>

      {/* Small recommendation (MVP) */}
      <div className="mt-4 rounded-2xl border border-indigo-200 bg-indigo-50/40 p-4">
        <p className="text-xs font-semibold text-slate-600">Coach Note</p>
        <p className="mt-1 text-sm font-semibold text-slate-900">
          Keep calories steady for 1 more week.
        </p>
      </div>
    </div>
  </div>
</div>
  )
}

export default ProgressPanel

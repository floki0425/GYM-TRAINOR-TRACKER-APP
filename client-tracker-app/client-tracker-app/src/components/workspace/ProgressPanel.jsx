import React from 'react'

const ProgressPanel = () => {
  return (
  <div className="min-h-screen bg-slate-50 p-8">
      <div className="mx-auto max-w-6xl rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">Progress</p>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">MVP check-in</h1>
            <p className="mt-1 text-sm text-slate-500">Latest data only.</p>
          </div>

          <button className="rounded-full bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm">
            Add Check-in
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm font-medium text-slate-500">Weight</p>
            <p className="mt-3 text-4xl font-semibold tracking-tight text-slate-900">78.2 kg</p>
            <p className="mt-2 text-sm text-slate-500">Latest entry</p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm font-medium text-slate-500">Waist</p>
            <p className="mt-3 text-4xl font-semibold tracking-tight text-slate-900">34 in</p>
            <p className="mt-2 text-sm text-slate-500">Latest entry</p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm font-medium text-slate-500">Adherence</p>
            <p className="mt-3 text-4xl font-semibold tracking-tight text-slate-900">80%</p>
            <p className="mt-2 text-sm text-slate-500">This week</p>
          </div>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-white p-5">
            <p className="text-sm font-medium text-slate-500">Training days</p>
            <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">4/7</p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5">
            <p className="text-sm font-medium text-slate-500">Sleep avg</p>
            <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">7.2 h</p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5">
            <p className="text-sm font-medium text-slate-500">Steps avg</p>
            <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">10.5k</p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">Latest check-in</p>
                <h2 className="mt-1 text-lg font-semibold text-slate-900">Quick summary</h2>
              </div>
              <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                On track
              </span>
            </div>

            <div className="mt-5 space-y-3">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                Consistency improving
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                Training days: 4/7
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                Sleep avg: 7.2h
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                Steps avg: 10.5k
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-indigo-200 bg-indigo-50/40 p-5">
            <p className="text-sm font-medium text-slate-500">Coach note</p>
            <p className="mt-3 text-lg font-semibold text-slate-900">
              Keep calories steady for 1 more week.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProgressPanel

import React from 'react'
import { useOutletContext } from 'react-router-dom'

const ProgressPanel = () => {
  const { sortedCheckin } = useOutletContext()

  const latestCheckin = sortedCheckin?.[0]

  if (!latestCheckin) {
    return (
      <div className="min-h-screen bg-slate-50 p-8">
        <div className="mx-auto max-w-6xl rounded-4xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Progress</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
            No check-in data yet
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Add a check-in to start tracking progress.
          </p>
        </div>
      </div>
    )
  }

  const formatValue = (value, suffix = '') => {
    if (value === null || value === undefined || value === '') return '--'
    return `${value}${suffix}`
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="mx-auto max-w-6xl rounded-4xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">Progress</p>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
              Latest Check-in
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Date: {latestCheckin.date}
            </p>
          </div>

          <button className="rounded-full bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm">
            Add Check-in
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm font-medium text-slate-500">Weight</p>
            <p className="mt-3 text-4xl font-semibold tracking-tight text-slate-900">
              {formatValue(latestCheckin.weightKg, ' kg')}
            </p>
            <p className="mt-2 text-sm text-slate-500">Latest entry</p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm font-medium text-slate-500">Waist</p>
            <p className="mt-3 text-4xl font-semibold tracking-tight text-slate-900">
              {formatValue(latestCheckin.waistIn, ' in')}
            </p>
            <p className="mt-2 text-sm text-slate-500">Latest entry</p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm font-medium text-slate-500">Body Fat</p>
            <p className="mt-3 text-4xl font-semibold tracking-tight text-slate-900">
              {formatValue(latestCheckin.bodyFatPct, '%')}
            </p>
            <p className="mt-2 text-sm text-slate-500">Latest entry</p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm font-medium text-slate-500">Adherence</p>
            <p className="mt-3 text-4xl font-semibold tracking-tight text-slate-900">
              {formatValue(latestCheckin.adherence, '%')}
            </p>
            <p className="mt-2 text-sm text-slate-500">This week</p>
          </div>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-4">
          <div className="rounded-3xl border border-slate-200 bg-white p-5">
            <p className="text-sm font-medium text-slate-500">Training Days</p>
            <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
              {formatValue(latestCheckin.trainingDays)}
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5">
            <p className="text-sm font-medium text-slate-500">Sleep Avg</p>
            <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
              {formatValue(latestCheckin.sleepAvg, ' h')}
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5">
            <p className="text-sm font-medium text-slate-500">Steps Avg</p>
            <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
              {formatValue(latestCheckin.stepsAvg)}
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5">
            <p className="text-sm font-medium text-slate-500">Calories Target</p>
            <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
              {formatValue(latestCheckin.caloriesTarget)}
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Latest check-in
                </p>
                <h2 className="mt-1 text-lg font-semibold text-slate-900">
                  Quick summary
                </h2>
              </div>
              <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                {latestCheckin.adherence ? 'Tracked' : 'No data'}
              </span>
            </div>

            <div className="mt-5 space-y-3">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                Goal: {formatValue(latestCheckin.goal)}
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                Hunger: {formatValue(latestCheckin.hunger)}
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                Training days: {formatValue(latestCheckin.trainingDays)}
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                Sleep avg: {formatValue(latestCheckin.sleepAvg, ' h')}
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                Steps avg: {formatValue(latestCheckin.stepsAvg)}
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-indigo-200 bg-indigo-50/40 p-5">
            <p className="text-sm font-medium text-slate-500">Trainer Notes</p>
            <p className="mt-3 text-lg font-semibold text-slate-900">
              {latestCheckin.trainerNotes || 'No trainer notes yet.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProgressPanel
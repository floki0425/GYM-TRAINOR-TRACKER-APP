import React from 'react'

const NotesPanel = () => {
  return (
   <div className="tab-panel rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
  {/* Header */}
  <div className="flex items-start justify-between gap-4">
    <div>
      <h3 className="text-lg font-semibold text-slate-900">Notes</h3>
      <p className="mt-1 text-sm text-slate-600">
        Keep coaching notes, reminders, and client feedback in one place.
      </p>
    </div>

    <div className="flex gap-2">
      <button className="rounded-xl bg-teal-600 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-700 active:bg-teal-800">
        + New Note
      </button>
      <button className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
        Save
      </button>
    </div>
  </div>

  {/* Body */}
  <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
    {/* Left: Quick categories (MVP) */}
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <p className="text-sm font-semibold text-slate-900">Quick Tags</p>
      <p className="mt-1 text-xs text-slate-600">Optional grouping for faster notes.</p>

      <div className="mt-3 flex flex-wrap gap-2">
        <button className="rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700">
          Training
        </button>
        <button className="rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
          Nutrition
        </button>
        <button className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700">
          Sleep
        </button>
        <button className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700">
          Mindset
        </button>
      </div>

      {/* Key reminders (MVP) */}
      <div className="mt-4 rounded-2xl border border-indigo-200 bg-indigo-50/40 p-4">
        <p className="text-xs font-semibold text-slate-600">Key Reminders</p>
        <ul className="mt-2 space-y-2 text-sm text-slate-700">
          <li>• Increase steps to 11k daily</li>
          <li>• Keep calories steady this week</li>
          <li>• Add progress photos every Sunday</li>
        </ul>
      </div>
    </div>

    {/* Right: Note editor (main MVP) */}
    <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-slate-900">Coach Notes</p>
        <span className="text-xs text-slate-500">Last updated: Feb 23, 2026</span>
      </div>

      <textarea
        placeholder="Write coaching notes here… (training performance, diet adherence, adjustments, reminders)"
        className="mt-3 h-56 w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-200"
      />

      {/* Footer actions (MVP) */}
      <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-slate-500">
          Tip: Keep notes short and action-based (what to do next week).
        </p>

        <div className="flex gap-2">
          <button className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
            Clear
          </button>
          <button className="rounded-xl bg-teal-600 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-700 active:bg-teal-800">
            Save Note
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
  )
}

export default NotesPanel

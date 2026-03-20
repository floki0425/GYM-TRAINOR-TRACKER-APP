import React from 'react'

const NotesPanel = () => {
  return (
 <div className="tab-panel rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
  <div className="flex items-start justify-between gap-4">
    <div>
      <h3 className="text-lg font-semibold text-slate-900">Notes</h3>
      <p className="mt-1 text-sm text-slate-600">Coach notes and reminders.</p>
    </div>

    <button className="rounded-xl bg-teal-600 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-700 active:bg-teal-800">
      Add Note
    </button>
  </div>

  <div className="mt-5">
    <textarea
      placeholder="Write notes here..."
      className="h-56 w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-200"
    />
  </div>

  <div className="mt-4 flex items-center justify-between gap-3">
    <p className="text-xs text-slate-500">Keep notes short and action-based.</p>

    <div className="flex gap-2">
      <button className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
        Clear
      </button>
      <button className="rounded-xl bg-teal-600 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-700 active:bg-teal-800">
        Save
      </button>
    </div>
  </div>
</div>
  )
}

export default NotesPanel

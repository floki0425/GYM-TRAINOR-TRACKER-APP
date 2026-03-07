import React from 'react'
import {  useOutletContext } from 'react-router-dom'

const AddClient = () => {
 
const {closeAddClient} = useOutletContext();



  return (
   <div className="fixed inset-0 z-50">
  {/* Overlay */}
  <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm" />

  {/* Modal */}
  <div className="absolute inset-0 flex items-center justify-center p-4">
    <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white shadow-2xl">
      {/* Header */}
      <div className="flex items-start justify-between border-b border-slate-200 p-6">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Add Client</h2>
          <p className="mt-1 text-sm text-slate-600">
            Create a new client profile.
          </p>
        </div>

        <button className="rounded-xl p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700">
          ✕
        </button>
      </div>

      {/* Body */}
      <div className="space-y-5 bg-white p-6">
        {/* Name */}
        <div>
          <label className="text-xs font-semibold text-slate-700">Client Name</label>
          <input
            type="text"
            placeholder="e.g. John Doe"
            className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-200"
          />
        </div>

        {/* Goal + Status */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="text-xs font-semibold text-slate-700">Goal Type</label>
            <select className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-200">
              <option>CUT</option>
              <option>LEAN BULK</option>
              <option>MAINTAIN</option>
              <option>RECOMP</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700">Status</label>
            <select className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-200">
              <option>ACTIVE</option>
              <option>PAUSED</option>
            </select>
          </div>
        </div>

        {/* Start date (optional but MVP-useful) */}
        <div>
          <label className="text-xs font-semibold text-slate-700">Start Date</label>
          <input
            type="date"
            className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-200"
          />
          <p className="mt-2 text-xs text-slate-500">
            Optional. Helps track timeline (Since…).
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-slate-200 bg-white p-6">
        <button
          onClick={closeAddClient}
          className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
          Cancel
        </button>

        <button className="rounded-xl bg-teal-600 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-700 active:bg-teal-800">
          Save Client
        </button>
      </div>
    </div>
  </div>
</div>
  )
}

export default AddClient

import React from 'react'
import dumbell from '../assets/dumbell.png'
import search from '../assets/search.png'

const TopBar = () => {
  return (
<div className="bg-white border-b border-slate-200">
  <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3">
    {/* Brand */}
    <div className="flex items-center gap-2">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-600 text-white shadow-sm">
        <img src={dumbell} alt="Logo" className="w-5" />
      </div>
      <p className="text-sm font-bold text-slate-900">Trainer Progress Tracker</p>
    </div>

    {/* Search */}
    <div className="ml-auto flex w-full max-w-md items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
      <img src={search} alt="Search" className="h-4 w-4 opacity-60" />
      <input
        type="text"
        placeholder="Search…"
        className="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
      />
    </div>

    {/* User Chip (MVP) */}
    <button className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm hover:bg-slate-50">
      {/* Avatar */}
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white">
        J
      </div>

      {/* Name + role */}
      <div className="hidden sm:block text-left">
        <p className="text-xs font-semibold text-slate-900 leading-4">Trainer Josh</p>
        <p className="text-[11px] text-slate-500 leading-4">Coach</p>
      </div>

      {/* Dropdown icon */}
      <span className="text-slate-500 text-sm">▾</span>
    </button>
  </div>
</div>
  )
}

export default TopBar

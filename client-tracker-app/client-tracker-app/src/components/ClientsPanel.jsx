import React from 'react'
import search from '../assets/search.png'

        
const ClientsPanel = ({ clients, onSelectClient, selectedClientId, loading,setClientFilter,filteredClients,clientFilter,addClient,deleteClient}) => {
 




    return (
     <div className="clients-panel bg-slate-50">
  <div className="p-4">
    <p className="mb-4 text-sm font-semibold text-slate-900">Clients</p>

    {/* Filter pills */}
    <div className="mb-4 inline-flex overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <button
        onClick={() => setClientFilter("ALL")}
        className={`px-4 py-2 text-xs font-semibold transition ${
          clientFilter === "ALL"
            ? "bg-teal-600 text-white"
            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
        }`}
      >
        All
      </button>

      <button
        onClick={() => setClientFilter("ACTIVE")}
        className={`px-4 py-2 text-xs font-semibold transition ${
          clientFilter === "ACTIVE"
            ? "bg-teal-600 text-white"
            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
        }`}
      >
        Active
      </button>

      <button
        onClick={() => setClientFilter("PAUSED")}
        className={`px-4 py-2 text-xs font-semibold transition ${
          clientFilter === "PAUSED"
            ? "bg-teal-600 text-white"
            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
        }`}
      >
        Paused
      </button>
    </div>

    {/* Search */}
    <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm">
      <img src={search} alt="Search" className="h-4 w-4 opacity-60" />
      <input
        type="text"
        placeholder="Search…"
        className="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
      />
    </div>
  </div>

  {/* List */}
  <div className="clients-panel__list w-[320px] space-y-3 border-t border-slate-200 bg-white p-4">
    {loading ? (
      <p className="text-sm text-slate-600">Loading clients…</p>
    ) : clients.length === 0 ? (
      <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-6">
        <p className="text-sm font-semibold text-slate-900">No clients yet</p>
        <p className="mt-1 text-sm text-slate-600">
          Add your first client to get started.
        </p>
      </div>
    ) : filteredClients.length === 0 ? (
      <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-6">
        <p className="text-sm font-semibold text-slate-900">
          No {clientFilter} yet
        </p>
        <p className="mt-1 text-sm text-slate-600">
          Add your first client to get started.
        </p>
      </div>
    ) : (
      filteredClients.map((client) => {
        const isSelected = client.id === selectedClientId;

        return (
          <button
            key={client.id}
            onClick={() => onSelectClient(client.id)}
            className={`client-row w-full rounded-2xl border p-4 text-left shadow-sm transition ${
              isSelected
                ? "border-teal-200 bg-teal-50"
                : "border-slate-200 bg-white hover:bg-slate-50"
            }`}
          >
            <div className="flex items-start gap-3">
              {/* Avatar placeholder */}
              
              <div
                className={`h-10 w-10 shrink-0 rounded-xl border ${
                  isSelected ? "border-teal-200 bg-white" : "border-slate-200 bg-slate-100"
                }`}
              />

              <div className="flex-1">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-slate-900">
                    {client.name}
                  </p>

                  {/* Status badge */}
                  <span
                    className={`rounded-full px-2 py-1 text-[11px] font-semibold ${
                      client.status === "ACTIVE"
                        ? "border border-teal-200 bg-teal-50 text-teal-700"
                        : "border border-slate-200 bg-slate-50 text-slate-600"
                    }`}
                  >
                    {client.status}
                  </span>
                </div>

                <div className="mt-1 text-xs text-slate-600">
                  {client.goalType} <p> Started since<span className="ml-2 rounded-full border border-indigo-200 bg-indigo-50 px-2 py-0.5 text-s font-semibold text-indigo-700 ">
                        {client.startDate}         
                      </span> </p>
                   
                </div>
              </div>
            </div>
          </button>

          
        );
      })
    )}

    
  </div>
 {/* Bottom Actions (side-by-side) */}
    <div className="pt-2 flex gap-2 p-4">
      <button
        onClick={addClient}
        className="flex-1 rounded-xl bg-teal-600 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-700 active:bg-teal-800"
      >
        + Add Client
      </button>

      <button
        onClick={deleteClient}
        className="flex-1 rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-100"
        disabled={!selectedClientId}
        title={!selectedClientId ? "Select a client first" : "Delete selected client"}
      >
        Delete
      </button>
    </div>
  

  
</div>
  )
}

export default ClientsPanel

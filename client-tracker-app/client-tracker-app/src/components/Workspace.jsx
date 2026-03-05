import { NavLink, Outlet } from "react-router-dom";

const Workspace = ({selectedClient,selectedClientId,loading, openDrawer,closeDrawer}) => {

 const outletContext={
  selectedClient,selectedClientId,loading,closeDrawer
 }



  return (
  <div className="flex workspace flex-1 bg-slate-50 p-6">
  {/* EMPTY STATE */}
  {!selectedClient ? (
    <div className="workspace__empty mx-auto w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">Select a client</h2>
      <p className="mt-2 text-sm text-slate-600">
        Choose a client from the left to view progress, program, and meal plan.
      </p>

      <div className="mt-6 rounded-xl border border-dashed border-slate-200 bg-slate-50 p-6 text-sm text-slate-500">
        Tip: Start with <span className="font-medium text-slate-700">Check-ins</span> to track weekly progress.
      </div>
    </div>
  ) : (
    <div className="workspace__content mx-auto w-full max-w-5xl">
      {/* HEADER CARD */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="workspace__title">
            <h1 className="text-2xl font-semibold text-slate-900">
              {selectedClient.name}
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              {selectedClient.goalType} • {selectedClient.status} • Since Feb 4, 2026
            </p>
          </div>

          <div className="workspace__actions flex gap-2">
            <button
              onClick={openDrawer}
              disabled={!selectedClient}
              className="rounded-xl bg-teal-600 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-700 active:bg-teal-800 disabled:opacity-50"
            >
              + Add Check-in
            </button>

            <button className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
              Edit Client
            </button>
          </div>
        </div>

        {/* TABS (Teal Active + subtle) */}
        <div className="mt-6 flex flex-wrap gap-2 border-t border-slate-100 pt-4 text-sm">
          <NavLink
            to={`/clients/${selectedClientId}/workspace/progress`}
            className={({ isActive }) =>
              `rounded-xl px-3 py-2 text-xs font-semibold transition ${
                isActive
                  ? "bg-teal-600 text-white"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`
            }
          >
            Progress
          </NavLink>

          <NavLink
            to={`/clients/${selectedClientId}/workspace/checkins`}
            className={({ isActive }) =>
              `rounded-xl px-3 py-2 text-xs font-semibold transition ${
                isActive
                  ? "bg-teal-600 text-white"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`
            }
          >
            Check-ins
          </NavLink>

          <NavLink
            to={`/clients/${selectedClientId}/workspace/program`}
            className={({ isActive }) =>
              `rounded-xl px-3 py-2 text-xs font-semibold transition ${
                isActive
                  ? "bg-teal-600 text-white"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`
            }
          >
            Program
          </NavLink>

          <NavLink
            to={`/clients/${selectedClientId}/workspace/meal-plan`}
            className={({ isActive }) =>
              `rounded-xl px-3 py-2 text-xs font-semibold transition ${
                isActive
                  ? "bg-teal-600 text-white"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`
            }
          >
            Meal Plan
          </NavLink>

          <NavLink
            to={`/clients/${selectedClientId}/workspace/notes`}
            className={({ isActive }) =>
              `rounded-xl px-3 py-2 text-xs font-semibold transition ${
                isActive
                  ? "bg-teal-600 text-white"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`
            }
          >
            Notes
          </NavLink>
        </div>
      </div>

      {/* TAB CONTENT CARD */}
      <div className="workspace__tabContent mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <Outlet context={outletContext} />
      </div>
    </div>
  )}
</div>
  );
};

export default Workspace;
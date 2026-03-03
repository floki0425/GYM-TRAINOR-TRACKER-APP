import { NavLink, Outlet } from "react-router-dom";

const Workspace = ({selectedClient,selectedClientId,loading, openDrawer,closeDrawer}) => {

 const outletContext={
  selectedClient,selectedClientId,loading,closeDrawer
 }



  return (
    <div className="flex workspace flex-1  bg-white p-6">
      
      {/* 1) EMPTY STATE (show when no client selected) */}
      {!selectedClient  ?  (<div className="workspace__empty border rounded-xl p-6 ">
        <h2 className="text-lg font-semibold">select a client</h2>
        <p className="text-sm text-slate-600">
          Choose a client from the left to view progress, program, and meal plan.
        </p>
      </div>
        
        ) : (
       
        
      <div className="workspace__content  ">
        
        {/* Client Header */}
        <div className="workspace__header border-b pb-4">
          <div className="workspace__title">
            <h1 className="text-2xl font-semibold">{selectedClient.name}</h1>
            <p className="text-sm text-slate-600">
              {selectedClient.goalType} • {selectedClient.status} • Since Feb 4, 2026
            </p>
          </div>

          <div className="workspace__actions mt-4 flex gap-2">
            <button onClick={openDrawer}
                    disabled={!selectedClient}
            className="rounded-xl bg-blue-600 px-4 py-2 text-white">
              + Add Check-in
            </button>
            <button className="rounded-xl border px-4 py-2">
              Edit Client
            </button>
          </div>
        </div>

        {/* Tabs */}
       <div className="workspace__tabs mt-4 flex gap-4 border-b pb-2 text-sm">
  
      <NavLink
        to={`/clients/${selectedClientId}/workspace/progress`}
        className={({ isActive }) =>
          `hover:text-black transition-colors pb-2 text-xs ${
            isActive ? "text-blue-500 border-b-2" : "text-gray-400"
          }`
        }
      >
        Progress
      </NavLink>

      <NavLink
        to={`/clients/${selectedClientId}/workspace/checkins`}
        className={({ isActive }) =>
          `hover:text-black transition-colors pb-2 text-xs ${
            isActive ? "text-blue-500 border-b-2" : "text-gray-400"
          }`
        }
      >
        Check-ins
      </NavLink>

      <NavLink
       to={`/clients/${selectedClientId}/workspace/program`}
        className={({ isActive }) =>
          `hover:text-black transition-colors pb-2 text-xs ${
            isActive ? "text-blue-500 border-b-2" : "text-gray-400"
          }`
        }
      >
        Program
      </NavLink>

      <NavLink
         to={`/clients/${selectedClientId}/workspace/meal-plan`}
        className={({ isActive }) =>
          `hover:text-black transition-colors pb-2 text-xs ${
            isActive ? "text-blue-500 border-b-2" : "text-gray-400"
          }`
        }
      >
        Meal Plan
      </NavLink>

      <NavLink
         to={`/clients/${selectedClientId}/workspace/notes`}
        className={({ isActive }) =>
          `hover:text-black transition-colors pb-2 text-xs ${
            isActive ? "text-blue-500 border-b-2" : "text-gray-400"
          }`
        }
      >
        Notes
      </NavLink>

</div>
        

        {/* Tab Content Area */}
        <div className="workspace__tabContent mt-6">
          {/* Progress Tab (placeholder) */}
           <Outlet context={outletContext} />
        </div>
      </div>

      )}

    </div>
  );
};

export default Workspace;
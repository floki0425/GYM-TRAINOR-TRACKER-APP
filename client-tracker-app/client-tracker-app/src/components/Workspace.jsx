import React, { useEffect }  from "react";
import ProgressPanel from "./workspace/ProgressPanel";
import ProgramPanel from "./workspace/ProgramPanel";
import MealPlanPanel from "./workspace/MealPlanPanel";
import { useState } from "react";
import CheckinsPanel from "./workspace/CheckinsPanel";
import NotesPanel from "./workspace/NotesPanel";

const Workspace = ({selectedClient,selectedClientId,loading}) => {

  const [activeTab,setActiveTab] = useState('progress');







  useEffect(() => {
  if (selectedClientId === null) return;

  setActiveTab("progress")
 
}, [selectedClientId])

const panels = {
  progress: <ProgressPanel />,
  checkins: <CheckinsPanel 
            selectedClientId={selectedClientId}
            />,
  program: <ProgramPanel   
        selectedClientId={selectedClientId}
        selectedClient={selectedClient} 
        />,
  mealplan: <MealPlanPanel 
        selectedClientId={selectedClientId}
        selectedClient={selectedClient}
        loading={loading} 
        />,
  notes: <NotesPanel/>
};



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
            <button className="rounded-xl bg-blue-600 px-4 py-2 text-white">
              + Add Check-in
            </button>
            <button className="rounded-xl border px-4 py-2">
              Edit Client
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="workspace__tabs mt-4 flex gap-4 border-b pb-2 text-sm">
         <button onClick={() => setActiveTab("progress")}  className={`hover:text-black transition-colors pb-2 cursor-pointer text-xs ${activeTab === "progress" ? "text-blue-500 pb-2 border-b-2" : "text-gray-400" } `}>Progress</button>
          <button onClick={() => setActiveTab("checkins")} className={`hover:text-black transition-colors pb-2 cursor-pointer text-xs ${activeTab === "checkins" ? "text-blue-500 pb-2 border-b-2" : "text-gray-400" } `}>Check-ins</button>
          <button onClick={() => setActiveTab("program")} className={`hover:text-black transition-colors pb-2 cursor-pointer text-xs ${activeTab === "program" ? "text-blue-500 pb-2 border-b-2" : "text-gray-400" } `}>Program</button>
          <button onClick={() => setActiveTab("mealplan")} className={`hover:text-black transition-colors pb-2 cursor-pointer text-xs ${activeTab === "mealplan" ? "text-blue-500 pb-2 border-b-2" : "text-gray-400" } `}>Meal Plan</button>
          <button onClick={() => setActiveTab("notes")} className={`hover:text-black transition-colors pb-2 cursor-pointer text-xs ${activeTab === "notes" ? "text-blue-500 pb-2 border-b-2" : "text-gray-400" } `}>Notes</button>
        </div>
        

        {/* Tab Content Area */}
        <div className="workspace__tabContent mt-6">
          
          {/* Progress Tab (placeholder) */}
          {panels[activeTab]}
        
  


        </div>
      </div>

      )}

    </div>
  );
};

export default Workspace;
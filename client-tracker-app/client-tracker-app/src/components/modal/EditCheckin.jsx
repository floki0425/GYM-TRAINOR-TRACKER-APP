import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import {  editCheckinApi } from "../../api/checkinApi";

export default function EditCheckin() {
  const { selectedCheckin,selectedClientId,closeDrawer,loadCheckin } = useOutletContext();
const [error,setError] = useState({})
const [form,setForm] = useState({
        date:selectedCheckin.date, 
        goal:selectedCheckin.goal,
        weightKg:selectedCheckin.weightKg, 
        waistIn:selectedCheckin.waistIn, 
        bodyFatPct:selectedCheckin.bodyFatPct, 
        trainingDays:selectedCheckin.trainingDays, 
        stepsAvg:selectedCheckin.stepsAvg, 
        sleepAvg:selectedCheckin.sleepAvg, 
        caloriesTarget:selectedCheckin.caloriesTarget, 
        adherence:selectedCheckin.adherence, 
        hunger:selectedCheckin.hunger,
        trainerNotes:selectedCheckin.trainerNotes,
})



const saveEdit = async (id) =>{
    const nextErrors = {};

    
      if(!form.date) nextErrors.date = "Date is required";
      if(String(form.weightKg).trim() === "")  nextErrors.weightKg= "Weight is required";
      
      if (Object.keys(nextErrors).length > 0) {
       setError(nextErrors);
       return;
      }
      
      

    const payload = {
      clientId:selectedClientId,
      id: id,
      date: form.date,
      goal:String(form.goal),
      weightKg: Number(form.weightKg),
      waistIn:Number(form.waistIn), 
      bodyFatPct:Number(form.bodyFatPct), 
      trainingDays:Number(form.trainingDays), 
      stepsAvg:Number(form.stepsAvg), 
      sleepAvg:Number(form.sleepAvg), 
      caloriesTarget:Number(form.caloriesTarget), 
      adherence:Number(form.adherence), 
      hunger:Number(form.hunger),
      trainerNotes:String(form.trainerNotes)
    };

    try {
      await editCheckinApi(payload);
         setError({});
         closeDrawer();
      await loadCheckin();

   
     
    } catch (error) {
      setError({_form: error?.message ?? "Failed to save check-in"})
     
    } 
  };
  




const updateField =  (name,value) => {
  setForm(prevForm =>({
    ...prevForm, 
    [name]: value
  }))
}








  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/35 px-4 py-6">
      
      {!selectedCheckin ? (
        <>No loaded Checkin</>
      ) : (
        <div className="w-full max-w-3xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
          {/* Header */}
          <div className="flex items-start justify-between border-b border-slate-200 px-6 py-5">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Edit Check-in</h2>
              <p className="mt-1 text-sm text-slate-500">
                Update the selected client check-in details.
              </p>
              
            <div className="text-left">
              {error.weightKg && (
                <p className="text-sm font-semibold text-red-500">{error.weightKg}</p>
              )}
              {error.date && (
                <p className="text-sm font-semibold text-red-500">{error.date}</p>
              )}
            </div>
            </div>

            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-xl text-slate-600 transition hover:bg-slate-50"
            >
              ×
            </button>
          </div>

          {/* Body */}
          <div className="px-6 py-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-800">
                  Check-in Date
                </label>
                <input
                  value={form.date}
                  onChange={(e) => updateField("date", e.target.value)}
                  placeholder={`${selectedCheckin.date}`}
                  type="date"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-teal-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-800">
                  Goal
                </label>
                <input
                  value={form.goal}
                  onChange={(e) => updateField("goal", e.target.value)}
                  placeholder={`${selectedCheckin.goal}`}
                  type="text"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-teal-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-800">
                  Weight
                </label>
                <input
                  value={form.weightKg}
                  onChange={(e) => updateField("weightKg", e.target.value)}
                  placeholder={`${selectedCheckin.weightKg}`}
                  type="number"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-teal-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-800">
                  Waist
                </label>
                <input
                value={form.waistIn}
                  onChange={(e) => updateField("waistIn", e.target.value)}
                  placeholder=""
                  type="number"                
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-teal-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-800">
                  Body Fat %
                </label>
                <input
                value={form.bodyFatPct}
                  onChange={(e) => updateField("bodyFatPct", e.target.value)}
                  placeholder={`${selectedCheckin.bodyFatPct}`}
                  type="number"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-teal-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-800">
                  Training Days
                </label>
                <input
                  value={form.trainingDays}
                  onChange={(e) => updateField("trainingDays", e.target.value)}
                  placeholder={`${selectedCheckin.trainingDays}`}
                  type="number"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-teal-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-800">
                  Steps Average
                </label>
                <input
                  value={form.stepsAvg}
                  onChange={(e) => updateField("stepsAvg", e.target.value)}
                  placeholder={`${selectedCheckin.stepsAvg}`}
                  type="number"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-teal-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-800">
                  Sleep Average
                </label>
                <input
                  value={form.sleepAvg}
                  onChange={(e)=> updateField("sleepAvg", e.target.value)}
                  placeholder={`${selectedCheckin.sleepAvg}`}
                  type="number"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-teal-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-800">
                  Calories Target
                </label>
                <input
                  
                  value={form.caloriesTarget}
                  onChange={(e) => updateField("caloriesTarget", e.target.value)}
                  placeholder={`${selectedCheckin.caloriesTarget}`}
                  type="number"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-teal-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-800">
                  Adherence
                </label>
                <input
                 value={form.adherence}
            onChange={(e) => updateField("adherence", e.target.value)}
                   placeholder={`${selectedCheckin.adherence}`}
                   type="number"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-teal-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-800">
                  Hunger
                </label>
                <input
                  value={form.hunger}
                  onChange={(e) => updateField("hunger", e.target.value)}
                  type="number"
                   placeholder={`${selectedCheckin.hunger}`}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-teal-500 focus:bg-white"
                />
              </div>
            </div>

            <div className="mt-5">
              <label className="mb-2 block text-sm font-semibold text-slate-800">
                Trainer Notes
              </label>
              <textarea
                rows={4}
                value={form.trainerNotes}
                onChange={(e) => updateField("trainerNotes", e.target.value)}
                placeholder={`${selectedCheckin.trainerNotes}`}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-teal-500 focus:bg-white"
                
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex flex-col gap-3 border-t border-slate-200 px-6 py-5 sm:flex-row sm:justify-end">
            <button
              onClick={()=>{
                closeDrawer();
              }}
              type="button"
              className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Cancel
            </button>

            <button 
             onClick={() => {
              saveEdit(selectedCheckin.id);
            }}
             
              className="rounded-2xl bg-teal-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-700"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
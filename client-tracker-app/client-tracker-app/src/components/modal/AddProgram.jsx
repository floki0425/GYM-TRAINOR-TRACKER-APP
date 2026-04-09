import React, { useState } from 'react'
import { useOutletContext } from 'react-router-dom';
import { createProgram } from '../../api/programApi';

const AddProgram = () => {
  const {closeDrawer,selectedClientId,loadMealplan,} = useOutletContext()

  const [error,setError] = useState(false);
  const [form, setForm] = useState({
   title: "",
   clientId: "",
   days: [
    {
      id: "day-1",
      day: "",
      tag: "",
      exercises: [
        {
          id: "ex-1",
          name: "",
          sets: "",
          reps: "",
        },
      ],
    },
  ],

  });


  const addDay = () => {
  setForm((prev) => ({
    ...prev,
    days: [
      ...prev.days,
      {
        id: crypto.randomUUID(),
        day: "",
        tag: "",
        exercises: [
          {
            id: crypto.randomUUID(),
            name: "",
            sets: "",
            reps: "",
          },
        ],
      },
    ],
  }));
};

const addExercise = (dayId) => {
  setForm((prev) => ({
    ...prev,
    days: prev.days.map((day) =>
      day.id === dayId
        ? {
            ...day,
            exercises: [
              ...day.exercises,
              {
                id: crypto.randomUUID(),
                name: "",
                sets: "",
                reps: "",
              },
            ],
          }
        : day
    ),
  }));
};

  
  
  const saveProgram = async()=>{
    const nextErrors = {};
      
    if(!form.goal) nextErrors.goal = "goal is required";
    if(!form.calories) nextErrors.calories = "Calories is required";
    if(!form.protein) nextErrors.protein = "Protein is required";
    if(!form.carbs) nextErrors.carbs = "Carbs is required";
    if(!form.fat) nextErrors.fat = "Fat is required";
   
  
    if(Object.keys(nextErrors).length > 0){
      setError(nextErrors);
      return;
    }
  
    const payload = {
      clientId:selectedClientId,
      goal:form.goal,
      calories:form.calories,
      protein:form.protein,
      carbs:form.carbs,
      fat:form.fat,
    }
  
   
    try {
      await createProgram(payload);
      
      setError({});
      closeDrawer();
      await loadMealplan();
  
      
  
    } catch (error) {
      setError({_form: error?.message?? "Failed to save mealplan"})
    };
  
  };
  
    const updateField = (mealplan,value)=>{
      setForm(prevform => ({
        ...prevform,
        [mealplan]:  value
      }))
    }

  return (
<div>
  <div className="fixed inset-0 z-50">
    <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm" />

    <div className="absolute inset-y-0 right-0 flex w-full max-w-3xl flex-col bg-white shadow-2xl">
      <div className="border-b border-slate-200 bg-white p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Program
            </p>
            <h2 className="mt-1 text-xl font-semibold text-slate-900">
              Add Program
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Create a training program with days, tags, sets, and reps.
            </p>
          </div>

          <button
            className="rounded-xl p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
            aria-label="Close drawer"
          >
            ✕
          </button>
        </div>
      </div>

      <div className="flex-1 space-y-6 overflow-y-auto bg-slate-50 p-6">
        {/* Program Info */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-900">Program Info</h3>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-xs font-medium text-slate-500">
                Program Title
              </label>
              <input
                type="text"
                placeholder="3-Day Training Program"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-200"
              />
            </div>

          
          </div>
        </div>

        {/* Day 1 */}
          {form.days.map((day, dayIndex) => (
            <div
              key={day.id}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">
                    Day {dayIndex + 1}
                  </h3>
                  <p className="mt-1 text-xs text-slate-500">Workout day details</p>
                </div>

                <button className="rounded-xl border border-red-200 bg-white px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-50">
                  Remove Day
                </button>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs font-medium text-slate-500">
                    Day Name
                  </label>
                  <input
                    type="text"
                    placeholder="Day name"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-medium text-slate-500">
                    Tag
                  </label>
                  <select className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900">
                    <option value="">Select tag</option>
                    <option>upper</option>
                    <option>lower</option>
                    <option>cardio</option>
                    <option>full body</option>
                  </select>
                </div>
              </div>

              <div className="mt-5 space-y-3">
                {day.exercises.map((exercise) => (
                  <div
                    key={exercise.id}
                    className="rounded-xl border border-slate-200 bg-slate-50 p-4"
                  >
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-12">
                      <input
                        type="text"
                        placeholder="Exercise name"
                        className="sm:col-span-6 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900"
                      />
                      <input
                        type="number"
                        placeholder="Sets"
                        className="sm:col-span-3 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900"
                      />
                      <input
                        type="text"
                        placeholder="Reps"
                        className="sm:col-span-3 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900"
                      />
                    </div>
                  </div>
                ))}

                <button 
                onClick={()=>{addExercise(day.id)}}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                  Add Exercise
                </button>
              </div>
            </div>
          ))}
    
        <div className="flex justify-end">
          <button 
          onClick={addDay}
          className="rounded-xl bg-teal-600 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-700 active:bg-teal-800">
            Add Day
          </button>
        </div>
      </div>

      <div className="border-t border-slate-200 bg-white p-6">
        <div className="flex items-center justify-between gap-3">
          <button className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
            Cancel
          </button>

          <button className="rounded-xl bg-teal-600 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-700 active:bg-teal-800">
            Save Program
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
  )
}

export default AddProgram

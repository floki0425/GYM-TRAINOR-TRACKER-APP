import React, { useCallback, useState } from 'react'
import { useOutletContext } from 'react-router-dom';
import { createMealplan } from '../../api/mealPlanApi';

const AddMealplan = () => {
  const [error,setError] = useState(false);
const [form, setForm] = useState({
 goal:"",
 calories:"",
 protein:"",
 carbs:"",
 fat:"",
 meals: [
  {
    name:"",
    items:[
      
    ]
  }
 ]
});


const saveMealplan = async()=>{
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
    await createMealplan(payload);
    
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

console.log(form)

const {closeDrawer,loadMealplan,selectedClientId} = useOutletContext();

  return (
 <div>
  {/* ===== Overlay ===== */}
  <div className="fixed inset-0 z-50">
    {/* Background */}
    <div
      className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm"
      onClick={closeDrawer}
    />

    {/* Drawer Container */}
    <div className="absolute inset-y-0 right-0 flex w-full max-w-3xl flex-col bg-white shadow-2xl">
      {/* ===== Sticky Header ===== */}
      <div className="sticky top-0 z-10 border-b border-slate-200 bg-white p-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Add Meal Plan</h2>
            <p className="mt-1 text-sm text-slate-600">
              Create a meal plan with calories, macros, and meal list.
            </p>
          </div>

          <button
            onClick={closeDrawer}
            className="rounded-xl p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
            aria-label="Close drawer"
          >
            ✕
          </button>
        </div>
      </div>

      {/* ===== Scrollable Body ===== */}
      <div className="flex-1 space-y-6 overflow-y-auto bg-slate-50 p-6">
        {/* Plan Overview */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-sm font-semibold text-slate-900">Plan Overview</h3>
            </div>
          </div>
           <div className="text-right">
              {error.goal && (
                <p className="text-sm font-semibold text-red-500">{error.goal}</p>
              )}
              {error.protein && (
                <p className="text-sm font-semibold text-red-500">{error.protein}</p>
              )}
              {error.fat && (
                <p className="text-sm font-semibold text-red-500">{error.fat}</p>
              )}
              {error.carbs && (
                <p className="text-sm font-semibold text-red-500">{error.carbs}</p>
              )}
                {error.calories && (
                <p className="text-sm font-semibold text-red-500">{error.calories}</p>
              )}   
            </div>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <input 
           
              type="date"
              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-200"
            />

            <select 
                 value={form.goal}
              onChange={(e)=>{updateField("goal", e.target.value)}}
            
            className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-200">
              <option>None</option>
              <option>Goal</option>
              <option>Bulking</option>
              <option>Cutting</option>
              <option>Maintenance</option>
            </select>
          </div>
        </div>

        {/* Calories & Macros */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-900">Calories & Macros</h3>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <input
              value={form.calories}
              onChange={(e)=>{updateField("calories", e.target.value)}}
              type="text"
              placeholder="Calories (e.g. 3000 kcal)"
              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-200"
            />

            <input
             value={form.protein}
              onChange={(e)=>{updateField("protein", e.target.value)}}
              type="text"
              placeholder="Protein (e.g. 160g)"
              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-200"
            />

            <input
             value={form.carbs}
              onChange={(e)=>{updateField("carbs", e.target.value)}}
              type="text"
              placeholder="Carbs (e.g. 240g)"
              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-200"
            />

            <input
             value={form.fat}
              onChange={(e)=>{updateField("fat", e.target.value)}}
              type="text"
              placeholder="Fat (e.g. 55g)"
              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-200"
            />
          </div>
        </div>

        {/* Meals */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-900">Meals</h3>

          <div className="mt-4 space-y-4">
            {/* Breakfast */}
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <input
                type="text"
                placeholder="Meal Name (e.g. Breakfast)"
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-200"
              />

              <textarea
                rows={3}
                placeholder="Meal Items (e.g. Oatmeal, Eggs)"
                className="mt-3 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-200"
              />
            </div>

            {/* Lunch */}
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <input
                type="text"
                placeholder="Meal Name (e.g. Lunch)"
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-200"
              />

              <textarea
                rows={3}
                placeholder="Meal Items (e.g. Chicken Breast, Rice)"
                className="mt-3 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-200"
              />
            </div>

            {/* Dinner */}
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <input
                type="text"
                placeholder="Meal Name (e.g. Dinner)"
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-200"
              />

              <textarea
                rows={3}
                placeholder="Meal Items (e.g. Fish, Vegetables)"
                className="mt-3 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-200"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ===== Sticky Footer ===== */}
      <div className="sticky bottom-0 flex items-center justify-between border-t border-slate-200 bg-white p-6">
        <button
          onClick={closeDrawer}
          className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
        >
          Cancel
        </button>

        <div className="flex gap-2">
          <button 
         
          className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
            Save Draft
          </button>
          <button 
           onClick={()=>{
            saveMealplan();
          }}
          className="rounded-xl bg-teal-600 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-700 active:bg-teal-800">
            Save Meal Plan
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
  )
}

export default AddMealplan

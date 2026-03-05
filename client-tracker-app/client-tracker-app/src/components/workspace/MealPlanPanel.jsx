import React, { useCallback, useEffect, useRef, useState } from 'react'
import { getMealplan, getMealplanByClientId } from '../../api/mealPlanApi';
import { useOutletContext } from 'react-router-dom';

const MealPlanPanel = () => {
  const [mealplan,setMealplan] = useState([]);
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState(null)
  const {selectedClientId} = useOutletContext();

  const clientMealPlan = mealplan.find((plan)=> plan.clientId === selectedClientId)

  const ignoreRef = useRef(false)

   const loadMealplan = useCallback(async () => {
      try{
        setLoading(true);
        setError(null)

        const data = await getMealplanByClientId(selectedClientId);

        if(!ignoreRef.current) setMealplan(data);
      } catch(err){
        if(!ignoreRef.current) setError(err?.message ?? "Failed to load mealplan")
      } finally{
        if(!ignoreRef.current) setLoading(false);
      }
    },[])



useEffect(()=>{
 ignoreRef.current = false
 loadMealplan()
 return () =>{
   ignoreRef.current = true;
 }

},[selectedClientId])
  


 

  return (
<div className="tab-panel rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
  {loading ? (
    <p className="text-sm text-slate-600">Loading…</p>
  ) : (
    <div>
      {!clientMealPlan ? (
        <div className="meal-header flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">Meal Plan</h3>
            <p className="mt-1 text-sm text-slate-600">
              No meal plan yet. Create one to set calories and macros.
            </p>
          </div>

          <div className="meal-actions flex gap-2">
            <button className="rounded-xl bg-teal-600 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-700 active:bg-teal-800">
              + New Meal Plan
            </button>
            <button className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
              Edit
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Summary */}
          <div className="meal-summary rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <div className="meal-summary__title flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
              <p className="text-sm font-semibold text-slate-900">
                {clientMealPlan.goal}
              </p>
              <p className="text-sm text-slate-700">
                Calories:{" "}
                <span className="font-semibold text-slate-900">
                  {clientMealPlan.calories}
                </span>
              </p>
            </div>

            <div className="meal-summary__macros mt-4 flex flex-wrap gap-2">
              <div className="macro-chip rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700">
                Protein: {clientMealPlan.protein}
              </div>
              <div className="macro-chip rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                Carbs: {clientMealPlan.carbs}
              </div>
              <div className="macro-chip rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700">
                Fat: {clientMealPlan.fat}
              </div>
            </div>
          </div>

          {/* Meals */}
          <div className="space-y-4">
            {clientMealPlan.meals.map((meals, mealIndex) => {
              return (
                <div key={mealIndex} className="meal-list">
                  <div className="meal-card rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="meal-card__header flex items-center justify-between">
                      <h4 className="text-sm font-semibold text-slate-900">
                        {meals.name}
                      </h4>
                      <span className="rounded-full bg-slate-100 px-2 py-1 text-[11px] font-semibold text-slate-600">
                        {meals.items.length} items
                      </span>
                    </div>

                    <div className="mt-4 grid gap-2 sm:grid-cols-2">
                      {meals.items.map((items, itemIndex) => {
                        return (
                          <div key={itemIndex}>
                            <p className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-800">
                              {items}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Add meal */}
          <button className="meal-add w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-teal-700 hover:bg-slate-50">
            + Add Meal
          </button>
        </div>
      )}
    </div>
  )}
</div>
  )
}

export default MealPlanPanel

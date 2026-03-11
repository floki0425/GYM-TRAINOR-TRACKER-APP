import React from 'react'
import { useOutletContext } from 'react-router-dom';

const MealplanListContent = () => {
 const{clientMealPlan}=useOutletContext()

  return (
     <div className="tab-panel rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div 
        
      className="border-b border-slate-200 p-6">
           <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <h3 className="text-2xl font-semibold text-slate-900">Meal Plan</h3>
                <p className="mt-2 text-sm text-slate-600">
                  Structured nutrition plan for client progress and consistency.
                </p>
              </div>

              <button className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                Edit Plan
              </button>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Goal
                </p>
                <p className="mt-2 text-base font-semibold text-slate-900">
                  {clientMealPlan.goal}
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Calories
                </p>
                <p className="mt-2 text-base font-semibold text-slate-900">
                  {clientMealPlan.calories}
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Protein
                </p>
                <p className="mt-2 text-base font-semibold text-slate-900">
                  {clientMealPlan.protein}
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Carbs / Fat
                </p>
                <p className="mt-2 text-base font-semibold text-slate-900">
                  {clientMealPlan.carbs} / {clientMealPlan.fat}
                </p>
              </div>
            </div>
    </div>
       <div>
            {/* Meals */}
          <div className="space-y-4 px-6">
            {clientMealPlan.meals.map((meal, mealIndex) => {
              return (
                <div
                  key={mealIndex}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h4 className="text-base font-semibold text-slate-900">
                        {meal.name}
                      </h4>
                      <p className="mt-1 text-sm text-slate-500">
                        Meal {mealIndex + 1}
                      </p>
                    </div>

                    <span className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-600">
                      {meal.items.length} items
                    </span>
                  </div>

                  <div className="mt-4 overflow-hidden rounded-xl ">
                   

                    {meal.items.map((item, itemIndex) => {
                      return (
                        <div
                          key={itemIndex}
                          className="grid grid-cols-3 items-center  px-4 py-3 text-sm text-slate-800 last:border-b-0"
                        >
                          <p>{typeof item === "string" ? item : item.name}</p>
                          <p>{typeof item === "string" ? "30g" : item.quantity || "-"}</p>
                          <p>{typeof item === "string" ? "-" : item.unit || "-"}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Notes */}
          <div className="p-6 pt-0">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-900">Notes</h3>

              <div className="mt-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-700">
                {clientMealPlan.notes || "No notes added yet."}
              </div>
            </div>
          </div>
          </div>
    </div>
  )
}

export default MealplanListContent

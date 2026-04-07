import React from 'react'
import { useOutletContext } from 'react-router-dom';

const MealplanListContent = () => {
 const{clientMealPlan}=useOutletContext()

  return (
   <div className="tab-panel rounded-2xl border border-slate-200 bg-white shadow-sm">
  <div className="border-b border-slate-200 p-6">
    <div className="flex items-start justify-between gap-4">
      <div>
        <h3 className="text-xl font-semibold text-slate-900">Meal Plan</h3>
        <p className="mt-1 text-sm text-slate-600">Nutrition plan overview.</p>
      </div>

      <button className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
        Edit
      </button>
    </div>

    <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
        <p className="text-xs font-medium text-slate-500">Goal</p>
        <p className="mt-2 text-sm font-semibold text-slate-900">{clientMealPlan.goal}</p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
        <p className="text-xs font-medium text-slate-500">Calories</p>
        <p className="mt-2 text-sm font-semibold text-slate-900">{clientMealPlan.calories}</p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
        <p className="text-xs font-medium text-slate-500">Protein</p>
        <p className="mt-2 text-sm font-semibold text-slate-900">{clientMealPlan.protein}</p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
        <p className="text-xs font-medium text-slate-500">Carbs / Fat</p>
        <p className="mt-2 text-sm font-semibold text-slate-900">
          {clientMealPlan.carbs} / {clientMealPlan.fat}
        </p>
      </div>
    </div>
  </div>

  <div className="space-y-4 p-6">
    {clientMealPlan.meals.map((meal, mealIndex) => {
      return (
        <div
          key={mealIndex}
          className="rounded-2xl border border-slate-200 bg-white p-5"
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-semibold text-slate-900">{meal.name}</h4>
              <p className="mt-1 text-xs text-slate-500">Meal {mealIndex + 1}</p>
            </div>

            <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600">
              {meal.items.length} items
            </span>
          </div>

          <div className="mt-4 space-y-2">
            {meal.items.map((item, itemIndex) => {
              return (
                <div
                  key={itemIndex}
                  className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800"
                >
                  <p>{typeof item === "string" ? item : item.name}</p>
                  <p className="text-slate-500">
                    {typeof item === "string"
                      ? "30g"
                      : `${item.quantity || "-"} ${item.unit || ""}`.trim()}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      );
    })}

    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <h3 className="text-sm font-semibold text-slate-900">Notes</h3>
      <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
        {clientMealPlan.notes || "No notes added yet."}
      </div>
    </div>
  </div>
</div> 
  )
}

export default MealplanListContent

import React from 'react'
import { useOutletContext } from 'react-router-dom'

const MealplanListContent = () => {
  const { selectedMealplan } = useOutletContext()

  if (!selectedMealplan) return null

  const meals = selectedMealplan.meals ?? []
  const totalItems = meals.reduce(
    (sum, meal) => sum + (meal.items?.length ?? 0),
    0
  )

  const getMealTypeStyles = (type = '') => {
    switch (type.toLowerCase()) {
      case 'main':
        return 'border-emerald-200 bg-emerald-50 text-emerald-700'
      case 'snack':
        return 'border-orange-200 bg-orange-50 text-orange-700'
      case 'pre-workout':
        return 'border-blue-200 bg-blue-50 text-blue-700'
      case 'post-workout':
        return 'border-purple-200 bg-purple-50 text-purple-700'
      default:
        return 'border-slate-200 bg-slate-50 text-slate-700'
    }
  }

  return (
    <div className="p-5">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          Meal Plan
        </p>
        <h2 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
          {selectedMealplan.goal}
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Date: {selectedMealplan.date}
        </p>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-xs font-medium text-slate-500">Meals</p>
          <p className="mt-2 text-lg font-semibold text-slate-900">
            {meals.length}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-xs font-medium text-slate-500">Items</p>
          <p className="mt-2 text-lg font-semibold text-slate-900">
            {totalItems}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-xs font-medium text-slate-500">Calories</p>
          <p className="mt-2 text-lg font-semibold text-slate-900">
            {selectedMealplan.calories}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-xs font-medium text-slate-500">Protein</p>
          <p className="mt-2 text-lg font-semibold text-slate-900">
            {selectedMealplan.protein}g
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-xs font-medium text-slate-500">Carbs</p>
          <p className="mt-2 text-lg font-semibold text-slate-900">
            {selectedMealplan.carbs}g
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-xs font-medium text-slate-500">Fat</p>
          <p className="mt-2 text-lg font-semibold text-slate-900">
            {selectedMealplan.fat}g
          </p>
        </div>
      </div>

      {meals.map((meal) => {
        const items = meal.items ?? []

        return (
          <div key={meal.id} className="mt-4">
            <div className="space-y-2">
              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-base font-semibold text-slate-900">
                      {meal.name}
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">
                      {items.length} items
                    </p>
                  </div>

                  <span
                    className={`rounded-full border px-3 py-1 text-xs font-semibold ${getMealTypeStyles(meal.type)}`}
                  >
                    {meal.type ?? 'Meal'}
                  </span>
                </div>

                <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200">
                  <div className="grid grid-cols-12 bg-slate-50 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    <div className="col-span-8">Food Item</div>
                    <div className="col-span-4">Grams</div>
                  </div>

                  {items.map((item) => (
                    <div key={item.id} className="divide-y divide-slate-200">
                      <div className="grid grid-cols-12 items-center px-4 py-3 text-sm text-slate-800">
                        <div className="col-span-8 font-medium text-slate-900">
                          {item.name}
                        </div>
                        <div className="col-span-4 text-slate-600">
                          {item.grams}g
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default MealplanListContent
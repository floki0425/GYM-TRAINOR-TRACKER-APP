import React, { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { editMealplan } from '../../api/mealplanApi'

const EditMealplan = () => {
  const {
    closeDrawer,
    selectedClientId,
    loadMealplan,
    selectedMealplan,
  } = useOutletContext()

  const createEmptyForm = () => ({
    id: '',
    clientId: selectedClientId,
    date: '',
    goal: '',
    calories: '',
    protein: '',
    carbs: '',
    fat: '',
    meals: [
      {
        id: crypto.randomUUID(),
        name: '',
        type: '',
        items: [
          {
            id: crypto.randomUUID(),
            name: '',
            grams: '',
          },
        ],
      },
    ],
  })

  const [error, setError] = useState({})
  const [form, setForm] = useState(createEmptyForm)

  const removeMeal = (mealId) => {
    setForm((prev) => ({
      ...prev,
      meals: prev.meals.filter((meal) => meal.id !== mealId),
    }))
  }

  const addMeal = () => {
    setForm((prev) => ({
      ...prev,
      meals: [
        ...prev.meals,
        {
          id: crypto.randomUUID(),
          name: '',
          type: '',
          items: [
            {
              id: crypto.randomUUID(),
              name: '',
              grams: '',
            },
          ],
        },
      ],
    }))
  }

  const addItem = (mealId) => {
    setForm((prev) => ({
      ...prev,
      meals: prev.meals.map((meal) =>
        meal.id === mealId
          ? {
              ...meal,
              items: [
                ...meal.items,
                {
                  id: crypto.randomUUID(),
                  name: '',
                  grams: '',
                },
              ],
            }
          : meal
      ),
    }))
  }

  const updateField = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const updateMeal = (mealId, field, value) => {
    setForm((prev) => ({
      ...prev,
      meals: prev.meals.map((meal) =>
        meal.id === mealId
          ? {
              ...meal,
              [field]: value,
            }
          : meal
      ),
    }))
  }

  const updateItem = (mealId, itemId, field, value) => {
    setForm((prev) => ({
      ...prev,
      meals: prev.meals.map((meal) =>
        meal.id !== mealId
          ? meal
          : {
              ...meal,
              items: meal.items.map((item) =>
                item.id === itemId
                  ? {
                      ...item,
                      [field]: value,
                    }
                  : item
              ),
            }
      ),
    }))
  }

  const saveEdit = async (id) => {
    const nextErrors = {}

    if (!form.goal) nextErrors.goal = 'Goal is required'

    if (Object.keys(nextErrors).length > 0) {
      setError(nextErrors)
      return
    }

    const payload = {
      id,
      clientId: form.clientId,
      date: form.date,
      goal: form.goal,
      calories: Number(form.calories) || 0,
      protein: Number(form.protein) || 0,
      carbs: Number(form.carbs) || 0,
      fat: Number(form.fat) || 0,
      meals: form.meals.map((meal) => ({
        id: meal.id,
        name: meal.name,
        type: meal.type,
        items: meal.items.map((item) => ({
          id: item.id,
          name: item.name,
          grams: Number(item.grams) || 0,
        })),
      })),
    }

    try {
      await editMealplan(payload)
      setError({})
      closeDrawer()
      await loadMealplan()
    } catch (error) {
      setError({ _form: error?.message ?? 'Failed to save mealplan' })
    }
  }

  useEffect(() => {
    if (!selectedMealplan) {
      setForm(createEmptyForm())
      return
    }

    setForm({
      id: selectedMealplan.id ?? '',
      clientId: selectedMealplan.clientId ?? selectedClientId,
      date: selectedMealplan.date ?? '',
      goal: selectedMealplan.goal ?? '',
      calories: selectedMealplan.calories ?? '',
      protein: selectedMealplan.protein ?? '',
      carbs: selectedMealplan.carbs ?? '',
      fat: selectedMealplan.fat ?? '',
      meals:
        selectedMealplan.meals?.map((meal) => ({
          id: meal.id ?? crypto.randomUUID(),
          name: meal.name ?? '',
          type: meal.type ?? '',
          items:
            meal.items?.map((item) => ({
              id: item.id ?? crypto.randomUUID(),
              name: item.name ?? '',
              grams: item.grams ?? '',
            })) ?? [],
        })) ?? [],
    })
  }, [selectedMealplan, selectedClientId])

  return (
    <div>
      <div className="fixed inset-0 z-50">
        <div
          className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm"
          onClick={closeDrawer}
        />

        <div className="absolute inset-y-0 right-0 flex w-full max-w-3xl flex-col bg-white shadow-2xl">
          <div className="border-b border-slate-200 bg-white p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Meal Plan
                </p>
                <h2 className="mt-1 text-xl font-semibold text-slate-900">
                  Edit Meal Plan
                </h2>
                <p className="mt-1 text-sm text-slate-600">
                  Edit meals, food items, and macro targets.
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

          <div className="flex-1 space-y-6 overflow-y-auto bg-slate-50 p-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-900">
                Meal Plan Info
              </h3>

              <div className="text-right">
                {error.goal && (
                  <p className="text-sm font-semibold text-red-500">
                    {error.goal}
                  </p>
                )}
                {error._form && (
                  <p className="text-sm font-semibold text-red-500">
                    {error._form}
                  </p>
                )}
              </div>

              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs font-medium text-slate-500">
                    Date
                  </label>
                  <input
                    value={form.date}
                    onChange={(e) => updateField('date', e.target.value)}
                    type="date"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-medium text-slate-500">
                    Goal
                  </label>
                  <input
                    value={form.goal}
                    onChange={(e) => updateField('goal', e.target.value)}
                    type="text"
                    placeholder="Bulking"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-medium text-slate-500">
                    Calories
                  </label>
                  <input
                    value={form.calories}
                    onChange={(e) => updateField('calories', e.target.value)}
                    type="number"
                    placeholder="3000"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-medium text-slate-500">
                    Protein
                  </label>
                  <input
                    value={form.protein}
                    onChange={(e) => updateField('protein', e.target.value)}
                    type="number"
                    placeholder="160"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-medium text-slate-500">
                    Carbs
                  </label>
                  <input
                    value={form.carbs}
                    onChange={(e) => updateField('carbs', e.target.value)}
                    type="number"
                    placeholder="240"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-medium text-slate-500">
                    Fat
                  </label>
                  <input
                    value={form.fat}
                    onChange={(e) => updateField('fat', e.target.value)}
                    type="number"
                    placeholder="55"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900"
                  />
                </div>
              </div>
            </div>

            {form.meals.map((meal, mealIndex) => (
              <div
                key={meal.id}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900">
                      Meal {mealIndex + 1}
                    </h3>
                    <p className="mt-1 text-xs text-slate-500">
                      Meal details and food items
                    </p>
                  </div>

                  <button
                    onClick={() => removeMeal(meal.id)}
                    className="rounded-xl border border-red-200 bg-white px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
                  >
                    Remove Meal
                  </button>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-xs font-medium text-slate-500">
                      Meal Name
                    </label>
                    <input
                      value={meal.name}
                      onChange={(e) =>
                        updateMeal(meal.id, 'name', e.target.value)
                      }
                      type="text"
                      placeholder="Breakfast"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-xs font-medium text-slate-500">
                      Meal Type
                    </label>
                    <select
                      value={meal.type}
                      onChange={(e) =>
                        updateMeal(meal.id, 'type', e.target.value)
                      }
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900"
                    >
                      <option value="">Select type</option>
                      <option value="main">main</option>
                      <option value="snack">snack</option>
                      <option value="breakfast">breakfast</option>
                      <option value="dinner">dinner</option>
                    </select>
                  </div>
                </div>

                <div className="mt-5 space-y-3">
                  {meal.items.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-xl border border-slate-200 bg-slate-50 p-4"
                    >
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-12">
                        <input
                          value={item.name}
                          onChange={(e) =>
                            updateItem(meal.id, item.id, 'name', e.target.value)
                          }
                          type="text"
                          placeholder="Food item"
                          className="sm:col-span-8 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900"
                        />
                        <input
                          value={item.grams}
                          onChange={(e) =>
                            updateItem(meal.id, item.id, 'grams', e.target.value)
                          }
                          type="number"
                          placeholder="Grams"
                          className="sm:col-span-4 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900"
                        />
                      </div>
                    </div>
                  ))}

                  <button
                    onClick={() => addItem(meal.id)}
                    className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    Add Item
                  </button>
                </div>
              </div>
            ))}

            <div className="flex justify-end">
              <button
                onClick={addMeal}
                className="rounded-xl bg-teal-600 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-700 active:bg-teal-800"
              >
                Add Meal
              </button>
            </div>
          </div>

          <div className="border-t border-slate-200 bg-white p-6">
            <div className="flex items-center justify-between gap-3">
              <button
                onClick={closeDrawer}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                onClick={() => saveEdit(form.id)}
                className="rounded-xl bg-teal-600 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-700 active:bg-teal-800"
              >
                Save Meal Plan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditMealplan
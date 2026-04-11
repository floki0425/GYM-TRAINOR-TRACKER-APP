import React from 'react'
import { useOutletContext } from 'react-router-dom'

const ProgramListContent = () => {
  const { selectedProgram} = useOutletContext()

  console.log(selectedProgram)

  if (!selectedProgram) return null

  const days = selectedProgram.days ?? []
  const totalExercises = days.reduce(
    (sum, day) => sum + (day.exercises?.length ?? 0),
    0
)

const getTagStyles = (tag = '') => {
  switch (tag.toLowerCase()) {
    case 'cardio':
      return 'border-orange-200 bg-orange-50 text-orange-700'
    case 'upper':
      return 'border-blue-200 bg-blue-50 text-blue-700'
    case 'lower':
      return 'border-emerald-200 bg-emerald-50 text-emerald-700'
    case 'core':
      return 'border-purple-200 bg-purple-50 text-purple-700'
    default:
      return 'border-slate-200 bg-slate-50 text-slate-700'
  }
}



  return (
    <div className=" p-5  ">
       <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Program
            </p>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
              {selectedProgram.title}
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Structured weekly split with exercises, sets, and reps.
            </p>
          </div>
          
      <div className="mt-5 grid grid-cols-3 gap-3">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-xs font-medium text-slate-500">Days</p>
          <p className="mt-2 text-lg font-semibold text-slate-900">Days Card</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-xs font-medium text-slate-500">Exercises</p>
          <p className="mt-2 text-lg font-semibold text-slate-900">{totalExercises}</p>
        </div>

      </div>

      {days.map((program, programIndex) => {
        return (
          <div key={programIndex} className="mt-4">
            
            <div className="space-y-2">
              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-base font-semibold text-slate-900">
                      {program.day}
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">3 exercises</p>
                  </div>

                 <span className={`rounded-full border  px-3 py-1 text-xs font-semibold ${getTagStyles(program.tag)}`}>
                  {program.tag ?? 'Workout'}
                </span>
                </div>

                <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200">
                  <div className="grid grid-cols-12 bg-slate-50 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    <div className="col-span-6">Exercise</div>
                    <div className="col-span-3">Sets</div>
                    <div className="col-span-3">Reps</div>
                  </div>

                  {program.exercises.map((exercise, exercisesIndex) => {
                    const exerciseName =
                      typeof exercise === 'string' ? exercise : exercise.name
                    const sets =
                      typeof exercise === 'object' ? exercise.sets : undefined
                    const reps =
                      typeof exercise === 'object' ? exercise.reps : undefined

                    return (
                      <div
                        key={exercisesIndex}
                        className="divide-y divide-slate-200"
                      >
                        <div className="grid grid-cols-12 items-center px-4 py-3 text-sm text-slate-800">
                          <div className="col-span-6 font-medium text-slate-900">
                            {exerciseName}
                          </div>
                          <div className="col-span-3 text-slate-600">
                            {sets} sets
                          </div>
                          <div className="col-span-3 text-slate-600">
                            {reps}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ProgramListContent
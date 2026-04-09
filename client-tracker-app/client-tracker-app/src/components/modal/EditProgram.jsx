import React from 'react'

const EditProgram = () => {


    
  return (
   <div>
  <div className="fixed inset-0 z-50">
    <div
      className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm"
      onClick={closeDrawer}
    />

    <div className="absolute inset-y-0 right-0 flex w-full max-w-2xl flex-col bg-white shadow-2xl">
      {/* Header */}
      <div className="border-b border-slate-200 bg-white p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Program</h2>
            <p className="mt-1 text-sm text-slate-600">
              Add workout days and exercises.
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

      {/* Body */}
      <div className="flex-1 space-y-5 overflow-y-auto bg-slate-50 p-6">
        <div className="flex justify-end">
          <button
            onClick={addProgramDay}
            className="rounded-xl bg-teal-600 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-700 active:bg-teal-800"
          >
            Add Day
          </button>
        </div>

        <div className="space-y-4">
          {form.program.map((day, dayIndex) => {
            return (
              <div
                key={day.id || dayIndex}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900">
                      Day {dayIndex + 1}
                    </h3>
                    <p className="mt-1 text-xs text-slate-500">
                      One exercise per line
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeProgramDay(dayIndex)}
                    className="rounded-xl border border-red-200 bg-white px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
                  >
                    Remove
                  </button>
                </div>

                <div className="mt-4 space-y-3">
                  <input
                    value={day.day}
                    onChange={(e) =>
                      updateProgramDay(dayIndex, "day", e.target.value)
                    }
                    type="text"
                    placeholder="Day title (e.g. DAY 1 - UPPER)"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-200"
                  />

                  <textarea
                    rows={5}
                    value={day.exercises.join("\n")}
                    onChange={(e) =>
                      updateProgramExercises(dayIndex, e.target.value)
                    }
                    placeholder={`CHEST\nSHOULDER\nBICEP`}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-200"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-slate-200 bg-white p-6">
        <div className="flex items-center justify-between gap-3">
          <button
            onClick={closeDrawer}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            onClick={() => {
              saveProgram();
            }}
            className="rounded-xl bg-teal-600 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-700 active:bg-teal-800"
          >
            Save Program
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
  )
}

export default EditProgram

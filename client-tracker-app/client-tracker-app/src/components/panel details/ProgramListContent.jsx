import React from 'react'
import { useOutletContext } from 'react-router-dom';

const ProgramListContent = () => {
  const {clientProgram} = useOutletContext();


    
  return (
   <div className="space-y-3">
            {clientProgram.program.map((program, programIndex) => {
              return (
                <div
                  key={programIndex}
                  className="rounded-2xl border border-slate-200 bg-white p-5"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-slate-900">{program.day}</p>
                    <span className="rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700">
                      {program.exercises.length} exercises
                    </span>
                  </div>

                  <div className="mt-4 space-y-2">
                    {program.exercises.map((exercise, exercisesIndex) => {
                      const exerciseName =
                        typeof exercise === "string" ? exercise : exercise.name;
                      const sets = typeof exercise === "object" ? exercise.sets : undefined;
                      const reps = typeof exercise === "object" ? exercise.reps : undefined;

                      return (
                        <div
                          key={exercisesIndex}
                          className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3"
                        >
                          <div className="flex items-center justify-between gap-3">
                            <p className="text-sm font-medium text-slate-800">{exerciseName}</p>
                            <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                              <span className="rounded-lg bg-white px-2 py-1 ring-1 ring-slate-200">
                                {sets ?? "—"} sets
                              </span>
                              <span className="rounded-lg bg-white px-2 py-1 ring-1 ring-slate-200">
                                {reps ?? "—"} reps
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
  )
}

export default ProgramListContent

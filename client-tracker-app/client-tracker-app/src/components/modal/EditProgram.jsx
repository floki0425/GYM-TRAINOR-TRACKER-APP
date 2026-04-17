import React, { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom';
import { editProgram } from '../../api/programApi';

const EditProgram = () => {
  const {closeDrawer,selectedClientId,loadingProgram,selectedProgram} = useOutletContext()

  const createEmptyForm =({
    id:"",
    title: "",
   clientId: selectedClientId,
   date:"", 
   days: [
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
  })

  const [error,setError] = useState({});
  const [form, setForm] = useState(createEmptyForm);


  console.log(form)



  
     
    
  




   
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

  
  
  const saveEdit = async(id)=>{
    const nextErrors = {};
      
    if(!form.title) nextErrors.title = "Title is required";
   
   
  
    if(Object.keys(nextErrors).length > 0){
      setError(nextErrors);
      return;
    }
  
   const payload = {
    id:id ,
    title: form.title,
    clientId: form.clientId,
    date: form.date,
    days: form.days.map((day) => ({
      id: day.id,
      day: day.day,
      tag: day.tag,
      exercises: day.exercises.map((exercise) => ({
        id: exercise.id,
        name: exercise.name,
        sets: exercise.sets,
        reps: exercise.reps,
    })),
  })),
};
  
   
    try {
      await editProgram(payload);
      
      setError({});
      closeDrawer();
      await loadingProgram();
  
      
  
    } catch (error) {
      setError({_form: error?.message?? "Failed to save Program"})
    };
  
  };

  
  
    const updateField = (program,value)=>{
      setForm(prevform => ({
        ...prevform,
        [program]:  value
      }))
    }

     const updateDay= (dayId , field , value)=>{
      setForm(prevform => ({
        ...prevform,
        days: prevform.days.map((day)=>{
          if (day.id === dayId) return {
            ...day,
            [field] : value 
          }

          return day;
          
          
        })
        
      }))
    }

    const updateExercise = (dayId,exerciseId,field,value)=>{
      setForm(prevForm =>({
        ...prevForm,
        days: prevForm.days.map((day)=>{
          if(day.id !== dayId) return day
          
          return{
            ...day,
            exercises: day.exercises.map((exercise)=>{  
              if(exercise.id === exerciseId) return {
                ...exercise,
                [field] : value
              }
              return exercise
            })
          }
        })
      }))
    }

 useEffect(() => {
    if (!selectedProgram) {
      setForm(createEmptyForm())
      return
    }

    setForm({
      id: selectedProgram.id ?? '',
      title: selectedProgram.title ?? '',
      clientId: selectedProgram.clientId ?? selectedClientId,
      date: selectedProgram.date,
      days:
        selectedProgram.days?.map((day) => ({
          id: day.id,
          day: day.day ?? '',
          tag: day.tag ?? '',
          exercises:
            day.exercises?.map((exercise) => ({
              id: exercise.id,
              name: exercise.name ?? '',
              sets: exercise.sets ?? '',
              reps: exercise.reps ?? '',
            })) ?? [],
        })) ?? [],
    })
  }, [])

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
              Edit Program
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Edit a training program with days, tags, sets, and reps.
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
             <div className="text-right">
              {error.title && (
                <p className="text-sm font-semibold text-red-500">{error.title}</p>
              )}
              
            </div>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-xs font-medium text-slate-500">
                Program Title
              </label>
              <input
                value={form.title}
                onChange={(e) => {
                  updateField("title", e.target.value);
                }}
                type="text"
                placeholder="3-Day Training Program"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-200"
              />          
            </div>
              <div>
              <label className="mb-2 block text-xs font-medium text-slate-500">
                Date
              </label>
              <input
                value={form.date}
                onChange={(e) => {
                  updateField("date", e.target.value);
                }}
                type="date"
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
                    value={day.day}
                    onChange={(e) => {
                        updateDay(day.id,"day" , e.target.value);
                      }}
                    type="text"
                    placeholder="Day name"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-medium text-slate-500">
                    Tag
                  </label>
                  <select 
                  value={day.tag}
                  onChange={(e) => {
                        updateDay(day.id,"tag", e.target.value);
                      }}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900">
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
                       value={exercise.name}
                       onChange={(e) => {
                          updateExercise(day.id,exercise.id,"name", e.target.value);
                        }}
                        type="text"
                        placeholder="Exercise name"
                        className="sm:col-span-6 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900"
                      />
                      <input
                        value={exercise.sets}
                        onChange={(e) => {
                          updateExercise(day.id,exercise.id,"sets", e.target.value);
                        }}
                        type="number"
                        placeholder="Sets"
                        className="sm:col-span-3 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900"
                      />
                      <input
                        value={exercise.reps}
                        onChange={(e) => {
                          updateExercise(day.id,exercise.id,"reps", e.target.value);
                        }}
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

          <button 
          onClick={()=>{
            saveEdit(form.id);
          }}
          className="rounded-xl bg-teal-600 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-700 active:bg-teal-800">
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

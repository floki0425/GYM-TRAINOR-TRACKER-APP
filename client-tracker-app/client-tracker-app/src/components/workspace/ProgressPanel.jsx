import React from 'react'

const ProgressPanel = () => {
  return (
     <div className="tab-panel border rounded-xl p-4">
            <h3 className="font-semibold">Progress</h3>

            <div className="mt-4 grid grid-cols-3 gap-4">
              <div className="metric-card rounded-xl border p-4">
                <p className="text-xs text-slate-600">Weight</p>
                <p className="text-xl font-semibold">78.2 kg</p>
                <p className="text-xs text-slate-600">↓ 1.8 kg</p>
              </div>

              <div className="metric-card rounded-xl border p-4">
                <p className="text-xs text-slate-600">Waist</p>
                <p className="text-xl font-semibold">34 in</p>
                <p className="text-xs text-slate-600">↓ 1.0 in</p>
              </div>

              <div className="metric-card rounded-xl border p-4">
                <p className="text-xs text-slate-600">Adherence</p>
                <p className="text-xl font-semibold">80%</p>
                <p className="text-xs text-slate-600">Last check-in</p>
              </div>
            </div>
          </div>
  )
}

export default ProgressPanel

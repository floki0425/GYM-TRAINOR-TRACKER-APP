export default function EditCheckin() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/35 px-4 py-6">
      <div className="w-full max-w-3xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-200 px-6 py-5">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Edit Check-in</h2>
            <p className="mt-1 text-sm text-slate-500">
              Update the selected client check-in details.
            </p>
          </div>

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-xl text-slate-600 transition hover:bg-slate-50"
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-800">
                Check-in Date
              </label>
              <input
                type="date"
                defaultValue="2026-02-24"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-teal-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-800">
                Status
              </label>
              <select className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-teal-500 focus:bg-white">
                <option>On Track</option>
                <option>Needs Attention</option>
                <option>Off Track</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-800">
                Goal
              </label>
              <input
                type="text"
                defaultValue="CUT"
                placeholder="CUT / BULK / RECOMP"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-teal-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-800">
                Current Weight
              </label>
              <input
                type="text"
                defaultValue="72 kg"
                placeholder="e.g. 72 kg"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-teal-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-800">
                Calories
              </label>
              <input
                type="text"
                defaultValue="2200"
                placeholder="e.g. 2200"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-teal-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-800">
                Training Performance
              </label>
              <select className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-teal-500 focus:bg-white">
                <option>Excellent</option>
                <option>Good</option>
                <option>Average</option>
                <option>Poor</option>
              </select>
            </div>
          </div>

          <div className="mt-5">
            <label className="mb-2 block text-sm font-semibold text-slate-800">
              Coach Notes
            </label>
            <textarea
              rows="4"
              placeholder="Write notes about this check-in..."
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-teal-500 focus:bg-white"
              defaultValue="Progress looks steady."
            />
          </div>

          <div className="mt-5">
            <label className="mb-2 block text-sm font-semibold text-slate-800">
              Client Feedback
            </label>
            <textarea
              rows="4"
              placeholder="Client comments, energy levels, recovery, hunger, etc."
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-teal-500 focus:bg-white"
              defaultValue="Energy is good, recovery is improving."
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col gap-3 border-t border-slate-200 px-6 py-5 sm:flex-row sm:justify-end">
          <button
            type="button"
            className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            type="button"
            className="rounded-2xl bg-teal-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-700"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
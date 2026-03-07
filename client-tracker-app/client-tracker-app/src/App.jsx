import { Routes, Route, Navigate } from "react-router-dom";
import ClientCard from "./components/ClientCard";
import Workspace from "./components/Workspace";

import ProgressPanel from "./components/workspace/ProgressPanel";
import CheckinsPanel from "./components/workspace/CheckinsPanel";
import ProgramPanel from "./components/workspace/ProgramPanel";
import MealPlanPanel from "./components/workspace/MealPlanPanel";
import NotesPanel from "./components/workspace/NotesPanel";
import CheckinListContent from "./components/workspace/CheckinListContent";
import AddCheckin from "./components/workspace/AddCheckin";
import AddClient from "./components/AddClient";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/clients/1/workspace/progress" replace />} />

      <Route path="/clients/:id" element={<ClientCard />}>
        <Route index element={<Navigate to="workspace/progress" replace />} />

        {/* WORKSPACE (parent) */}
        <Route path="workspace" element={<Workspace />}>
          <Route path="progress" element={<ProgressPanel />} />
          <Route path="checkins" element={<CheckinsPanel />}>
            <Route path=":checkinId" element={<CheckinListContent />} />
          </Route>
          <Route path="program" element={<ProgramPanel />} />
          <Route path="meal-plan" element={<MealPlanPanel />} />
          <Route path="notes" element={<NotesPanel />} />
        </Route>

        {/* MODAL (sibling of workspace) */}
        <Route path="AddClient" element={<AddClient />} />
        <Route path="add" element={<AddCheckin />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
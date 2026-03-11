import { Routes, Route, Navigate } from "react-router-dom";
import ClientCard from "./components/ClientCard";
import Workspace from "./components/Workspace";

import ProgressPanel from "./components/workspace/ProgressPanel";
import CheckinsPanel from "./components/workspace/CheckinsPanel";
import ProgramPanel from "./components/workspace/ProgramPanel";
import MealPlanPanel from "./components/workspace/MealPlanPanel";
import NotesPanel from "./components/workspace/NotesPanel";
import CheckinListContent from "./components/workspace/CheckinListContent";
import AddClient from "./components/modal/AddClient";
import AddCheckin from "./components/modal/AddCheckin";
import AddMealplan from "./components/modal/AddMealplan";
import MealplanListContent from "./components/workspace/MealplanListContent";



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
          <Route path="meal-plan" element={<MealPlanPanel />} >
             <Route path=":mealplanId" element={<MealplanListContent/>} />
          </Route>
          <Route path="notes" element={<NotesPanel />} />
        </Route>

        {/* MODAL (sibling of workspace) */}
        <Route path="addclient" element={<AddClient />} />
        <Route path="add" element={<AddCheckin />} />
        <Route path="addmealplan" element={<AddMealplan />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
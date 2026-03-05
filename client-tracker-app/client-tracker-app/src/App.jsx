import { Routes, Route, Navigate } from "react-router-dom";
import TopBar from "./components/TopBar";

// Pages
import ClientsPanel from "./components/ClientsPanel";
import CheckinsPanel from "./components/workspace/CheckinsPanel";
import MealPlanPanel from "./components/workspace/MealPlanPanel";
import NotesPanel from "./components/workspace/NotesPanel";
import ProgressPanel from "./components/workspace/ProgressPanel";
import ClientCard from "./components/ClientCard";
import ProgramPanel from "./components/workspace/ProgramPanel";
import AddCheckin from "./components/workspace/AddCheckin";
import CheckinListContent from "./components/workspace/CheckinListContent";

function App() {
  return (
   <Routes>
      {/* Layout route */}
      <Route path="/" element={<ClientCard />}/>
      <Route path="/clients/:id" element={<ClientCard/>}>
        {/* default tab */}
   
        <Route index element={<Navigate to="workspace/progress" replace />} />

        {/* Tabs */}
        <Route path="add" element={<AddCheckin />} />
        <Route path="workspace/progress" element={<ProgressPanel />} />
        <Route path="workspace/checkins" element={<CheckinsPanel />} >
          <Route path=":checkinId" element={<CheckinListContent />} /> 
        </Route>
        <Route path="workspace/program" element={<ProgramPanel />} />
        <Route path="workspace/meal-plan" element={<MealPlanPanel />} />
        <Route path="workspace/notes" element={<NotesPanel />} />
      </Route>

      {/* safety fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
import { Route, Routes } from "react-router-dom";
import {
  DailyDiaryPage,
  FinancialPlanningPage,
  GoalSettingPage,
  MainPage,
} from "./pages";
import NavigationBar from "./components/NavigationBar";

function App() {
  return (
    <>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/financial-planning" element={<FinancialPlanningPage />} />
        <Route path="/goals" element={<GoalSettingPage />} />
        <Route path="/diary" element={<DailyDiaryPage />} />
      </Routes>
    </>
  );
}

export default App;

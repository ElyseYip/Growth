import { Route, Routes } from "react-router-dom";
import {
  BudgetPlanningPage,
  DailyDiaryPage,
  GoalSettingPage,
  MainPage,
} from "./pages";
import NavigationBar from "./components/NavigationBar";
import RightSideBar from "./components/rightSideBar/RightSideBar";

function App() {
  return (
    <>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route
          path="/budget-planning"
          element={
            <RightSideBar>
              <BudgetPlanningPage />
            </RightSideBar>
          }
        />
        <Route path="/goals" element={<GoalSettingPage />} />
        <Route path="/diary" element={<DailyDiaryPage />} />
      </Routes>
    </>
  );
}

export default App;

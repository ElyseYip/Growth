import { Route, Routes } from "react-router-dom";
import {
  DailyDiaryPage,
  FinancialPlanningPage,
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
          path="/financial-planning"
          element={
            <RightSideBar>
              <FinancialPlanningPage />
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

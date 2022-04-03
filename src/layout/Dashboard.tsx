import { useContext } from "react";
import { userStateContext } from "../context/UserStateProvider";
import UserDropdownMenu from "../components/UserDropdownMenu";
import PomodoroDropdownMenu from "../components/PomodoroDropdownMenu";

export default function Dashboard() {
  return (
    <div className="d-flex flex-column w-100 mt-4">
      <div className="text-light d-flex justify-content-between">
        <PomodoroDropdownMenu />
        <h2>Get It Done</h2>
        <UserDropdownMenu />
      </div>
    </div>
  );
}

import dynamic from "next/dynamic";
import AddEntryModal from "./Modals/AddEntryModal";
import SettingsModal from "./Modals/SettingsModal";

import styles from "../styles/Home.module.sass";

// Don't SSR the calendar, as fullcalendar doesn't support it
const DynamicCalendar = dynamic(() => import("./Calendar/Calendar"), {
  ssr: false,
});

function Index() {
  return (
    <div className="container">
      <h1>Ultimate Time Manager</h1>
      <div className="mb-2">
        <AddEntryModal /> <SettingsModal />
      </div>
      <div>
        <DynamicCalendar />
      </div>
    </div>
  );
}

export default Index;

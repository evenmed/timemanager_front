import dynamic from "next/dynamic";
import AddEntryModal from "./Modals/AddEntryModal";
import SettingsModal from "./Modals/SettingsModal";
import User from "./User/User";
import LogInRegister from "./User/LogInRegister";

import styles from "../styles/Home.module.sass";

// Don't SSR the calendar, as fullcalendar doesn't support it
const DynamicCalendar = dynamic(() => import("./Calendar/Calendar"), {
  ssr: false,
});

function Index() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Ultimate Time Manager</h1>
      <User unauthorizedContent={<LogInRegister />}>
        {(me) => (
          <>
            <p>
              <AddEntryModal /> <SettingsModal />
            </p>
            <div>
              <DynamicCalendar />
            </div>
          </>
        )}
      </User>
    </div>
  );
}

export default Index;

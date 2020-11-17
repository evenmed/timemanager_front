import dynamic from "next/dynamic";
import AddEntryModal from "./Modals/AddEntryModal";
import SettingsModal from "./Modals/SettingsModal";
import User from "./User/User";
import LogOut from "./User/LogOut";
import LogInRegister from "./User/LogInRegister";

// Don't SSR the calendar, as fullcalendar doesn't support it
const DynamicCalendar = dynamic(() => import("./Calendar/Calendar"), {
  ssr: false,
});

function Index() {
  return (
    <div className="container pt-4">
      <div className="row">
        <h1 className="col-12">Ultimate Time Manager</h1>
      </div>
      <User>
        {(me) =>
          me ? (
            <>
              <div className="mt-3 mb-4 row">
                <AddEntryModal /> <SettingsModal /> <LogOut />
              </div>
              <div className="row justify-content-md-center">
                <DynamicCalendar />
              </div>
            </>
          ) : (
            <div className="row justify-content-md-center">
              <LogInRegister />
            </div>
          )
        }
      </User>
    </div>
  );
}

export default Index;

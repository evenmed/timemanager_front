import dynamic from "next/dynamic";
import AddEntryModal from "./Modals/AddEntryModal";
import ExportEventsModal from "./Modals/ExportEventsModal";

// Don't SSR the calendar, as fullcalendar doesn't support it
const DynamicCalendar = dynamic(() => import("./Calendar/Calendar"), {
  ssr: false,
});

function Index() {
  return (
    <>
      <div className="row justify-content-md-center">
        <DynamicCalendar />
      </div>
    </>
  );
}

export default Index;

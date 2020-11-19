import dynamic from "next/dynamic";
import AddEntryModal from "./Modals/AddEntryModal";

// Don't SSR the calendar, as fullcalendar doesn't support it
const DynamicCalendar = dynamic(() => import("./Calendar/Calendar"), {
  ssr: false,
});

function Index() {
  return (
    <>
      <div className="mt-3 mb-4 row justify-content-center">
        <div className="col-auto">
          <AddEntryModal />
        </div>
      </div>
      <div className="row justify-content-md-center">
        <DynamicCalendar />
      </div>
    </>
  );
}

export default Index;

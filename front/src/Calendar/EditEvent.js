import { Formik } from "formik";
import { useMutation, useQuery, gql } from "@apollo/client";
import DatePicker from "react-datepicker";
import InputMask from "react-input-mask";
import moment from "moment";
import PropTypes from "prop-types";

import Error from "../helpers/Error";
import readableTimeString from "../../lib/readableTimeString";
import timeStringToMinutes from "../../lib/timeStringToMinutes";
import minutesToTimeString from "../../lib/minutesToTimeString";

import DeleteEvent from "./DeleteEvent";

const UPDATE_EVENT_MUTATION = gql`
  mutation updateEvent(
    $_id: ID
    $title: String!
    $date: String!
    $time: Int!
    $notes: String
  ) {
    updateEvent(
      _id: $_id
      title: $title
      date: $date
      time: $time
      notes: $notes
    ) {
      _id
    }
  }
`;

const SINGLE_EVENT_QUERY = gql`
  query singleEvent($_id: ID) {
    event(_id: $_id) {
      title
      date
      time
      notes
    }
  }
`;

function EditEvent(props) {
  const [updateEvent, { error, loading }] = useMutation(UPDATE_EVENT_MUTATION, {
    refetchQueries: ["events"],
    awaitRefetchQueries: true,
  });

  return (
    <>
      <Formik
        initialValues={{
          title: "",
          date: new Date(),
          time: "00:30",
          notes: "",
        }}
        validateOnChange={false}
        validate={(values) => {
          const errors = {};
          if (values.time) {
            const mins = timeStringToMinutes(values.time);

            if (mins < 15 || mins > 1440)
              errors.time = "Duration must be between 15 mins and 24 hours";
          }
          return errors;
        }}
        onSubmit={(values) =>
          updateEvent({
            variables: {
              _id: props.eventId || undefined,
              title: values.title,
              notes: values.notes,
              date: moment(values.date).format("YYYY-MM-DD"),
              time: timeStringToMinutes(values.time),
            },
          })
            .then((res) => {
              if (props.onSubmit && res && res.data && res.data.updateEvent) {
                props.onSubmit();
              }
            })
            .catch((e) => {
              // This error already gets displayed by apollo
              console.error(e);
            })
        }
      >
        {(formikGoodies) => (
          <EditEventForm
            {...{ ...formikGoodies, error, loading, eventId: props.eventId }}
          />
        )}
      </Formik>
      {props.eventId && (
        <div className="justify-content-end row">
          <div className="col-auto">
            <DeleteEvent eventId={props.eventId} onSubmit={props.onSubmit} />
          </div>
        </div>
      )}
    </>
  );
}

const EditEventForm = (props) => {
  const { queryError, queryLoading } = useQuery(SINGLE_EVENT_QUERY, {
    variables: { _id: props.eventId || null },
    onCompleted: (data) => {
      if (data && data.event)
        props.setValues({
          title: data.event.title,
          date: new Date(`${data.event.date}T00:00:00`),
          time: minutesToTimeString(data.event.time),
          notes: data.event.notes || "",
        });
    },
  });

  if (queryLoading) return <p>Fetching event info...</p>;
  if (queryError) return <Error error={queryError} />;

  return (
    <form onSubmit={props.handleSubmit}>
      <Error error={props.error} />

      <div className="form-group">
        <label htmlFor="eventTitle">Title</label>
        <input
          type="text"
          className="form-control"
          name="title"
          id="eventTitle"
          autoComplete="off"
          onChange={props.handleChange}
          onBlur={props.handleBlur}
          value={props.values.title}
          required
        />
        {props.errors.title && (
          <p className="text-danger">{props.errors.title}</p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="eventDate">Date</label>
        <div>
          <DatePicker
            id="eventDate"
            className="form-control"
            name="date"
            dateFormat="MMMM d, yyyy"
            autoComplete="off"
            selected={props.values.date}
            onChange={(date) => props.setFieldValue("date", date)}
            onBlur={props.handleBlur}
            required
            // utcOffset={0}
          />
        </div>
        {props.errors.date && (
          <p className="text-danger">{props.errors.date}</p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="eventTime">Duration (HH:MM)</label>
        <InputMask
          mask="99:99"
          alwaysShowMask={true}
          className="form-control"
          name="time"
          id="eventTime"
          autoComplete="off"
          onChange={props.handleChange}
          onBlur={props.handleBlur}
          value={props.values.time}
          required
        />
        {readableTimeString(props.values.time) && (
          <p className="text-muted mb-0">
            {readableTimeString(props.values.time)}
          </p>
        )}
        {props.errors.time && (
          <p className="text-danger">{props.errors.time}</p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="eventNotes">Notes</label>
        <textarea
          className="form-control"
          name="notes"
          id="eventNotes"
          autoComplete="off"
          onChange={props.handleChange}
          onBlur={props.handleBlur}
          value={props.values.notes}
        />
        {props.errors.notes && (
          <p className="text-danger">{props.errors.notes}</p>
        )}
      </div>

      <button
        className="btn btn-success btn-block mb-3"
        type="submit"
        disabled={props.isSubmitting || props.loading}
      >
        {props.isSubmitting || props.loading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};

EditEvent.propTypes = {
  /** Callback for when an event is saved / deleted properly */
  onSubmit: PropTypes.func,
  /** ID of event to be edited */
  eventId: PropTypes.string,
};

export default EditEvent;

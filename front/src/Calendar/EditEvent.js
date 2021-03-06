import { Formik } from "formik";
import { useMutation, useQuery, gql } from "@apollo/client";
import DatePicker from "react-datepicker";
import InputMask from "react-input-mask";
import moment from "moment";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";

import Error from "../helpers/Error";
import readableTimeString from "../../lib/readableTimeString";
import timeStringToMinutes from "../../lib/timeStringToMinutes";
import minutesToTimeString from "../../lib/minutesToTimeString";
import { UserContext } from "../User/User";

import DeleteEvent from "./DeleteEvent";
import { useContext } from "react";

const UPDATE_EVENT_MUTATION = gql`
  mutation updateEvent(
    $_id: ID
    $title: String!
    $date: String!
    $time: Int!
    $notes: String
    $author: ID!
  ) {
    updateEvent(
      _id: $_id
      title: $title
      date: $date
      time: $time
      notes: $notes
      author: $author
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

/**
 * Form to edit a specific event or create a new one. Event id must be passed
 * through `evntId` prop. If no `evnentId`, a new event will be created with the
 * user in context as its author.
 */
function EditEvent(props) {
  const [updateEvent, { error, loading }] = useMutation(UPDATE_EVENT_MUTATION, {
    refetchQueries: ["events"],
    awaitRefetchQueries: true,
  });

  const { _id: userId } = useContext(UserContext);

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
        onSubmit={(values, { resetForm }) =>
          updateEvent({
            variables: {
              _id: props.eventId || undefined,
              title: values.title,
              notes: values.notes,
              date: moment(values.date).format("YYYY-MM-DD"),
              time: timeStringToMinutes(values.time),
              author: userId,
            },
          })
            .then((res) => {
              if (props.onSubmit && res && res.data && res.data.updateEvent) {
                resetForm();
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

  // Form is included multiple times, salt to prevent duplicate IDs
  const salt = uuidv4();

  return (
    <form onSubmit={props.handleSubmit}>
      <Error error={props.error} />

      <div className="form-group">
        <label htmlFor={`${salt}-eventTitle`}>Title</label>
        <input
          type="text"
          className="form-control"
          name="title"
          id={`${salt}-eventTitle`}
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
        <label htmlFor={`${salt}-eventDate`}>Date</label>
        <div>
          <DatePicker
            id={`${salt}-eventDate`}
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
        <label htmlFor={`${salt}-eventTime`}>Duration (HH:MM)</label>
        <InputMask
          mask="99:99"
          alwaysShowMask={true}
          className="form-control"
          name="time"
          id={`${salt}-eventTime`}
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
        <label htmlFor={`${salt}-eventNotes`}>Notes</label>
        <textarea
          className="form-control"
          name="notes"
          id={`${salt}-eventNotes`}
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

import { Formik } from "formik";
import { useMutation, gql } from "@apollo/client";
import DatePicker from "react-datepicker";
import InputMask from "react-input-mask";
import moment from "moment";
import PropTypes from "prop-types";

import Error from "../helpers/Error";
import readableTimeString from "../../lib/readableTimeString";
import timeStringToMinutes from "../../lib/timeStringToMinutes";

import "react-datepicker/dist/react-datepicker.css";

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

function EditEvent(props) {
  const [updateEvent, { error, loading }] = useMutation(UPDATE_EVENT_MUTATION, {
    refetchQueries: ["events"],
    awaitRefetchQueries: true,
  });

  return (
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
      {({
        values,
        setFieldValue,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        /* and other goodies */
      }) => (
        <form onSubmit={handleSubmit}>
          <Error error={error} />

          <div className="form-group">
            <label htmlFor="eventTitle">Title</label>
            <input
              type="text"
              className="form-control"
              name="title"
              id="eventTitle"
              autoComplete="off"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.title}
              required
            />
            {errors.title && <p className="text-danger">{errors.title}</p>}
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
                selected={values.date}
                onChange={(date) => setFieldValue("date", date)}
                onBlur={handleBlur}
                required
              />
            </div>
            {errors.date && <p className="text-danger">{errors.date}</p>}
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
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.time}
              required
            />
            {readableTimeString(values.time) && (
              <p className="text-muted mb-0">
                {readableTimeString(values.time)}
              </p>
            )}
            {errors.time && <p className="text-danger">{errors.time}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="eventNotes">Notes</label>
            <textarea
              className="form-control"
              name="notes"
              id="eventNotes"
              autoComplete="off"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.notes}
            />
            {errors.notes && <p className="text-danger">{errors.notes}</p>}
          </div>

          <button
            className="btn btn-success btn-block"
            type="submit"
            disabled={isSubmitting || loading}
          >
            {isSubmitting || loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      )}
    </Formik>
  );
}

EditEvent.propTypes = {
  onSubmit: PropTypes.func,
};

export default EditEvent;

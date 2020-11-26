import React from "react";
import PropTypes from "prop-types";
import { Formik } from "formik";
import DatePicker from "react-datepicker";

/**
 * Form to select the date range that should be exported.
 * The actual export function must be passed via the `exportEvents`
 * function.
 * Can take a callback function for after the export function is
 * called via the `onSubmit` prop.
 */
const ExportEvents = ({ exportEvents, onSubmit }) => {
  return (
    <Formik
      initialValues={{
        from: null,
        to: null,
      }}
      validate={(values) => {
        const errors = {};

        if (values.from && values.to) {
          if (values.from.getUTCDate() >= values.to.getUTCDate()) {
            errors.to = '"To" date must be greater than "From" date';
          }
        }

        return errors;
      }}
      validateOnChange={true}
      onSubmit={(values, { setSubmitting }) => {
        onSubmit();
        exportEvents(values.from, values.to);
        setSubmitting(false);
      }}
    >
      {({
        values,
        errors,
        handleBlur,
        handleSubmit,
        isSubmitting,
        setFieldValue,
      }) => (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="from">From:</label>
            <div>
              <DatePicker
                id="from"
                className="form-control"
                name="from"
                dateFormat="MMMM d, yyyy"
                autoComplete="off"
                selected={values.from}
                onChange={(date) => setFieldValue("from", date)}
                onBlur={handleBlur}
                required
              />
            </div>
            {errors.from && <p className="text-danger">{errors.from}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="to">To:</label>
            <div>
              <DatePicker
                id="to"
                className="form-control"
                name="to"
                dateFormat="MMMM d, yyyy"
                autoComplete="off"
                selected={values.to}
                onChange={(date) => setFieldValue("to", date)}
                onBlur={handleBlur}
                required
              />
            </div>
            {errors.to && <p className="text-danger">{errors.to}</p>}
          </div>

          <button
            className="btn btn-success btn-block"
            type="submit"
            disabled={isSubmitting}
          >
            Export
          </button>
        </form>
      )}
    </Formik>
  );
};

ExportEvents.propTypes = {
  /** Function to export events */
  exportEvents: PropTypes.func.isRequired,
  /** Callback for when export is done */
  onSubmit: PropTypes.func,
};

export default ExportEvents;

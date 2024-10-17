import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { submitPriorAuthorization } from "../services/api";

interface PriorAuthorizationFormProps {
  patientId: string;
}

interface FormValues {
  treatmentType: string;
  insurancePlan: string;
  dateOfService: string;
  diagnosisCode: string;
  doctorNotes: string;
  general?: string;
}

const PriorAuthorizationForm: React.FC<PriorAuthorizationFormProps> = ({
  patientId,
}) => {
  const formik = useFormik<FormValues>({
    initialValues: {
      treatmentType: "",
      insurancePlan: "",
      dateOfService: "",
      diagnosisCode: "",
      doctorNotes: "",
    },
    validationSchema: Yup.object({
      treatmentType: Yup.string()
        .min(3, "Treatment type must be at least 3 characters")
        .required("Required"),
      insurancePlan: Yup.string()
        .min(3, "Insurance plan must be at least 3 characters")
        .required("Required"),
      dateOfService: Yup.date()
        .min(new Date(), "Date of service must be today or in the future")
        .required("Required"),
      diagnosisCode: Yup.string()
        .matches(/^[A-Z0-9]+$/, "Diagnosis code must be alphanumeric")
        .required("Required"),
    }),
    onSubmit: async (values, { setSubmitting, setFieldError, resetForm }) => {
      try {
        await submitPriorAuthorization({ ...values, patientId });
        alert("Prior authorization request submitted successfully!");
        resetForm();
      } catch (err: any) {
        setFieldError("general", err.message);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <h2 className="text-xl font-bold mb-4">Prior Authorization Request</h2>
      {formik.errors.general && (
        <p className="text-red-500">{formik.errors.general}</p>
      )}

      <div>
        <label>Treatment Type:</label>
        <input
          type="text"
          name="treatmentType"
          value={formik.values.treatmentType}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`border rounded p-2 w-full ${
            formik.touched.treatmentType && formik.errors.treatmentType
              ? "border-red-500"
              : ""
          }`}
        />
        {formik.touched.treatmentType && formik.errors.treatmentType ? (
          <p className="text-red-500">{formik.errors.treatmentType}</p>
        ) : null}
      </div>

      <div>
        <label>Insurance Plan:</label>
        <input
          type="text"
          name="insurancePlan"
          value={formik.values.insurancePlan}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`border rounded p-2 w-full ${
            formik.touched.insurancePlan && formik.errors.insurancePlan
              ? "border-red-500"
              : ""
          }`}
        />
        {formik.touched.insurancePlan && formik.errors.insurancePlan ? (
          <p className="text-red-500">{formik.errors.insurancePlan}</p>
        ) : null}
      </div>

      <div>
        <label>Date of Service:</label>
        <input
          type="date"
          name="dateOfService"
          value={formik.values.dateOfService}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`border rounded p-2 w-full ${
            formik.touched.dateOfService && formik.errors.dateOfService
              ? "border-red-500"
              : ""
          }`}
        />
        {formik.touched.dateOfService && formik.errors.dateOfService ? (
          <p className="text-red-500">{formik.errors.dateOfService}</p>
        ) : null}
      </div>

      <div>
        <label>Diagnosis Code:</label>
        <input
          type="text"
          name="diagnosisCode"
          value={formik.values.diagnosisCode}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`border rounded p-2 w-full ${
            formik.touched.diagnosisCode && formik.errors.diagnosisCode
              ? "border-red-500"
              : ""
          }`}
        />
        {formik.touched.diagnosisCode && formik.errors.diagnosisCode ? (
          <p className="text-red-500">{formik.errors.diagnosisCode}</p>
        ) : null}
      </div>

      <div>
        <label>Doctor's Notes:</label>
        <textarea
          name="doctorNotes"
          value={formik.values.doctorNotes}
          onChange={formik.handleChange}
          className="border rounded p-2 w-full"
        />
      </div>

      <button
        type="submit"
        disabled={formik.isSubmitting}
        className="bg-blue-500 text-white rounded py-2 px-4 mt-4"
      >
        {formik.isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};

export default PriorAuthorizationForm;

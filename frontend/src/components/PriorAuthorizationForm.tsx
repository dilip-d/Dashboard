import React from "react";
import { useFormik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { submitPriorAuthorization } from "../services/api";
import InputBlock from "./InputBlock";
import { toast } from "react-hot-toast";

interface PriorAuthorizationFormProps {
  patientId: string;
  onClose: () => void;
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
  onClose,
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
        .matches(/^[A-Za-z0-9]+$/, "Diagnosis code must be alphanumeric")
        .required("Required"),
    }),
    onSubmit: async (
      values,
      { setSubmitting, setFieldError, resetForm }: FormikHelpers<FormValues>
    ) => {
      try {
        await submitPriorAuthorization({ ...values, patientId });
        toast.success("Request submitted successfully!");
        resetForm();
        onClose();
      } catch (err: any) {
        setFieldError("general", err.message);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="p-6 bg-white rounded-lg">
      <h2 className="text-blue-600 text-2xl font-bold mb-4">
        Prior Authorization Request
      </h2>
      {formik.errors.general && (
        <p className="text-red-500 mb-4">{formik.errors.general}</p>
      )}

      <form onSubmit={formik.handleSubmit}>
        <InputBlock
          label="Treatment Type"
          name="treatmentType"
          value={formik.values.treatmentType}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.treatmentType
              ? formik.errors.treatmentType
              : undefined
          }
        />

        <InputBlock
          label="Insurance Plan"
          name="insurancePlan"
          value={formik.values.insurancePlan}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.insurancePlan
              ? formik.errors.insurancePlan
              : undefined
          }
        />

        <InputBlock
          label="Date of Service"
          name="dateOfService"
          type="date"
          value={formik.values.dateOfService}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.dateOfService
              ? formik.errors.dateOfService
              : undefined
          }
        />

        <InputBlock
          label="Diagnosis Code"
          name="diagnosisCode"
          value={formik.values.diagnosisCode}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.diagnosisCode
              ? formik.errors.diagnosisCode
              : undefined
          }
        />

        <InputBlock
          label="Doctor's Notes"
          name="doctorNotes"
          isTextArea={true}
          value={formik.values.doctorNotes}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="bg-blue-500 text-white rounded py-2 px-4 mt-4 hover:bg-blue-600 transition flex items-center justify-center"
        >
          {formik.isSubmitting ? (
            <>
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 108 8"
                />
              </svg>
            </>
          ) : (
            "Submit"
          )}
        </button>
      </form>
    </div>
  );
};

export default PriorAuthorizationForm;

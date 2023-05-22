import { Input } from "@/components/Input";
import { IshaNavbar } from "@/components/IshaNavbar";
import { resetPassword } from "@/utils/api";
import { Form, Formik, FormikHelpers } from "formik";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import * as Yup from "yup";

type Values = {
  email: string;
  newPassword: string;
  confirmNewPassword: string;
};

export default function PasswordReset() {
  const [apiError, setApiError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();

  const initialValues = { email: "", newPassword: "", confirmNewPassword: "" };
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    newPassword: Yup.string()
      .min(6, "Must be 6 characters or more")
      .required("Required")
      .test(
        "isValidPass",
        "Password needs a least one lowercase letter",
        (value) => {
          const hasLowerCase = /[a-z]/.test(value!);
          if (!hasLowerCase) return false;
          else return true;
        }
      ),
    confirmNewPassword: Yup.string()
      .oneOf([Yup.ref("newPassword")], "Passwords must match")
      .required("Required"),
  });

  async function handleSubmit(
    values: Values,
    { setSubmitting }: FormikHelpers<Values>
  ) {
    const { token } = router.query as { token: string };
    if (!token) {
      setApiError("No token provided.");
      return;
    }
    const res = await resetPassword({
      ...values,
      token,
    });
    if (res.status === 200) {
      setSuccessMessage(
        "Success! You will be forwarded to the login page shortly."
      );
      await new Promise((resolve) => setTimeout(resolve, 1500));
      router.push("/login");
      setSuccessMessage("");
      setApiError("");
    } else {
      setApiError("Something went wrong");
    }
    setSubmitting(false);
  }

  return (
    <div className="sm:h-full sm:w-screen sm:h-screen sm:bg-blue-700">
      <Head>
        <title>Password reset - IE Ambassador</title>
        <meta
          name="description"
          content="Inner Engineering Ambassadors Password reset"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="flex flex-col items-center">
        <IshaNavbar variant="no-menu" />
        <main className="max-w-md">
          <div className="my-2 sm:my-16 px-8 py-10 bg-white sm:rounded-2xl  text-center">
            <h1 className="mt-5 mb-4 bg-white">Reset Your Password</h1>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, submitForm }) => {
                return (
                  <Form>
                    <Input
                      className="mb-3 w-64 sm:w-72"
                      name="email"
                      label="Email"
                    />
                    <Input
                      className="mb-3"
                      name="newPassword"
                      label="New Password"
                      type="password"
                    />
                    <Input
                      className="mb-8"
                      name="confirmNewPassword"
                      label="New Password Confirmation"
                      type="password"
                    />
                    <button
                      className={`${apiError ? "mb-3" : "mb-8"} w-full`}
                      type="submit"
                      onClick={submitForm}
                      disabled={isSubmitting}
                    >
                      Change Password
                    </button>
                    <p className="text-right text-sm text-blue-700">
                      {successMessage}
                    </p>
                    <span className="mb-5 text-sm text-red-900">
                      {apiError}
                    </span>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </main>
      </div>
    </div>
  );
}

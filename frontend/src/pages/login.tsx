// import FacebookLogo from "@/assets/facebook-logo.png";
// import GoogleLogo from "@/assets/google-logo.svg";
// import TwitterLogo from "@/assets/twitter-logo.svg";
import { Input } from "@/components/Input";
import { IshaNavbar } from "@/components/IshaNavbar";
import { Modal, ModalProps } from "@/components/Modal";
import { login, resetPasswordToken } from "@/utils/api";
import { Form, Formik, FormikHelpers } from "formik";
import Head from "next/head";
// import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import * as Yup from "yup";
// import { Divider } from "../components/Divider";

type Values = {
  email: string;
  password: string;
};

export default function Login() {
  const [apiError, setApiError] = useState("");
  const [showPasswordResetModal, setShowPasswordResetModal] = useState(false);
  const router = useRouter();

  const initialValues = { email: "", password: "" };
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().required("Required"),
  });

  async function handleSubmit(
    values: Values,
    { setSubmitting }: FormikHelpers<Values>
  ) {
    const res = await login(values);
    if (res.status === "Success") {
      localStorage.setItem("token", res.token);
      router.push("/dashboard");
    } else {
      setApiError("Something went wrong");
    }
    setSubmitting(false);
  }

  function handleForgotPasswordClick() {
    setShowPasswordResetModal(true);
  }

  return (
    <div className="sm:h-screen sm:w-screen sm:bg-blue-700">
      <Head>
        <title>Login - IE Ambassador</title>
        <meta
          name="description"
          content="Inner Engineering Ambassadors Login"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="flex flex-col items-center">
        <IshaNavbar variant="no-menu" />
        <main className="max-w-md">
          <div className="my-2 px-8 py-10 sm:my-16 bg-white rounded-2xl text-center">
            <h1 className="font-medium">Spread the Message</h1>
            <p className="mt-4 mb-6 sm:mb-8 px-2 text-lg text-black text-opacity-60">
              Please log in to your IE Ambassador page to spread the message
            </p>
            {/* <div className="flex gap-8 place-content-center">
              <Image
                className="w-10"
                src={FacebookLogo}
                alt="Facebook logo"
                onClick={handleFacebookClick}
              />
              <Image
                className="w-10"
                src={TwitterLogo}
                alt="Twitter logo"
                onClick={handleTwitterClick}
              />
              <Image
                className="w-10"
                src={GoogleLogo}
                alt="Google logo"
                onClick={handleGoogleClick}
              />
            </div>
            <Divider className="my-5" /> */}
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  <Input name="email" label="Email" className="mb-3" />
                  <Input
                    className="mb-8"
                    name="password"
                    label="Password"
                    type="password"
                  />
                  <button
                    className={`${apiError ? "mb-3" : "mb-8"} w-full`}
                    type="submit"
                    disabled={isSubmitting}
                  >
                    LOGIN
                  </button>
                  <span className="text-sm text-red-900">{apiError}</span>
                </Form>
              )}
            </Formik>
            <div className="mt-5 mb-3">
              <p className="inline mr-1">Don&apos;t have an account?</p>
              <Link href="/register" className="font-bold text-red-900">
                Sign up
              </Link>
            </div>
            <p
              className="font-bold text-red-900"
              onClick={handleForgotPasswordClick}
            >
              Forgot password?
            </p>
          </div>
        </main>
        <PasswordResetModal
          isOpen={showPasswordResetModal}
          onVisibilityChange={(isVisible: boolean) => {
            setShowPasswordResetModal(isVisible);
          }}
        />
      </div>
    </div>
  );
}

interface PasswordResetModal extends Omit<ModalProps, "title" | "children"> {}

function PasswordResetModal({
  isOpen,
  onVisibilityChange,
}: PasswordResetModal) {
  const [apiError, setApiError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  async function handleSubmit({ email }: { email: string }) {
    const res = await resetPasswordToken(email);
    if (res.status === 200) {
      setSuccessMessage("Success! E-mail will be sent shortly.");
      await new Promise((resolve) => setTimeout(resolve, 1500));
      onVisibilityChange(false);
      setSuccessMessage("");
      setApiError("");
    } else {
      setApiError("Something went wrong.");
    }
  }

  return (
    <Modal
      title="Reset Your Password"
      isOpen={isOpen}
      onVisibilityChange={onVisibilityChange}
    >
      <Formik
        enableReinitialize
        initialValues={{ email: "" }}
        onSubmit={handleSubmit}
        validationSchema={Yup.object({
          email: Yup.string().email().required("Required"),
        })}
      >
        {({ isSubmitting }) => {
          return (
            <Form>
              <p className="mb-6">
                You will be sent an email with the password reset link.
              </p>
              <Input name="email" label="Email" bg="bg-[#F9F9F9]" />
              <div className="flex flex-row justify-end mb-2">
                <button
                  className="!text-sm"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Reset Password
                </button>
              </div>
              <p className="text-right text-sm text-red-900">{apiError}</p>
              <p className="text-right text-sm text-blue-700">
                {successMessage}
              </p>
            </Form>
          );
        }}
      </Formik>
    </Modal>
  );
}

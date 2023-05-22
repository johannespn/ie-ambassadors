// import FacebookLogo from "@/assets/facebook-logo.png";
// import GoogleLogo from "@/assets/google-logo.svg";
// import TwitterLogo from "@/assets/twitter-logo.svg";
// import { Divider } from "@/components/Divider";
import { register } from "@/utils/api";
import { Form, Formik, FormikHelpers } from "formik";
import Head from "next/head";
// import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import * as Yup from "yup";
import { Input } from "../components/Input";
import { IshaNavbar } from "../components/IshaNavbar";

const API_URL = process.env.API_URL;
const externalLoginUrl = API_URL + "/external-login";
const facebookUrl = externalLoginUrl + "/facebook-login";
const twitterUrl = externalLoginUrl + "/twitter-login";
const googleUrl = externalLoginUrl + "/google-login";

type Values = {
  email: string;
  password: string;
  confirmPassword: string;
};

export default function Register() {
  const [apiError, setApiError] = useState("");
  const router = useRouter();

  const initialValues = { email: "", password: "", confirmPassword: "" };
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
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
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Required"),
  });

  async function handleSubmit(
    values: Values,
    { setSubmitting }: FormikHelpers<Values>
  ) {
    const res = await register(values);
    if (res.status === "Success") {
      router.push("/login");
    } else {
      setApiError("Something went wrong");
    }
    setSubmitting(false);
  }

  return (
    <div className="sm:w-screen sm:h-screen sm:bg-blue-700">
      <Head>
        <title>Register - IE Ambassador</title>
        <meta
          name="description"
          content="Inner Engineering Ambassadors Registration"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="flex flex-col items-center">
        <IshaNavbar variant="no-menu" />
        <main className="max-w-md">
          <div className="my-2 sm:my-16 px-8 py-10 bg-white sm:rounded-2xl  text-center">
            <h1 className="font-medium">Spread the Message</h1>
            <p className="mt-4 mb-6 sm:mb-8 px-2 text-lg text-black text-opacity-60">
              Please create your IE Ambassador page to spread the message
            </p>
            {/* <div className="flex gap-10 place-content-center">
              <Link href={facebookUrl}>
                <Image
                  className="w-12"
                  src={FacebookLogo}
                  alt="Facebook logo"
                />
              </Link>
              <Link href={twitterUrl}>
                <Image className="w-12" src={TwitterLogo} alt="Twitter logo" />
              </Link>
              <Link href={googleUrl}>
                <Image className="w-12" src={GoogleLogo} alt="Google logo" />
              </Link>
            </div>
            <Divider className="my-6" /> */}
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => {
                return (
                  <Form>
                    <Input className="mb-3" name="email" label="Email" />
                    <Input
                      className="mb-3"
                      name="password"
                      label="Password"
                      type="password"
                    />
                    <Input
                      className="mb-8"
                      name="confirmPassword"
                      label="Password confirmation"
                      type="password"
                    />
                    <button
                      className={`${apiError ? "mb-3" : "mb-8"} w-full`}
                      type="submit"
                      disabled={isSubmitting}
                    >
                      REGISTER
                    </button>
                    <span className="text-sm text-red-900">{apiError}</span>
                  </Form>
                );
              }}
            </Formik>
            <div className="mt-5 mb-3">
              <p className="inline mr-1">Already have an account?</p>
              <Link href="/login" className="font-bold text-red-900">
                Sign in
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

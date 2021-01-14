import React from "react";
import { Form, Formik } from "formik";
import Wrapper from "../components/Wrapper";
import InputField from "../components/InputField";
import { useLoginMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";
import Link from "next/link";

interface Props {}

const Login: React.FC<Props> = () => {
  const router = useRouter();
  const [, register] = useLoginMutation();

  return (
    <Wrapper>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await register(values);
          if (response.data?.login.errors) {
            setErrors(toErrorMap(response.data.login.errors));
          } else if (response.data?.login.user) {
            // worked
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="mt-6">
            <InputField
              label="Username"
              id="username"
              type="text"
              name="username"
              placeholder="your username"
              autoComplete="none"
              className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
            />
            <InputField
              label="Password"
              id="confirm"
              type="password"
              name="password"
              placeholder="********"
              autoComplete="none"
              className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
            />
            <button
              type="submit"
              className="w-full py-3 mt-6 font-medium tracking-widest text-white uppercase bg-black shadow-lg focus:outline-none hover:bg-gray-900 hover:shadow-none"
            >
              {isSubmitting ? "....." : "Login"}
            </button>
            <p className="flex justify-between mt-4 text-xs text-gray-500">
              Don't have an account?{" "}
              <Link href="/register">
                <a>Register</a>
              </Link>
            </p>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Login;

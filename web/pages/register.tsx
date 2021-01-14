import React from "react";
import { Form, Formik } from "formik";
import Wrapper from "../components/Wrapper";
import InputField from "../components/InputField";
import { useMutation } from "urql";

interface Props {}

const REGISTER_MUT = `
mutation Register($username: String!, $password: String!, $name: String!) {
  register (options: {username: $username, password: $password, name: $name}) {
    errors {
      field
      message
    }
    user {
      id
      name
      username
    }
  }
}`;

const Register: React.FC<Props> = () => {
  const [, register] = useMutation(REGISTER_MUT);

  return (
    <Wrapper>
      <Formik
        initialValues={{ username: "", password: "", name: "" }}
        onSubmit={async (values) => {
          const response = await register(values);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="mt-6">
            <InputField
              label="Full Name"
              id="name"
              type="text"
              name="name"
              placeholder="full name"
              autoComplete="none"
              className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
              required
            />
            <InputField
              label="Username"
              id="username"
              type="text"
              name="username"
              placeholder="your username"
              autoComplete="none"
              className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
              required
            />
            <InputField
              label="Password"
              id="confirm"
              type="password"
              name="password"
              placeholder="********"
              autoComplete="none"
              className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
              required
            />
            <button
              type="submit"
              className="w-full py-3 mt-6 font-medium tracking-widest text-white uppercase bg-black shadow-lg focus:outline-none hover:bg-gray-900 hover:shadow-none"
            >
              {isSubmitting ? "....." : "Sign up"}
            </button>
            <p className="flex justify-between mt-4 text-xs text-gray-500 cursor-pointer hover:text-black">
              Already registered?
            </p>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Register;

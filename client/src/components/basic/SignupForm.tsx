import { useState } from "react";
import { useForm } from "react-hook-form";
import { Typography, Input, Button } from "@material-tailwind/react";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import type { SignupFormValues } from "../../constants/userTypes";



type Props = {
  title: string
  onSubmit: (data: SignupFormValues) => void
}

const SignupForm = ({ title, onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupFormValues>();

  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisibility = () => setPasswordShown(!passwordShown);

  const password = watch("password")

  return (
    <section className="block sm:w-[30%] w-full text-center p-8 items-center text-black shadow-xl">
      <div>
        <Typography className="mb-2 font-semibold text-xl">{title}</Typography>
        <Typography className="mb-16 text-gray-600 font-normal text-[18px]">
          Enter your details to sign up
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-[24rem] text-left">
          {/* Email */}
          <div className="mb-6">
            <label htmlFor="email">
              <Typography variant="small" className="mb-2 block font-medium text-gray-900">
                Your Email
              </Typography>
            </label>
            <Input
              id="email"
              color="secondary"
              size="lg"
              type="email"
              placeholder="name@mail.com"
              className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div className="mb-6">
            <label htmlFor="password">
              <Typography variant="small" className="mb-2 block font-medium text-gray-900">
                Password
              </Typography>
            </label>
            <div className="relative">
              <Input
                id="password"
                color="secondary"
                size="lg"
                placeholder="********"
                type={passwordShown ? "text" : "password"}
                className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200 pr-12"
                {...register("password", {
                  required: "Password is required",
                  pattern: {
                    value: /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                    message:
                      "Password must be at least 8 characters with letters and numbers",
                  },
                })}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                tabIndex={-1}
              >
                {passwordShown ? <EyeIcon className="h-5 w-5" /> : <EyeSlashIcon className="h-5 w-5" />}
              </button>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>
          </div>

          {/* Confirm Password */}
          <div className="mb-6">
            <label htmlFor="confirmPassword">
              <Typography variant="small" className="mb-2 block font-medium text-gray-900">
                Confirm Password
              </Typography>
            </label>
            <Input
              id="confirmPassword"
              color="secondary"
              size="lg"
              placeholder="********"
              type={passwordShown ? "text" : "password"}
              className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
              {...register("confirmPassword", {
                required: "Confirm Password is required",
                validate: (value) =>
                  value === password || "Passwords do not match.",
              })}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* First Name */}
          <div className="mb-6">
            <label htmlFor="firstName">
              <Typography variant="small" className="mb-2 block font-medium text-gray-900">
                First Name
              </Typography>
            </label>
            <Input
              id="firstName"
              color="secondary"
              size="lg"
              placeholder="John"
              className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
              {...register("firstName", {
                required: "First Name is required",
                pattern: {
                  value: /^[a-zA-Z]+$/,
                  message: "Only alphabets area allowed"
                }
              })}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
            )}
          </div>

          {/* Last Name */}
          <div className="mb-6">
            <label htmlFor="lastName">
              <Typography variant="small" className="mb-2 block font-medium text-gray-900">
                Last Name
              </Typography>
            </label>
            <Input
              id="lastName"
              color="secondary"
              size="lg"
              placeholder="Doe"
              className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
              {...register("lastName", {
                required: "Last Name is required",
                pattern: {
                  value: /^[a-zA-Z]+$/,
                  message: "Only alphabets area allowed"
                }
              })}
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
            )}
          </div>

          {/* Department */}
          <div className="mb-6">
            <label htmlFor="department">
              <Typography variant="small" className="mb-2 block font-medium text-gray-900">
                Department
              </Typography>
            </label>
            <Input
              id="department"
              color="secondary"
              size="lg"
              placeholder="IT"
              className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
              {...register("department", {
                required: "Department is required",
                pattern: {
                  value: /^[a-zA-Z]+$/,
                  message: "Only alphabets area allowed"
                }
              })}
            />
            {errors.department && (
              <p className="text-red-500 text-sm mt-1">{errors.department.message}</p>
            )}
          </div>

          {/* Designation */}
          <div className="mb-6">
            <label htmlFor="designation">
              <Typography variant="small" className="mb-2 block font-medium text-gray-900">
                Designation
              </Typography>
            </label>
            <Input
              id="designation"
              color="secondary"
              size="lg"
              placeholder="Manager"
              className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
              {...register("designation", {
                required: "Designation is required",
                pattern: {
                  value: /^[a-zA-Z]+$/,
                  message: "Only alphabets area allowed"
                }
              })}
            />
            {errors.designation && (
              <p className="text-red-500 text-sm mt-1">{errors.designation.message}</p>
            )}
          </div>

          <Button size="lg" className="mt-6" isFullWidth type="submit">
            Sign Up
          </Button>

          <Typography variant="small" className="!mt-4 text-center font-normal">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-gray-900">
              Sign In
            </Link>
          </Typography>
        </form>
      </div>
    </section>
  );
};

export default SignupForm;

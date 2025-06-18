import { useState } from "react";
import { Typography, Input, Button } from "@material-tailwind/react";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";
import { useForm } from "react-hook-form";
import type { LoginFormValues } from "../../constants/userTypes";
import { Link } from "react-router-dom";


type Props = {
  title: string
  isAdmin: boolean
  onSubmit: (data: LoginFormValues) => void
}

export function LoginForm({ title, isAdmin, onSubmit }: Props) {
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => setPasswordShown((cur) => !cur);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormValues>()



  return (
    <section className="block text-center p-8 items-center text-black shadow-xl">
      <div className="">
        <Typography className="mb-2 font-semibold text-xl">
          {title}
        </Typography>
        <Typography className="mb-16 text-gray-600 font-normal text-[18px]">
          Enter your email and password to sign in
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-[24rem] text-left">
          <div className="mb-6">
            <label htmlFor="email">
              <Typography
                variant="small"
                className="mb-2 block font-medium text-gray-900"
              >
                Your Email
              </Typography>
            </label>
            <div>
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
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>
          </div>
          <div className="mb-6">
            <label htmlFor="password">
              <Typography
                variant="small"
                className="mb-2 block font-medium text-gray-900"
              >
                Password
              </Typography>
            </label>
            <div className="relative">
              <div>
                <Input
                  size="lg"
                  placeholder="********"
                  className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200 pr-12"
                  type={passwordShown ? "text" : "password"}
                  id="password"
                  {...register("password", {
                    required: "Password is required",
                    pattern: {
                      value: /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                      message: "Invalid email password",
                    },
                  })}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                )}
              </div>
              <button
                type="button"
                onClick={togglePasswordVisiblity}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                tabIndex={-1}
              >
                {passwordShown ? (
                  <EyeIcon className="h-5 w-5" />
                ) : (
                  <EyeSlashIcon className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
          <Button
            size="lg"
            className="mt-6"
            isFullWidth
          >
            sign in
          </Button>

          <Typography variant="small" className="!mt-4 text-center font-normal">
            Not registered?{" "}
            <Link to='/signup' className="font-medium text-gray-900">
              Create account
            </Link>
          </Typography>
          <Typography variant="small" className="!mt-4 text-center font-normal" >
            {isAdmin
              ? (
                <Link to='/login' className="font-medium text-gray-900">
                  User Login
                </Link>
              ) : (
                <Link to='/admin/login' className="font-medium text-gray-900">
                  Admin Login
                </Link>
              )
            }
          </Typography>
        </form>

      </div >
    </section >
  );
}

export default LoginForm;
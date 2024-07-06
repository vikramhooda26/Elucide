import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { cn } from "../../../lib/utils";
import ErrorMsg from "../../../components/error/ErrorMsg";
import AuthService from "../../../services/auth/AuthService";
import { useAuth } from "../auth-provider/AuthProvider";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { useNavigate } from "react-router-dom";

const loginSchema = yup.object().shape({
  email: yup.string().required("Please enter valid email."),
  password: yup.string().required("Please enter correct password."),
});

function LoginPage() {

  const { register, handleSubmit, formState: { errors }, } = useForm({ resolver: yupResolver(loginSchema), });

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLoginSubmit = async (data: any) => {
    console.log(data?.email, data?.password);
    const p = {
      username: data?.email,
      password: data?.password,
    }

    const r = await AuthService?.doLogin(p);

    if (r?.resp?.success) {
      const data = r?.resp;
      console.log("Login Successfull");
      login();
      AuthService.setToken(data?.token);
      AuthService.setUser(data);
      navigate('/dashboard')
    } else {
      console.log("Login Failed");
    }

  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gradient-to-t from-slate-500 via-gray-700 text-white ">
      <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input">
        <h2 className="font-bold text-xl text-neutral-600 ">
          Welcome
        </h2>
        <p className="text-neutral-600 text-sm max-w-sm mt-2 ">
          Enter your email below to login to your account.
        </p>

        <form className="my-8" onSubmit={handleSubmit(handleLoginSubmit)}>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input {...register('email')} id="email" placeholder="example@email.com" type="email" />
            {errors?.email?.message ? <ErrorMsg msg="Please enter valid email." /> : null}
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input {...register('password')} id="password" placeholder="••••••••" type="password" />
            {errors?.password?.message ? <ErrorMsg msg="Please enter correct password." /> : null}
          </LabelInputContainer>

          <button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
            Login &rarr;
            <BottomGradient />
          </button>

          <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

        </form>
      </div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};

export default LoginPage;


// <Card className="w-full max-w-sm">
//   <CardHeader>
//     <CardTitle className="text-2xl">Login</CardTitle>
//     <CardDescription>
//       Enter your email below to login to your account.
//     </CardDescription>
//   </CardHeader>

//   <CardContent className="grid gap-4">
//     <form className="my-8" onSubmit={handleSubmit(handleLoginSubmit)}>
//       <div className="grid gap-2">
//         <Label htmlFor="email">Email</Label>
//         <Input {...register('email')} id="email" type="email" placeholder="m@example.com" required />
//         {errors?.email?.message ? <ErrorMsg msg="Please enter valid email." /> : null}
//       </div>
//       <div className="grid gap-2">
//         <Label htmlFor="password">Password</Label>
//         <Input {...register('password')} id="password" type="password" required />
//         {errors?.password?.message ? <ErrorMsg msg="Please enter correct password." /> : null}
//       </div>
//     </form>
//   </CardContent>

//   <CardFooter>
//     <Button type="submit" className="w-full ">Log in</Button>
//   </CardFooter>
// </Card>
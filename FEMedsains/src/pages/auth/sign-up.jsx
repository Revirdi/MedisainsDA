import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Checkbox,
  Button,
  Typography,
  Alert,
} from "@material-tailwind/react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { registerAdmin } from "@/api/userApi";
import { useState } from "react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function SignUp() {
  const queryClient = useQueryClient();
  const [addNewUser, setAddNewUser] = useState({
    username: "",
    email: "",
    fullname: "",
    password: "",
    role: 1,
  });
  const registerAdminMutation = useMutation(registerAdmin, {
    onSuccess: (data) => {
      // queryClient.invalidateQueries("users");
      toast.success(data.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    },
    onError: (data) => {
      // alert(data.response.data.message);
      toast.error(
        `Error : ${data.response.data.statusCode} "${data.response.data.message}"`,
        {
          position: toast.POSITION.TOP_RIGHT,
        }
      );
    },
  });

  const onRegisterAdmin = () => {
    registerAdminMutation.mutate(addNewUser);
    setAddNewUser({
      username: "",
      email: "",
      fullname: "",
      password: "",
      role: 1,
    });
  };

  return (
    <>
      <ToastContainer autoClose={3000} />
      <img
        src="https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
      <div className="w-full"></div>
      <div className="container mx-auto p-4">
        <Card className="absolute top-2/4 left-2/4 w-full max-w-[24rem] -translate-y-2/4 -translate-x-2/4">
          <CardHeader
            variant="gradient"
            color="blue"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              Sign Up
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input
              label="Username"
              name="username"
              size="lg"
              value={addNewUser.username}
              onChange={(e) =>
                setAddNewUser({
                  ...addNewUser,
                  [e.target.name]: e.target.value,
                })
              }
            />
            <Input
              label="Fullname"
              name="fullname"
              value={addNewUser.fullname}
              size="lg"
              onChange={(e) =>
                setAddNewUser({
                  ...addNewUser,
                  [e.target.name]: e.target.value,
                })
              }
            />
            <Input
              type="email"
              label="Email"
              value={addNewUser.email}
              name="email"
              size="lg"
              onChange={(e) =>
                setAddNewUser({
                  ...addNewUser,
                  [e.target.name]: e.target.value,
                })
              }
            />
            <Input
              type="password"
              name="password"
              value={addNewUser.password}
              label="Password"
              size="lg"
              onChange={(e) =>
                setAddNewUser({
                  ...addNewUser,
                  [e.target.name]: e.target.value,
                })
              }
            />
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" fullWidth onClick={onRegisterAdmin}>
              Sign Up
            </Button>
            <Typography variant="small" className="mt-6 flex justify-center">
              Already have an account?
              <Link to="/auth/sign-in">
                <Typography
                  as="span"
                  variant="small"
                  color="blue"
                  className="ml-1 font-bold"
                >
                  Sign in
                </Typography>
              </Link>
            </Typography>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}

export default SignUp;

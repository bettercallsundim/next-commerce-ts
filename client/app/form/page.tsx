"use client";
import { DevTool } from "@hookform/devtools";
import axios from "axios";
import { useForm } from "react-hook-form";
type Props = {};
type FormValues = {
  name: string;
  email: string;
};
const Form = (props: Props) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: async () => {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users/1"
      );
      const data = await response.data;
      return {
        name: "John Doe",
        email: data.email,
      };
    },
  });
  const onSubmit = (data: FormValues) => {
    console.log(data, "react hook form");
  };
  return (
    <div>
      <h1>React Hook Form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p>
          {" "}
          <input
            type="text"
            name="name"
            placeholder="Name"
            {...register("name")}
          />
          <p className="text-red-500">{errors.name?.message}</p>
        </p>
        <p>
          <input
            type="email"
            name="email"
            placeholder="Email"
            {...register("email", {
              required: "Email is required",
              validate: (value) => {
                return value.includes("#") || "Email should contain #";
              },
            })}
          />
          <p className="text-red-500">{errors.email?.message}</p>
        </p>
        <button type="submit">Submit</button>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default Form;

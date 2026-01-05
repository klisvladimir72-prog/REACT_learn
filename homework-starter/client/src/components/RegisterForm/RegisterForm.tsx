import { FormField } from "../FormField";
import { Button } from "../Button";
import "./RegisterForm.css";
import { useMutation } from "@tanstack/react-query";
import { fetchMe, registerUser } from "../../api/User";
import { queryClient } from "../../api/queryClient";
import z from "zod";
import { useAuth } from "../../context/AuthContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

const registerSchema = z.object({
  username: z.string().min(5, "Имя пользователя должно содержать не менее 5 символов"),
  email: z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Некорректный формат email"),
  password: z.string().min(8, "Пароль должен содержать не менее 8 символов"),
});

type RegisterData = z.infer<typeof registerSchema>;

export const RegisterForm = () => {
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterData>({ resolver: zodResolver(registerSchema) });

  const registerMutation = useMutation(
    {
      mutationFn: async (data: RegisterData) => {
        await registerUser(data.username, data.email, data.password);
        // const user = await fetchMe();
        // return { user, token: "" };
      },
      onSuccess: () => {
        // login({ token: data.token, user: data.user });
        toast.success("Регистрация прошла успешно!");
        reset();
      },
      onError: (error) => {
        toast.error(error.message || "Ошибка регистрации!");
      },
    },
    queryClient
  );

  const onSubmit = (data: RegisterData) => {
    registerMutation.mutate(data);
  };

  return (
    <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
      <FormField label="Имя" errorMessage={errors.username?.message}>
        <input {...register("username")} />
      </FormField>
      <FormField label="Email" errorMessage={errors.email?.message}>
        <input {...register("email")} />
      </FormField>
      <FormField label="Пароль" errorMessage={errors.password?.message}>
        <input type="password" {...register("password")} />
      </FormField>

      <Button
        type="submit"
        isLoading={registerMutation.isPending}
        isDisabled={registerMutation.isPending}
      >
        Зарегистрироваться
      </Button>
    </form>
  );
};

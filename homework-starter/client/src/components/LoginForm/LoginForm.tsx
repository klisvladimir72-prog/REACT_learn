// src/components/LoginForm/LoginForm.tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { FormField } from "../FormField/FormField";
import { Button } from "../Button/Button";
import "./LoginForm.css";
import { useAuth } from "../../context/AuthContext";

import z from "zod";
import { loginUser, fetchMe } from "../../api/User";

const loginSchema = z.object({
  email: z.string().min(1, "Email обязателен").email("Некорректный формат email"),
  password: z
    .string()
    .min(1, "Пароль обязателен")
    .min(8, "Пароль должен содержать не менее 8 символов"),
});

type LoginData = z.infer<typeof loginSchema>;

export const LoginForm = () => {
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const loginMutation = useMutation({
    mutationFn: async (data: LoginData) => {
      await loginUser(data.email, data.password); // ✅ Только запрос
      const user = await fetchMe(); // ✅ Получаем данные
      return { user, token: "" }; // ❌ token не возвращается, но куки работают
    },
    onSuccess: (data) => {
      login({ token: data.token, user: data.user });
      toast.success("Вы успешно вошли!");
    },
    onError: (error) => {
      toast.error(error.message || "Ошибка входа");
    },
  });

  const onSubmit = (data: LoginData) => {
    loginMutation.mutate(data);
  };

  return (
    <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
      <FormField label="Email" errorMessage={errors.email?.message}>
        <input {...register("email")} />
      </FormField>

      <FormField label="Пароль" errorMessage={errors.password?.message}>
        <input type="password" {...register("password")} />
      </FormField>

      <Button
        type="submit"
        isLoading={loginMutation.isPending}
        isDisabled={loginMutation.isPending}
      >
        Войти
      </Button>
    </form>
  );
};

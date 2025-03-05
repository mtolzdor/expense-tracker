import "./Login.css";
import { useAuth } from "../../../../context/useAuth";
import { useForm } from "react-hook-form";

type LoginForm = {
  username: string;
  password: string;
};

export default function Login() {
  const { login } = useAuth();

  const { register, handleSubmit } = useForm<LoginForm>();

  const handleLoginUser = (form: LoginForm) => {
    login(form.username, form.password);
  };

  return (
    <div className="login-container">
      <div className="login-items">
        <h1>Expenses Account</h1>
        <form className="login-form" onSubmit={handleSubmit(handleLoginUser)}>
          <input type="text" placeholder="Username" {...register("username")} />
          <input
            type="password"
            placeholder="Password"
            {...register("password")}
          />
          <button type="submit">Log in</button>
        </form>
        <h3>Or</h3>
        <div>
          Do not have an account? <a href="/register">Register</a> here.
        </div>
      </div>
    </div>
  );
}

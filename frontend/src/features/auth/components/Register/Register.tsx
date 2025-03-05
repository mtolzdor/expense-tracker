import "./Register.css";
import { useAuth } from "../../../../context/useAuth";
import { useForm } from "react-hook-form";

type RegisterForm = {
  email: string;
  username: string;
  password: string;
};

export default function Register() {
  const { registerUser } = useAuth();

  const { register, handleSubmit } = useForm<RegisterForm>();

  const handleRegisterUser = (form: RegisterForm) => {
    registerUser(form.username, form.email, form.password);
  };

  return (
    <div className="register-container">
      <div className="register-items">
        <form
          className="register-form"
          onSubmit={handleSubmit(handleRegisterUser)}
        >
          <input type="email" placeholder="Email" {...register("email")} />
          <input type="text" placeholder="Username" {...register("username")} />
          <input
            type="password"
            placeholder="Password"
            {...register("password")}
          />
          <button type="submit">Register</button>
        </form>
        <h3>Or</h3>
        <div>
          Already have an account? <a href="/login">Login</a>.
        </div>
      </div>
    </div>
  );
}

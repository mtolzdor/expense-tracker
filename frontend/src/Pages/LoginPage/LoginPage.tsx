import { useAuth } from "../../Context/useAuth";
import { useActionState } from "react";
import "./LoginPage.css";

export default function LoginPage() {
  const { login } = useAuth();
  const [user, submitAction, isPending] = useActionState(loginUser, {
    data: null,
    error: null,
  });

  function loginUser(previousState: React.ComponentState, formData: FormData) {
    const userName = formData.get("username") as string;
    const password = formData.get("password") as string;

    try {
      login(userName, password);
      return { data: null, error: null };
    } catch (error) {
      return { data: previousState, error: error };
    }
  }

  return (
    <div className="login-container">
      <div className="login-items">
        <h1>Expenses Account</h1>
        <form className="login-form" action={submitAction}>
          <input type="text" name="username" placeholder="Username" />
          <input type="password" name="password" placeholder="Password" />
          <button type="submit" disabled={isPending}>
            {isPending ? "Logging in..." : "Log in"}
          </button>
        </form>
        <h3>Or</h3>
        <div>
          Do not have an account? <a href="/register">Register</a> here.
        </div>
      </div>
    </div>
  );
}

import { useAuth } from "../../Context/useAuth";
import { useActionState } from "react";
import "./RegisterPage.css";

export default function RegisterPage() {
  const { register } = useAuth();
  const [user, submitAction, isPending] = useActionState(RegisterUser, {
    data: null,
    error: null,
  });

  function RegisterUser(
    previousState: React.ComponentState,
    formData: FormData
  ) {
    const email = formData.get("email") as string;
    const userName = formData.get("username") as string;
    const password = formData.get("password") as string;

    try {
      register(email, userName, password);
      return { data: null, error: null };
    } catch (error) {
      return { data: previousState, error: error };
    }
  }

  return (
    <div className="register-container">
      <div className="register-items">
        <form className="register-form" action={submitAction}>
          <input type="email" name="Email" placeholder="Email" />
          <input type="text" name="username" placeholder="Username" />
          <input type="password" name="password" placeholder="Password" />
          <button type="submit" disabled={isPending}>
            {isPending ? "Creating Account..." : "Register"}
          </button>
        </form>
        <h3>Or</h3>
        <div>
          Already have an account? <a href="/login">Login</a>.
        </div>
      </div>
    </div>
  );
}

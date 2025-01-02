import { useAuth } from "../Context/useAuth";
import { useActionState } from "react";

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
    <div>
      <h1>Login</h1>
      <form action={submitAction}>
        <input type="text" name="username" placeholder="Username" />
        <input type="password" name="password" placeholder="Password" />
        <button type="submit" disabled={isPending}>
          {isPending ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

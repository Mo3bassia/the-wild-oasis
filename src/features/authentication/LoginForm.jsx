import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import { login } from "../../services/apiAuth";
import { useLogin } from "./useLogin";
import SpinnerMini from "../../ui/SpinnerMini";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [email, setEmail] = useState("user@user.user");
  const [password, setPassword] = useState("12345678");
  const { mutate: loginUser, isPending } = useLogin();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    loginUser(
      { email, password },
      {
        onSuccess: (user) => {
          if (!user) {
            return;
          }
          navigate("/dashboard", { replace: true });
        },
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Email address">
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormRowVertical>
      <FormRowVertical label="Password">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button size="large" variation="primary" disabled={isPending}>
          {isPending ? <SpinnerMini /> : "Login"}
        </Button>
      </FormRowVertical>

      <div
        style={{
          textAlign: "center",
          marginTop: "2rem",
          padding: "1.6rem",
          borderTop: "1px solid var(--color-grey-100)",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <p style={{ fontSize: "1.4rem", color: "var(--color-grey-500)" }}>
          New to Wild Oasis? Join us today and transform your property
          management experience.
        </p>
        <Button
          size="medium"
          variation="secondary"
          onClick={() => navigate("/users")}
        >
          Create an account
        </Button>
      </div>
    </Form>
  );
}

export default LoginForm;

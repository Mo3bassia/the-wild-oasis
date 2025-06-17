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
  const [email, setEmail] = useState("mo3bassia@gmail.com");
  const [password, setPassword] = useState("123456789");
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
          console.log("User logged in:", user);
          navigate("/dashboard");
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
    </Form>
  );
}

export default LoginForm;

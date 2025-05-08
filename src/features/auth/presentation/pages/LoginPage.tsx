import { Header } from "../components/Header";
import { LoginForm } from "../components/LoginForm";

export const LoginPage = () => {
  return <Header title={"Inicia sesión"} children={<LoginForm />} />;
};

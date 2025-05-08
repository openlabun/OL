import { Header } from "../components/Header";
import { RegisterForm } from "../components/RegisterForm";

export const RegisterPage = () => {
  return <Header title={"Crea tu cuenta"} children={<RegisterForm />} />;
};

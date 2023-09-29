import { useState } from "react";
import { login } from "../services/login.service";
import { MessageToast } from "../utils/toast";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const isValidEmail =
      /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email);

    if (!isValidEmail) {
      return MessageToast.error(`"${email}" is not a valid email`);
    }

    if (email !== null && email.length > 0) {
      await login(email);
    }
  };
  return (
    <section className="container py-5 h-100">
      <article className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
          <div
            className="card shadow-2-strong"
            style={{ borderRadius: "1rem" }}
          >
            <form onSubmit={handleSubmit} className="card-body p-5 text-center">
              <h3 className="mb-5">Sign in</h3>
              <div className="form-outline mb-4">
                <label htmlFor="Email">Email</label>
                <input
                  value={email}
                  type="email"
                  className="form-control"
                  name="Email"
                  required
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-lg btn-block"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </article>
    </section>
  );
};

export default Login;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "" });

  const submit = async (e) => {
    e.preventDefault();
    await login(form);
    navigate("/");
  };

  return (
    <div className="container page">
      <h1>Login / Sign up</h1>
      <p className="sub">Demo login. Connect it to your backend API later.</p>
      <form className="form-card" onSubmit={submit}>
        <label>
          Full name
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Your name"
          />
        </label>
        <label>
          Email
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="you@example.com"
          />
        </label>
        <button className="btn blue" type="submit">
          Continue
        </button>
      </form>
    </div>
  );
}

export default Login;

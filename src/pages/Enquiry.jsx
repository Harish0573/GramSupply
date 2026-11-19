import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../api/axiosConfig";
import "./Enquiry.css";

function Enquiry() {
  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    phone: "",
    organization: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Read cart safely
      let cart = [];

      try {
        cart = JSON.parse(localStorage.getItem("jr_cart") || "[]");
      } catch {
        cart = [];
      }

      // Prepare request in the format expected by Spring Boot
      const payload = {
        customerName: formData.customerName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        organization: formData.organization.trim(),
        message: formData.message.trim(),
        items: cart.map((item) => ({
          productId: Number(item.productId),
          quantity: Number(item.quantity),
        })),
      };

      // Send enquiry to Spring Boot
      const response = await api.post("/enquiries", payload);

      console.log("Enquiry response:", response.data);

      try {
        const mine = JSON.parse(localStorage.getItem("jr_my_enquiries") || "[]");
        localStorage.setItem("jr_my_enquiries", JSON.stringify([{ id: response.data?.id, message: payload.message, items: cart, createdAt: new Date().toISOString(), status: response.data?.status || "NEW" }, ...mine].slice(0, 50)));
      } catch { /* ignore */ }
      setSuccess(
        "Your enquiry has been submitted successfully. Our team will contact you.",
      );

      setFormData({
        customerName: "",
        email: "",
        phone: "",
        organization: "",
        message: "",
      });

      // Clear cart only after successful submission
      localStorage.removeItem("jr_cart");
    } catch (err) {
      console.error("Enquiry submission failed:", err.response?.data || err);

      const serverMessage = err.response?.data?.message;

      setError(
        typeof serverMessage === "string"
          ? serverMessage
          : "Unable to submit your enquiry. Please check the backend and try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className="enquiry-page">
        <section className="enquiry-layout">
          <div className="enquiry-intro">
            <p className="enquiry-eyebrow">GRAMSUPPLY / ENQUIRIES</p>

            <h1>How can we assist you?</h1>

            <p className="enquiry-description">
              Use this form to send a product enquiry or discuss an
              institutional procurement requirement.
            </p>

            <div className="enquiry-info">
              <h3>Product information</h3>
              <p>Ask about catalogue products and specifications.</p>
            </div>

            <div className="enquiry-info">
              <h3>Institutional enquiries</h3>
              <p>Share your organisation's requirements.</p>
            </div>

            <Link to="/products" className="enquiry-catalogue-link">
              Explore product catalogue →
            </Link>
          </div>

          <div className="enquiry-form-panel">
            <h2>Send an enquiry</h2>

            <form onSubmit={handleSubmit}>
              <div className="form-field">
                <label htmlFor="customerName">Full name</label>
                <input
                  id="customerName"
                  type="text"
                  name="customerName"
                  placeholder="Enter your full name"
                  value={formData.customerName}
                  onChange={handleChange}
                  required
                  maxLength={120}
                />
              </div>

              <div className="form-field">
                <label htmlFor="email">Email address</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  maxLength={150}
                />
              </div>

              <div className="form-field">
                <label htmlFor="phone">Phone number</label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  placeholder="Enter your 10-digit phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  pattern="[0-9]{10}"
                  title="Enter a valid 10-digit phone number"
                />
              </div>

              <div className="form-field">
                <label htmlFor="organization">Organisation</label>
                <input
                  id="organization"
                  type="text"
                  name="organization"
                  placeholder="Gram Panchayat / School / Institution"
                  value={formData.organization}
                  onChange={handleChange}
                  maxLength={180}
                />
              </div>

              <div className="form-field">
                <label htmlFor="message">Your requirements</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Describe the products or services you require..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  minLength={5}
                  maxLength={2000}
                  rows={5}
                />
              </div>

              {error && (
                <p className="form-error" role="alert">
                  {error}
                </p>
              )}

              {success && (
                <p className="form-success" role="status">
                  {success}
                </p>
              )}

              <button
                type="submit"
                className="enquiry-submit-btn"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit enquiry →"}
              </button>

              <p className="enquiry-note">
                Your details will be used to respond to this enquiry.
              </p>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}

export default Enquiry;

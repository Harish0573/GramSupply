import React, { useState } from "react";

export function About() {
  return (
    <div className="container page">
      <h1>About GramSupply</h1>
      <p className="sub">The institutional marketplace for India.</p>
      <div className="form-card" style={{ maxWidth: 760 }}>
        <p>
          GramSupply helps schools, offices and village bodies buy furniture,
          lighting, CCTV, water systems, cleaning supplies and more from one
          place, with bulk pricing and delivery to your door.
        </p>
        <p>
          Our team checks every product in the catalogue so institutions can
          order with confidence.
        </p>
      </div>
    </div>
  );
}

function SimpleForm({ title, sub, fields, button }) {
  const [sent, setSent] = useState(false);
  return (
    <div className="container page">
      <h1>{title}</h1>
      <p className="sub">{sub}</p>
      {sent ? (
        <p className="notice">Thank you! We will get back to you soon.</p>
      ) : (
        <form
          className="form-card"
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
        >
          {fields.map(([label, type]) => (
            <label key={label}>
              {label}
              {type === "textarea" ? (
                <textarea rows={4} required />
              ) : (
                <input type={type} required />
              )}
            </label>
          ))}
          <button className="btn blue" type="submit">
            {button}
          </button>
        </form>
      )}
    </div>
  );
}

export const Contact = () => (
  <SimpleForm
    title="Contact us"
    sub="Call or message our team."
    button="Send message"
    fields={[
      ["Name", "text"],
      ["Email", "email"],
      ["Message", "textarea"],
    ]}
  />
);

export const Enquiry = () => (
  <SimpleForm
    title="Bulk enquiry"
    sub="Tell us what you need and get prices for large quantities."
    button="Send enquiry"
    fields={[
      ["Institution name", "text"],
      ["Email", "email"],
      ["Phone", "tel"],
      ["Products and quantities needed", "textarea"],
    ]}
  />
);

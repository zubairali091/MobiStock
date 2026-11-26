import { useState } from "react";
import { CATEGORIES } from "../utils/constants.js";
import { validateProduct } from "../utils/validators.js";

const emptyForm = {
  name: "",
  brand: "",
  model: "",
  ramStorage: "",
  color: "",
  imei: "",
  purchasePrice: "",
  salePrice: "",
  quantity: "",
  category: "Mobiles",
};

function Field({ label, error, children, hint }) {
  return (
    <label className={`field ${error ? "has-error" : ""}`}>
      <span className="field-label">{label}</span>
      {children}
      {error ? <span className="field-error">{error}</span> : hint ? <span className="field-hint">{hint}</span> : null}
    </label>
  );
}

function ProductForm({ initial, onSubmit, onCancel }) {
  const isEdit = Boolean(initial);
  const [form, setForm] = useState(() => (initial ? { ...emptyForm, ...initial } : emptyForm));
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => {
      const next = { ...f, [name]: value };
      // Only mobiles have an IMEI
      if (name === "category" && value !== "Mobiles") next.imei = "";
      return next;
    });
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const found = validateProduct(form);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    onSubmit({
      name: form.name.trim(),
      brand: form.brand.trim(),
      model: form.model.trim(),
      ramStorage: form.ramStorage.trim(),
      color: form.color.trim(),
      imei: form.category === "Mobiles" ? form.imei.trim() : "",
      category: form.category,
      purchasePrice: Number(form.purchasePrice),
      salePrice: Number(form.salePrice),
      quantity: Number(form.quantity),
    });
  }

  const isMobile = form.category === "Mobiles";

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="form-grid">
        <Field label="Category" error={errors.category}>
          <select name="category" value={form.category} onChange={handleChange}>
            {CATEGORIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </Field>

        <Field label="Product name" error={errors.name}>
          <input name="name" value={form.name} onChange={handleChange} placeholder="e.g. Galaxy A15" />
        </Field>

        <Field label="Brand" error={errors.brand}>
          <input name="brand" value={form.brand} onChange={handleChange} placeholder="e.g. Samsung" />
        </Field>

        <Field label="Model">
          <input name="model" value={form.model} onChange={handleChange} placeholder="e.g. SM-A155F" />
        </Field>

        <Field label="RAM / Storage">
          <input name="ramStorage" value={form.ramStorage} onChange={handleChange} placeholder="e.g. 6GB / 128GB" />
        </Field>

        <Field label="Color">
          <input name="color" value={form.color} onChange={handleChange} placeholder="e.g. Black" />
        </Field>

        {isMobile && (
          <Field label="IMEI" error={errors.imei} hint="15 digits">
            <input
              name="imei"
              value={form.imei}
              onChange={handleChange}
              inputMode="numeric"
              maxLength={15}
              placeholder="356938035643809"
            />
          </Field>
        )}

        <Field label="Purchase price (PKR)" error={errors.purchasePrice}>
          <input name="purchasePrice" type="number" min="0" value={form.purchasePrice} onChange={handleChange} placeholder="0" />
        </Field>

        <Field label="Sale price (PKR)" error={errors.salePrice}>
          <input name="salePrice" type="number" min="0" value={form.salePrice} onChange={handleChange} placeholder="0" />
        </Field>

        <Field label="Quantity" error={errors.quantity} hint="Below 5 shows a Low Stock alert">
          <input name="quantity" type="number" min="0" step="1" value={form.quantity} onChange={handleChange} placeholder="0" />
        </Field>
      </div>

      <div className="modal-actions">
        <button type="button" className="btn btn-outline" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          {isEdit ? "Save changes" : "Add product"}
        </button>
      </div>
    </form>
  );
}

export default ProductForm;

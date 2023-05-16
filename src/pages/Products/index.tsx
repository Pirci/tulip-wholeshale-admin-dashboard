import React, { useState } from "react";
import styles from "./index.module.scss";

const ProductList = () => (
  <div className={styles.content_container}>
    <div className={styles.page_header}>List of Products</div>
    <ul className={styles.product_list}>
      <li>Product 1</li>
      <li>Product 2</li>
      <li>Product 3</li>
    </ul>
  </div>
);

const ProductEntryForm = () => (
  <div className={styles.content_container}>
    <div className={styles.page_header}>Product Entry Form</div>
    <form className={styles.form_container}>
      <label>
        Product Name:
        <input type='text' name='productName' />
      </label>
      <button type='submit'>Submit</button>
    </form>
  </div>
);

export default function Products() {
  const [activeView, setActiveView] = useState("list");

  const renderContent = () => {
    if (activeView === "list") {
      return <ProductList />;
    } else if (activeView === "form") {
      return <ProductEntryForm />;
    }
  };

  return (
    <div>
      <div className={styles.button_container}>
        <button
          className={activeView === "list" ? styles.active_button : ""}
          onClick={() => setActiveView("list")}
        >
          List of Products
        </button>
        <button
          className={activeView === "form" ? styles.active_button : ""}
          onClick={() => setActiveView("form")}
        >
          Product Entry Form
        </button>
      </div>
      <div>{renderContent()}</div>
    </div>
  );
}

import Head from "next/head";
import styles from "./Invoice.module.css";

const Invoice = () => {
  return (
    <div className={styles.invoiceBox}>
      <Head>
        <title>Invoice</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <header className={styles.header}>
        <img src="/logo.png" alt="logo" />
        <h1>Invoice</h1>
        <div className={styles.companyInfo}>
          <h2>Your Company Name</h2>
          <p>123 Your Street</p>
          <p>Your City, ST 12345</p>
          <p>Email: info@yourcompany.com</p>
          <p>Phone: (555) 555-5555</p>
        </div>
      </header>

      <section className={styles.clientInfo}>
        <h2>Bill To:</h2>
        <p>Client Name</p>
        <p>Client Address</p>
        <p>Client City, ST ZIP</p>
        <p>Email: client@example.com</p>
        <p>Phone: (555) 555-5555</p>
      </section>

      <section className={styles.invoiceDetails}>
        <h2>Invoice Details</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Item</th>
              <th>Description</th>
              <th>Quantity</th>
              <th>Unit Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Service 1</td>
              <td>1</td>
              <td>$100.00</td>
              <td>$100.00</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Service 2</td>
              <td>2</td>
              <td>$50.00</td>
              <td>$100.00</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className={styles.paymentInfo}>
        <h2>Payment Information</h2>
        <p>
          <strong>Total Due:</strong> $200.00
        </p>
        <p>
          <strong>Payment Due By:</strong> 30/06/2024
        </p>
        <p>Please make payment to:</p>
        <p>Bank Name</p>
        <p>Account Number: 123456789</p>
        <p>Routing Number: 987654321</p>
      </section>
    </div>
  );
};

export default Invoice;

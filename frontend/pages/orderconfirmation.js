import Layout from "../components/Layout";

export default function orderConfirmation() {
  return (
    <Layout title="Confirm">
      <h1>Thanks for your order!</h1>
      <p>
        We appreciate your business!
        If you have any questions, please email
        <a href="mailto:info@fermaterra.com">info@fermaterra.com</a>
        .
      </p>
    </Layout>
  );
}

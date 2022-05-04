import Link from "next/link";
import Layout from "./Layout";

import styles from "../styles/adminLayout.module.css";

export default function AdminLayout({ children }) {
  return (
    <Layout title="admin">
      <main className={styles.main}>
        <Link href="/admin">
          <a className={styles.link} href="/">
            {" "}
            <h2>Admin</h2>
          </a>

        </Link>
        <nav className={styles.nav}>
          <Link href="/admin/activities">Activities</Link>
          <Link href="/admin/books">Books</Link>
          <Link href="/admin/clients">Clients</Link>
        </nav>
        {children}
      </main>
    </Layout>
  );
}

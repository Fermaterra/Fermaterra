import Link from "next/link";
import Layout from "./Layout";

import styles from "../styles/adminLayout.module.css";

export default function AdminLayout() {
  return (
    <Layout title="admin">
      <main className={styles.main}>
        <Link href="/admin">
          <a className={styles.link} href="/">
            {" "}
            <h1>Admin</h1>
          </a>

        </Link>
        <nav className={styles.nav}>
          <Link className={styles.link} href="/admin/activities">Activities</Link>
          <Link className={styles.link} href="/admin/books">Books</Link>
          <Link className={styles.link} href="/admin/clients">Clients</Link>
        </nav>
      </main>
    </Layout>
  );
}

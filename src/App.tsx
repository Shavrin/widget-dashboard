import { Dashboard } from "./Dashboard/Dashboard.tsx";
import styles from "./App.module.css";

export function App() {
  return (
    <main className={styles.app}>
      <Dashboard />
    </main>
  );
}

import "./App.css";
import { AuthForm } from "./components/AuthForm";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <div className="app">
      <AuthProvider>
        <AuthForm />
      </AuthProvider>
    </div>
  );
}

export default App;

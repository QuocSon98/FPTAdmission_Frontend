import { AuthProvider } from "./app/hooks/AuthContext"
import MainRoutes from "./app/routes/MainRoutes"

function App() {
  return (
    <AuthProvider>
      <MainRoutes />
    </AuthProvider>
  );
}

export default App

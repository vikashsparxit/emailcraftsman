import { AuthProvider } from './contexts/AuthContext';
import Index from './pages/Index';
import { Toaster } from './components/ui/sonner';

function App() {
  return (
    <AuthProvider>
      <Index />
      <Toaster />
    </AuthProvider>
  );
}

export default App;
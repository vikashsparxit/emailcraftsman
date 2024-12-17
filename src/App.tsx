import { AuthProvider } from './contexts/AuthContext';
import Index from './pages/Index';
import { Toaster } from './components/ui/sonner';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Index />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
import { QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { DarkModeProvider } from "./context/DarkModeContext.jsx";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallBack from "./ui/ErrorFallBack.jsx";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

createRoot(document.getElementById("root")).render(
  <DarkModeProvider>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Toaster />
      <StrictMode>
        <ErrorBoundary
          FallbackComponent={ErrorFallBack}
          onReset={() => window.location.replace("/")}
        >
          <App />
        </ErrorBoundary>
      </StrictMode>
    </QueryClientProvider>
  </DarkModeProvider>
);

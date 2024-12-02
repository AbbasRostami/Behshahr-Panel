import React, { Suspense } from "react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();
// ** Router Import
import Router from "./router/Router";

const App = () => {
  return (
    <Suspense fallback={null}>
      <QueryClientProvider client={queryClient}>
      <Router />
      </QueryClientProvider>
    </Suspense>
  );
};

export default App;

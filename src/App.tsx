import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Authenticated, Unauthenticated, useConvexAuth, ConvexReactClient } from "convex/react";
import { Toaster } from "sonner";
import { useEffect } from 'react';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import ScanAttendance from './pages/ScanAttendance';
import GenerateQR from './pages/GenerateQR';
import ViewLogs from './pages/ViewLogs';
import AboutPage from './pages/AboutPage';
import ConcernsPage from './pages/ConcernsPage';
import { syncService } from './services/syncService';

// Get the Convex client from the environment
const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string);

export default function App() {
  const { isAuthenticated } = useConvexAuth();

  useEffect(() => {
    // Initialize sync service with Convex client
    syncService.setConvexClient(convex);
    
    if (isAuthenticated) {
      // Start periodic sync when authenticated
      syncService.startPeriodicSync();
    }
  }, [isAuthenticated]);

  return (
    <Router>
      <div className="min-h-screen bg-white text-black">
        <Routes>
          <Route path="/" element={
            <>
              <Unauthenticated>
                <LandingPage />
              </Unauthenticated>
              <Authenticated>
                <Navigate to="/dashboard" replace />
              </Authenticated>
            </>
          } />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/concerns" element={<ConcernsPage />} />
          <Route path="/login" element={
            <>
              <Unauthenticated>
                <LoginPage />
              </Unauthenticated>
              <Authenticated>
                <Navigate to="/dashboard" replace />
              </Authenticated>
            </>
          } />
          <Route path="/dashboard" element={
            <Authenticated>
              <Dashboard />
            </Authenticated>
          } />
          <Route path="/scan" element={
            <Authenticated>
              <ScanAttendance />
            </Authenticated>
          } />
          <Route path="/generate" element={
            <Authenticated>
              <GenerateQR />
            </Authenticated>
          } />
          <Route path="/logs" element={
            <Authenticated>
              <ViewLogs />
            </Authenticated>
          } />
        </Routes>
        <Toaster />
      </div>
    </Router>
  );
}

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import GrantsPage from './components/GrantsPage';
import AboutPage from './components/AboutPage';
import Chatbot from './components/Chatbot';
import NotFoundPage from './components/NotFoundPage';

// Utils
import { fetchGrantsData } from './utils/api';

// Styles
import './App.css';

function App() {
  const [grantsData, setGrantsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchGrantsData();
        setGrantsData(data);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load grants data. Please try again later.');
        setIsLoading(false);
        console.error('Error loading grants data:', err);
      }
    };

    loadData();
  }, []);

  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main-content">
          <AnimatePresence mode="wait">
            <Routes>
              <Route 
                path="/" 
                element={<Home grantsData={grantsData} isLoading={isLoading} error={error} />} 
              />
              <Route 
                path="/grants" 
                element={<GrantsPage grantsData={grantsData} isLoading={isLoading} error={error} />} 
              />
              <Route path="/about" element={<AboutPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </AnimatePresence>
        </main>
        <Chatbot grantsData={grantsData} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
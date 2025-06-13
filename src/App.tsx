import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './contexts/ThemeContext';
import { ResumeProvider } from './contexts/ResumeContext';
import Header from './components/Layout/Header';
import Home from './pages/Home';
import Builder from './pages/Builder';
import Analyzer from './pages/Analyzer';
import Templates from './pages/Templates';

function App() {
  return (
    <ThemeProvider>
      <ResumeProvider>
        <DndProvider backend={HTML5Backend}>
          <Router>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
              <Header />
              <main>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/builder" element={<Builder />} />
                  <Route path="/analyzer" element={<Analyzer />} />
                  <Route path="/templates" element={<Templates />} />
                </Routes>
              </main>
              <Toaster
                position="top-right"
                toastOptions={{
                  duration: 4000,
                  className: 'dark:bg-gray-800 dark:text-white',
                }}
              />
            </div>
          </Router>
        </DndProvider>
      </ResumeProvider>
    </ThemeProvider>
  );
}

export default App;
import React, { useState, useEffect } from 'react';
import فهرس_المصحف from './فهرس_المصحف';
import مصحف_مفتوح from './مصحف_مفتوح';
import الختمة from './الختمة';
import بحث_القرآن from './بحث_القرآن';

export default function المصحف_الشريف() {
  const [currentView, setCurrentView] = useState<'reader' | 'index' | 'search' | 'khatma'>('reader');
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const saved = localStorage.getItem('quran_last_read');
    if (saved) {
      setCurrentPage(parseInt(saved));
    }
  }, []);

  const handleSelectPage = (page: number) => {
    setCurrentPage(page);
    setCurrentView('reader');
  };

  return (
    <div className="w-full h-full bg-cream-50 hide-scrollbar">
      {currentView === 'khatma' && (
        <الختمة onBack={() => setCurrentView('reader')} />
      )}
      {currentView === 'index' && (
        <فهرس_المصحف onSelectPage={handleSelectPage} onBack={() => setCurrentView('reader')} onOpenKhatma={() => setCurrentView('khatma')} />
      )}
      {currentView === 'search' && (
        <بحث_القرآن onSelectPage={handleSelectPage} onBack={() => setCurrentView('reader')} />
      )}
      {currentView === 'reader' && (
        <مصحف_مفتوح 
          initialPage={currentPage} 
          onOpenIndex={() => setCurrentView('index')}
          onOpenSearch={() => setCurrentView('search')}
        />
      )}
    </div>
  );
}
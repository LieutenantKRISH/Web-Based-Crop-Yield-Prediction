import React, { useState } from 'react';
import IntroScreen from './IntroScreen';
import IntermediateScreen from './IntermediateScreen';
import MainScreen from './MainScreen';
import './index.css';

const App: React.FC = () => {
  const [screen, setScreen] = useState<'intro' | 'intermediate' | 'main'>('intro');

  const handlePasswordSubmit = () => setScreen('intermediate');
  const handleIntermediateNext = () => setScreen('main');
  const handleIntermediateBack = () => setScreen('intro');
  const handleMainBack = () => setScreen('intermediate');
  const handleClose = () => window.location.reload();

  return (
    <>
      {screen === 'intro' && <IntroScreen onPasswordSubmit={handlePasswordSubmit} />}
      {screen === 'intermediate' && (
        <IntermediateScreen
          onNext={handleIntermediateNext}
          onBack={handleIntermediateBack}
          onClose={handleClose}
        />
      )}
      {screen === 'main' && (
        <MainScreen onBack={handleMainBack} onClose={handleClose} />
      )}
    </>
  );
};

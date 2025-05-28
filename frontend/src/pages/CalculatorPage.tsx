import React from 'react';
import SolarCalculator from '../components/SolarCalculator';
import NewFooter from '../components/NewFooter';
// Import useOutletContext and OutletContextType
import { useOutletContext } from 'react-router-dom';
// Assuming OutletContextType is exported from App.tsx - adjust path if necessary
import { OutletContextType } from '../App';

const CalculatorPage: React.FC = () => {
   // Receive handleOpenModal from outlet context
  const { handleOpenModal } = useOutletContext<OutletContextType>();

  return (
    <div className="calculator-page-container">
      {/* Navbar is handled by Layout */}
      <SolarCalculator onOpenQuoteModal={handleOpenModal} />
      {/* Assuming NewFooter also needs the modal handler - adjust if not */}
      <NewFooter onOpenModal={handleOpenModal} />
    </div>
  );
};

export default CalculatorPage; 
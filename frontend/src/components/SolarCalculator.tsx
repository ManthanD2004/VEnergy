import React, { useState } from 'react';
import './SolarCalculator.css';

interface SolarCalculatorProps {
  onOpenQuoteModal: () => void;
}

const SolarCalculator: React.FC<SolarCalculatorProps> = ({ onOpenQuoteModal }) => {
  const [activeInput, setActiveInput] = useState('systemSize'); // 'systemSize' or 'electricityBill'
  const [systemSizeKw, setSystemSizeKw] = useState('1');
  const [electricityBill, setElectricityBill] = useState('2500'); // State for electricity bill

  // Placeholder values based on the image for 1 kW System Size and 2500 Electricity Bill
  const systemSize = activeInput === 'systemSize' ? '1 kW' : '3 kW'; // Example: change based on input mode
  const spaceRequired = activeInput === 'systemSize' ? '80 sqft' : '238 sqft';
  const annualEnergyGenerated = activeInput === 'systemSize' ? '1,440 Units' : '4,286 Units';
  const annualSavings = activeInput === 'systemSize' ? '₹ 10,080' : '₹ 30,000';
  const priceExcludingSubsidy = activeInput === 'systemSize' ? '₹ 98,769' : '₹ 1,99,138';
  const subsidy = activeInput === 'systemSize' ? '₹ 30,000' : '₹ 78,000';

  const handleSystemSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSystemSizeKw(event.target.value);
    // TODO: Add logic here to recalculate results based on system size
  };

  const handleElectricityBillChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setElectricityBill(event.target.value);
    // TODO: Add logic here to recalculate results based on electricity bill
  };

  const handleSolarTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // setSolarType(event.target.value); // Not updating state since value is fixed for now
  };

  const toggleInput = (input: 'systemSize' | 'electricityBill') => {
    setActiveInput(input);
    // TODO: Maybe reset the other input's value when switching?
  };

  return (
    <div className="solar-calculator-section">
      <div className="calculator-container">
        <div className="input-section">
          <h2>Calculate Your Savings</h2>
          <p>Explore the Potential of Solar Energy and Start Saving From Day 1!</p>
          <div className="input-group">
            <label htmlFor="solar-need">Do You Need Solar For</label>
            <select id="solar-need" value="Home">
              <option value="Home">Home</option>
              <option value="Commercial">Commercial</option>
            </select>
          </div>
          
          {/* Conditionally render input based on activeInput state */}
          {activeInput === 'systemSize' ? (
            <div className="input-group">
              <label htmlFor="system-size">Enter System Size (kW)</label>
              <input
                type="number"
                id="system-size"
                value={systemSizeKw}
                onChange={handleSystemSizeChange}
              />
            </div>
          ) : (
            <div className="input-group">
              <label htmlFor="electricity-bill">Enter Your Monthly Electricity Bill (in ₹)</label>
              <input
                type="number"
                id="electricity-bill"
                value={electricityBill}
                onChange={handleElectricityBillChange}
              />
            </div>
          )}

          <p className="or-calculate">
            Or calculate savings using
            {activeInput === 'systemSize' ? (
              <a href="#" onClick={(e) => { e.preventDefault(); toggleInput('electricityBill'); }}> Monthly Electricity Bill</a>
            ) : (
              <a href="#" onClick={(e) => { e.preventDefault(); toggleInput('systemSize'); }}> System size(kW)</a>
            )}
          </p>
        </div>

        <div className="results-section">
          <div className="result-card">
            <div className="icon">{/* System Size Icon */}</div>
            <div className="text">
              <p>System Size</p>
              <h3>{systemSize}</h3>
            </div>
          </div>
          <div className="result-card">
             <div className="icon">{/* Space Required Icon */}</div>
             <div className="text">
              <p>Space Required</p>
              <h3>{spaceRequired}</h3>
             </div>
          </div>
          <div className="result-card">
            <div className="icon">{/* Annual Energy Generated Icon */}</div>
             <div className="text">
              <p>Annual Energy Generated</p>
              <h3>{annualEnergyGenerated}</h3>
             </div>
          </div>
          <div className="result-card">
            <div className="icon">{/* Annual Savings Icon */}</div>
             <div className="text">
              <p>Annual Savings</p>
              <h3>{annualSavings}</h3>
             </div>
          </div>
          <div className="result-card">
            <div className="icon">{/* Price Excluding Subsidy Icon */}</div>
             <div className="text">
              <p>Price (Excluding Subsidy)</p>
              <h3>{priceExcludingSubsidy}</h3>
             </div>
          </div>
           <div className="result-card">
             <div className="icon">{/* Subsidy Icon */}</div>
             <div className="text">
              <p>Subsidy</p>
              <h3>{subsidy}</h3>
             </div>
          </div>
        </div>

        <div className="button-section">
          <button className="start-solar-journey" onClick={onOpenQuoteModal}>Start Your Solar Journey</button>
        </div>
      </div>
    </div>
  );
};

export default SolarCalculator; 
import React, { useState } from 'react';
import './SolarCalculator.css';
import { API_BASE } from '../config';

interface SolarCalculatorProps {
  onOpenQuoteModal: () => void;
}

const SolarCalculator: React.FC<SolarCalculatorProps> = ({ onOpenQuoteModal }) => {
  const [activeInput, setActiveInput] = useState('systemSize'); // 'systemSize' or 'electricityBill'
  const [systemSizeKw, setSystemSizeKw] = useState('1');
  const [electricityBill, setElectricityBill] = useState('2500'); // State for electricity bill
  const [solarType, setSolarType] = useState('Home');
  const [calcResult, setCalcResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Show 0 until Calculate is clicked or if input is empty/zero
  const isInputEmptyOrZero = !systemSizeKw || Number(systemSizeKw) === 0;
  const showZero = !calcResult || isInputEmptyOrZero;
  const systemSize = showZero ? '0 kW' : `${calcResult.system_size} kW`;
  const spaceRequired = showZero ? '0 sqft' : `${calcResult.space_required} sqft`;
  const annualEnergyGenerated = showZero ? '0 Units' : `${calcResult.units} Units`;
  const annualSavings = showZero ? '₹ 0' : `₹ ${calcResult.savings}`;
  const priceExcludingSubsidy = showZero ? '₹ 0' : `₹ ${calcResult.price}`;
  const subsidy = showZero ? '₹ 0' : `₹ ${calcResult.subsidy}`;

  const handleSystemSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSystemSizeKw(event.target.value);
    setCalcResult(null);
  };

  const handleElectricityBillChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setElectricityBill(event.target.value);
    setCalcResult(null);
  };

  const handleSolarTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSolarType(event.target.value);
    setCalcResult(null);
  };

  const toggleInput = (input: 'systemSize' | 'electricityBill') => {
    setActiveInput(input);
    setCalcResult(null);
  };

  const handleCalculate = async () => {
    setLoading(true);
    setError(null);
    setCalcResult(null);
    try {
      // For now, only system size is used for calculation
      const response = await fetch(`${API_BASE}/calculator`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          solar_type: solarType,
          units_in_kw: systemSizeKw,
        }),
      });
      const data = await response.json();
      if (data.success) {
        setCalcResult(data);
      } else {
        setError(data.message || 'Calculation failed.');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Trigger calculate on Enter key
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleCalculate();
    }
  };

  return (
    <div className="solar-calculator-section">
      <div className="calculator-container">
        <div className="input-section">
          <h2>Calculate Your Savings</h2>
          <p>Explore the Potential of Solar Energy and Start Saving From Day 1!</p>
          <div className="input-group">
            <label htmlFor="solar-need">Do You Need Solar For</label>
            <select id="solar-need" value={solarType} onChange={handleSolarTypeChange}>
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
                min="1"
                step="0.1"
                onKeyDown={handleKeyDown}
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
                onKeyDown={handleKeyDown}
              />
            </div>
          )}
          <div className="button-section">
            <button className="calculate-btn" onClick={handleCalculate} disabled={loading}>
              {loading ? 'Calculating...' : 'Calculate'}
            </button>
          </div>
          {error && <div style={{ color: 'red', marginTop: '1rem' }}>{error}</div>}
        </div>
        <div>
          <div className="result-card">
            <div className="text">
              <p>System Size</p>
              <h3>{systemSize}</h3>
            </div>
          </div>
          <div className="result-card">
             <div className="text">
              <p>Space Required</p>
              <h3>{spaceRequired}</h3>
             </div>
          </div>
          <div className="result-card">
             <div className="text">
              <p>Annual Energy Generated</p>
              <h3>{annualEnergyGenerated}</h3>
             </div>
          </div>
          <div className="result-card">
             <div className="text">
              <p>Annual Savings</p>
              <h3>{annualSavings}</h3>
             </div>
          </div>
          <div className="result-card">
             <div className="text">
              <p>Price (Excluding Subsidy)</p>
              <h3>{priceExcludingSubsidy}</h3>
             </div>
          </div>
          {solarType === 'Home' && (
            <div className="result-card">
              <div className="text">
                <p>Subsidy</p>
                <h3>{subsidy}</h3>
              </div>
            </div>
          )}
        </div>
        <div className="button-section">
          <button className="start-solar-journey" onClick={onOpenQuoteModal}>Start Your Solar Journey</button>
        </div>
      </div>
    </div>
  );
};

export default SolarCalculator; 
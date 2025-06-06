import React, { useState } from 'react';
import './SolarCalculator.css';

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

  // Placeholder values based on the image for 1 kW System Size and 2500 Electricity Bill
  const systemSize = calcResult ? `${calcResult.system_size} kW` : (activeInput === 'systemSize' ? '1 kW' : '3 kW');
  const spaceRequired = calcResult ? `${calcResult.space_required} sqft` : (activeInput === 'systemSize' ? '80 sqft' : '238 sqft');
  const annualEnergyGenerated = calcResult ? `${calcResult.units} Units` : (activeInput === 'systemSize' ? '1,440 Units' : '4,286 Units');
  const annualSavings = calcResult ? `₹ ${calcResult.savings}` : (activeInput === 'systemSize' ? '₹ 10,080' : '₹ 30,000');
  const priceExcludingSubsidy = calcResult ? `₹ ${calcResult.price}` : (activeInput === 'systemSize' ? '₹ 98,769' : '₹ 1,99,138');
  const subsidy = calcResult ? `₹ ${calcResult.subsidy}` : (activeInput === 'systemSize' ? '₹ 30,000' : '₹ 78,000');

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
      const response = await fetch('http://localhost:5000/calculator', {
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
          <div className="button-section">
            <button className="calculate-btn" onClick={handleCalculate} disabled={loading}>
              {loading ? 'Calculating...' : 'Calculate'}
            </button>
          </div>
          {error && <div style={{ color: 'red', marginTop: '1rem' }}>{error}</div>}
        </div>
        <div>
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
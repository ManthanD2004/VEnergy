import React, { useState } from 'react';
import './QuoteModal.css';
import { API_BASE } from '../config';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  state: string;
  solarType: string;
  electricityBill: string;
  financeInterest: string;
  city: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  email_sent?: boolean;
  inquiry_id?: number;
}

const QuoteModal: React.FC<QuoteModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    state: '',
    solarType: '',
    electricityBill: '',
    financeInterest: '',
    city: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string>('');
  const [submitSuccess, setSubmitSuccess] = useState<boolean | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear previous submit messages when user starts typing
    if (submitMessage) {
      setSubmitMessage('');
      setSubmitSuccess(null);
    }
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      state: '',
      solarType: '',
      electricityBill: '',
      financeInterest: '',
      city: '',
    });
    setSubmitMessage('');
    setSubmitSuccess(null);
  };

  const submitToBackend = async (data: FormData): Promise<ApiResponse> => {
    const response = await fetch(`${API_BASE}/api/submit-inquiry`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.fullName || !formData.email || !formData.phone || !formData.state ||
        !formData.city || !formData.solarType || !formData.electricityBill || !formData.financeInterest) {
      setSubmitMessage('Please fill in all required fields.');
      setSubmitSuccess(false);
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const result = await submitToBackend(formData);

      if (result.success) {
        setSubmitMessage(result.message);
        setSubmitSuccess(true);
        resetForm();

        // Close modal after 2 seconds
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        setSubmitMessage(result.message || 'Submission failed. Please try again.');
        setSubmitSuccess(false);
      }
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitMessage(
        error instanceof Error
          ? error.message
          : 'Network error. Please check your connection and try again.'
      );
      setSubmitSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  const madhyaPradeshDistricts = [
    "Agar Malwa", "Alirajpur", "Anuppur", "Ashoknagar", "Balaghat", "Barwani", "Betul", "Bhind", "Bhopal", "Burhanpur",
    "Chhatarpur", "Chhindwara", "Damoh", "Datia", "Dewas", "Dhar", "Dindori", "Guna", "Gwalior", "Harda", "Indore",
    "Jabalpur", "Jhabua", "Katni", "Khandwa", "Khargone", "Maihar", "Mandla", "Mandsaur", "Mauganj", "Morena", "Narmadapuram",
    "Narsinghpur", "Neemuch", "Niwari", "Pandhurna", "Panna", "Raisen", "Rajgarh", "Ratlam", "Rewa", "Sagar", "Satna",
    "Sehore", "Seoni", "Shahdol", "Shajapur", "Sheopur", "Shivpuri", "Sidhi", "Singrauli", "Tikamgarh", "Ujjain", "Umaria", "Vidisha"
  ];

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Connect With Us To Go Solar</h2>
          <button className="close-button" onClick={handleClose}>&times;</button>
        </div>

        {/* Submit Message Display */}
        {submitMessage && (
          <div className={`submit-message ${submitSuccess ? 'success' : 'error'}`}>
            {submitMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="modal-form-columns">
            <div className="left-column">
              <div className="form-group">
                <label htmlFor="fullName">Full Name *</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  required
                />
              </div>
              {/* Container for City and State */}
              <div className="city-state-container">
                {(formData.state === 'Madhya Pradesh' || formData.state === 'Maharashtra') && (
                  <div className="form-group">
                    <label htmlFor="city">City *</label>
                    <select
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      required
                    >
                      <option value="">Select your City</option>
                      {formData.state === 'Madhya Pradesh' && (
                        madhyaPradeshDistricts.map(district => (
                          <option key={district} value={district}>{district}</option>
                        ))
                      )}
                      {formData.state === 'Maharashtra' && (
                        <>
                          <option value="Pune">Pune</option>
                          <option value="Nagpur">Nagpur</option>
                        </>
                      )}
                    </select>
                  </div>
                )}
                <div className="form-group">
                  <label htmlFor="state">State *</label>
                  <select
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    required
                  >
                    <option value="">Select your State</option>
                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                    <option value="Maharashtra">Maharashtra</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="right-column">
              <div className="form-group">
                <label htmlFor="solarType">Solar For Home/Commercial? *</label>
                <select
                  id="solarType"
                  name="solarType"
                  value={formData.solarType}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  required
                >
                  <option value="">Select</option>
                  <option value="home">Residential</option>
                  <option value="commercial">Commercial</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="electricityBill">Select Monthly Average Electricity Bill *</label>
                <select
                  id="electricityBill"
                  name="electricityBill"
                  value={formData.electricityBill}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  required
                >
                  <option value="">Select</option>
                  <option value="<1000">Less Than ₹1,000</option>
                  <option value="1000-2000">₹1,000 - ₹2,000</option>
                  <option value="2000-5000">₹2,000 - ₹5,000</option>
                  <option value=">5000">More Than ₹5,000</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="financeInterest">Interested in Finance? *</label>
                <select
                  id="financeInterest"
                  name="financeInterest"
                  value={formData.financeInterest}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  required
                >
                  <option value="">Select</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default QuoteModal;
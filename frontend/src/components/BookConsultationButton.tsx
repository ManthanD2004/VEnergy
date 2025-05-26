import React, { forwardRef, Ref, ForwardRefRenderFunction } from 'react';
import './BookConsultationButton.css';

interface BookConsultationButtonProps {
  onMouseEnter: () => void;
  onMouseLeave?: () => void;
}

const BookConsultationButton: ForwardRefRenderFunction<HTMLButtonElement, BookConsultationButtonProps> = ({ onMouseEnter, onMouseLeave }, ref) => {
  return (
    <button
      ref={ref}
      className="book-consultation-button"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      Book Free Consultation
    </button>
  );
};

export default forwardRef(BookConsultationButton); 
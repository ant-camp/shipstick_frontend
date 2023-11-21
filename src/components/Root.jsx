import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import CalculatorModal from './CalculatorModal';
import '../stylesheets/Root.css';

const Root = () => {
  const [modalShow, setModalShow] = useState(false);
  const [results, setResults] = useState('');

  const handleModalClose = (modalResults) => {
    setModalShow(false);
    setResults(modalResults);
  };

  return (
    <>
      <div className='root'>
        <div className='center-container'>
          <Button className="launch-button" variant="success" onClick={() => setModalShow(true)}>
            Launch Calculator
          </Button>

          <div className='result-container'>
            {results && <div className="results-display">{results}</div>}
          </div>
        </div>
      </div>

      <CalculatorModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        onResults={handleModalClose} // Pass this function to handle results
      />
    </>
  );
}

export default Root;
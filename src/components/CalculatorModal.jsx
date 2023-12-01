import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../stylesheets/CalculatorModal.css';
import productService from '../services/ProductsService';

class CalculatorModal extends React.Component {
  constructor(props) {
    super(props);
    this.initialState = {
      currentStep: 1,
      length: '',
      width: '',
      height: '',
      weight: '',
      result: '',
      apiResult: ''
    };
    this.state = this.initialState;
  }
  // Timer reference
  closeTimer = null;

  componentWillUnmount() {
    // Clear the timer when the component unmounts
    if (this.closeTimer) {
      clearTimeout(this.closeTimer);
    }
  }

  // Method to move to the next input step
  nextStep = () => {
    this.setState(prevState => ({
      currentStep: prevState.currentStep + 1
    }));
  };

  // Append number to the current field
  appendNumber = (number) => {
    const fields = ['length', 'width', 'height', 'weight'];
    const currentField = fields[this.state.currentStep - 1];
    this.setState(prevState => ({
      [currentField]: prevState[currentField] + number
    }));
  };

  // Clear the current field
  clearInput = () => {
    const fields = ['length', 'width', 'height', 'weight'];
    const currentField = fields[this.state.currentStep - 1];
    this.setState({ [currentField]: '' });
  };

  // Method to reset the calculator
  resetCalculator = () => {
    this.setState(this.initialState);
  };

  handleSubmit = async () => {
    const { length, width, height, weight, currentStep } = this.state;
  
    if (currentStep < 4) {
      this.nextStep();
    } else {
      try {
        const result = `Length: ${length}, Width: ${width}, Height: ${height}, Weight: ${weight}`;
        this.setState({ result });
  
        // Call the API
        const response = await productService.getProduct(length, width, height, weight);
  
        // Check the response
        let apiResult;
        if (response.error) {
          apiResult = response.error; 
        } else {
          apiResult = `Suggested Size Luggage: ${response.name}`;
        }
  
        this.setState({ apiResult });
  
        // Close the modal after 5 seconds
        this.closeTimer = setTimeout(() => {
          if (this.props.onResults) {
            this.props.onResults(apiResult);
          }
          this.props.onHide();
        }, 5000);
  
      } catch (error) {
        console.error('Error fetching product:', error);
        this.setState({ apiResult: 'Error fetching product' });
      }
    }
  }
  

  render() {
    const { onHide } = this.props;
    const { length, width, height, weight, result, currentStep, apiResult } = this.state;
    const currentFieldNames = ['Length', 'Width', 'Height', 'Weight'];

    const CalculatorNumbers = () => {
      const numbers = [
        "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"
      ];
    
      return (
        <>
          {numbers.map(number => (
            <button key={number} className={`btn btn-secondary letter-${number}`} onClick={() => this.appendNumber(number)}>
              {number}
            </button>
          ))}
        </>
      );
    };

    const Display = () => {
      return <div className="display">
               <div>Enter {currentFieldNames[currentStep - 1]}: {this.state[currentFieldNames[currentStep - 1].toLowerCase()]} </div>
            </div>;
    };

    const ClearButton = () => {
      return <button className="btn btn-primary letter-clear" onClick={this.clearInput}>clear</button>
    };

    const ResetButton = () => {
      return <button className="btn btn-danger letter-reset" onClick={this.resetCalculator}>reset</button>
    };

    const SubmitButton = () => {
      return <button className="btn btn-success letter-submit" onClick={this.handleSubmit}>
               {currentStep < 4 ? 'Next' : 'Calculate'}
              </button>
    };

    const CloseButton = () => {
      return  <button className="btn btn-success" onClick={onHide}>Close</button>
    }
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <div>
            <div className="calculator">
              <Display />
              <div class="calculatorButtons">
                <CalculatorNumbers />
                <ClearButton />
                <ResetButton />
                <SubmitButton />
              </div>
            </div>
          </div>

          {result && (
            <div>
              <h4>Results</h4>
              <p>{result}</p>
            </div>
          )}

          {apiResult && (
            <div>
              <h4>{apiResult}</h4>
            </div>
          )}

          <div>
            <CloseButton />
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}

export default CalculatorModal;
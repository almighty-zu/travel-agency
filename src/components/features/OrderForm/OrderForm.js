import React from 'react';
import PropTypes from 'prop-types';
import {Col, Row} from 'react-flexbox-grid';
import OrderSummary from '../OrderSummary/OrderSummary.js';
import pricing from '../../../data/pricing.json';
import OrderOption from '../OrderOption/OrderOption.js';

const OrderForm = ({tripCost, options}) => (
  <Row>
    <div>
      {pricing.map(option => (
        <Col key={option.id} md={4}>
          <OrderOption />
        </Col>
      ))}
    </div>
    <Col xs={12}>
      <OrderSummary tripCost={tripCost} options={options}/>
    </Col>
  </Row>
);

OrderForm.propTypes = {
  tripCost: PropTypes.string,
  options: PropTypes.object,
  pricing: PropTypes.array,
};

export default OrderForm;

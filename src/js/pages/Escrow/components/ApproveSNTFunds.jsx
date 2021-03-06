/* global web3 */
import React from 'react';
import {Row, Col, Button} from "reactstrap";
import PropTypes from 'prop-types';

const ApproveSNTFunds = ({requiredSNT, sntAllowance, shouldResetSNT, handleApprove, handleReset}) => <div>
  <Row>
    <Col>
      <h4>{shouldResetSNT ? 'Reset SNT token Allowance' : 'Approve SNT token'}</h4>
      {!shouldResetSNT && <p>You authorize the contract to transfer {web3.utils.fromWei(requiredSNT, "ether")} SNT on your behalf. This can only occur when you approve a transation to authorize the transfer</p>}
      {shouldResetSNT && <p>Your SNT allowance for this contract ({web3.utils.fromWei(sntAllowance, "ether")} SNT) is less than the required ({web3.utils.fromWei(requiredSNT, "ether")} SNT). Reset your SNT allowance before approving the required amount</p>}
    </Col>
  </Row>
  <Row className="mt-4">
  <Col xs={3} />
  <Col xs={6}>
    {shouldResetSNT && <Button color="primary" block onClick={handleReset}>Reset allowance</Button>}
    {!shouldResetSNT && <Button color="primary" block onClick={handleApprove}>Approve</Button>}

  </Col>
  <Col xs={3} />
  </Row>
</div>;

ApproveSNTFunds.propTypes = {
  requiredSNT: PropTypes.string,
  sntAllowance: PropTypes.string,
  shouldResetSNT: PropTypes.bool,
  handleApprove: PropTypes.func,
  handleReset: PropTypes.func
};

export default ApproveSNTFunds;

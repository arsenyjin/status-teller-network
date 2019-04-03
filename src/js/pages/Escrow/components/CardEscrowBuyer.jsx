/* eslint-disable no-alert */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, Button } from 'reactstrap';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleNotch, faCheck} from "@fortawesome/free-solid-svg-icons";

import Reputation from '../../../components/Reputation';
import RoundedIcon from "../../../ui/RoundedIcon";

import { States } from '../../../utils/transaction';
import escrow from '../../../features/escrow';

import one from "../../../../images/escrow/01.png";
import two from "../../../../images/escrow/02.png";
import three from "../../../../images/escrow/03.png";
import four from "../../../../images/escrow/04.png";
import five from "../../../../images/escrow/05.png";

const Done = () => (
  <React.Fragment>
    <RoundedIcon icon={faCheck} bgColor="green"/>
    <h2 className="mt-4">Done.</h2>
    <h2 className="mt-4">Rate your trading experience with this user.</h2>
    <Reputation reputation={{upCount: 1, downCount: 1}} size="l"/>
  </React.Fragment>
);

const Unreleased = () => (
  <React.Fragment>
    <span className="bg-dark text-white p-3 rounded-circle">
      <img src={four} alt="four" />
    </span>
    <p className="h2 mt-4">Waiting for the seller to release the funds</p>
    <p>Notify the seller about the trade using Status encrypted p2p chat</p>
    <Button color="primary" className="btn-lg mt-3" onClick={() => {}}>Open chat</Button>
  </React.Fragment>
);


const Loading = () => (
  <React.Fragment>
    <span className="bg-dark text-white p-3 rounded-circle">
      <img src={three} alt="three" />
    </span>
    <h2 className="mt-4">Waiting for the confirmations from the miners</h2>
    <FontAwesomeIcon icon={faCircleNotch} size="5x" spin/>
  </React.Fragment>
);

const Funded = ({payAction}) => (
  <React.Fragment>
    <span className="bg-dark text-white p-3 rounded-circle">
      <img src={two} alt="two" />
    </span>
    <h2 className="mt-4">Funds are in the escrow. Send payment to seller.</h2>
    <Button color="primary" className="btn-lg mt-3" onClick={() => { if(confirm("Are you sure you want this trade marked as paid?")) payAction(); }}>Mark as paid</Button>
  </React.Fragment>
);

Funded.propTypes = {
  payAction: PropTypes.func
};

const PreFund = () => (
  <React.Fragment>
    <span className="bg-dark text-white p-3 rounded-circle">
      <img src={one} alt="one" />
    </span>
    <p className="h2 mt-4">Waiting for the seller to fund an escrow</p>
    <p>Notify the seller about the trade using Status encrypted p2p chat</p>
    <Button color="primary" className="btn-lg mt-3" onClick={() => {}}>Open chat</Button>
  </React.Fragment>
);

class CardEscrowBuyer extends Component {
  render(){ 
    const {trade, payStatus, payAction} = this.props;

    const showLoading = payStatus === States.pending;
    const showWaiting = payStatus === States.success || trade.status === escrow.helpers.tradeStates.released;

    return <Card>
      <CardBody className="text-center p-5">
        {!showLoading && trade.status === escrow.helpers.tradeStates.waiting && <PreFund /> } 
        {!showLoading && trade.status === escrow.helpers.tradeStates.funded && !showWaiting && <Funded payAction={() => { payAction(trade.escrowId); }}  /> } 
        {!showLoading && ((showWaiting && trade.status !== escrow.helpers.tradeStates.released) || trade.status === escrow.helpers.tradeStates.paid) && <Unreleased /> } 
        {!showLoading && trade.status === escrow.helpers.tradeStates.released && <Done /> } 
        {showLoading && <Loading /> }
      </CardBody>
    </Card>;
  }
}

CardEscrowBuyer.propTypes = {
  trade: PropTypes.object,
  payStatus: PropTypes.string,
  payAction: PropTypes.func
};

export default CardEscrowBuyer;
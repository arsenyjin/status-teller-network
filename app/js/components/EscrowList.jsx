/*global web3*/
import React, {Fragment} from 'react';
import {Card, CardBody, CardHeader, CardTitle, Table, Button, Alert} from 'reactstrap';
import PropTypes from 'prop-types';
import {getEscrowState, escrowStates} from "../features/escrow/helpers";
import {DIALOG_PAY_SIGNATURE, DIALOG_OPEN_CASE_SIGNATURE} from "../features/escrow/constants";
import Rating from "./Rating";
import { withNamespaces } from 'react-i18next';
import SignatureDialog from "./SignatureDialog";

function getEscrowStateText(escrow, t) {
  switch (getEscrowState(escrow)) {
    case escrowStates.released:
      return <p className="text-success">{t('escrowList.state.released')}</p>;
    case escrowStates.paid:
      return <p className="text-primary">Paid</p>;
    case escrowStates.canceled:
      return <p className="text-warning">{t('escrowList.state.canceled')}</p>;
    case escrowStates.expired:
      return <p className="text-danger">{t('escrowList.state.expired')}</p>;
    case escrowStates.arbitration_open:
      return <p className="text-danger">In arbitration</p>;
    case escrowStates.arbitration_closed:
      return <p className="text-warning">Arbitration completed</p>;
    case escrowStates.waiting:
    default:
      return <p className="text-primary">{t('escrowList.state.waiting')}</p>;
  }
}

const EscrowList = (props) => <Fragment> 
  <SignatureDialog open={!!props.signatureDialog.signedMessage}
                   onClose={props.closeDialog}
                   message={{
                    escrowId: props.signatureDialog.escrowId,
                    message: props.signatureDialog.signedMessage
                    }}>
    {props.signatureDialog.dialogType === DIALOG_PAY_SIGNATURE && "Mark escrow as paid"}
    {props.signatureDialog.dialogType === DIALOG_OPEN_CASE_SIGNATURE && "Open arbitration case"}

  </SignatureDialog>
  <Card className="mt-2">
    <CardHeader>
      <CardTitle>{props.t('escrowList.title')}</CardTitle>
    </CardHeader>
    <CardBody>
      {props.loading && <p>{props.t('escrowList.loading')}</p>}
      {props.error &&
      <Alert color="danger">{props.t('escrowList.error')} {props.error}</Alert>}
      {(!props.escrows || props.escrows.length === 0) && !props.loading && <p>{props.t('escrowList.empty')}</p>}
      {props.escrows && props.escrows.length > 0 && <Table>
        <thead>
        <tr>
          <th>#</th>
          <th>{props.t('escrowList.head.state')}</th>
          <th>{props.escrows[0].buyer === web3.eth.defaultAccount ? props.t('escrowList.head.seller') : props.t('escrowList.head.buyer')}</th>
          <th>{props.t('escrowList.head.value')}</th>
          <th>{props.t('escrowList.head.expiration')}</th>
          <th>{props.t('escrowList.head.actions')}</th>
        </tr>
        </thead>
        <tbody>
        {props.escrows.map(escrow =>
          <tr key={escrow.escrowId}>
            <th scope="row">{escrow.escrowId}</th>
            <td>{getEscrowStateText(escrow, props.t)}</td>
            <td>{escrow.buyer === web3.eth.defaultAccount ? escrow.seller : escrow.buyer}</td>
            <td>{escrow.amount}</td>
            <td>{new Date(escrow.expirationTime * 1000).toString()}</td>
            <td>
              {getEscrowState(escrow) === escrowStates.waiting && escrow.seller === web3.eth.defaultAccount &&
              <Button color="success" size="sm" className="mb-1" block
                      onClick={() => props.releaseEscrow(escrow.escrowId)}>
                {props.t('escrowList.actions.release')}
              </Button>}

              {getEscrowState(escrow) === escrowStates.expired && escrow.seller === web3.eth.defaultAccount &&
              <Button color="warning" size="sm" block
                      onClick={() => props.cancelEscrow(escrow.escrowId)}>{props.t('escrowList.actions.cancel')}</Button>}
              {getEscrowState(escrow) === escrowStates.released && !escrow.arbitration && escrow.buyer === web3.eth.defaultAccount &&
              <Rating rating={parseInt(escrow.rating, 10)} rateTransaction={props.rateTransaction}
                        escrowId={escrow.escrowId}/>}
              {getEscrowState(escrow) === escrowStates.waiting && escrow.buyer === web3.eth.defaultAccount  && <Fragment>
                <Button color="warning" size="sm" block onClick={() => props.payEscrow(escrow.escrowId)}>Mark as paid</Button>
                <Button color="warning" size="sm" block onClick={() => props.payEscrowSignature(escrow.escrowId)}>Sign as paid (for relayers)</Button>
              </Fragment>}
              {getEscrowState(escrow) === escrowStates.paid && <Fragment>
                <Button color="warning" size="sm" block onClick={() => props.openCase(escrow.escrowId)}>Open case</Button>
                <Button color="warning" size="sm" block onClick={() => props.openCaseSignature(escrow.escrowId)}>Open a case signature (for relayers)</Button>
              </Fragment>
              }
              
            </td>
          </tr>)}
        </tbody>
      </Table>}
    </CardBody>
  </Card>
  </Fragment>;

EscrowList.propTypes = {
  t: PropTypes.func,
  escrows: PropTypes.array,
  signatureDialog: PropTypes.object,
  releaseEscrow: PropTypes.func,
  payEscrow: PropTypes.func,
  payEscrowSignature: PropTypes.func,
  openCase: PropTypes.func,
  openCaseSignature: PropTypes.func,
  cancelEscrow: PropTypes.func,
  closeDialog: PropTypes.func,
  rateTransaction: PropTypes.func,
  loading: PropTypes.bool,
  error: PropTypes.string
};

export default withNamespaces()(EscrowList);

import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import MuiRadio from '@material-ui/core/Radio';
import MuiRadioGroup from '@material-ui/core/RadioGroup';
import MuiFormControlLabel from '@material-ui/core/FormControlLabel';

export const Radio = withStyles(theme => ({
  root: {
    color: '#235789'
  }
}))(MuiRadio);

export const RadioGroup = withStyles(theme => ({
  root: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30
  }
}))(MuiRadioGroup);

export const FormControlLabel = withStyles(theme => ({
  root: {
    textAlign: 'center'
  }
}))(MuiFormControlLabel);

export const Container = styled.div`
  width: 100%;
`;

export const Warning = styled.div`
  visibility ${props => (props.active ? 'visible' : 'hidden')};
  display: flex;
  align-items: center;
  border: 1px solid #eac435;
  border-radius: 4px;
  padding: 10px;
  color: #cca20c;

  > div {
    margin: 0 10px;
    line-height: 1.3
  }

  span {
    font-weight: bold
  }
`;

export const TimeToDestination = styled.div`
  text-align: right;
  margin: 10px 0;
`;

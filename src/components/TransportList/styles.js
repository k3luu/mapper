import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import MuiRadio from '@material-ui/core/Radio';
import MuiRadioGroup from '@material-ui/core/RadioGroup';
import MuiFormControlLabel from '@material-ui/core/FormControlLabel';

export const Radio = withStyles(theme => ({
  root: {
    color: '#235789'
  },
  checked: {
    color: '#235789'
  },
  colorPrimary: {
    color: '#235789',
    '&$checked': {
      color: '#235789'
    }
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
  opacity: ${props => (props.active ? 1 : 0)};
  height: ${props => (props.active ? '80px' : 0)};
  display: flex;
  align-items: center;
  border: 1px solid #eac435;
  border-radius: 4px;
  padding: 10px;
  color: #cca20c;
  margin: 20px 0;
  transition: 0.07s;

  > div {
    margin: 0 10px;
    line-height: 1.3;
  }

  span {
    font-weight: bold;
  }
`;

export const TimeToDestination = styled.div`
  text-align: right;
  margin: 10px 0;
`;

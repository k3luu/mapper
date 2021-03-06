import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiCheckbox from '@material-ui/core/Checkbox';
import MuiFormControlLabel from '@material-ui/core/FormControlLabel';

export const ExpansionPanel = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    padding: 0,
    boxShadow: 'none',
    width: '100%',
    '&:not(:last-child)': {
      borderBottom: 0
    },
    '&:before': {
      display: 'none'
    },
    '&$expanded': {
      margin: 0
    }
  },
  expanded: {}
})(MuiExpansionPanel);

export const ExpansionPanelSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    margin: 0,
    padding: 0,
    '&$expanded': {
      minHeight: 56
    }
  },
  content: {
    margin: 0,
    minHeight: 50,
    width: '100%',
    '&$expanded': {
      margin: 0,
      minHeight: 60
    }
  },
  expandIcon: {
    position: 'absolute',
    right: 10,
    zIndex: 0
  },
  expanded: {}
})(MuiExpansionPanelSummary);

export const FormControlLabel = withStyles(theme => ({
  root: {
    width: '100%',
    margin: 0,
    zIndex: 1
  }
}))(MuiFormControlLabel);

export const Checkbox = withStyles(theme => ({
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
}))(MuiCheckbox);

export const Container = styled.div`
  width: 100%;
`;

export const MainLabel = styled.div``;

export const Sublabel = styled.div`
  font-size: 12px;
  font-style: italic;
`;

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import moment from 'moment';

import 'date-fns';
import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import NativeSelect from '@material-ui/core/NativeSelect';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider,
         KeyboardDatePicker} from '@material-ui/pickers';
import { ExpansionPanel,
          ExpansionPanelDetails,
          ExpansionPanelSummary
  } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';


import { cashDataFnOChartAction,
      combinedStkFnODataChartAction } from '../../actions/ChartActions';

const useStyles = makeStyles(theme => ({
  treeRoot: {
    height: 216,
  },
  selectRoot: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  button: {
    margin: theme.spacing(1),
  },
  panel: {
    background: "#b0bec5"
  },
}));

const StkFnOMenu = (props) => {
  //console.log('FnoMenu: props : ', props);
  const dispatch = useDispatch();

  const classes = useStyles();

  const [symbol, setSymbol] = useState('');
  const [optExpDate, setOptExpDate] = useState('');
  const [strikePrice, setStrikePrice] = useState('');
  const [futExpDate, setFutExpDate] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());

  const getData = () => {
    /*
    console.log('symbol : ', symbol);
    console.log('optExpDate : ', optExpDate);
    console.log('strikePrice : ', strikePrice);
    console.log('futExpDate : ', futExpDate);
    console.log('selectedDate : ', selectedDate); */

    dispatch(cashDataFnOChartAction(symbol));
    dispatch(combinedStkFnODataChartAction(symbol, optExpDate, strikePrice, futExpDate, selectedDate));

    /*
    dispatch(stkCashFutCallOptChartAction(symbol, optExpDate, strikePrice, futExpDate, selectedDate));
    dispatch(stkCashFutPutOptChartAction(symbol, optExpDate, strikePrice, futExpDate, selectedDate));
    dispatch(stkCallOptOIvsDeltaOIChartAction(symbol, optExpDate, strikePrice, futExpDate, selectedDate));
    dispatch(stkPutOptOIvsDeltaOIChartAction(symbol, optExpDate, strikePrice, futExpDate, selectedDate));
    */
  }
  
  if (props.fnoStockSymbolList.length) {    

    return (
        <ExpansionPanel className={classes.panel}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            id="panel1a-header"
          >
          <Typography variant='body2'>Stock FnO Analysis</Typography>
          </ExpansionPanelSummary>

            <ExpansionPanelDetails>
              <FormControl className={classes.formControl}>
              <InputLabel shrink htmlFor="age-native-simple">Symbol</InputLabel>
                <NativeSelect
                  style={{fontSize: 12}}
                  value={symbol}
                  input={<Input name="Symbol" id="Symbol-native-helper" />}
                  onChange={(e) => setSymbol(e.target.value)}
                >
                  {props.fnoStockSymbolList.map((symbol, i) => <option style={{fontSize: 12}} key={i} value={symbol}>{symbol}</option>)}
                </NativeSelect>
              </FormControl>
            </ExpansionPanelDetails>
          
            <ExpansionPanelDetails>
              <FormControl className={classes.formControl}>
              <InputLabel shrink htmlFor="age-native-simple">Option Expiry</InputLabel>
                <NativeSelect
                    style={{fontSize: 12}}
                    value={optExpDate} 
                    input={<Input name="OptExpiryDate" id="OptExpiryDate-native-helper" />} 
                    onChange={(e) => setOptExpDate(e.target.value)}
                >
                    { symbol === '' ? <option  value={'empty'}></option> :
                      Object.keys(props.stockOptionInfo[symbol]).map((expDate, i) => <option style={{fontSize: 12}} key={i} value={expDate}>{expDate}</option>)}
                </NativeSelect>
              </FormControl>
            </ExpansionPanelDetails>

            <ExpansionPanelDetails>
              <FormControl className={classes.formControl}>
              <InputLabel shrink htmlFor="age-native-simple">Strike Price</InputLabel>
                <NativeSelect
                    style={{fontSize: 12}} 
                    value={strikePrice} 
                    input={<Input name="StrikePrice" id="StrikePrice-native-helper" />}
                    onChange={(e) => setStrikePrice(e.target.value)}
                >
                    { optExpDate === '' ? <option  value={'empty'}></option> :
                      (props.stockOptionInfo[symbol][optExpDate]).map((expDate, i) => <option style={{fontSize: 12}} key={i} value={expDate}>{expDate}</option>)}
                </NativeSelect>
              </FormControl>
            </ExpansionPanelDetails>

            <ExpansionPanelDetails>
              <FormControl className={classes.formControl}>
                <InputLabel shrink htmlFor="age-native-simple">Future Expiry</InputLabel>
                  <NativeSelect
                      style={{fontSize: 12}}
                      value={futExpDate}
                      input={<Input name="FutExpiryDate" id="FutExpiryDate-native-helper" />}
                      onChange={(e) => setFutExpDate(e.target.value)}
                  >
                      { symbol === '' ? <option  value={'empty'}></option> :
                        (props.stockFutureInfo[symbol]).map((expDate, i) => <option style={{fontSize: 12}} key={i} value={expDate}>{expDate}</option>)}
                  </NativeSelect>
              </FormControl>
            </ExpansionPanelDetails>

            <ExpansionPanelDetails>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <FormControl className={classes.formControl}>
                <InputLabel shrink htmlFor="age-native-simple">Date</InputLabel>
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="dd-MMM-yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    value={selectedDate}
                    onChange={(date) => setSelectedDate(moment(date).format('DD-MMM-YYYY'))}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </FormControl>
                </MuiPickersUtilsProvider>
            </ExpansionPanelDetails>

            <ExpansionPanelDetails>
              <FormControl className={classes.formControl}>
                <Button variant="contained" color="primary" className={classes.button} onClick={() => getData()}>
                  Get data
                </Button>
              </FormControl>
            </ExpansionPanelDetails>

        </ExpansionPanel>
    );
  }
  else {
    return (
      <div>
      Not yet ready
      </div>
    )
  }
  
}

export default StkFnOMenu;
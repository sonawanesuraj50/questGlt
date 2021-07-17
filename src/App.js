import React from 'react';
import './App.css';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import * as dayjs from 'dayjs';
import {
  Table,
  Button,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Select,
  MenuItem,
  Grid,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
} from '@material-ui/core';
import tableData from './tableData.json';


const useStyles = makeStyles({
  gridContainer: {
    padding: 40,
  },
  table: {
    minWidth: 650,
  },
  searchInput: {
    justifyContent: 'center',
    marginBottom: 20,
  },
  buttonStyle: {
    marginLeft: 'auto',
    padding: 10,
  },
});

function App() {
  const classes = useStyles();
  const [search, setSearch] = useState("");
  const [openBookDialog, setOpenBookDialog] = React.useState(false);
  const [openPurcheseDialog, setOpenPurcheseDialog] = React.useState(false);
  const [openReturnDialog, setOpenReturnDialog] = React.useState(false);
  const [openReturnPurchese, setOpenReturnPurchese] = React.useState(false);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [value, setValue] = useState();
  const [milage, setMilage] = useState();


  const handleOpen = () => {
    setOpenBookDialog(true);
  };

  const handleOpenPurcheseDialog = () => {
    setOpenBookDialog(false);
    setOpenPurcheseDialog(true);
  };

  const handleOpenReturnDialog = () => {
    setOpenReturnDialog(true);
  };

  const openReturnPurcheseDialog = () => {
    setOpenReturnPurchese(true);
  };

  const handleClose = () => {
    setOpenPurcheseDialog(false);
    setOpenBookDialog(false);
    setOpenReturnDialog(false);
    setOpenReturnPurchese(false);
  };

  const handleValueChange = (event) => {
    setValue(event.target.value);
  };


  const date1 = dayjs(startDate)
  const date2 = dayjs(endDate)

  return (
    <Grid container direction="column" className={classes.gridContainer}>
      <Grid item className={classes.searchInput}>
        <TextField id="standard-basic" label="Search" onChange={(e) => { setSearch(e.target.value) }} />
      </Grid>
      <Grid item>
        <TableContainer component={Paper}>
          <Table className={classes.table} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Co</TableCell>
                <TableCell align="right">Rental Fees</TableCell>
                <TableCell align="right">Milage</TableCell>
                <TableCell align="right">Durability</TableCell>
                <TableCell align="right">Availability</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.filter(val => {
                if (search === "") {
                  return val;
                }
                else if (
                  val.name.toLowerCase().includes(search.toLowerCase()) ||
                  val.code.toLowerCase().includes(search.toLowerCase())
                ) {
                  return val;
                }
              }).map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.code}</TableCell>
                  <TableCell align="right">{row.price * row.minimum_rent_period}</TableCell>
                  <TableCell align="right">{row.mileage}</TableCell>
                  <TableCell align="right">
                    {row.type === "meter" ?
                      row.durability - row.minimum_rent_period - 2
                      :
                      row.durability - row.minimum_rent_period
                    }
                  </TableCell>
                  <TableCell align="right">{row.availability}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item className={classes.buttonStyle}>
        <Button variant="contained" color="primary" onClick={handleOpen} style={{ marginRight: 20 }}>
          Book
        </Button>
        <Button variant="contained" color="primary" onClick={handleOpenReturnDialog}>
          Return
        </Button>
      </Grid>

      {/* Book Dialog */}
      <Dialog
        open={openBookDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth='lg'
      >
        <DialogTitle id="alert-dialog-title">{"Book a product"}</DialogTitle>
        <DialogContent style={{ width: 500, height: 200, }}>
          <DialogContentText id="alert-dialog-description">
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={value}
              onChange={handleValueChange}
              style={{ width: 200 }}
            >
              {tableData.map((data) => <MenuItem value={data.price}>{data.name}</MenuItem>)}

            </Select>
            <Grid container spacing={5} style={{ marginTop: 10 }}>
              <Grid item>
                <TextField
                  id="date"
                  label="Start Date"
                  type="date"
                  defaultValue="2021-07-17"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </Grid>
              <Grid item>
                <TextField
                  id="date"
                  label="End Date"
                  type="date"
                  defaultValue="2021-07-17"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            No
          </Button>
          <Button onClick={handleOpenPurcheseDialog} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>


      {/* Purchese Dialog */}
      <Dialog
        open={openPurcheseDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth='lg'
      >
        <DialogTitle id="alert-dialog-title">{"Book a product"}</DialogTitle>
        <DialogContent style={{ width: 500, height: 200, }}>
          <DialogContentText id="alert-dialog-description">
            <Typography>Your Estimate price is {value * date2.diff(date1, 'day')}</Typography>
            <Typography>Do you want to procedure?</Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            No
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Return Dialog */}
      <Dialog
        open={openReturnDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth='lg'
      >
        <DialogTitle id="alert-dialog-title">{"Return a product"}</DialogTitle>
        <DialogContent style={{ width: 500, height: 200, }}>
          <DialogContentText id="alert-dialog-description">
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={value}
                onChange={handleValueChange}
                style={{ width: 200 }}
              >
                {tableData.map((data) => <MenuItem value={data.price}>{data.name}</MenuItem>)}

              </Select>
              <TextField id="standard-basic" label="Used Milage" type="number" onChange={(e) => setMilage(e.target.value)} />
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            No
          </Button>
          <Button onClick={openReturnPurcheseDialog} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Return Purchese Dialog */}
      <Dialog
        open={openReturnPurchese}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth='lg'
      >
        <DialogTitle id="alert-dialog-title">{"Return a product"}</DialogTitle>
        <DialogContent style={{ width: 500, height: 200, }}>
          <DialogContentText id="alert-dialog-description">
            <Typography>Your total price is {milage / 2}</Typography>
            <Typography>Do you want to procedure?</Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            No
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}

export default App;

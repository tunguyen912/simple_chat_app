import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import LoginIcon from "../../assets/login.svg";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import axios from 'axios'
import { useHistory } from 'react-router-dom'



export default function SignIn() {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()

  const useStyles = makeStyles(theme => ({
    paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    },
    avatar: {
      margin: theme.spacing(1)
    },
    form: {
      width: "100%",
      marginTop: theme.spacing(1)
    },
    submit: {
      margin: theme.spacing(3, 0, 2)
    }
  }));
  const handleSubmit = (event) => {
    axios
      .post('http://localhost:3001/login/admin', {username, password})
      .then(res => {
        if(res.status === 200){
          localStorage.setItem('token', res.data)
          history.push('/admin/EventHistory')
          console.log(localStorage.getItem('token'))
        }
      })
      .catch(err => console.log(err.message))
      event.preventDefault();
  }

  const classes = useStyles();
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <img src={LoginIcon} alt="icon"></img>
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in as Administrator
        </Typography>
        <form className={classes.form} method="POST" onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="off"
            autoFocus
            onChange = {e => setUsername(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="off"
            onChange = {e => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            // href="/admin/EventHistory"
          >
            Sign In as Administrator
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
            href="/"
          >
            Cancel
          </Button>
        </form>
      </div>
    </Container>
  );
}

import React,{ useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useLazyQuery  } from 'react-apollo'
import { setUserSession } from "./Utils/Common";
import { useHistory } from "react-router-dom";
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import {LOGIN_QUERY } from './Utils/queries';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const schema = yup.object().shape({
  email: yup.string().email().required()
});

export default function SignIn() {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [loginerror, setLoginerror] = useState('');
  const history = useHistory();
  const [openErr, setOpenErr] = React.useState(false);

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema)
  });

  const [ checkUser ] = useLazyQuery(LOGIN_QUERY,{
    onCompleted: (data) => {
        if(data && data.userByEmail === null){
            setLoginerror('Invalid credentials');
            setOpenErr(true);
        }else{
            setLoginerror('');
            setUserSession(
                data.userByEmail.id,
                data.userByEmail
              );
              setOpenErr(false);
              history.push("/currentorders");
        }
    }
  });

  const onSubmit = () => {
    checkUser({ variables: { email } });
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenErr(false);
  };

  const showError = () =>{
    if(loginerror){
      return(
        <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={openErr}
        onClose={handleClose}
        message={loginerror}
        action={
          <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
      )
    }else{
      return null;
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper} data-testid="form">
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        {showError()}
        <form className={classes.form} data-testid="signInForm" onSubmit={handleSubmit(onSubmit)}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={e => setEmail(e.target.value)}
            data-testid="email"  
            inputRef={register}
            error={errors.email}       
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            id="submit"
            data-testid="submit"
          >
            Sign In
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
import {
  AppBar,
  Toolbar,
  makeStyles,
  IconButton,
  List, ListItem, ListItemText, Container 
} from "@material-ui/core";
import React from "react";
import { Home } from "@material-ui/icons"
import { Link } from "react-router-dom";
import { removeUserSession, getUser } from "../Utils/Common";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useHistory } from "react-router-dom";

const navLinks = [
    {
      label: "Current Orders",
      path: "/currentorders",
    },
    {
      label: "New Orders",
      path: "/neworder",
    },
  ];
                     
  const useStyles = makeStyles({
    navDisplayFlex: {
      display: `flex`,
      justifyContent: `space-between`
    },
    linkText: {
      textDecoration: `none`,
      textTransform: `uppercase`,
      color: `white`
    },
    navbarDisplayFlex: {
        display: `flex`,
        justifyContent: `space-between`
      },
  });
                     
export default function Header() {
               
  const classes = useStyles();
  const user = getUser();
  const userName = user.name;
  const history = useHistory();

  const handleLogout = () => {
    removeUserSession();
    history.push("/");
  };

  return (
    <AppBar position="static">
    <Toolbar>
    <Container className={classes.navbarDisplayFlex}>
    <IconButton edge="start" color="inherit" aria-label="home">
        <Home fontSize="large" />
    </IconButton>
    <List
        component="nav"
        aria-labelledby="main navigation"
        className={classes.navDisplayFlex} 
        >
        {navLinks.map(({ label, path }) => (
            <Link to={path} key={label} className={classes.linkText} >
            <ListItem button>
                <ListItemText primary={label} />
            </ListItem>
            </Link>
        ))}
        </List>
      <p>Welcome, {userName}
      <IconButton color="secondary" aria-label="add an alarm" onClick={handleLogout}>
        <ExitToAppIcon />
      </IconButton>
      </p>

    </Container>
    </Toolbar>
    </AppBar>
  );
}
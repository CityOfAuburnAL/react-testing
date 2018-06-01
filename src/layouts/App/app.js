import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withRouter } from 'react-router';
import { NavLink, Switch, Route } from 'react-router-dom';
import config from '_config';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Drawer,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@material-ui/core';
import {
  Dashboard,
  Menu,
  Person,
} from '@material-ui/icons';
import TaskList from 'components/List/TaskList/TaskList';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    color: theme.palette.text.primary,
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.fontSize,
    flexGrow: 1,
    height: '100%',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  appBar: {
    position: 'absolute',
    marginLeft: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  appBarRoot: {
    backgroundColor: 'transparent',
    boxShadow: 'none',
  },
  appBarPrimary: {
    color: theme.palette.text.primary,
  },
  toolbarSizer: theme.mixins.toolbar,
  toolBar: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '1.24rem'
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  appName: {
    color: theme.palette.text.secondary,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingLeft: '24px',
  },
  appNameLink: {
    color: theme.palette.text.secondary,
    fontSize: '1.24rem;',
    textDecoration: 'none',
  },
  appNameTitle: {
    fontSize: '0.86rem;',
  },
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      position: 'relative',
    },
  },
  drawerNavLink: {
    display: 'block',
    textDecoration: 'none',
    '&.active': {
      backgroundColor: 'rgba(0, 0, 0, .08)'
    }
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: `0 ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: { Name: {} },
      mobileOpen: false,
      pages: {
        '/' : { Name: 'Dashboard' },
        '/profile': { Name: 'Profile' },
      }
    }
  }

  componentDidMount() {
    axios.get(`${config.serverAPI2}/me`, { withCredentials: true }).then((response) => {
      this.setState({ user: response.data });
    });
  }

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  render() {
    const { classes, theme } = this.props;

    const drawer = (
      <section>
        <header className={classNames(classes.toolbarSizer,classes.appName)}>
          <a className={classes.appNameLink} href="https://www.auburnalabama.org/">
            <Typography variant="headline" color="inherit">City of Auburn</Typography>
          </a>
          <Typography className={classes.appNameTitle} variant="title" color="inherit">Key Performance Indicators</Typography>
        </header>
        <main>
          <List component="nav">
            <NavLink onClick={this.handleDrawerToggle} to={{ pathname: '/' }} className={classes.drawerNavLink} exact>
              <ListItem button>
                <ListItemIcon><Dashboard/></ListItemIcon>
                <ListItemText primary="Dashboard"/>
              </ListItem>
            </NavLink>
            <NavLink onClick={this.handleDrawerToggle} to={{ pathname: '/profile' }} className={classes.drawerNavLink}>
              <ListItem button>
                <ListItemIcon><Person/></ListItemIcon>
                <ListItemText primary="User Profile"/>
              </ListItem>
            </NavLink>
          </List>
        </main>
      </section>
    );

    return (
      <section className={classes.root}>

        <aside>
          <Hidden mdUp>
            <Drawer
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={this.state.mobileOpen}
              onClose={this.handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden smDown implementation="css">
            <Drawer
              variant="permanent"
              open
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
        </aside>

        <header>
          <AppBar className={classes.appBar} classes={{ root: classes.appBarRoot, colorPrimary: classes.appBarPrimary }} color="primary">
            <Toolbar className={classes.toolBar}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={this.handleDrawerToggle}
                className={classes.navIconHide}
              >
                <Menu />
              </IconButton>
              <Typography variant="subheading">{this.state.pages[this.props.location.pathname].Name}</Typography>
              <Typography variant="subheading">{`${this.state.user.Name.FullName}`}</Typography>
            </Toolbar>
          </AppBar>
        </header>

        <main className={classes.content}>
          {/* Stupid but effective way to not fight with the absolutely positioned toolbar */}
          <div className={classes.toolbarSizer} />
          <Switch>
            <Route exact path='/'>
              <TaskList></TaskList>
            </Route>
            <Route path='/profile'>
              <p>Coming Soon</p>
            </Route>
          </Switch>
        </main>
        
        <footer></footer>
      </section>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true})(withRouter(App));
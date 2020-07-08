import React, {Component} from 'react';
import clsx from 'clsx';
import {
  AppBar,
  Toolbar,
  IconButton,
  withStyles,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import UserMenu from './UserMenu';
import Logo from './Logo';
import SideBar from './SideBar';

import {Route, Switch} from 'react-router-dom';

import HomePage from '../../pages/Home/HomePage';
import AboutTeamPage from '../../pages/AboutTeamPage/AboutTeamPage';
import AccountInfo from '../../pages/AccountInfo/AccountInfo';
import SprintMiniGame from '../../pages/SprintMiniGame';
import {SpeakIt, Savannah} from '../../pages';

import Dictionary from '../Dictionary/Dictionary';
import Grid from '@material-ui/core/Grid';

class PrimaryAppBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: false,
      drawerOpen: false,
    };
  }

  handleDrawerOpen = () => {
    this.setState({drawerOpen: true});
  };

  handleDrawerClose = () => {
    this.setState({drawerOpen: false});
  };

  render() {
    const {classes} = this.props;
    return (
      <React.Fragment>
        <div className={classes.appContainer}>
          <Grid container className={classes.grid}>
            <Grid item xs={12}>
              <AppBar
                className={clsx(this.props.classes.appBar, {
                  [this.props.classes.appBarShift]: this.state.drawerOpen,
                })}>
                <Toolbar className={this.props.classes.toolbar}>
                  <IconButton
                    onClick={this.handleDrawerOpen}
                    edge='start'
                    className={clsx(this.props.classes.menuButton, {
                      [this.props.classes.hide]: this.state.drawerOpen,
                    })}>
                    <MenuIcon/>
                  </IconButton>
                  <Logo/>
                  <UserMenu/>
                </Toolbar>
              </AppBar>
            </Grid>
            <Grid item xs={12}>
              <Grid container>
                <Grid item>
                  <SideBar open={this.state.drawerOpen} onShewronClick={() => this.handleDrawerClose()}/>
                </Grid>
                <Grid item xs className={classes.mainContainer}>
                  <Switch>
                    <Route path='/home' component={HomePage}/>
                    <Route path='/about' component={AboutTeamPage}/>
                    <Route path='/savannah' component={Savannah}/>
                    <Route path='/dictionary' component={Dictionary}/>
                    <Route path='/speakit' component={SpeakIt}/>
                    <Route path='/sprint' component={SprintMiniGame}/>
                    <Route path='/account'>
                      <AccountInfo/>
                    </Route>
                  </Switch>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </React.Fragment>
    );
  }
}

function createStyles(theme) {
  const drawerWidth = 210;
  const toolbarHeight = '65px';
  return {
    appContainer: {
      height: '100vh',
    },
    grid: {
      height: '100vh',
      display: 'flex',
      flexFlow: 'column',
    },
    mainContainer: {
      height: `calc(100vh - ${toolbarHeight})`,
    },
    appBar: {
      // position: 'fixed',
      height:`${toolbarHeight}`,
      background:
        'linear-gradient(0deg, rgba(71,71,74,1) 0%, rgba(123,123,158,1) 10%, rgba(233,251,255,1) 100%)',
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    toolbar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      transition: '0.3s ease-in',
    },
    menuButton: {
      marginLeft: theme.spacing(2),
      color: '#005',
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    hide: {
      opacity: 0,
      pointerEvents: 'none',
    },
  };
}

export default withStyles(createStyles)(PrimaryAppBar);

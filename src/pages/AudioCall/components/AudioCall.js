import React, { Component } from 'react';
import audiocallBackground from '../../../assets/audiocall-background.jpg';
import { Backdrop, withStyles } from '@material-ui/core';
import { Intro } from './Intro';
import { GameSettings } from './GameSettings';
import { MainGame } from './MainGame';

class AudioCall extends Component {
  constructor(props){
    super(props)
    this.state = {
      gameStarted: false,
    };
    this.gameStarts = this.gameStarts.bind(this);
    this.gameEnds = this.gameEnds.bind(this);
  }
  
  сhangeDifficulty = (e, value) => {
    this.setState({ difficulty: value })
  };

  сhangeRound = (e, value) => {
    this.setState({ round: value })
  };

  handleDragStop = () => this.props.update(this.state.value);

  gameStarts(){
    this.setState({
      gameStarted: true,
      difficulty: this.state.difficulty,
      round: this.state.round
    });
  }
  
  gameEnds(){
    this.setState({
      gameStarted: false,
    });
  }

  render(){
    let show;
    const { classes } = this.props;
    const { gameStarted } = this.state;
    
    if (!gameStarted) {
      show = 
        <div>
          <Intro  gameStarts={this.gameStarts} />
          <GameSettings 
            сhangeDifficulty={this.сhangeDifficulty}
            сhangeRound={this.сhangeRound}  
            handleDragStop={this.handleDragStop}
            
          />
        </div>
    } else {
      show = <MainGame {...this.state} gameEnds={this.gameEnds}/>;
    }
    return (
      <Backdrop className={classes.backdrop} open={true}>
        {show}
      </Backdrop>
    );
  }
}
  
function createStyles() {
  return {
    backdrop: {
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      marginTop: '48px',
      marginLeft: '54px',
      minHeight: 'calc(100vh - 48px)',
      overflowX: 'hidden',
      width: 'calc(100% - 54px)',
      background: `url(${audiocallBackground})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      zIndex: 1,
    },
  };
}
  
  export default withStyles(createStyles)(AudioCall);
  
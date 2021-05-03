import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { useSelector, useDispatch } from "react-redux";
import { setInstructions } from "../features/gameSlice";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  spacing: {
    marginRight: theme.spacing(2),
  }
}));

const NavBar = props => {
        const gameState = useSelector(state => state.game);
        const dispatch = useDispatch();
        const classes = useStyles();

        // Functions for Instructions
        function handleInstructionsOpen() {
            dispatch(setInstructions(!gameState.instructions));
        }

        if (gameState.data.length > 0 && both_quiz_finished) {
            return (
              <AppBar position="static">
                  <Toolbar variant="dense">
                    <Button variant="outlined" color="inherit" className={classes.spacing} onClick={handleInstructionsOpen}>Instructions</Button>
                    <Typography variant="h6" color="inherit" className={classes.spacing} noWrap>
                      Round: {gameState.current_round}
                    </Typography>
                    <Typography variant="h6" color="inherit" className={classes.spacing} noWrap>
                      Room: {gameState.room}
                    </Typography>
                    <Typography variant="h6" color="inherit" className={classes.spacing} noWrap>
                      Alias: {gameState.alias}
                    </Typography>
                  </Toolbar>
              </AppBar>
            );
        } else {
            return (
              <AppBar position="static">
                  <Toolbar variant="dense">
                    <Typography variant="h6" color="inherit">
                      Welcome
                    </Typography>
                  </Toolbar>
              </AppBar>
            );
        }

}

export default NavBar;
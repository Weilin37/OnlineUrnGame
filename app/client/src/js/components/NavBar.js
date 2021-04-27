import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { useSelector } from "react-redux";
import Divider from '@material-ui/core/Divider';

const NavBar = props => {
    const gameState = useSelector(state => state.game);

    if (gameState.data.length > 0) {

        return (
          <AppBar position="static">
              <Toolbar variant="dense">
                <Typography variant="h6" color="inherit">
                  Urn Game
                </Typography>
                <Divider orientation='vertical'/>
                <Typography variant="h6" color="inherit">
                  Room code (write this down): {gameState.room}
                </Typography>
                <Divider orientation='vertical'/>
                <Typography variant="h6" color="inherit">
                  Alias (write this down): {gameState.alias}
                </Typography>
                <Divider orientation='vertical'/>
                <Typography variant="h6" color="inherit">
                  You are: {gameState.player}
                </Typography>
              </Toolbar>
          </AppBar>
        );

    } else {

        return (
          <AppBar position="static">
              <Toolbar variant="dense">
                <Typography variant="h6" color="inherit">
                  Urn Game
                </Typography>
              </Toolbar>
          </AppBar>
        );

    }
}

export default NavBar;
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { useSelector, useDispatch } from "react-redux";
import { setInstructions } from "../features/gameSlice";
import Button from '@material-ui/core/Button';

const NavBar = props => {
        const gameState = useSelector(state => state.game);
        const dispatch = useDispatch();

        // Functions for Instructions
        function handleInstructionsOpen() {
            dispatch(setInstructions(true));
        }

        if (gameState.data.length > 0) {
            return (
              <AppBar position="static">
                  <Toolbar variant="dense">
                    <Typography variant="h6" color="inherit">
                      Urn Game
                    </Typography>
                    <Typography variant="h6" color="inherit">
                      Room: {gameState.room}
                    </Typography>
                    <Typography variant="h6" color="inherit">
                      Alias: {gameState.alias}
                    </Typography>
                    <Button color="inherit" onClick={handleInstructionsOpen}>Instructions</Button>
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
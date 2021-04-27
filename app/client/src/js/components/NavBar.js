import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const NavBar = props => {
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

export default NavBar;
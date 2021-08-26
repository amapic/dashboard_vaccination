import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Chart from '../component/Chart';
import Deposits from '../component/Deposits';
import Deposits2 from '../component/Deposit_somme_vaccin';
import Deposits3 from '../component/Deposit_europeen';
import Slider_zone from '../component/Slider';
// import Slider_vaccin from './component/SliderVaccin';
import { Camembert } from '../component/PieChart';
// import ToggleSwitch from './component/ToggleSwitchWrap'
import { ToggleButtonPerso } from '../component/RadioButton';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import theme from '../style/theme';
import Maps from '../component/Maps'
import BarChartWrap from '../component/BarChart'
import BarChartLegend from '../component/BarChartLegend'



import Data_carre_logique from '../component/Data_carre_logique'

const drawerWidth = 0;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
    textAlign: 'center'

  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(2),
    flexWrap: 'nowrap'
  },
  paper: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    display: 'flex',
    overflow: 'visible',
    flexDirection: 'column',
    height:'auto',
    backgroundColor:theme.palette.secondary.bgpaper
  },
  paper_row: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'visible',
    flexDirection: 'row'

  },
  paper_droite: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    display: 'flex',
    overflow: 'visible',
    flexDirection: 'column',
    alignContent: 'center',
    boxSizing: 'border-box',
    justifyContent: 'center',
    backgroundColor:theme.palette.secondary.bgpaper
  },
  containerprinc: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    flexWrap: 'nowrap',
    width: '100%'
  },
  fixedHeight: {
    height: 350,
  },
  fixedWidth: {
    width: 600,
  },
  fixedHeightx3: {
    height: 240,
  },
  flexRow: {
    display: 'flex',
    overflow: 'visible',
    flexDirection: 'row',
    flexWrap:'wrap'
  },
}));

export default function Dashboard() {

  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  // useEffect(() => {
  //   if (typeof window !== 'undefined') {
  //     ReactDOM.render(
  //       <Maps />, document.getElementById('RR'))
  //   }
  // }, [])

  const fixedHeightPaper = clsx(classes.paper);
  const paper_droite = clsx(classes.paper_droite);


  return (
    <div className={classes.root}>
      <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Chiffres sur la vaccination en France
          </Typography>
        </Toolbar>
      </AppBar>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container className={classes.containerprinc} maxWidth={false}>
          <Grid id="container_global" container className={classes.container} spacing={3}>
            <Grid id="colonne_gauche" item xs={10} md={10} lg={10} >
              <Grid item xs={12} md={8} lg={12} >
                <Paper id="AAAA" className={fixedHeightPaper}>
                  <div id="entete_chart">
                    <div id="div_slider">
                      <Slider_zone />

                    </div>
                    <ToggleButtonPerso />
                  </div>
                  <Chart id="container_graph"/>

                </Paper>
              </Grid>
              
              <Grid  item xs={12} md={8} lg={12} >
                <Paper className={classes.paper} >
                 
                  <div className={classes.flexRow}>
                  <Maps />
                  <BarChartWrap />
                  </div>

                </Paper>
              </Grid>

            </Grid>
            <Grid id="colonne_droite" container direction="column" xs={2} md={2} lg={2}  >
              <Paper className={classes.paper_droite} spacing={3} >

                <Camembert />
              </Paper>
              <Paper className={classes.paper_droite} spacing={3} >
                <Deposits />
              </Paper>

              <Paper className={classes.paper_droite} spacing={3} >
                <Deposits2 />
              </Paper>


            </Grid>
          </Grid>

        </Container>
      </main>
      </ThemeProvider>
    </div >
    
  );
}


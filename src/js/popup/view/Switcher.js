import React, {useEffect, useState} from "react"
import TextField from '@material-ui/core/TextField'
import SubmitButton from 'js/popup/components/SubmitButton'
import Box from '@material-ui/core/Box'
import Typography from "@material-ui/core/Typography";
import { useSnackbar } from 'notistack';
import Tooltip from "@material-ui/core/Tooltip";
import makeStyles from "@material-ui/core/styles/makeStyles";
import cst from "../constants";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

const useStyles = makeStyles((theme) => ({
  result: {
    marginBottom: theme.spacing(2)
  }
}));

const Switcher = (props) => {
  const classes = useStyles();
  
  const [state, setState] = useState(true);
  
  useEffect(() => {
    (async () => {
      try {
        const data = await chrome.storage.local.get([cst.KEY_STATE])
        setState(data[cst.KEY_STATE] === undefined ? true : data[cst.KEY_STATE])
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);
  
  const handleSwitch = async (e) => {
    const newState = e.target.checked
    await chrome.storage.local.set({[cst.KEY_STATE]: newState})
    setState(newState)
    await chrome.tabs.executeScript(({ code: 'window.location.reload()'}))
  };
  
  return (
    <Box
      component={'form'} onSubmit={handleSwitch}
      alignItems="center"
      display={"flex"}
      flexDirection={"column"}
      mx={4}
      mt={9}
      mb={3}
    >
      <FormControlLabel
        control={
          <Switch
            checked={state}
            onChange={handleSwitch}
            color="primary"
          />
        }
        label="Switch app state"
      />
    </Box>
  )
}


export default Switcher

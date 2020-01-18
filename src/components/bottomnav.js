import React from 'react'
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home'
import AddIcon from '@material-ui/icons/AddCircle'
const useStyles = makeStyles({
    root: {
        width: "100%",
        position: "fixed",
        bottom: 0,
        backgroundColor: "#1b1b3a",
        boxShadow: "solid",
    },
});

export default function LabelBottomNavigation() {
    const classes = useStyles();
    const [value, setValue] = React.useState('recents');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <BottomNavigation value={value} onChange={handleChange} className={classes.root}>
            <BottomNavigationAction
                className="navbutton"
                component={Link}
                to="/home"
                label="Home"
                value="home"
                icon={<HomeIcon
                    style={{fontSize: 40, color: "white"}}
                />} />
            <BottomNavigationAction
                className="navbutton"
                component={Link}
                to="/new"
                label="Add"
                value="add"
                icon={<AddIcon
                    style={{fontSize: 40, color: "white"}}
                />}
                />
        </BottomNavigation>
    );
}
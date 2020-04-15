import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { PropsTri } from '../interfaces';

//list sort choices
const choices = [
    { type: 'asc', label: 'A > Z' },
    { type: 'dsc', label: 'Z > A' },
    { type: 'date', label: 'Date' }
];

const Tri = (props: PropsTri) => {
    //get the props
    const { onClose, selectedValue, open } = props;

    //handle close and execute onClose (function in parent component)
    const handleClose = () => {
        onClose(selectedValue);
    };

    //handle close and execute onClose (function in parent component)
    const handleListItemClick = (value: string) => {
        onClose(value);
    };

    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle id="simple-dialog-title">Trier par :</DialogTitle>
            <List>
                {choices.map((choice) => (
                    <ListItem button onClick={() => handleListItemClick(choice.type)} key={choices.indexOf(choice)}>
                        <ListItemText primary={choice.label} />
                    </ListItem>
                ))}
            </List>
        </Dialog>
    );
}

export default Tri;
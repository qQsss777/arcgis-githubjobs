import React, { useContext, useState } from "react";
import Tri from "./Tri";
import { Button } from "@material-ui/core";
import { AppContext } from "../context/Context";
import { SET_VALUE } from '../actions';

const ButtonTri = ({ disabled }: any) => {

    //use context
    const { state, dispatch } = useContext(AppContext);
    const [open, setOpen] = useState(false);

    //handle click to open dialog
    const handleClickOpen = () => {
        setOpen(true);
    };

    //handle close the dialog et set the value to the context
    const handleClose = (val: string) => {
        const value = val;
        dispatch({ type: SET_VALUE, payload: { value, } });
        setOpen(false);
    };

    return (
        <>
            <Button color="inherit" onClick={handleClickOpen} disabled={disabled}>Trier</Button>
            <Tri selectedValue={state.value} open={open} onClose={handleClose} />
        </>
    );
}

export default ButtonTri;
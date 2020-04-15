import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    header: {
        flexGrow: 1,
    },
    header_title: {
        flexGrow: 1,
    },
    header_buttons: {
        marginLeft: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    list: {
        flexGrow: 1,
        maxWidth: `100%`,
        width: '100% !important',
        margin: '0 !important',
        flexDirection: "row",
        justify: "flex-start",
        alignItems: "center",
        [theme.breakpoints.down('xs')]: {
            display: 'flex',
            flexDirection: 'column',
        },
    },
    card: {
        display: "flex",
        flexDirection: "column",
        margin: 16,
    },
    card_media: {
        height: 250,
    },
    card_title: {
        height: 100,
        overflow: 'hidden'
    },
    card_location: {
        height: 25,
    },
    card_actions: {
        display: "block",
    },
    mapping_root: {
        width: '100%',
        height: 'calc(100vh - 64px)'
    }
}));

export { useStyles }
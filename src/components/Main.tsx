import { makeStyles } from "@material-ui/core";
import { useContext } from "react";
import { AppContext } from "../context/AppContextProvider";
import Header from "./Header";
import ItemDetail from "./ItemDetail";
import ItemList from "./ItemList";
import Spinner from "./Spinner";

const useStyles = makeStyles({
    main: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        width: '90%',
        maxWidth: '1200px',
        margin: 'auto'
    }
})


const Main = () => {
    const {state: {selectedItem}} = useContext(AppContext);
    const classes = useStyles();
    return (
        <div className={classes.main}>
            <Header />
            {selectedItem ? <ItemDetail /> : <ItemList />}
        </div>
    )
}

export default Main;
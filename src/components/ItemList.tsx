import { makeStyles } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import { ActionTypes, AppContext } from '../context/AppContextProvider';
import Item from './Item';
import Search from './Search'
import Spinner from './Spinner';

const useStyles = makeStyles({
    itemList: {
        display: 'flex',
        flexWrap: 'wrap',
        width: '100%',
        justifyContent: 'center'
    }
})

const ItemList = () => {
    const classes = useStyles();
    const [filter, setFilter] = useState("all");

    const {
        state: { items, loading },
        dispatch
    } = useContext(AppContext);

    return <div className={classes.itemList}>
        <Search />
        {loading ? <Spinner/> : 
        <div
            style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center"
            }}
        >
            <div style={{width: '100%', display: 'flex', justifyContent: 'start', padding: '1rem 5rem'}}>
                <select
                    style={{ height: "fit-content" }}
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                >
                    <option value="all">All</option>
                    <option value="image">Images</option>
                    <option value="video">Videos</option>
                </select>
            </div>
            {(filter === "all"
                ? items
                : items.filter((i: any) => i.data[0].media_type === filter)
            ).map((item: any) => (
                <React.Fragment key={item.href}>
                    <Item
                        onClick={() =>
                            dispatch({
                                type: ActionTypes.SELECT_ITEM,
                                payload: item
                            })
                        }
                        item={item}
                    />
                </React.Fragment>
            ))}
        </div>}
    </div>;
}

export default ItemList;
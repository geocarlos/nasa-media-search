import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles({
    item: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        overflowY: 'hidden',
        width: '300px',
        height: '200px',
        border: 'solid thin #333',
        borderRadius: '5px',
        margin: '5px 3px',
        background: '#eee',
        '&:hover': {
            cursor: 'pointer'
        }
    }
})

const Item = ({item, onClick}: any) => {
    const classes = useStyles();
    return (
        <div onClick={onClick} className={classes.item}>
            <h3>{item.data[0].title}</h3>
            <img width={200} src={item.links[0].href} alt="thumb" />
        </div>

    )
}

export default Item;
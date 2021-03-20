import { Button } from "@material-ui/core";
import { useContext, useEffect, useState } from "react";
import { ActionTypes, AppContext } from "../context/AppContextProvider";
import { ArrowBack } from '@material-ui/icons'

const ItemDetail = () => {
    const [itemMedia, setItemMedia] = useState<null | any>({
        images: [],
        videos: []
    });

    const {
        state: { selectedItem },
        dispatch
    } = useContext(AppContext);

    useEffect(() => {
        if (selectedItem) {
            fetch(
                `https://images-api.nasa.gov/asset/${selectedItem?.data[0].nasa_id}`
            )
                .then((res) => res.json())
                .then((data) => {
                    setItemMedia({
                        images: data.collection.items.filter((i: any) =>
                            i.href.endsWith(".jpg")
                        ),
                        videos: data.collection.items.filter((i: any) =>
                            i.href.endsWith(".mp4")
                        )
                    });
                })
                .catch((error) => {
                    alert("Error fetching media.");
                    console.log(error);
                });
        }
    }, [selectedItem, dispatch]);

    return (
        <div
            style={{
                width: "100%",
                maxWidth: "1200px",
                margin: "auto",
                display: "flex",
                flexWrap: "wrap"
            }}
        >
            <div>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<ArrowBack />}
                    style={{ height: "fit-content" }}
                    onClick={() => {
                        dispatch({ type: ActionTypes.SELECT_ITEM, payload: null });
                    }}
                >
                    Back to search
          </Button>
            </div>
            <div style={{
                display: 'flex', 
                justifyContent: 'center', 
                margin: 'auto',
                minHeight: '50vh', 
                width: '100%'}}>
                {itemMedia?.videos.length &&
                    selectedItem?.data[0].media_type === "video" ? (
                    <video
                        autoPlay
                        width="90%"
                        poster={itemMedia?.images[0]?.href}
                        controls
                    >
                        <source src={itemMedia?.videos[3]?.href} type="video/mp4" />
                    </video>
                ) : (
                    <img
                        style={{ maxWidth: "90%", minHeight: '100%' }}
                        src={itemMedia?.images[0]?.href}
                        alt="nasa media"
                    />
                )}
            </div>
            <div>
                <h2>{selectedItem?.data[0].title}</h2>
                <b>Center: {selectedItem?.data[0].center}</b>
                <b>
                    {" "}
              | Date: {new Date(selectedItem?.data[0].date_created).toString()}
                </b>
                <p>{selectedItem?.data[0].description}</p>
            </div>
        </div>
    );
}

export default ItemDetail;
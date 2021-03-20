export default function handleApiCall(
    url: string,
    actionType: string,
    dispatch: any
  ) {
    dispatch({ type: actionType });
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: actionType + "_FULFILLED",
          payload: data.collection.items.filter((i: any) => !!i.links)
        });
      })
      .catch((error) => {
        dispatch({ type: actionType + "_REJECTED", payload: error });
      });
  }
  
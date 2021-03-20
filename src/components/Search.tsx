import { Button, TextField } from "@material-ui/core";
import { useContext, useState } from "react";
import handleApiCall from "../api";
import { ActionTypes, AppContext } from "../context/AppContextProvider";

const Search = () => {
  const [query, setQuery] = useState("");
  const { dispatch } = useContext(AppContext);

  const onQueryChange = ({ target }: any) => {
    setQuery(target.value);
  };

  const handleFetch = () => {
    if (!query) {
      return;
    }
    handleApiCall(
      `https://images-api.nasa.gov/search?q=${query}`,
      ActionTypes.FETCH_ITEMS,
      dispatch
    );
  };

  return (
    <div style={{ width: "100%", display: "flex", padding: "1rem 2rem" }}>
      <TextField label="Search images and videos" onChange={onQueryChange} style={{ flex: 1 }} />
      <Button style={{height: 'fit-content'}} variant="contained" color="primary" onClick={handleFetch}>Search</Button>
    </div>
  );
};

export default Search;

import {
  Typography,
  Paper,
  InputBase,
  IconButton,
  Box,
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import Definition from "./models/Definition";
import DefinitionComponent from "./components/DefinitionComponent";

function App() {
  const [query, setQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<Definition[]>();

  const searchDefinition = async () => {
    setLoading(true);
    const res = await fetch(
      `https://mashape-community-urban-dictionary.p.rapidapi.com/define?term=${query}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host":
            "mashape-community-urban-dictionary.p.rapidapi.com",
          "x-rapidapi-key":
            "4bc7da9b3dmshb66f1b9991546a8p1ebf5cjsne5c8a20f4802",
        },
      }
    );
    const data = await res.json();
    setData(data.list);
    setQuery("");
    setLoading(false);
  };

  return (
    <div className="App">
      <Box>
        <Box
          sx={{
            display: "flex",
            fontWeight: 300,
            textAlign: "center",
            pt: 10,
            justifyContent: "center",
          }}
        >
          <Typography variant="h1" sx={{ color: "yellow", pr: 1 }}>
            Your
          </Typography>
          <Typography variant="h1" component="div" gutterBottom sx={{ pl: 1 }}>
            Dictionary
          </Typography>
        </Box>
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: 400,
            mx: "auto",
          }}
          onSubmit={(e: { preventDefault: () => void }) => e.preventDefault()}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search Word Definition"
            inputProps={{ "aria-label": "search word definition" }}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <IconButton
            type="submit"
            sx={{ p: "10px" }}
            aria-label="search"
            onClick={() => searchDefinition()}
          >
            <SearchIcon />
          </IconButton>
        </Paper>
        {loading ? (
          <Box sx={{ textAlign: "center", mt: 20 }}>
            <CircularProgress sx={{ color: "white" }} />
          </Box>
        ) : (
          <Box>
            {data && data.length > 0 ? (
              data.map((def) => (
                <DefinitionComponent key={def.defid} data={def} />
              ))
            ) : (
              <Typography
                variant="h2"
                component="div"
                gutterBottom
                sx={{ fontWeight: 300, textAlign: "center", pt: 10 }}
              >
                No data found, try something else
              </Typography>
            )}
          </Box>
        )}
      </Box>
    </div>
  );
}

export default App;

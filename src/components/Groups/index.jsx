import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Button,
  CircularProgress,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useGroups } from "../../provider/groups";
import useStyles from "./style";
import axios from "axios";
import { useState } from "react";

const Groups = () => {
  const api = axios.create({
    baseURL: "https://kabit-api.herokuapp.com/",
  });

  const token = JSON.parse(localStorage.getItem("token")) || "";

  const { groups, getGroups } = useGroups();

  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const classes = useStyles();

  const subGroup = (id) => {
    setLoading(true);
    api
      .delete(`/groups/${id}/unsubscribe/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        getGroups();
        setLoading(false);
      })
      .catch((e) => console.log("Exclude " + e));
  };

  return loading ? (
    <div>
      <CircularProgress className={classes.loading} />
    </div>
  ) : (
    <>
      {groups.map((group) => (
        <Card key={group.id} className={classes.card} loading>
          <CardContent>
            <Typography className={classes.title}>
              #{group.id} - {group.name}
            </Typography>
          </CardContent>
          <CardContent>
            <Typography className={classes.description}>
              {group.description}
            </Typography>
          </CardContent>
          <Button onClick={() => subGroup(group.id)}>Sair do Grupo</Button>
        </Card>
      ))}
      <Card className={classes.card} onClick={() => history.push("/groups")}>
        <CardActionArea className={classes.contentArea}>
          <CardContent>
            <Typography>Adicionar um grupo</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
};

export default Groups;

import React,{useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import useTags from "./../request/useTags";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: theme.spacing(0.5),
    margin: 0,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

export default function TagsArray(props) {
  const classes = useStyles();

  const deleteTag = (chipToDelete) => () => {
    props.deleteTagById(chipToDelete);
  };

  return (
    <Paper component="ul" className={classes.root}>
      {props.tags.map((tag) => {
        let icon;
        return (
            <li key={tag.tagId}>
              <Chip
                icon={icon}
                label={tag.tagName}
                onDelete={deleteTag(tag.tagId)}
                className={classes.chip} 
              />
            </li>
        );
      })}
    </Paper>
  );
}

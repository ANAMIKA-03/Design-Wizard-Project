import React from "react";
import InputBase from "@material-ui/core/InputBase";
import { alpha, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import { ReactComponent as Search } from "../../../assets/svg/New folder/search.svg";
import { ReactComponent as Cross } from "../../../assets/svg/New folder/cross.svg";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 17),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    top: "-1px",
    right: "-128px",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function SearchAppBar(props: any) {
  const classes = useStyles();
  const [show, setShow] = React.useState<any>(false);

  const handleSearch = (e: any) => {
    props.getSearchText(e.target.value);
  };
  return (
    <div className={classes.root} style={{ display: "-webkit-inline-box" }}>
      {props.searchValue && (
        <Cross
          style={{ height: "20px", width: "20px", marginTop: "7px" }}
          onClick={() => {
            props.getSearchText("");
            props.setSearch(false);
          }}
        />
      )}
      <div
        className={classes.search}
        onClick={() => {
          setShow(!show);
        }}
      >
        <div className={classes.searchIcon}>
          <Search />
        </div>
        <InputBase
          placeholder={show && "Search for Design"}
          style={{ background: "none" }}
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          value={props.searchValue}
          inputProps={{ "aria-label": "search" }}
          onChange={handleSearch}
          onKeyDown={(e: any) => {
            if (e.key === "Enter") {
              props.setSearch(true);
            }
          }}
        />
      </div>
    </div>
  );
}

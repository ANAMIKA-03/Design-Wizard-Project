import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useMutation } from "@apollo/client";
import { DeleteQuery } from "../../../lib/contexts/Queries";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiPaper-root": {
      width: "379.5px",
      bottom: "14px",
      height: "180.75px",
    },
  },
  title: {
    "& .MuiTypography-root": {
      fontSize: "20px",
      fontFamily: "Arial !important",
      textAlign: "center",
      color: "#2d3559",
      fontWeight: "bold",
    },
  },
}));

export default function AlertDialog(props: any) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [deleteda, { loading, error }] = useMutation(DeleteQuery);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleDelete = async () => {
    await deleteda({
      variables: {
        compositionId: props.compositionId,
        ownerId: `${localStorage.getItem("userId")}`,
        token: `${localStorage.getItem("token")}`,
      },
    }).then(() => {
      setOpen(false);
      props.updateList();
    });
    if (loading) return <>'Deleting...'</>;
    if (error) return <>`Submission error! ${error.message}`</>;
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="outlined"
        color="primary"
        style={{
          color: "#cd3333",
          textTransform: "inherit",
          fontSize: "14px",
          padding: "0",
          border: "none",
        }}
        onClick={() => handleClickOpen()}
      >
        Delete
      </Button>
      <Dialog
        className={classes.root}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" className={classes.title}>
          {"Are you sure you want to delete this design?"}
        </DialogTitle>
        <DialogActions style={{ textAlign: "center", margin: "0 auto" }}>
          <Button
            style={{
              textAlign: "center",
              width: "129px",
              height: "39px",
              border: "1px solid #2d3559",
              color: "#2d3559",
              padding: "7px 25px",
              fontSize: "20px",
              fontFamily: "Lato, sans-serif",
              textTransform: "capitalize",
              fontWeight: "700",
            }}
            onClick={handleClose}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            style={{
              textAlign: "center",
              width: "129px",
              height: "39px",
              fontWeight: "700",
              border: "1px solid #2d3559",
              color: "#fbfbff",
              padding: "7px 25xp",
              background: "#2d3559",
              fontSize: "20px",
              fontFamily: "Lato, sans-serif",
              textTransform: "capitalize",
            }}
            onClick={handleDelete}
            color="primary"
            autoFocus
          >
            Yes, Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

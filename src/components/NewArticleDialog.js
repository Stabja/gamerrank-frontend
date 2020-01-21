import React, { useState, useEffect, forwardRef } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  Button,
  CardContent,
  CardActions,
  Divider,
  TextField,
  colors,
  Chip,
  Typography,
  Slide,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  root: {
    width: theme.breakpoints.values.md,
    margin: '0 auto',
    marginTop: 30,
    textAlign: 'center'
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    padding: 30
  },
  textFields: {
    margin: 10
  },
  cardActions: {
    display: 'flex'
  },
  flexGrow: {
    flexGrow: 1
  },
  saveButton: {
    color: '#fff',
    margin: 10,
    backgroundColor: colors.green[600],
    '&:hover': {
      backgroundColor: colors.green[900]
    }
  },
  keywords: {
    padding: 15,
    display: 'flex',
    alignItems: 'center'
  },
  chips: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  chip: {
    margin: 5
  },
  pageTitle: {
    margin: '20px auto 20px auto'
  },
  selects: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    backgroundColor: colors.grey[50],
    padding: 10
  },
  inNetwork: {
    marginLeft: 'auto'
  }
}));

const Transition = forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

const NewArticle = props => {

  const { className, ...rest } = props;
  const classes = useStyles();

  const [inputValue, setInputValue] = useState('');
  const [open, setOpen] = useState(false);
  const [chips, setChips] = useState([
    'Android',
    'IOS',
    'React'
  ]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = event => {
    event.persist();
    setInputValue(event.target.value)
  };

  const handleInputKeyup = event => {
    event.persist();
    if (event.keyCode === 13 && inputValue) {
      if(!chips.includes(inputValue)) {
        setChips(chips => [...chips, inputValue]);
        setInputValue('');
      }
    }
  };

  const handleChipDelete = chip => {
    setChips(chips => chips.filter(c => chip !== c));
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Slide in Alert Dialog
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <Card
          className={clsx(classes.root, className)}
        >
            <Typography variant="h2" className={classes.pageTitle}>
              Create New Article
            </Typography>
            <Divider />
            <Divider />
            <CardContent className={classes.cardContent}>
              <TextField
                className={classes.textFields}
                label="Article Title"
                placeholder="Title of the article"
                name="title"
                required
                variant="outlined"
              />
              <TextField
                className={classes.textFields}
                label="About This Article"
                placeholder="What this article is about?"
                name="about"
                required
                variant="outlined"
              />
              <TextField
                className={classes.textFields}
                label="Article Content"
                rows="8"
                placeholder="Write your article (in markdown)"
                name="content"
                multiline
                required
                variant="outlined"
              />
              <TextField
                className={classes.textFields}
                label="Tags"
                name="tags"
                required
                placeholder="Enter Tags"
                variant="outlined"
                onChange={handleInputChange}
                onKeyUp={handleInputKeyup}
                value={inputValue}
              />
              <div className={classes.chips}>
                {chips.map(chip => (
                  <Chip
                    className={classes.chip}
                    deleteIcon={<CloseIcon />}
                    key={chip}
                    label={chip}
                    onDelete={() => handleChipDelete(chip)}
                  />
                ))}
              </div>
            </CardContent>
            <Divider />
            <Divider />
            <CardActions className={classes.cardActions}>
              <div className={classes.flexGrow} />
              <Button
                className={classes.saveButton}
                variant="contained"
                size="large"
              >
                Publish Article
            </Button>
            </CardActions>
        </Card>
      </Dialog>
    </div>
  )
};

export default NewArticle;

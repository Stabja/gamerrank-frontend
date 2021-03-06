import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { colors } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ShareIcon from '@material-ui/icons/Share';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center'
  },
  likeButton: {},
  likedButton: {
    color: colors.red[600]
  },
  shareButton: {
    marginLeft: 'auto'
  },
  shareIcon: {
    marginRight: theme.spacing(1)
  }
}));

const Reactions = props => {
  const { scream, className, ...rest } = props;
  const classes = useStyles();

  const [liked, setLiked] = useState(scream.liked ? scream.liked : false);
  const [likes, setLikes] = useState(scream.likeCount);

  const handleLike = () => {
    setLiked(true);
    setLikes(likes => likes + 1);
  };

  const handleUnlike = () => {
    setLiked(false);
    setLikes(likes => likes - 1);
  };

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      {liked ? (
        <Tooltip title="Unlike">
          <IconButton
            className={classes.likedButton}
            onClick={handleUnlike}
            size="small"
          >
            <FavoriteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Like">
          <IconButton
            className={classes.likeButton}
            onClick={handleLike}
            size="small"
          >
            <FavoriteBorderIcon />
          </IconButton>
        </Tooltip>
      )}
      <Typography
        color="textSecondary"
        variant="h6"
      >
        {likes}
      </Typography>
      <Button
        className={classes.shareButton}
        size="small"
        variant="contained"
      >
        <ShareIcon className={classes.shareIcon} />
        Share
      </Button>
    </div>
  );
};

Reactions.propTypes = {
  className: PropTypes.string,
  scream: PropTypes.object.isRequired
};

export default Reactions;

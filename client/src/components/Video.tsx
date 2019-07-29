import React, { useState } from 'react';
import { Modal, Button } from '@material-ui/core';
import PlayIcon from '@material-ui/icons/PlayCircleFilledWhiteOutlined';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles({
  root: {
    textTransform: 'none'
  }
});

interface Props {
  id: string
};

const Video = ({ id }: Props) => {
  const classes = useStyles();
  const [open, set] = useState(false);

  const iconSize = useMediaQuery('(max-width: 800px)')?
  'small': 'large';

  const handleOpen = () => {
    set(true);
  }

  const handleClose = () => {
    set(false);
  }
  
  return (
    <>
      <Button 
        className='trailer-play-button' 
        variant='text' 
        onClick={handleOpen} 
        classes={classes}
        size='small'
      >
        <PlayIcon fontSize={iconSize} style={{ marginRight: '6px' }}/>
        <span style={{ fontSize: '17px' }}>Play Trailer</span>
      </Button>
      <Modal
        className='video-modal-container'
        open={open}
        onClose={handleClose}
      >
        <iframe
          className='video-iframe'
          src={`https://www.youtube.com/embed/${id}`}
          frameBorder='0'
        />
      </Modal>
    </>
  );
};

export default Video;
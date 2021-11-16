import { useRef, useEffect, useState, useMemo } from 'react';
import { LinearProgress, Button, Typography, Card } from '@mui/material';
import { linearProgressClasses } from '@mui/material/LinearProgress'
import PlayArrow from '@mui/icons-material/PlayArrow';
import Pause from '@mui/icons-material/Pause';
import ReplayArrow from '@mui/icons-material/SkipPrevious';
import theme from '../theme';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'left',
    borderRadius: 50,
    paddingTop: 1,
    paddingBottom: 1,
    paddingRight: 1,
    paddingLeft: 3,
    marginTop: 1,
    marginBottom: 1,
    backgroundColor: theme.colors.cardAlt
  },
  playerDetailsContainer: {
    diplay: 'flex',
    justifyContent: 'end',
    alignSelf: 'end',
    marginLeft: 10,
    marginRight: 10
  },
  progress: {
    width: 1,
    height: 10,
    borderRadius: 5,
    flex: 4,
    backgroundColor: theme.colors.card,
    [`& .${linearProgressClasses.bar}`]: {
      backgroundColor: theme.colors.primary,
      borderRadius: 5
    }
  },
  progressContainer: {
    width: 450,
    minWidth: 450,
    maxWidth: 450,
    height: 10,
    alignSelf: 'end',
    marginBottom: 5,
    marginTop: 5
  },
  playButton: {
    width: 80,
    height: 80,
    borderRadius: '50%',
    backgroundColor: theme.colors.primary,
    ":hover": { backgroundColor: theme.colors.primaryAlt }
  },
  replayButton: {
    minWidth: 30,
    width: 40,
    height: 40,
    borderRadius: '50%',
    backgroundColor: theme.colors.secondary,
    ":hover": { backgroundColor: theme.colors.secondaryAlt },
    alignSelf: 'end'
  }
}

const AudioPlayerProgress = ({ trackProgress, onClickSeek, progressRef }) => {
  return (
    <div style={styles.progressContainer}>
      <LinearProgress
        variant='determinate'
        value={trackProgress}
        onClick={({ clientX }) => onClickSeek(clientX)}
        sx={styles.progress}
        ref={progressRef}
      />
    </div>
  )
}

const AudioPlayer = ({ audioFile: { title, audioFileUri} }) => {
  const audioRef = useRef(new Audio(audioFileUri));
  const progressRef = useRef();
  const [trackProgress, setTrackProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef();

  const parseTime = (n) => {
    const secs = Math.floor(n % 60);
    const min = Math.floor((n / 60) % 60);
    const hrs = Math.floor(n / 60 / 60);
    return `${hrs < 10 ? '0' + hrs : hrs}:${min < 10 ? '0' + min : min}:${secs < 10 ? '0' + secs : secs}`;
  }

  const duration = useMemo(() => {
    if (!audioRef.current.duration) {
      return null;
    }
    return parseTime(audioRef.current.duration)
  }, [audioRef.current.duration]); //eslint-disable-line

  const onPlayClick = () => {
    setIsPlaying(!isPlaying);
  }

  const onReplayClick = () => {
    audioRef.current.currentTime = 0;
    setTrackProgress(0);
  }

  const startTimer = () => {
    intervalRef.current = setInterval(() => {
      if (isPlaying) {
        setTrackProgress(100 * (audioRef.current.currentTime / audioRef.current.duration));
      }
    }, [500])
  }

  const onClickSeek = (clientX) => {
    clearInterval(intervalRef.current);

    const progressRect = progressRef.current.getBoundingClientRect();
    const clickPosition = (clientX - progressRect.left) / progressRect.width;
    const newProgress = audioRef.current.duration * clickPosition;

    audioRef.current.currentTime = newProgress;
    setTrackProgress(100 * (newProgress / audioRef.current.duration));
    startTimer();
  }

  useEffect(() => {
    if (isPlaying) {
      clearInterval(intervalRef.current);
      audioRef.current.play();
      startTimer();
    }
  }, [isPlaying]); // eslint-disable-line

  useEffect(() => {
    if (!isPlaying) {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    return () => {
      audio.pause();
      clearInterval(intervalRef.current);
    }
  }, []);
  
  return (
    <Card variant='outlined' sx={styles.container}>
      <Button variant='contained' onClick={onReplayClick} sx={styles.replayButton}>
        <ReplayArrow sx={{ color: 'white' }} />
      </Button>
      <Button variant='contained' onClick={onPlayClick} sx={styles.playButton}>
        {!isPlaying ? <PlayArrow sx={{ color: 'white' }} /> : <Pause sx={{ color: 'white' }} />}
      </Button>
      <div style={styles.playerDetailsContainer}>
        <Typography variant='h6' color={theme.colors.textPrimary}>
          {title}
        </Typography>
        <AudioPlayerProgress trackProgress={trackProgress} onClickSeek={onClickSeek} progressRef={progressRef} />
        <Typography variant='body2' color={theme.colors.textSecondary}>
          {duration? parseTime(audioRef.current.currentTime) : '--'} / {duration ? duration : '--'}
        </Typography>
      </div>
    </Card>
  )
}

export default AudioPlayer;
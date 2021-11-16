import { Typography } from '@mui/material';
import theme from '../theme';

const styles = {
  text: {
    fontWeight: theme.fontWeights.fontWeightNormal,
    fontSize: theme.fontSizes.body,
    color: theme.colors.textPrimary
  },
  colorTextSecondary: {
    color: theme.colors.textSecondary
  },
  colorPrimary: {
    color: theme.colors.primary
  },
  subHeading: {
    fontSize: theme.fontSizes.subHeading
  },
  bold: {
    fontWeight: theme.fontWeights.fontWeightBold
  },
  medium: {
    fontWeight: theme.fontWeights.fontWeightMedium
  }
}

const Text = ({ fontWeight, fontSize, color, style, ...props }) => {
  // const textStyle = [
  //   styles.text,
  //   color === 'textSecondary' && styles.colorTextSecondary,
  //   color === 'primary' && styles.colorPrimary,
  //   fontSize === 'subHeading' && styles.subHeading,
  //   fontWeight === 'bold' && styles.bold,
  //   fontWeight === 'medium' && styles.medium,
  //   style
  // ]

  return (
    <Typography style={styles.text} {...props} />
  );
};

export default Text;
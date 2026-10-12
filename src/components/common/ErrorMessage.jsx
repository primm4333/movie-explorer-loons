import { Alert, Button } from '@mui/material';

export default function ErrorMessage({ message, onRetry }) {
  return (
    <Alert
      severity="error"
      sx={{ my: 2 }}
      action={onRetry && <Button color="inherit" size="small" onClick={onRetry}>Try again</Button>}
    >
      {message}
    </Alert>
  );
}

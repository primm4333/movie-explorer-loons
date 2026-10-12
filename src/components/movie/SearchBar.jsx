import { IconButton, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

export default function SearchBar({ value, onChange }) {
  return (
    <TextField
      fullWidth
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search for a movie by title"
      inputProps={{ 'aria-label': 'Search movies' }}
      InputProps={{
        startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
        endAdornment: value && (
          <InputAdornment position="end">
            <IconButton aria-label="Clear search" onClick={() => onChange('')} edge="end"><CloseIcon /></IconButton>
          </InputAdornment>
        ),
        sx: { borderRadius: 99, bgcolor: 'background.paper' },
      }}
    />
  );
}

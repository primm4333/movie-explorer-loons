import { Box, Button, MenuItem, TextField } from '@mui/material';

const YEARS = Array.from({ length: 40 }, (_, i) => new Date().getFullYear() - i);
const RATINGS = [5, 6, 7, 8];

export default function FilterBar({ filters, genres, onChange }) {
  const set = (field) => (e) => onChange({ ...filters, [field]: e.target.value });
  const active = Object.values(filters).some(Boolean);

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
      <TextField select size="small" label="Genre" value={filters.genre} onChange={set('genre')} sx={{ minWidth: 150, flex: { xs: 1, sm: 'none' } }}>
        <MenuItem value="">All genres</MenuItem>
        {genres.map((g) => <MenuItem key={g.id} value={g.id}>{g.name}</MenuItem>)}
      </TextField>
      <TextField select size="small" label="Year" value={filters.year} onChange={set('year')} sx={{ minWidth: 110, flex: { xs: 1, sm: 'none' } }}>
        <MenuItem value="">Any year</MenuItem>
        {YEARS.map((y) => <MenuItem key={y} value={y}>{y}</MenuItem>)}
      </TextField>
      <TextField select size="small" label="Rating" value={filters.rating} onChange={set('rating')} sx={{ minWidth: 120, flex: { xs: 1, sm: 'none' } }}>
        <MenuItem value="">Any rating</MenuItem>
        {RATINGS.map((r) => <MenuItem key={r} value={r}>{r}+ stars</MenuItem>)}
      </TextField>
      {active && <Button onClick={() => onChange({ genre: '', year: '', rating: '' })}>Clear filters</Button>}
    </Box>
  );
}

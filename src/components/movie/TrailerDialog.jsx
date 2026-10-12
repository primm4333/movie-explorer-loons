import { Box, Dialog, DialogTitle, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';


export default function TrailerDialog({ open, onClose, videoKey, title }) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ pr: 7 }}>
        {title} - Trailer
        <IconButton aria-label="Close trailer" onClick={onClose} sx={{ position: 'absolute', right: 8, top: 8 }}><CloseIcon /></IconButton>
      </DialogTitle>
      <Box sx={{ aspectRatio: '16 / 9', bgcolor: '#000' }}>
        {open && (
          <iframe
            title={`${title} trailer`}
            src={`https://www.youtube.com/embed/${videoKey}?autoplay=1`}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            style={{ width: '100%', height: '100%', border: 0 }}
          />
        )}
      </Box>
    </Dialog>
  );
}

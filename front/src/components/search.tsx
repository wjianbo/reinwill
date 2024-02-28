import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';

export default function CustomizedInputBase() {
  return (
    <>
      <TextField id="standard-basic" label="Search" variant="standard" />
      <IconButton type="button" sx={{ p: '15px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </>
  );
}
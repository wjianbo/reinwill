import Grid from '@mui/material/Grid';
import ImgMediaCard from './card';

export default function SpacingGrid() {

  return (
    <Grid sx={{ flexGrow: 1 }} container spacing={2}>
      <Grid item xs={12}>
        <Grid container justifyContent="center" spacing={2}>
          {[0, 1, 2].map((value) => (
            <Grid key={value} item>
              <ImgMediaCard />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}
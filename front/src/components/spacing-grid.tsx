import Grid from '@mui/material/Grid';
import ImgMediaCard from './card';

export default function SpacingGrid() {

  let menuData: Menu[] = [
    { type: "menu", label: "文脉", children: [
      { type: "menu", label: "SubA", children: [{ type: "command", label: "Link", href: "#" }] },
      { type: "menu", label: "SubA", children: [{ type: "command", label: "Link", href: "#" }] },
    ] },
    { type: "menu", label: "A", children: [{ type: "command", label: "Link", href: "#" }] },
  ];

  return (
    <Grid sx={{ flexGrow: 1 }} container spacing={2}>
      <Grid item xs={12}>
        <Grid container justifyContent="center" spacing={2}>
          {menuData.map((menuGroup, i) => (
            <Grid key={i} item>
              <ImgMediaCard label={menuGroup.label} children={menuGroup.children} type={menuGroup.type} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}
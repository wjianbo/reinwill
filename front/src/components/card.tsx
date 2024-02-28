import Typography from '@mui/material/Typography';
import { ButtonGroup, Divider } from '@mui/material';
import SimpleListMenu from './menu';

export default function ImgMediaCard() {

  return (
    <>
      <Divider sx={{
        '&::before, &::after': {
          backgroundColor: 'black', // 设置前面元素的背景颜色
          height: '2px' // 设置前面元素的高度
        },
      }}>
        <Typography gutterBottom variant="h6" component="div">
          文脉
        </Typography>
      </Divider>
      <ButtonGroup variant='text'>
        <SimpleListMenu />
        <SimpleListMenu />
        <SimpleListMenu />
        <SimpleListMenu />
      </ButtonGroup>
    </>
  );
}
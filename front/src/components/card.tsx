import Typography from '@mui/material/Typography';
import { Button, ButtonGroup, Divider } from '@mui/material';
import SimpleListMenu from './menu';

export default function ImgMediaCard(menuData: Menu) {

  function handleClick(_event: any, item: Command): void {
    console.log(item)
  }

  return (
    <>
      <Divider sx={{
        '&::before, &::after': {
          backgroundColor: 'black', // 设置前面元素的背景颜色
          height: '2px' // 设置前面元素的高度
        },
      }}>
        <Typography gutterBottom variant="h6" component="div">
          {menuData.label}
        </Typography>
      </Divider>
      <ButtonGroup variant='text'>
        {
          menuData.children.map((element) => (element.type === 'menu' ?
            <SimpleListMenu label={element.label} children={(element as Menu).children} type={'menu'} /> : <>
              <Button
                onClick={(event) => handleClick(event, element)}
              >{element.label}</Button>
            </>)
          )
        }
      </ButtonGroup>
    </>
  );
}
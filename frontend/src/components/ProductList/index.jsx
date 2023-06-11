import { ButtonBase, Grid, Paper, Typography } from '@mui/material'
import { styled } from '@mui/material/styles';



const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  });

function ProductList({productList}) {
  
    console.log("This is a product list",productList)
  return (
    <>
    {productList.map((product)=>(
                
        product.proddata.price.price!=0?(
            
        <Paper
        sx={{
          p: 2,
          margin: 3,
          borderColor: "#000",
          backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        }}
        key={product.proddata.price.displayID}
        >
        <ButtonBase sx={{ width: '100%', height: 128 }} onClick={()=>{window.open(product.proddata.title.href,"_blank")}}>
        <Grid container spacing={2}>
            
          <Grid item sx={{ width: 128, height: 128 }}>
              <Img alt="complex" src={product.proddata.image.img_src} />
        
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1" component="div" align="left">
                  {product.proddata.title.name}
                </Typography>
                <Typography variant="body2" gutterBottom align="left">
                  {product.proddata.company.comp}
                </Typography>
                <Typography variant="body2" color="text.secondary" align="left">
                  ID: {product.proddata.price.displayID}
                </Typography>
              </Grid>
              <Grid item>
                <Typography sx={{ cursor: 'pointer' }} variant="body2" align="left">
                  Buy
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1" component="div">
              {product.proddata.price.price}/{product.proddata.price.unitType}
              </Typography>
            </Grid>
          </Grid>
          
        </Grid>
        </ButtonBase>
      </Paper>):(<></>)))}
      </>
      )
}

export default ProductList
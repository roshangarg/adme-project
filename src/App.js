import * as React from 'react';
import AppBar from '@mui/material/AppBar';

import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import AdbIcon from '@mui/icons-material/Adb';
import axios from 'axios';
import { useState,useEffect } from 'react';
import { Box, Grid, Pagination } from '@mui/material';
function App() {
  const [images, setImages] = useState(null)
  const [page, setPage] = useState(1);
const getImages = async() => {
 const res =  await axios.get('https://picsum.photos/v2/list')
 if(res.status === 200 ){
  setImages(res.data)
  
 }

}
  useEffect(() => {
   getImages()
  }, [])
  
  return (
    <div className="App">
      {/*appbar   */}
      
      <AppBar elevation={0} position="static">
        <Toolbar style={{ background: "black", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <AdbIcon sx={{ display: { md: 'flex' }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              LOGO
            </Typography>
          </div>
          <Typography style={{ textAlign: "center", flex: 1 }}>
            Company title
          </Typography>
        </Toolbar>
      </AppBar>

<Box style={{margin:"2rem"}}>


     <Grid container  spacing={2}>
     {images && images.slice((`${page}` - 1) * 5, `${page}` * 5).map((item ) => (
  <Grid item sm={12} md={4} xs={4}  key={item.id}>
    <img src={item.download_url} width="100%" height={"300"} alt=''/>
  </Grid>
))}

     </Grid>

     </Box>
     <Box style={{ display:"flex"  , justifyContent:"center"}}>
      {images && <Pagination  size="large"
            count={
            images.length % 10 === 0
                ? Math.round(images.length / 5)
                : Math.round(images.length / 5) + 1
            }
            color="primary"
            onChange={(event, value) => setPage(value)}/> }
     
     </Box>

 </div>
     

    
  );
}

export default App;

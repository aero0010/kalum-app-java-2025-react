import { Button, Grid, TextField, Typography } from "@mui/material";
import { ImageGallery } from "./ImageGallery";
import { SearchOffOutlined } from "@mui/icons-material";

export const DashBoard = () => {
    return(
        <Grid container direction="row" justifyContent="space-between" alignItems="center" sx={{mb:1}}>
            <Grid>
                <Typography>Carreras Técnicas</Typography>
            </Grid>
            <Grid>
                <Button color="primary" sx={{padding:2}}>
                    <SearchOffOutlined sx={{fontSize:30, mr:1}}/>
                    Buscar
                </Button>
            </Grid>
            <Grid container size={12}>
                <TextField type="text" variant="filled" fullWidth placeholder="Ingrese carrera Técnica" label="Carrera" sx={{border: 'none', mb:1}}/>
            </Grid>
            <ImageGallery/>
        </Grid>
    )
}
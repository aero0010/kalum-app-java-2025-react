import { Grid, Card } from '@mui/material';
import eleccom from '../../assets/images/eleccom.jpg';
import electricidad from '../../assets/images/electricidad.jpg';
import tics from '../../assets/images/tics.jpg';
import mecanica from '../../assets/images/mecanica.jpg';
import logotipo from '../../assets/images/logotipo.png';
import { Box, Button, CardActions, CardContent, CardMedia, colors, Typography } from '@mui/material';

interface ImageCareerItem{
    id: string;
    img: string;
    tittle: string;
    descripcion: string;
}

const itemData: ImageCareerItem[] = [
    {
        id: '1',
        img: eleccom,
        tittle: 'Electronica Industrial',
        descripcion: 'Curso en el área de ELECTRÓNICA INDUSTRIAL con estándares industriales a nivel global.'
    },{
        id: '2',
        img: electricidad,
        tittle: 'Electricidad Industrial',
        descripcion: 'Curso en el área de ELECTRICIDAD INDUSTRIAL con estándares industriales a nivel global.'
    },{
        id: '3',
        img: eleccom,
        tittle: 'Desarrollo de Software',
        descripcion: 'Curso en el área de DESARROLLO DE SOFTWARE con estándares industriales a nivel global.'
    },{
        id: '4',
        img: eleccom,
        tittle: 'Mecánica Automotriz',
        descripcion: 'Curso en el área de MECÁNICA AUTOMOTRIZ con estándares industriales a nivel global.'
    }
]

export const ImageGallery: React.FC = () => {
    return(
        <Box sx={{width: "100%", textAlign:"center"}}>
            <Box sx={{mt:2, mb:4}}>
                <img src={logotipo} alt='Tecnológico Kalum' style={{width: '250px', maxWidth:'90%', marginTop: '8px'}}/>
                <Typography variant='h4' sx={{fontWeight: 'bold', mt:1}}> </Typography>
            </Box>
            <Grid container spacing={3} columns={12} sx={{ padding: 3, display: 'flex', justifyContent: 'center', flexWrap: 'wrap'}}>
                {itemData.map((item) => (
                    <Grid key={item.id} sx={{ display: 'flex'}}>
                        <Card sx={{ borderRadius: 2, overflow: 'hidden' }}>
                            <CardMedia component="img" image={item.img} height='220' alt={item.tittle} sx={{ width: '100%', aspectRatio:'16/9', objectFit: 'cover' }} />                       
                            <CardContent>
                                <Typography variant='h6' sx={{ fontWeight: 'bold', mb: 0.5 }}>{item.tittle}</Typography>
                                <Typography variant='body2' sx={{ color: 'text.secondary'}}>Tecnológico Kalum</Typography>
                            </CardContent>
                            <div style={{ background: '#F9A825', padding:'16px', textAlign:'center'}}>
                                <Typography variant='body2' sx={{ color: 'white', fontWeight: 600 }}>
                                    {item.descripcion}
                                </Typography>
                            </div>
                            <CardActions sx={{ justifyContent: 'space-between'}}>
                                <Button size='small'>ASIGNARME</Button>
                                <Button size='small'>COMPARTIR</Button>
                            </CardActions>
                        </Card>
                    </Grid>    
                ))}
            </Grid>
        </Box>
    );
}
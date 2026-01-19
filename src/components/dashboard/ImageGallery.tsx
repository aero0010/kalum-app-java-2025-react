import { Grid, Card } from '@mui/material';
import eleccom from '../../assets/images/eleccom.jpg';
import electricidad from '../../assets/images/electricidad.jpg';
import tics from '../../assets/images/tics.jpg';
import mecanica from '../../assets/images/mecanica.jpg';
import logotipo from '../../assets/images/logotipo.png';
import { Box, Button, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

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
        img: tics,
        tittle: 'Desarrollo de Software',
        descripcion: 'Curso en el área de DESARROLLO DE SOFTWARE con estándares industriales a nivel global.'
    },{
        id: '4',
        img: mecanica,
        tittle: 'Mecánica Automotriz',
        descripcion: 'Curso en el área de MECÁNICA AUTOMOTRIZ con estándares industriales a nivel global.'
    }
]

export const ImageGallery: React.FC = () => {
    const navigate = useNavigate();

    const handlerAsigjsonedCareer = (careerId: string) => {
        const userString = localStorage.getItem('user');
        console.log(userString);
        if (userString) {
            const user = JSON.parse(userString);
            if (user.roles === 'ROLE_ACCOUNT') {
                Swal.fire({
                    icon: "warning",
                    title: "Asignacion de examen de admisión",
                    text: "Vemos que es la primera vez que te asignaras un curso en la plataforma, es necesario que realices un examen de admisión previo, selecciona a continuacion una fecha de exámen",
                    footer: '<a href="#">Kalum v1</a>'
                }).then(response => {
                    if (response.isConfirmed) {
                        navigate(`/examen-admision/${careerId}`);
                    }
                });
            }
        }else{
            navigate('/login')
        }
    }
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
                            <CardMedia component="img" image={item.img} height='220' alt={item.tittle} sx={{ width: '100%', height: 250, objectFit: "contain", backgroundColor: "#000", padding: 1 }} />                       
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
                                <Button size='small' onClick={() => handlerAsigjsonedCareer(item.id)}>ASIGNARME</Button>
                                <Button size='small'>COMPARTIR</Button>
                            </CardActions>
                        </Card>
                    </Grid>    
                ))}
            </Grid>
        </Box>
    );
}
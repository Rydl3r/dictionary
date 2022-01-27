import { Card, CardContent, Typography, Box } from '@mui/material';
import Definition from './../models/Definition';

interface PropTypes {
    data: Definition
}

const DefinitionComponent = (props: PropTypes) => {
    return (
        <Card sx={{ minWidth: 275, maxWidth: 410, mx: "auto", my: 3 }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Definition
                </Typography>
                <Typography variant="h5" component="div">
                    {props.data.word}
                </Typography>
                <Typography variant="body2">
                    {props.data.definition}
                </Typography>
                {props.data.example.length > 0
                    ? <Box>
                        <Typography variant="body2" sx={{ fontSize: 14, pt: 1 }} color="text.secondary" gutterBottom>
                            Example
                        </Typography>
                        <Typography variant="body2">
                            {props.data.example}
                        </Typography>
                    </Box>
                    : ""}
            </CardContent>
        </Card>
    );
};

export default DefinitionComponent;

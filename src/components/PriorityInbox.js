import { Card, CardContent, Typography, Chip, Stack } from '@mui/material';

const PriorityInbox = ({ notifications }) => {
    return (
        <Stack spacing={2}>
            {notifications.map((notif) => (
                <Card key={notif.ID} sx={{ borderLeft: '5px solid #1976d2' }}>
                    <CardContent>
                        <Typography variant="h6">{notif.Message}</Typography>
                        <Stack direction="row" spacing={1} mt={1}>
                            <Chip label={notif.Type} color="primary" size="small" />
                            <Typography variant="caption" color="text.secondary">
                                {new Date(notif.Timestamp).toLocaleString()}
                            </Typography>
                        </Stack>
                    </CardContent>
                </Card>
            ))}
        </Stack>
    );
};

export default PriorityInbox;
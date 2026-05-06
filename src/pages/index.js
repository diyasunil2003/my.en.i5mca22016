import { useEffect, useState } from "react";
import { Container, Typography, Pagination, Box, Tabs, Tab, Stack, Card, CardContent, Chip } from "@mui/material";
import { fetchNotifications } from "../services/api.service";
import logger from "../middleware/logger";

export default function Home() {
    const [notifications, setNotifications] = useState([]);
    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [typeFilter, setTypeFilter] = useState(""); // "" means All
    const [viewedIds, setViewedIds] = useState([]);
    const [loading, setLoading] = useState(true);

    const LIMIT = 10;

    // Load viewed IDs from LocalStorage
    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("viewedNotifications") || "[]");
        setViewedIds(saved);
        loadData();
    }, [page, typeFilter]);

    const loadData = async () => {
        setLoading(true);
        try {
            const data = await fetchNotifications(page, LIMIT, typeFilter);
            setNotifications(data.notifications);
            // Assuming API provides a total count for pagination, else estimate
            setTotalCount(100);
        } catch (error) {
            logger.error("UI Load Failed", error);
        } finally {
            setLoading(false);
        }
    };

    const handleMarkAsRead = (id) => {
        if (!viewedIds.includes(id)) {
            const updated = [...viewedIds, id];
            setViewedIds(updated);
            localStorage.setItem("viewedNotifications", JSON.stringify(updated));
            logger.info(`Notification ${id} marked as read`, "UI");
        }
    };

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
                Campus Notifications
            </Typography>

            {/* Filter Tabs */}
            <Tabs
                value={typeFilter}
                onChange={(e, val) => { setTypeFilter(val); setPage(1); }}
                sx={{ mb: 3 }}
            >
                <Tab label="All" value="" />
                <Tab label="Placement" value="Placement" />
                <Tab label="Result" value="Result" />
                <Tab label="Event" value="Event" />
            </Tabs>

            <Stack spacing={2}>
                {notifications.map((notif) => (
                    <Card
                        key={notif.ID}
                        onClick={() => handleMarkAsRead(notif.ID)}
                        sx={{
                            cursor: 'pointer',
                            opacity: viewedIds.includes(notif.ID) ? 0.6 : 1,
                            borderLeft: viewedIds.includes(notif.ID) ? 'none' : '5px solid #1976d2',
                            backgroundColor: viewedIds.includes(notif.ID) ? '#f5f5f5' : '#fff'
                        }}
                    >
                        <CardContent>
                            <Stack direction="row" justifyContent="space-between" alignItems="center">
                                <Typography variant="h6">{notif.Message}</Typography>
                                {!viewedIds.includes(notif.ID) && <Chip label="New" color="error" size="small" />}
                            </Stack>
                            <Typography variant="caption" color="text.secondary">
                                {notif.Type} • {new Date(notif.Timestamp).toLocaleString()}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </Stack>

            {/* Pagination */}
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                <Pagination
                    count={Math.ceil(totalCount / LIMIT)}
                    page={page}
                    onChange={(e, val) => setPage(val)}
                    color="primary"
                />
            </Box>
        </Container>
    );
}
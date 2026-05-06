// Change this line
const API_URL = "/api/notifications";

export const fetchNotifications = async (page = 1, limit = 10, type = "") => {
    logger.info(`Fetching through proxy: page ${page}`, "STAGE-2");
    try {
        // Next.js will now forward this to http://20.207.122.201/...
        const url = `${API_URL}?page=${page}&limit=${limit}${type ? `&notification_type=${type}` : ''}`;
        const response = await axios.get(url);

        return {
            notifications: response.data.notifications || [],
            total: response.data.total || 100
        };
    } catch (error) {
        logger.error("Proxy Fetch Error", error);
        return { notifications: [], total: 0 };
    }
};
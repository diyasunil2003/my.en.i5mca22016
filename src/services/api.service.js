import axios from 'axios';
import logger from '../middleware/logger'; // Using the mandatory logger

const API_URL = "http://20.207.122.201/evaluation-service/notifications";

// Weights for Priority Logic
const WEIGHTS = {
    'Placement': 3,
    'Result': 2,
    'Event': 1
};

export const getPriorityNotifications = async (limit = 10) => {
    logger.info("Initiating priority notification fetch", "STAGE-1");

    try {
        const response = await axios.get(API_URL);
        const notifications = response.data.notifications;

        // Sorting Logic: Priority = Weight + Recency
        const sorted = notifications.sort((a, b) => {
            const weightA = WEIGHTS[a.Type] || 0;
            const weightB = WEIGHTS[b.Type] || 0;

            if (weightB !== weightA) {
                return weightB - weightA; // Sort by weight (3 > 2 > 1)
            }
            // Tie-breaker: Recency (Latest first)
            return new Date(b.Timestamp) - new Date(a.Timestamp);
        });

        const topNotifications = sorted.slice(0, limit);
        logger.info(`Successfully prioritized top ${topNotifications.length} notifications`, "STAGE-1");

        return topNotifications;
    } catch (error) {
        logger.error("Failed to fetch or sort notifications", error);
        throw error;
    }
};
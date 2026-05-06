// src/services/api.service.js
import axios from 'axios';
import logger from '../middleware/logger';

const API_URL = "http://20.207.122.201/evaluation-service/notifications";

export const fetchNotifications = async (page = 1, limit = 10, type = "") => {
    logger.info(`Fetching page ${page} with type: ${type || 'All'}`, "STAGE-2");
    try {
        // Using query parameters as specified in Stage 2 instructions
        const url = `${API_URL}?page=${page}&limit=${limit}${type ? `&notification_type=${type}` : ''}`;
        const response = await axios.get(url);

        logger.info("Successfully fetched data for UI", "STAGE-2");
        return response.data;
    } catch (error) {
        logger.error("API Fetch Error", error);
        throw error;
    }
};
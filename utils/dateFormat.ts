// utils/dateFormat.ts

/**
 * Formats a timestamp into a readable date string.
 * Example output: "Dec 21, 2023 at 11:30 pm"
 * @param timestamp - Date or string to format
 * @returns Formatted date string
 */
export const formatDate = (timestamp: Date | string): string => {
    // Months mapping
    const months = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
    ];

    // Ensure timestamp is a Date object
    const dateObj = typeof timestamp === 'string' ? new Date(timestamp) : timestamp;

    const monthName = months[dateObj.getMonth()];
    const dayOfMonth = dateObj.getDate();
    const year = dateObj.getFullYear();

    // Get hours and minutes
    let hour = dateObj.getHours();
    const minutes = dateObj.getMinutes().toString().padStart(2, '0');

    // Convert to 12-hour format
    const periodOfDay = hour >= 12 ? 'pm' : 'am';
    hour = hour % 12 || 12; // Convert 0 to 12

    // Construct formatted string
    return `${monthName} ${dayOfMonth}, ${year} at ${hour}:${minutes} ${periodOfDay}`;
};

/**
 * Returns an ISO 8601 formatted date string.
 * Example output: "2023-12-21T23:30:00.000Z"
 * @param timestamp - Date or string to format
 * @returns ISO formatted date string
 */
export const getISODate = (timestamp: Date | string): string => {
    // Ensure timestamp is a Date object
    const dateObj = typeof timestamp === 'string' ? new Date(timestamp) : timestamp;

    return dateObj.toISOString();
};

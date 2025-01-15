// utils/dateFormat.ts

/**
 * Formats a timestamp into a readable date string
 * Example output: "Dec 21, 2023 at 11:30 pm"
 * @param timestamp - Date to format
 * @returns Formatted date string
 */
export const formatDate = (timestamp: Date): string => {
    // Get month, day, and year
    const months = {
        0: 'Jan',
        1: 'Feb',
        2: 'Mar',
        3: 'Apr',
        4: 'May',
        5: 'Jun',
        6: 'Jul',
        7: 'Aug',
        8: 'Sep',
        9: 'Oct',
        10: 'Nov',
        11: 'Dec'
    };

    const dateObj = new Date(timestamp);
    const monthName = months[dateObj.getMonth() as keyof typeof months];

    const dayOfMonth = dateObj.getDate();
    const year = dateObj.getFullYear();

    // Get hours and minutes
    let hour = dateObj.getHours();
    const minutes = dateObj.getMinutes().toString().padStart(2, '0');

    // Convert to 12-hour format
    const periodOfDay = hour >= 12 ? 'pm' : 'am';
    hour = hour % 12 || 12; // Convert 0 to 12

    const formattedTimeStamp = `${monthName} ${dayOfMonth}, ${year} at ${hour}:${minutes} ${periodOfDay}`;

    return formattedTimeStamp;
};

/**
 * Alternative format that returns an ISO string
 * Example output: "2023-12-21T23:30:00.000Z"
 * @param timestamp - Date to format
 * @returns ISO formatted date string
 */
export const getISODate = (timestamp: Date): string => {
    return new Date(timestamp).toISOString();
};
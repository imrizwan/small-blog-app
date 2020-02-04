export const getDate = (date) => {

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    date = new Date(date);
    return `${date.getDate()} / ${monthNames[date.getMonth()]} / ${date.getFullYear()}`
}
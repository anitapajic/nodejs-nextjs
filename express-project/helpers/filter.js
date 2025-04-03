const getFilter = (query, userId) => {
    const filter = { user_id: userId };
    if (query.searchTerm) {
        const regex = { $regex: query.searchTerm, $options: "i" };
        filter.$or = [{ name: regex }, { email: regex }, { phone: regex }];
    }
    return filter;
};

module.exports = getFilter;
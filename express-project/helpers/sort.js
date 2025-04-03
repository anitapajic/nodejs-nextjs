const getSort = (query) => {
    if (!query.sortBy) return { createdAt: -1 }; 
    const [field, order] = query.sortBy.split(":");
    return { [field]: order === "desc" ? -1 : 1 };
};

module.exports = getSort;
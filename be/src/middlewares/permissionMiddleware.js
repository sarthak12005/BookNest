const permission = (action, subject) => {
    return (req, res, next) => {
        try {
            if (req.ability.can(action, subject)) {
                return next();
            }
            return res.status(403).json({ message: "Forbidden: Not allowed" });
        } catch (err) {
            return res.status(403).json({ message: "Access denied" });
        }
    };
};

module.exports = permission;

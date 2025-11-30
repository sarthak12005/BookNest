const { AbilityBuilder, Ability } = require('@casl/ability');

function defineAbilitiesFor(user) {
    const { can, cannot, build } = new AbilityBuilder(Ability);

    if (!user) {
        // Guest permissions (not logged in)
        can("read", "Book"); 
        return build();
    }

    // ========================
    // ROLE: ADMIN
    // ========================
    if (user.role === "admin") {
        can("manage", "all"); // admin can do everything
    }

    // ========================
    // ROLE: USER
    // ========================
    if (user.role === "user") {
        can("read", "Book");         // user can read books
        can("update", "User", { _id: user._id }); // can update self profile
        cannot("delete", "User");    // user cannot delete accounts
    }

    return build();
}

module.exports = { defineAbilitiesFor };

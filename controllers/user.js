exports.getUsers = (req, res, next) => {
    res.render('user/user-list', { title: 'Contacts list' });
};

exports.getAddUser = (req, res, next) => {
    res.render('user/user-add', { title: 'Add contact' });
};

exports.getUsers = (req, res, next) => {
    res.render('user/user-list', { page: 'list' });
};

exports.getAddUser = (req, res, next) => {
    res.render('user/user-add', { page: 'add contact' });
};

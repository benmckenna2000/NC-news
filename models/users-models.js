
exports.fetchUser = (username) => {
    return connection
    .select("*")
    .from('users')
    .where('username', '=', username)
    .returning("*")
    .then((user) => {
        console.log(user)
      return user;
    });
   
}

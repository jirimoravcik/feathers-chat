// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return async context => {
    const { data } = context;

    // Throw an error if we didn't get a text
    if(!data.text) {
      throw new Error('A message must have a text');
    }

    // The authenticated user
    const user = context.params.user;
    // The actual message text
    const text = context.data.text
      // Messages can't be longer than 400 characters
      .substring(0, 400);

    // Override the original data (so that people can't submit additional stuff)
    context.data = {
      text,
      // Set the user id
      user_id: user.id,
      // Add the current date is forwared to be done by MSSQL!
    };

    // Best practise, hooks should always return the context
    return context;
  };
};

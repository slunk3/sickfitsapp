const { forwardTo } = require('prisma-binding');
const { hasPermission } = require('../utils');

const Query = {
  items: forwardTo('db'),
  item: forwardTo('db'),
  itemsConnection: forwardTo('db'),
  me(parent, args, ctx, info) {
    // check if there is a current user id
    if (!ctx.request.userId) {
      return null;
    }
    return ctx.db.query.user(
      {
        where: { id: ctx.request.userId },
      },
      info
    );
  },
  async users(parent, args, ctx, info) {
    // check if logged in
    if (!ctx.request.userId) {
      throw new Error('You must be logged in ');
    }
    // check of the user has the permissions to query all the users
    hasPermission(ctx.request.user, ['ADMIN', 'PERMISSIONUPDATE']);
    // if user has permission, query users
    return ctx.db.query.users({}, info);
  },
  async order(parent, args, ctx, info) {
    // make sure they are logged in
    if (!ctx.request.userId) {
      throw new Error('You must be logged in to do this');
    }
    // query the current order
    const order = await ctx.db.query.order(
      {
        where: { id: args.id },
      },
      info
    );
    // check of theu have the permissions to see this order
    const ownsOrder = order.user.id === ctx.request.userId;
    const hasPermissionsToSeeOrder = ctx.request.user.permissions.includes(
      'ADMIN'
    );

    if (!ownsOrder || !hasPermissionsToSeeOrder) {
      throw new Error("You can't see this one");
    }
    // return the order
    return order;
  },
  async orders(parent, args, ctx, info) {
    const { userId } = ctx.request;
    if (!userId) {
      throw new Error('You must be logged in to do this');
    }

    return ctx.db.query.orders(
      {
        where: { user: { id: userId } },
      },
      info
    );
  },
};

module.exports = Query;

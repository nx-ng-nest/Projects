module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '5f2ca16d55ba5be9d34fe2a4164a93ec'),
  },
});

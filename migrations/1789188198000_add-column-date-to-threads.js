export const up = (pgm) => {
  pgm.addColumns('threads', {
    date: {
      type: 'TEXT',
      notNull: true,
      default: pgm.func('now()::text'),
    },
  });
};

export const down = (pgm) => {
  pgm.dropColumns('threads', ['date']);
};

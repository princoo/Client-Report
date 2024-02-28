const paginate = ({ page, pageSize, sortOrder }) => {
  const offset = (page - 1) * pageSize;
  const limit = pageSize;
  const order = [['createdAt', sortOrder]]; // Default sorting order if not provided

  return {
    offset,
    limit,
    order,
  };
};

export default paginate;

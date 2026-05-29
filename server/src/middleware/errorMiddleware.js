const notFound = (req, res, next) => {
  res.status(404);
  next(new Error(`Not found: ${req.originalUrl}`));
};

const errorHandler = (err, req, res, _next) => {
  if (err.name==="CastError"&&err.kind==="ObjectId")
    return res.status(400).json({ message:"Invalid ID format." });
  if (err.name==="ValidationError")
    return res.status(400).json({ message:Object.values(err.errors).map(e=>e.message).join(" | ") });
  if (err.code===11000)
    return res.status(409).json({ message:"Duplicate entry." });

  const status = res.statusCode!==200 ? res.statusCode : 500;
  res.status(status).json({
    message: err.message || "Internal server error",
    ...(process.env.NODE_ENV!=="production" && { stack:err.stack }),
  });
};

module.exports = { notFound, errorHandler };
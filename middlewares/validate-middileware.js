const validate = (schema) => async (req, res, next) => {
  try {
    const parseBody = await schema.parseAsync(req.body);
    req.body = parseBody;
    next();
  } catch (err) {
    const status = 422;
    const message = 'Fill the input fields correctly';
    const extraDetails = err.errors[0].message;

    const error = { status, message, extraDetails };


    console.log('error', error);
    //res.status(400).json({ message: msg });
    next(error);
  }
};

module.exports = { validate };

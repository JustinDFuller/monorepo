export const options = {
  controllers: {},
  // Conditionally turn on stubs (mock mode)
  useStubs: process.env.USE_STUBS,
};

export const error = {
  "properties": {
      "message": {
        "type": "string"
      }
    },
    "required": ["message"]
};

export default {
  options,
  error,
};

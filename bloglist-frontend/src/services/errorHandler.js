export default (err) => {
  throw Error(
    err.response
      ? err.response.data.error
      : err.request
      ? err.request.statusText
      : err.message
  );
};

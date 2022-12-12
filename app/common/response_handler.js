"use strict";

const statusCodes = {
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

function ResponseHandler() {
  return async (ctx, next) => {
    ctx.res.statusCodes = statusCodes;
    ctx.statusCodes = ctx.res.statusCodes;

    /**
     * Format response success
     */
    ctx.res.success = ({ statusCode, data = null, message = "Success" }) => {
      const status = true;

      if (!!statusCode && statusCode < 400) {
        ctx.status = statusCode;
      } else if (!(ctx.status < 400)) {
        ctx.status = statusCodes.OK;
      }
      ctx.body = { error: { status, message }, data };
    };

    /**
     * Format response fail
     */
    ctx.res.fail = ({ statusCode, validates = null, data = null, message = "FAIL" }) => {
      const status = false;
      if (!!statusCode && statusCode >= 400 && statusCode < 500) {
        ctx.status = statusCode;
      } else if (!(ctx.status >= 400 && ctx.status < 500)) {
        ctx.status = statusCodes.BAD_REQUEST;
      }
      if (!validates) {
        ctx.body = { error: { status, message }, data };
      } else {
        ctx.body = { error: { status, message, validates }, data };
      }
    };

    /**
     * Format response error
     */
    ctx.res.error = ({ statusCode, validates = null, data = null, message = "FAIL" }) => {
      const status = false;
      if (!!statusCode && statusCode >= 500 && statusCode < 600) {
        ctx.status = statusCode;
      } else if (!(ctx.status >= 500 && ctx.status < 600)) {
        ctx.status = statusCodes.INTERNAL_SERVER_ERROR;
      }
      if (!validates) {
        ctx.body = { error: { status, message }, data };
      } else {
        ctx.body = { error: { status, message, validates }, data };
      }
    };

    /**
     * Format response 200
     */
    ctx.res.ok = (params = {}) => {
      ctx.res.success({
        ...params,
        statusCode: statusCodes.OK,
      });
    };

    /**
     * Format response 400
     */
    ctx.res.badRequest = (params = {}) => {
      ctx.res.fail({
        ...params,
        statusCode: statusCodes.BAD_REQUEST,
      });
    };

    /**
     * Format response 401
     */
    ctx.res.unauthorized = (params = {}) => {
      ctx.res.fail({
        ...params,
        statusCode: statusCodes.UNAUTHORIZED,
      });
    };

    /**
     * Format response 403
     */
    ctx.res.forbidden = (params = {}) => {
      ctx.res.fail({
        ...params,
        statusCode: statusCodes.FORBIDDEN,
      });
    };

    /**
     * Format response 404
     */
    ctx.res.notFound = (params = {}) => {
      ctx.res.fail({
        ...params,
        statusCode: statusCodes.NOT_FOUND,
      });
    };

    /**
     * Format response 500
     */
    ctx.res.internalServerError = (params = {}) => {
      ctx.res.error({
        ...params,
        statusCode: statusCodes.INTERNAL_SERVER_ERROR,
      });
    };

    await next();
  };
}

const convertMessage = (message, statusCode) => {
  if (!message) return defaultMessage(statusCode);
  if (message.indexOf('\n') > -1) {
    return message.split('\n');
  }
  return message;
}

const defaultMessage = (code) => {
  switch (code) {
    case 400: return 'Bad request';
    case 401: return 'Unauthorized';
    case 403: return 'Permission denied!';
    case 404: return 'Data not found';
    case 405: return 'Method not allowed';
    case 500: return 'System exception';
    case 502: return 'Bad gateway';
    default: return 'The operation successful';
  }
};

module.exports = ResponseHandler;

module.exports = {
    notFoundResponse: (rows) => {
      if (rows && rows.length === 0) {
        return {
          error_code: 'RIDES_NOT_FOUND_ERROR',
          message: 'Could not find any rides',
        };
      }

      return rows;
    },
    serverErrorResponse: () => ({
      error_code: 'SERVER_ERROR',
      message: 'Unknown error',
    }),
    validateQueryParamPage: (page) => {
        const currPage = parseInt(page, 10);
        if (Number.isNaN(currPage) || (!Number.isNaN(currPage) && currPage < 0)) {
          return {
            error_code: 'VALIDATION_ERROR',
            message: 'Value of page must be a positive integer',
          };
        }

        return true;
      },

      validateQueryParamQty: (qty) => {
        const currQty = parseInt(qty, 10);
        if (Number.isNaN(currQty) || (!Number.isNaN(currQty) && currQty < 0)) {
          return {
            error_code: 'VALIDATION_ERROR',
            message: 'Value of qty must be a positive integer',
          };
        }

        return true;
      },

      validateStartLatLong: (lat, long) => {
        const startLatitude = Number(lat);
        const startLongitude = Number(long);

        const error = {
          status: 400,
          err_msg: {
            error_code: 'VALIDATION_ERROR',
            message: 'Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively',
          },
        };

        let payload = {};

        if (Number.isNaN(startLatitude) || Number.isNaN(startLongitude)) {
          payload = error;
        }

        if (!Number.isNaN(startLatitude)) {
          if (startLatitude < -90 || startLatitude > 90) {
            payload = error;
          }
        }

        if (!Number.isNaN(startLongitude)) {
          if (startLongitude < -180 || startLongitude > 180) {
            payload = error;
          }
        }

        return payload;
      },
      validateEndLatLong: (lat, long) => {
        const endLatitude = Number(lat);
        const endLongitude = Number(long);
        const error = {
          status: 400,
          err_msg: {
            error_code: 'VALIDATION_ERROR',
            message: 'End latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively',
          },
        };

        let payload = {};

        if (Number.isNaN(endLatitude) || Number.isNaN(endLongitude)) {
          payload = error;
        }

        if (!Number.isNaN(endLatitude)) {
          if (endLatitude < -90 || endLatitude > 90) {
            payload = error;
          }
        }

        if (!Number.isNaN(endLongitude)) {
          if (endLongitude < -180 || endLongitude > 180) {
            payload = error;
          }
        }

        return payload;
      },
};

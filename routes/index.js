"use strict";

function includeAllRoutes(app, connection) {
	require('./user-api.js')(app, connection);
	require('./task-api.js')(app, connection);
	require('./views.js')(app, connection);
}
module.exports = function (app, connection) {
	includeAllRoutes(app, connection);
};

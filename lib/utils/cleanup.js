var sander = require( 'sander' ),
	Promise = sander.Promise;

module.exports = function cleanup ( dir ) {
	return sander.mkdir( dir ).then( function () {
		return sander.readdir( dir ).then( function ( files ) {
			var promises = files.filter( function ( filename ) { return filename.indexOf( '.cache' ) !== -1; }).map( function ( filename ) {
				return sander.rimraf( dir, filename );
			});

			return Promise.all( promises );
		});
	});
};

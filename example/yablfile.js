var yabl = require( 'yabl' ),
	path = require( 'path' ),

	src, styles, merged;

tree = yabl( 'src/**' );

styles = yabl( 'src/scss/**/*.scss' )
	.transform( compileSass, { src: 'src/scss/main.scss', dest: 'min.css' });

merged = yabl([ tree, styles ]);

function compileSass ( srcDir, destDir, options, done ) {
	var sass = require( 'node-sass' );

	console.log( 'srcDir', srcDir );
	console.log( 'options', options );

	sass.render({
		file: path.join( srcDir, options.src ),
		success: function ( css ) {
			console.log( 'css', css );
			yabl.helpers.write( destDir, options.dest, css ).then( done );
		}
	});
}


module.exports = merged;

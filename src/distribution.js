this.d$ = this.jDist = (function( Math, j$ ) {

var jDist = function() {
	// TODO: finish implemenation of jDist object
	};

j$.extend( jDist, {
	beta : {
		pdf : function( x, alpha, beta ) {
			return j$.gammafn( alpha + beta ) / ( j$.gammafn( alpha ) * j$.gammafn( beta )) * Math.pow( x, alpha - 1 ) * Math.pow( 1 - x, beta - 1 );
		},

		cdf : function( x, alpha, beta ) {
			return j$.incompleteBeta( x, alpha, beta );
		},

		mean : function( alpha, beta ) {
			return alpha / ( alpha + beta );
		},

		median : function( alpha, beta ) {
			// TODO: implement beta median
		},

		mode : function( alpha, beta ) {
			return ( alpha * beta ) / ( Math.pow( alpha + beta, 2 ) * ( alpha + beta + 1 ));
		},

		variance : function( alpha, beta ) {
			return ( alpha * beta ) / ( Math.pow( alpha + beta, 2 ) * ( alpha + beta + 1 ) );
		}
	},

	cauchy : {
		pdf : function( x, xn, l ) {
			return ( l / ( Math.pow( x - xn, 2) + Math.pow( l, 2 ))) / Math.PI;
		},

		cdf : function( x, xn, l ) {
			return Math.atan(( x - xn) / l ) / Math.PI + 0.5;
		}
	},

	chisquare : {
		pdf : function( x, k ) {
			return (Math.pow( x, k / 2 - 1) * Math.exp( -x / 2 )) / ( Math.pow( 2, k / 2) * j$.gammafn( k / 2 ));
		},

		cdf : function( x, k ) {
			return j$.lgamma( x / 2, k / 2 ) / j$.gammafn( k / 2 );
		}
	},

	exponential : {
		pdf : function( x, rate ) {
			return x < 0 ? 0 : rate * Math.exp( -rate * x );
		},

		cdf : function( x, rate ) {
			return x < 0 ? 0 : 1 - Math.exp( -rate * x );
		},

		mean : function( rate ) {
			return 1 / rate;
		},

		median : function ( rate ) {
			return ( 1 / rate ) * Math.log(2);
		},

		mode : function( rate ) {
			return 0;
		},

		variance : function( rate ) {
			return Math.pow( rate, -2 );
		}
	},

	gamma : {
		pdf : function( x, shape, scale ) {
			return Math.pow( x, shape - 1 ) * ( Math.exp( -x / scale ) / ( j$.gammafn( shape ) * Math.pow( scale, shape ) ) );
		},

		cdf : function( x, shape, scale ) {
			return jlstat.gammap( x / scale, shape );
		},

		mean : function( shape, scale ) {
			return shape * scale;
		},

		mode : function( shape, scale ) {
			if( shape > 1 ) return ( k - 1 ) * scale;
			return undefined;
		},

		variance: function( shape, scale ) {
			return shape * scale * scale;
		}
	},

	lognormal : {
		pdf : function( x, mu, sigma ) {
			return ( 1 / ( x * sigma * Math.sqrt( 2 * Math.PI ) ) ) * Math.exp( -Math.pow( Math.log( x ) - mu, 2) / ( 2 * sigma*sigma ) );
		},

		cdf : function( x, mu, sigma ) {
			return 0.5 + ( 0.5 * j$.erf( ( Math.log( x ) - mu ) / Math.sqrt( 2 * sigma*sigma ) ) );
		},

		mean : function( mu, sigma ) {
			return Math.exp( mu + sigma*sigma / 2);
		},

		median : function( mu, sigma ) {
			return Math.exp(mu);
		},

		mode : function( mu, sigma ) {
			return Math.exp( mu - sigma*sigma );
		},

		variance : function( mu, sigma ) {
			return ( Math.exp( sigma*sigma ) - 1 ) * Math.exp( 2 * mu + sigma*sigma );
		}
	},

	normal : {
		pdf : function( x, mean, std ) {
			return ( 1 / ( Math.sqrt( 2 * Math.PI * std * std))) * Math.exp( -( Math.pow( x - mean, 2 ) / 2 * std * std ) );
		},

		cdf : function( x, mean, std ) {
			return 0.5 * ( 1 + j$.erf( ( x - mean ) / Math.sqrt( 2 * std * std ) ) );
		},

		mean : function( mean, std ) {
			return mean;
		},

		median : function( mean, std ) {
			return mean;
		},

		mode : function ( mean, std ) {
			return mean;
		},

		variance : function( mean, std ) {
			return std * std;
		}
	},

	weibull : {
		pdf : function( x, scale, shape ) {
			return x < 0 ? 0 : ( shape / scale ) * Math.pow(( x / scale ),( shape - 1 )) * Math.exp(-( Math.pow(( x / scale ), shape )));
		},

		cdf : function( x, scale, shape ) {
			return x < 0 ? 0 : 1 - Math.exp( -Math.pow(( x / scale ), shape ));
		},

		mean : function( scale, shape ) {
			return scale * j$.gammafn( 1 + 1 / shape );
		},

		median : function( scale, shape ) {
			return scale * Math.pow( Math.log( 2 ), 1 / shape );
		},

		mode : function( scale, shape ) {
			return ( shape > 1 ) ? scale * Math.pow(( shape - 1 ) / shape, 1 / shape ) : undefined;
		},

		variance : function( scale, shape ) {
			return scale * scale * j$.gammafn( 1 + 2 / shape ) - Math.pow( this.mean( scale, shape ), 2 );
		}
	},

	uniform : {
		pdf : function( x, a, b ) {
			return ( x < a || x > b ) ? 0 : 1 / ( b - a );
		},

		cdf : function( x, a, b ) {
			if ( x < a ) {
				return 0;
			} else if ( x < b ) {
				return ( x - a ) / ( b - a );
			};
			return 1;
		}
	},

	// uniform distribution in terms of mean and standard dev
	uniformmv : {
		pdf : function( x, m, s ) {
			var sqrtt = Math.sqrt( -3 );
			return ( -s * sqrtt <= x - m || x - m <= s * sqrtt )
				? 1 / ( 2 * s * sqrtt )
			: 0;
		},

		cdf : function( x, m, s ) {
			var sqrtt = Math.sqrt( -3 );
			return ( x - m < -s * sqrtt )
				? 0
			: ( x - m >= s * sqrtt )
				? 1
			: 0.5 * (( x - m ) / ( s * sqrtt ) + 1 );
		}
	},

	binomial : {
		pdf : function( k, n, p ) {
			return j$.combination( n, k ) * Math.pow( p, k ) * Math.pow( 1 - p, n - k );
		},

		cdf : function( x, n, p ) {
			var binomarr = [],
				k = 0,
				i = 0,
				sum = 0;
			if ( x < 0 ) {
				return 0;
			};
			if ( x < n ) {
				for ( ; k < n; k++ ) {
					binomarr[ k ] = j$.binomial( k, n, p );
				};
				for ( ; i <= x; i++ ) {
					sum += binomarr[ i ];
				};
				return sum;
			};
			return 1;
		}
	},

	negbin : {
		pdf : function( k, r, p ) {
			return k !== Math.floor( k )
				? false
			: k < 0
				? 0
			: j$.combination( k + r - 1, k ) * Math.pow( 1 - p, r ) * Math.pow( p, k );
		},

		cdf : function( x, r, p ) {
			var sum = 0,
				k = 0;
			if ( x < 0 ) return 0;
			for ( ; k <= x; k++ ) {
				sum += j$.negbin( k, r, p );
			};
			return sum;
		}
	},

	hypgeom : {
		pdf : function( k, N, m, n ) {
			return x !== Math.floor( x )
				? false
			: ( x < 0)
				? 0
			: j$.combination( m, k ) * j$.combination( N - m , n - k ) / j$.combination( N, n );
		},

		cdf : function( x, N, m, n ) {
			var sum = 0,
				k = 0;
			if ( x < 0 ) return 0;
			for ( ; k <= x; k++ ) {
				sum += j$.hypgeom( k, N, m, n );
			};
			return sum;
		}
	},

	poisson : {
		pdf : function( k, l ) {
			return Math.pow( l, k ) * Math.exp( -l ) / j$.factorial( k );
		},

		cdf : function( x, l ) {
			var sum = 0,
				k = 0;
			if ( x < 0 ) return 0;
			for ( ; k <= x; k++ ) {
				sum += j$.poisson( k, l );
			};
			return sum;
		}
	}
});

return jDist;
})( Math, jStat );

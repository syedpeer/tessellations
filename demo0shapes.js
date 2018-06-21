'use strict';

// Defining the initial-construction shapes

var tessellations = tessellations || {};

tessellations.demo = tessellations.demo || function (index) {
	return tessellations.initDemos(index);
};

// *** note this and the other buildX's are command- rather than data-functions, because they're just modifying DOM elements

tessellations.demo(0).buildShapes = function buildDemo0Shapes() {

	var unit = {

		isLoaded: false,

		build: function build() {
			var t = tessellations,
			    svg = t.idTypes().svg(),
			    pt = t.demo(0).points(),
			    g = t.geom();

			// using labeled code blocks instead of IIFEs for concision:

			buildGraphGrid: {

				g.line('gridlineHoriz', pt.gridTL(), pt.gridTR());
				g.line('gridlineVert', pt.gridTL(), pt.gridBL());

				var gridCell = pt.gridCell();

				for (var i = 0; i <= pt.gridSubdivs(); ++i) {

					svg('graphGrid').defineAnon('use', ['href', '#gridlineHoriz', 'x', 0, 'y', i * gridCell]).defineAnon('use', ['href', '#gridlineVert', 'x', i * gridCell, 'y', 0]);
				}
			}

			buildMirrorLine: {

				var radius = 2 * pt.sqLength();
				var offsetX = pt.lineCx();
				var offsetY = pt.lineCy();
				var lineStartY = -radius + offsetY;
				var lineEndY = radius + offsetY;

				g.line('mirrorLine', [offsetX, lineStartY], [offsetX, lineEndY]);
			}

			definePolygonPoints: {

				g.points('base', [pt.shpTL(), pt.shpBL(), pt.shpBR()]);

				g.points('carved', [pt.shpTL(), pt.shpBL(), pt.shpBtmBump(), pt.shpBR()]);

				g.points('rotator', [pt.shpBL(), pt.shpBtmBump(), pt.shpBR()]);

				g.points('tile', [pt.shpTL(), pt.shpLeftBump(), pt.shpBL(), pt.shpBtmBump(), pt.shpBR()]);

				g.points('singleTile', [pt.sqTL(), pt.sqTLBump(), pt.center(), pt.sqTRBump(), pt.sqTR()]);

				g.points('doubleTile', [pt.sqTL(), pt.sqTLBump(), pt.sqBRBump(), pt.sqBR(), pt.sqTR()]);
			}
		}, // end build


		loadOnce: function loadOnce() {
			if (!unit.isLoaded) {
				unit.build();
				unit.isLoaded = true;
			}

			return tessellations.demo(0);
		}

	}; // end unit


	return unit.loadOnce;
}(); // end t.demo(0).buildShapes


/* this doesn't really need the full loading infrastructure
but keeping it in case it gains the need for lazy loading: */

tessellations.demo(0).colors = function getDemo0Colors() {

	var unit = {

		isLoaded: false,

		contents: null,

		build: function build() {
			return {
				base: '#36c',
				rotator: '#c3c',
				TLTile: '#3c6',
				BLTile: '#fc0',
				BRTile: '#f36'
			};
		}, // end build


		loadOnce: function loadOnce() {
			if (!unit.isLoaded) {
				unit.contents = unit.build();
				unit.isLoaded = true;
			}

			return unit.contents;
		}

	}; // end unit


	return unit.loadOnce;
}(); // end t.demo(0).colors


tessellations.demo(0).buildStyles = function buildDemo0Styles() {

	var unit = {

		isLoaded: false,

		build: function build() {
			var t = tessellations,
			    ar = t.arrays(),
			    getId = t.idTypes().id(),
			    // distinguish from many id params below
			svg = t.idTypes().svg(),
			    geom = t.geom(),
			    pt = t.demo(0).points(),
			    c = t.demo(0).colors();

			t.demo(0).buildShapes().buildPatterns();

			getId('caption').style('transitionTimingFunction', 'linear');

			hideAll: {

				var allAnimatedShapes = ['graphGrid', 'base', 'carved', 'rotator', 'diamond', 'TLTile', 'BLTile', 'BRTile', 'initPat', 'sq4init', 'sq4flip', 'sq2init', 'sq2flip', 'mirrorLine', 'pats0', 'pats1', 'pats2', 'pats3', 'zoom'];

				ar.forEachOf(allAnimatedShapes, function (id) {
					svg(id).initStyle('display', 'none').initStyle('opacity', 0);
				});
			}

			setBaseColor: {

				var baseColorShapes = ['base', 'carved', 'rotator', 'initTile', 'TLTile', 'BLTile', 'BRTile', 'zoom'];

				ar.forEachOf(baseColorShapes, function (id) {
					svg(id).initStyle('fill', c.base);
				});
			}

			setRotationPoint: {

				var BLRotators = ['rotator', 'diamond', 'TLTile', 'BLTile', 'BRTile'];

				ar.forEachOf(BLRotators, function (id) {
					var origin = geom.pxPt(pt.shpBL());
					svg(id).initStyle('transformOrigin', origin);
				});
			}

			setSquarePositions: {

				var laterSquares = ['sq2init', 'sq2flip', 'sq4flip'];

				for (var i = 0; i < laterSquares.length; ++i) {
					var xpos = pt.sq4(i + 1);
					svg(laterSquares[i]).initStyle('transform', geom.shiftTo(xpos, 0));
				}
			}

			setInitialScales: {

				svg('sq4init').initStyle('transform', geom.scaleStr(pt.sqScaleUp(), pt.sqScaleUp()));

				svg('zoom').initStyle('transform', geom.scaleStr(pt.zoomSmall(), pt.zoomSmall()));
			}
		}, // end build


		loadOnce: function loadOnce() {
			if (!unit.isLoaded) {
				unit.build();
				unit.isLoaded = true;
			}

			return tessellations.demo(0);
		}

	}; // end unit


	return unit.loadOnce;
}(); // end t.demo(0).buildStyles
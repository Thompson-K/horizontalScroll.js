// Scroll wheel.
				if (settings.scrollWheel.enabled)
					(function() {

						// based on..
						// github.com/facebook/fixed-data-table/blob/master/src/vendor_upstream/dom/normalizeWheel.js
							var normalizeWheel = function(event) {

								var	pixelStep = 10,
									lineHeight = 40,
									pageHeight = 800,
									sX = 0,
									sY = 0,
									pX = 0,
									pY = 0;

								// Legacy.
									if ('detail' in event)
										sY = event.detail;
									else if ('wheelDelta' in event)
										sY = event.wheelDelta / -120;
									else if ('wheelDeltaY' in event)
										sY = event.wheelDeltaY / -120;

									if ('wheelDeltaX' in event)
										sX = event.wheelDeltaX / -120;

								// Side scrolling on FF with DOMMouseScroll.
									if ('axis' in event
									&&	event.axis === event.HORIZONTAL_AXIS) {
										sX = sY;
										sY = 0;
									}

								// Calculate.
									pX = sX * pixelStep;
									pY = sY * pixelStep;

									if ('deltaY' in event)
										pY = event.deltaY;

									if ('deltaX' in event)
										pX = event.deltaX;

									if ((pX || pY)
									&&	event.deltaMode) {

										if (event.deltaMode == 1) {
											pX *= lineHeight;
											pY *= lineHeight;
										}
										else {
											pX *= pageHeight;
											pY *= pageHeight;
										}

									}

								// Fallback .
									if (pX && !sX)
										sX = (pX < 1) ? -1 : 1;

									if (pY && !sY)
										sY = (pY < 1) ? -1 : 1;

								// Return.
									return {
										spinX: sX,
										spinY: sY,
										pixelX: pX,
										pixelY: pY
									};

							};

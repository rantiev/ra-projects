angular.module('drag', [])
	.directive('draggable', function($d) {
		return function(scope, element, attr) {
			var startX = 0, startY = 0, x = 0, y = 0;
			element.css({
				position: 'relative',
				border: '1px solid red',
				backgroundColor: 'lightgrey',
				cursor: 'pointer'
			});
			element.bind('mousedown', function(event) {
				// Prevent default dragging of selected content
				event.preventDefault();
				startX = event.screenX - x;
				startY = event.screenY - y;
				$d.bind('mousemove', mousemove);
				$d.bind('mouseup', mouseup);
			});

			function mousemove(event) {
				y = event.screenY - startY;
				x = event.screenX - startX;
				element.css({
					top: y + 'px',
					left: x + 'px'
				});
			}

			function mouseup() {
				$d.unbind('mousemove', mousemove);
				$d.unbind('mouseup', mouseup);
			}
		}
	});
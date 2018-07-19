/*
 * DynamicHeader
 * Based on ideas from: https://tympanus.net/Development/AnimatedHeaderBackgrounds/
 * Requires: TweenLite.js, EasePack.js and rAF.js
 * v1.0
 */

function DynamicHeader(targetElement, targetCanvas) {
    var _this = this;
    var _width, _height, _targetElement, _targetCanvas, _ctx, _points, _target, _animateHeader;

    // constructor
    (function () {
        _animateHeader = true;
        _targetElement = targetElement;
        _targetCanvas = targetCanvas;
        init();
    })();

    function init() {
        initHeader();
        initAnimation();
        addListeners();
        generateTriangles(_targetElement);
    };

    function initHeader() {
        _width = _targetElement.clientWidth;
        _height = _targetElement.clientHeight;
        _target = {
            x: _width / 2,
            y: _height / 2
        };

        _targetCanvas.width = _width;
        _targetCanvas.height = _height;
        _ctx = _targetCanvas.getContext('2d');

        // create points
        _points = [];
        for (var x = 0; x < _width; x = x + _width / 20) {
            for (var y = 0; y < _height; y = y + _height / 20) {
                var px = x + Math.random() * _width / 20;
                var py = y + Math.random() * _height / 20;
                var p = {
                    x: px,
                    originX: px,
                    y: py,
                    originY: py
                };
                _points.push(p);
            }
        }

        // for each point find the 5 closest points
        for (var i = 0; i < _points.length; i++) {
            var closest = [];
            var p1 = _points[i];
            for (var j = 0; j < _points.length; j++) {
                var p2 = _points[j];
                if (p1 != p2) {
                    var placed = false;
                    for (var k = 0; k < 5; k++) {
                        if (!placed) {
                            if (closest[k] == undefined) {
                                closest[k] = p2;
                                placed = true;
                            }
                        }
                    }

                    for (var l = 0; l < 5; l++) {
                        if (!placed) {
                            if (getDistance(p1, p2) < getDistance(p1, closest[l])) {
                                closest[l] = p2;
                                placed = true;
                            }
                        }
                    }
                }
            }
            p1.closest = closest;
        }

        // assign a circle to each point
        for (var point in _points) {
            var c = new Circle(_points[point], 2 + Math.random() * 2, 'rgba(255,255,255,0.3)');
            _points[point].circle = c;
        }
    }

    // Event handling
    function addListeners() {
        if (!('ontouchstart' in window)) {
            window.addEventListener('mousemove', mouseMove);
        }
        window.addEventListener('scroll', scrollCheck);
        window.addEventListener('resize', resize);
    }

    function mouseMove(e) {
        var posx = 0;
        var posy = 0;
        if (e.pageX || e.pageY) {
            posx = e.pageX;
            posy = e.pageY;
        } else if (e.clientX || e.clientY) {
            posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }
        _target.x = posx;
        _target.y = posy;
    }

    function scrollCheck() {
        if (document.body.scrollTop > _height) _animateHeader = false;
        else _animateHeader = true;
    }

    function resize() {
        _width = _targetElement.clientWidth;
        _height = _targetElement.clientHeight;
        _targetCanvas.width = _width;
        _targetCanvas.height = _height;
        _target = {
            x: _width / 2,
            y: _height / 2
        };
    }

    // animation
    function initAnimation() {
        animate();
        for (var i in _points) {
            shiftPoint(_points[i]);
        }
    }

    function animate() {
        if (_animateHeader) {
            _ctx.clearRect(0, 0, _width, _height);
            for (var i in _points) {
                // detect points in range
                if (Math.abs(getDistance(_target, _points[i])) < 4000) {
                    _points[i].active = 0.3;
                    _points[i].circle.active = 0.6;
                } else if (Math.abs(getDistance(_target, _points[i])) < 30000) {
                    _points[i].active = 0.1;
                    _points[i].circle.active = 0.3;
                } else if (Math.abs(getDistance(_target, _points[i])) < 100000) {
                    _points[i].active = 0.02;
                    _points[i].circle.active = 0.1;
                } else {
                    _points[i].active = 0;
                    _points[i].circle.active = 0;
                }

                drawLines(_points[i]);
                _points[i].circle.draw();
            }
        }
        requestAnimationFrame(animate);
    }

    function shiftPoint(p) {
        TweenLite.to(p, 1 + 1 * Math.random(), {
            x: p.originX - 50 + Math.random() * 100,
            y: p.originY - 50 + Math.random() * 100,
            ease: Circ.easeInOut,
            onComplete: function () {
                shiftPoint(p);
            }
        });
    }

    // Canvas manipulation
    function drawLines(p) {
        if (!p.active) return;
        for (var i in p.closest) {
            _ctx.beginPath();
            _ctx.moveTo(p.x, p.y);
            _ctx.lineTo(p.closest[i].x, p.closest[i].y);
            _ctx.strokeStyle = 'rgba(156,217,249,' + p.active + ')';
            _ctx.stroke();
        }
    }

    function Circle(pos, rad, color) {
        var _this = this;

        // constructor
        (function () {
            _this.pos = pos || null;
            _this.radius = rad || null;
            _this.color = color || null;
        })();

        this.draw = function () {
            if (!_this.active) return;
            _ctx.beginPath();
            _ctx.arc(_this.pos.x, _this.pos.y, _this.radius, 0, 2 * Math.PI, false);
            _ctx.fillStyle = 'rgba(156,217,249,' + _this.active + ')';
            _ctx.fill();
        };
    }

    // Util
    function getDistance(p1, p2) {
        return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
    }

    function generateTriangles(element) {
        var dimensions = element.getClientRects()[0];
        
        var pattern = new Trianglify({
            x_colors: ['#000b33', '#000000', '#002b7a'],
            cell_size: 70,
            variance: 0.8,
            seed: 'p31ag',
            width: dimensions.width,
            height: dimensions.height
        });

        element.style['background-image'] = 'url(' + pattern.png() + ')';
    }
}

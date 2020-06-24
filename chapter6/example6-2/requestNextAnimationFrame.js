window.requestNextAnimationFrame = (function() {
    var originalWebkitRequestAnimationFrame = undefined;
    var wrapper = undefined;
    var callback = undefined;
    var geckoVersion = 0;
    var userAgent = navigator.userAgent;
    var index = 0;
    var self = this;

    if (window.webkitRequestAnimationFrame) {
        wrapper = function(time) {
            if (time === undefined) {
                time = +new Date();
            }
        }
    }

    if (window.mozRequestAnimsyionFrame) {
        window.webkitRequestAnimationFrame = function(callback, element) {
            self.callback = callback;

            // Browser calls the wrapper and wrapper calls the callback

            originalWebkitRequestAnimationFrame(wrapper, element);
        }
    }

    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimsyionFrame ||
        window.onRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(callback, element) {
            var start, finish;
            window.setTimeout(function() {
                // 获取开始时间戳
                start = +new Date();
                callback(start);
                // 获取完成时间戳
                finisht = +new Date();

                self.timeout = 1000 / 60 - (finish - start)
            }, self.timeout);
        };
})();
var config = require('./config');

module.exports = {
    isProd: function() {
        return (config.env === 'production');
    },

    isDev: function() {
        return (config.env === 'development');
    },

    handlebars: {
        ifCond: function(v1, operator, v2, opts) {
            var isTrue = false;
            switch (operator) {
                case '===':
                    isTrue = v1 === v2;
                    break;
                case '!==':
                    isTrue = v1 !== v2;
                    break;
                case '==':
                    isTrue = v1 === v2;
                    break;
                case '<':
                    isTrue = v1 < v2;
                    break;
                case '<=':
                    isTrue = v1 <= v2;
                    break;
                case '>':
                    isTrue = v1 > v2;
                    break;
                case '>=':
                    isTrue = v1 >= v2;
                    break;
                case '||':
                    isTrue = v1 || v2;
                    break;
                case '&&':
                    isTrue = v1 && v2;
                    break;
            }

            return isTrue ? opts.fn(this) : opts.inverse(this);
        },

        length: function(value) {
            return value.length;
        },

        math: function(lvalue, operator, rvalue, options) {
            lvalue = parseFloat(lvalue);
            rvalue = parseFloat(rvalue);

            return {
                '+': lvalue + rvalue,
                '-': lvalue - rvalue,
                '*': lvalue * rvalue,
                '/': lvalue / rvalue,
                '%': lvalue % rvalue
            }[operator];
        },

        parseJSON: function(data, options) {
            return options.fn(JSON.parse(data));
        },

        pluralize: function(number, one, two, five) {
            var n = Math.abs(number);
            n %= 100;
            if (n >= 5 && n <= 20) {
                return five;
            }
            n %= 10;
            if (n === 1) {
                return one;
            }
            if (n >= 2 && n <= 4) {
                return two;
            }
            return five;
        },

        slice: function(array, offset, limit) {
            offset = parseInt(offset);
            if (isNaN(offset)) {
                offset = 0;
            }
            limit = parseInt(limit);
            if (isNaN(limit)) {
                limit = array.length;
            }
            var end = offset + limit;
            if (end > array.length) {
                end = array.length;
            }

            return array.slice(offset, end);
        },

        time: function (data, options) {
            return (new Date()).getTime();
        },

        times: function (n, block) {
            var accum = '';
            for(var i = 0; i < n; ++i) {
                accum += block.fn(i);
            }
            return accum;
        }

    }
};
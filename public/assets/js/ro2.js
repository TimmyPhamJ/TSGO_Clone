/**
 * Created by levuh on 18/05/2018.
 */
/**
 * Created by ad on 11/30/2017.
 */
var _arrContentBtnLoading = {};

Array.prototype.diff = function (a) {
    return this.filter(function (i) { return a.indexOf(i) < 0; });
};

Array.prototype.getIndexs = function (cols) {
    var result = [];
    if (Array.isArray(this)) {
        if (Array.isArray(cols)) {
            this.forEach(function (item, idx) {
                if (cols.indexOf(item) > -1) {
                    result.push(idx);
                }
            });
            return result;
        } else {
            this.forEach(function (item, idx) {
                if (item == cols) {
                    return result.push(idx);
                }
            });
        }
    }
    return result;
};

$.fn.blockUI = function () {
    this.block({
        message: '<i class="la la-spinner spinner"></i>',
        overlayCSS: {
            backgroundColor: '#fff',
            opacity: 0.8,
            cursor: 'wait',
            'box-shadow': '0 0 0 1px #ddd'
        },
        css: {
            border: 0,
            padding: 0,
            backgroundColor: 'none'
        }
    });
    return this;
};

function getDateTime(fullDateTime, format) {
    var dateTime = '';

    if (fullDateTime) {
        var ua = window.navigator.userAgent;
        var td = '';
        var msie = ua.indexOf("MSIE");
        var tdie = ua.indexOf("Trident");
        var safari = ua.indexOf("Safari");

        if (msie > 0 || tdie > 0 || safari > 0) {
            var year = fullDateTime.substr(0, 4);
            var month = parseInt(fullDateTime.substr(5, 2)) - 1;
            var day = fullDateTime.substr(8, 2);
            var h = fullDateTime.substr(11, 2);
            var i = fullDateTime.substr(14, 2);
            var s = fullDateTime.substr(17, 2);
            var now = new Date(year, month, day, h, i, s);
        }
        else {
            var now = new Date(fullDateTime);
        }

        if (now.toString().indexOf('Invalid') != -1) {
            return fullDateTime;
        }

        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        var day = now.getDate();
        var hour = now.getHours();
        var minute = now.getMinutes();
        var second = now.getSeconds();

        if (month.toString().length == 1) {
            var month = '0' + month;
        }
        if (day.toString().length == 1) {
            var day = '0' + day;
        }
        if (hour.toString().length == 1) {
            var hour = '0' + hour;
        }
        if (minute.toString().length == 1) {
            var minute = '0' + minute;
        }
        if (second.toString().length == 1) {
            var second = '0' + second;
        }

        if (typeof format === "undefined" || format === null) {
            format = '';
        }

        switch (format) {
            case '':
            case 'd/m/y':
                dateTime = day + '/' + month + '/' + year + ' ' + hour + ':' + minute + ':' + second;
                break;
            case 'd-m-y':
                dateTime = day + '-' + month + '-' + year + ' ' + hour + ':' + minute + ':' + second;
                break;
            case 'y/m/d':
                dateTime = year + '/' + month + '/' + day + ' ' + hour + ':' + minute + ':' + second;
                break;
            case 'y-m-d':
                dateTime = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
                break;
            case 'm/d/y':
                dateTime = month + '/' + day + '/' + year + ' ' + hour + ':' + minute + ':' + second;
                break;
            case 'm-d-y':
                dateTime = month + '-' + day + '-' + year + ' ' + hour + ':' + minute + ':' + second;
                break;
            default:
                dateTime = day + '/' + month + '/' + year + ' ' + hour + ':' + minute + ':' + second;
                break;
        }
    } else {
        dateTime = '';
    }

    return dateTime;
}

function getDate(fullDateTime) {
    if (!fullDateTime) return null;
    let dateTime = moment(fullDateTime).toISOString().replace(/([TZ]+)/g, ' ').trim();
    return dateTime;
}


function dateformat(timestamp) {
    var date = new Date(timestamp * 1000);
    var year = date.getFullYear();
    var month = ("0" + (date.getMonth() + 1)).substr(-2);
    var day = ("0" + date.getDate()).substr(-2);
    var hour = ("0" + date.getHours()).substr(-2);
    var minutes = ("0" + date.getMinutes()).substr(-2);
    var seconds = ("0" + date.getSeconds()).substr(-2);

    return day + "/" + month + "/" + year + " " + hour + ":" + minutes + ":" + seconds;
}
function getMonth(timestamp) {
    var date = new Date(timestamp * 1000);
    return date.getMonth() + 1;
}
function getYear(timestamp) {
    var date = new Date(timestamp * 1000);
    return date.getFullYear();
}
function getDay(timestamp) {
    var date = new Date(timestamp * 1000);
    return date.getDate();
}
function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}

function fromDatetoDate(month, year) {
    var result = [];
    result.push("01" + "/" + (month.length > 1 ? month : "0" + month) + "/" + year);
    result.push(daysInMonth(month, year) + "/" + (month.length > 1 ? month : "0" + month) + "/" + year);
    return result;
}

function changeDateFormat(formatstring, value) {
    if (!value) return "";
    var finddate = value.split(/[ ]+|T/);
    var time = finddate[0].indexOf(":") == -1 ? finddate[1] : finddate[0];

    formatstring = formatstring.toLowerCase();
    var year_start = formatstring.indexOf("y");
    var year_length = (formatstring.match(/y/g)).length;

    var month_start = formatstring.indexOf("m");
    var month_length = (formatstring.match(/m/g)).length;

    var day_start = formatstring.indexOf("d");
    var day_length = (formatstring.match(/d/g)).length;

    var y = value.substring(year_start, year_start + year_length);
    var m = value.substring(month_start, month_start + month_length);
    var d = value.substring(day_start, day_start + day_length);

    return (y.length == 2 ? ("20" + y) : y) + "-" + (m.length == 1 ? "0" + m : m) + "-" + (d.length == 1 ? "0" + d : d) + " " + time;
}

function adjustheader(headtbl, bodytbl, hasrow) {
    window.setTimeout(function () {
        var addw = (window.navigator.userAgent.indexOf('Firefox') > -1 ? 0 : 1);
        $(headtbl).css('width', (parseFloat(window.getComputedStyle(bodytbl).width) + addw) + "px");
        if (hasrow) {
            var _thbody = $(bodytbl).find('thead tr th');
            $.each($(headtbl).find('thead tr th'), function (k, v) {
                $(v).css('width', parseFloat(getComputedStyle(_thbody[$(v).index()]).width) + 'px');
            });
        }
        var element = document.getElementsByClassName("dataTables_scrollBody")[0];
        if (element.scrollHeight - element.scrollTop !== element.clientHeight) {
            $('.dataTables_scrollHeadInner').css("width", element.scrollWidth + 'px');
        }
    }, 2);
}

function setCookie(c_name, value, expiredays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toUTCString());
}

function setCookietoEndofDay(c_name, value) {
    var now = new Date();
    var expire = new Date();
    expire.setFullYear(now.getFullYear());
    expire.setMonth(now.getMonth());
    expire.setDate(now.getDate() + 1);
    expire.setHours(0);
    expire.setMinutes(0);
    expire.setSeconds(0);

    document.cookie = c_name + "=" + escape(value) + ((expire == null) ? "" : ";expires=" + expire.toUTCString());
}

function getCookie(c_name) {
    if (document.cookie.length > 0) {
        var c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            var c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) c_end = document.cookie.length;
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
}

function deleteCookie(c_name) {
    document.cookie = c_name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

(function ($) {
    var origAppend = $.fn.prepend;
    $.fn.prepend = function () {
        return origAppend.apply(this, arguments).trigger("prepend");
    };
})(jQuery);

(function ($) {
    var origAppend = $.fn.toggleClass;
    $.fn.toggleClass = function () {
        return origAppend.apply(this, arguments).trigger("toggleClass");
    };

    $.fn.button = function (action) {
        var appendElem = $(this).attr('data-loading-text');
        var id = $(this).attr('id');

        switch (action) {
            case "loading":
                $(this).prop('disabled', true);
                var content = $(this).html();
                _arrContentBtnLoading[id] = content;
                $(this).html('').append(appendElem);
                break;
            case "reset":
                $(this).prop('disabled', false);
                $(this).html('').append(_arrContentBtnLoading[id]);
                delete _arrContentBtnLoading[id];
                break;
        }
        return $(this);
    };
})(jQuery);

//expand or collapse div contain filter control
$(function () {


    if (document.location.pathname) {
        let arrx = document.location.pathname.split('/');
        if (arrx[2]) {
            $('a[href="/' + arrx[1] + '/' + arrx[2] + '"]').addClass('active');
            $('a[href="/' + arrx[1] + '/' + arrx[2] + '"]').closest('ul').addClass('in');
            $('a[href="/' + arrx[1] + '/' + arrx[2] + '"]').closest('ul').closest('li').addClass('active');
        }
    }



    if ($("a[href='" + window.location.href + "']").length > 0) {
        $("a[href='" + window.location.href + "']").first().addClass("active");
        $("a[href='" + window.location.href + "']").first().closest("ul").addClass("in");
    }


    window.awPost = (url, postdata) => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: url,
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                data: JSON.stringify(postdata),
                type: 'POST',
                success: function (data) {
                    resolve(data);
                },
                error: function (err) {
                    reject(err);
                }
            });
        })
    }


    window.awGet = (url, postdata) => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: url,
                dataType: 'json',
                data: JSON.stringify(postdata),
                type: 'GET',
                success: function (data) {
                    resolve(data);
                },
                error: function (err) {
                    reject(err);
                }
            });
        })
    }



    $('.collapsible-box i.la').on('click', function () {
        $(this).parent().find('.ibox-body').toggle(700);
        if ($(this).hasClass('la-angle-double-down')) {
            $(this).removeClass('la-angle-double-down')
                .addClass('la-angle-double-up');
        } else {
            $(this).removeClass('la-angle-double-up')
                .addClass('la-angle-double-down');
        }

    });
    $('table.dataTable tr').on('click', function () {
        $('.m-row-selected').removeClass('m-row-selected');
        $(this).addClass('m-row-selected');
    });
});
var isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

$.fn.extend({
    has_required: function () {
        var checkError = [];
        var datas = $(this);

        if ($(this).parent().is('td') || $(this).is('select')) {
            $(this).parent().removeClass('error');
        } else {
            $(this).removeClass('error');
        }

        $.each(datas, function (key, data) {
            if ($(data).is('input') || $(data).is('select') || $(data).is('textarea')) {
                if (!data.value || data.value == '0') {
                    if ($(data).parent().is('td') || $(data).is('select')) {
                        $(data).parent().addClass('error');
                    } else {
                        $(data).addClass('error');
                    }
                    checkError.push('error');
                }
            }
        });
        return checkError.length > 0;
    },
    clear_error: function () {
        $(this).removeClass('error');
    },
    check_cont_iso: function () {
        var con = $(this).val();
        if (!con || con == "" || con.length != 11) { return false; }
        con = con.toUpperCase();
        var re = /^[A-Z]{4}\d{7}/;
        if (re.test(con)) {
            var sum = 0;
            for (i = 0; i < 10; i++) {
                var n = con.substr(i, 1);
                if (i < 4) {
                    n = "0123456789A?BCDEFGHIJK?LMNOPQRSTU?VWXYZ".indexOf(con.substr(i, 1));
                }
                n *= Math.pow(2, i);
                sum += n;
            }
            if (con.substr(0, 4) == "HLCU") {
                sum -= 2;
            }
            sum %= 11;
            sum %= 10;
            return sum == con.substr(10);
        } else {
            return false;
        }
    },
    autocompleteText: function (arr, callback_success, callback_error) {
        $(this).autocomplete({
            source: arr,
            minLength: 1,
            create: function (event, ui) {
                $(document).find('.ui-helper-hidden-accessible').remove();
            }
        });
        if ($(this).parent().is('td')) {
            $(this).on('change', function () {
                if (arr.indexOf($(this).val()) == "-1" && arr.indexOf($(this).val().toUpperCase()) == "-1") {
                    $(this).val('');
                    $(this).parent().addClass('error');
                    $('.toast').remove();
                    var idx = $(this).parent().closest('tr').children().index($(this).parent());
                    var colheadertext = $(this).parent().closest('table').find('thead tr td:eq(' + idx + ')').first().text();
                    toastr['error'](colheadertext + ' không phù hợp!');
                    if (callback_error) {
                        callback_error($(this));
                    }
                } else {
                    if (callback_success) {
                        callback_success($(this));
                    }
                    $(this).parent().removeClass('error');
                }
            });
        }
    }
});


function formatMoney(number, decPlaces, decSep, thouSep) {
    decPlaces = isNaN(decPlaces = Math.abs(decPlaces)) ? 2 : decPlaces,
        decSep = typeof decSep === "undefined" ? "." : decSep;
    thouSep = typeof thouSep === "undefined" ? "," : thouSep;
    var sign = number < 0 ? "-" : "";
    var i = String(parseInt(number = (Number(number) || 0).toFixed(decPlaces)));
    var j = (number.split('.')[1] || '').substr(0, decPlaces);
    if (!parseInt(j))
        j = '';
    return i.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1" + thouSep) + (j.length > 0 ? decSep + j : '');
}

function numN(num) {
    if (num === '') return num;
    var num = parseFloat((num + '').replace(/\,/gi, ''));
    return num;
}

function numF(num) {
    num = (num + '').replace(/,/gi, '');
    var num = parseFloat(num) || 0;
    return formatMoney(num, 2, '.', ',');
}
function numF0(num, show0) {
    num = (num + '').replace(/,/gi, '');
    var num = parseFloat(num) || 0;
    if (num == 0 && !show0)
        return '';
    return formatMoney(num, 2, '.', ',');
}

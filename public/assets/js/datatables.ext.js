/**
 * Created by ad on 11/30/2017.
 */
var _selectionSoure;

(function ($) {
	$(document).on('change', ".datatable_checkbox_input", function (e) {
		if ($(this).closest('.editor-cancel').length > 0) {
			e.stopPropagation();
			e.preventDefault();
			$(this).closest('table').DataTable().cell($(this).closest('td')).data(!$(this).prop('checked') ? 1 : 0).draw(false);
			return false;
		}
		$(this).closest('tr').addClass("editing");
		$(this).closest('table').DataTable().cell($(this).closest('td')).data($(this).prop('checked') ? 1 : 0).draw(false);

	});
	$.pasteCell = function (callback) {
		$.fn.dataTable.ext.errMode = 'none';
		var allowPaste = true;
		var foundContent = false;
		if (typeof (callback) == "function") {

			// Patch jQuery to add clipboardData property support in the event object
			//console.log($.event,"==============");
			if ($.event.props)
				$.event.props.push('clipboardData');
			else
				$.event.addProp('clipboardData');

			// Add the paste event listener
			$(document).bind("paste", doPaste);

			// If Firefox (doesn't support clipboard object), create DIV to catch pasted image
			if (!window.Clipboard) { // Firefox
				var pasteCatcher = $(document.createElement("textarea"));
				pasteCatcher.css({ "position": "absolute", "left": "-999", width: "0", height: "0", "overflow": "hidden", outline: 0 });
				$(document.body).prepend(pasteCatcher);
			}
		}
		// Handle paste event
		function doPaste(e) {
			if (allowPaste == true && $(e.target).is("td")) {     // conditionally set allowPaste to false in situations where you want to do regular paste instead
				// Check for event.clipboardData support
				if (e.clipboardData.items) { // Chrome
					// Get the items from the clipboard
					var content = e.clipboardData.getData('Text');
					content = content.replace(/^\s+|\s+$/g, '');
					if (content) {
						callback(content);
					}
				} else {
					/* If we can't handle clipboard data directly (Firefox), we need to read what was pasted from the contenteditable element */
					//Since paste event detected, focus on DIV to receive pasted image
					pasteCatcher.focus();
					foundContent = true;
					// "This is a cheap trick to make sure we read the data AFTER it has been inserted"
					setTimeout(checkInput, 100); // May need to be longer if large image
				}
			}
		}

		/* Parse the input in the paste catcher element */
		function checkInput() {
			// Store the pasted content in a variable
			if (foundContent == true) {
				if (pasteCatcher.text()) {
					callback(pasteCatcher.text());
					foundContent = false;
					pasteCatcher.html(""); // erase contents of pasteCatcher DIV
				}
			}
		}
	};

	$.isDateValid = function (value) {
		switch (typeof value) {
			case 'string':
				return !isNaN(Date.parse(value));
			case 'object':
				if (value instanceof Date) {
					return !isNaN(value.getTime());
				}
			default:
				return false;
		}
	};

	$.tableSelectPicker = function (option) {
		option.Container = "body";

		return $(this).each(function (idx, item) {
			$(item).selectpicker(option);
		})
	};

})(jQuery);

$.fn.extend({
	setSelectSource: function (source) {
		$(this).attr('select-source', JSON.stringify(source));
	},
	moreButton: function (option) {
		var colIndexs = option.columns,
			callback = option.onShow;

		var tbl = $(this);

		$(document).on("click", "td.show-more", function (e) {
			var cell = $(this),
				roww = $(this).closest("tr");

			if (!cell.closest("table").is(tbl)) {
				e.preventDefault();
				return;
			}

			var indx = Array.isArray(colIndexs) ? colIndexs : [colIndexs];
			if (indx.indexOf(cell.index()) == -1) {
				e.preventDefault();
				return;
			}

			var widthOfAfterCell = parseInt(parseFloat(window.getComputedStyle(cell[0], ":after").width).toFixed(0)),
				paddingRightOfCell = parseInt(cell.css("padding-right")),
				righOfAfterCell = parseInt(window.getComputedStyle(cell[0], ":after").right);

			if (e.offsetX > (cell[0].offsetWidth
				- (widthOfAfterCell > paddingRightOfCell ? widthOfAfterCell : paddingRightOfCell)
				- righOfAfterCell)) {
				$(tbl.find("th:eq(" + cell.index() + ")").attr("show-target")).modal("show");

				callback(cell);
			}
		});
	},
	setExtendSelect: function (colIndex, callback) {
		var tbl = $(this), td;
		var cloneProperties = ['padding', 'padding-top', 'padding-bottom', 'padding-left', 'padding-right', 'font', 'font-size', 'font-family', 'font-weight'];

		var btn = document.createElement("button");
		btn.innerText = "...";
		btn.className = "btn";
		btn.style.cssText = "position: absolute; z-index: 3; display: none";
		tbl.parent().append(btn);

		var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
		var x1, x2, y1, y2;

		$(document).on("mouseover", "td", function () {
			if (!$(this).closest("table").is(tbl) || !$(this).closest("tr").find("td:eq(" + colIndex + ")").is($(this))) {
				return;
			}

			td = $(this);

			var parentOffset = td.offset();
			x1 = parentOffset.left; x2 = parentOffset.left + td.outerWidth(); y1 = parentOffset.top; y2 = parentOffset.top + td.outerHeight();

			$(btn).css(td.css(cloneProperties));
			$(btn).show()
				.offset({
					top: parentOffset.top + 4,
					left: parentOffset.left + (td.width() - $(btn).width() - 7)
				})
				.height(td.height() - 7); //- 3 

			td.on("mouseout", function (event) {
				if ((event.pageX < x1 || event.pageX > x2) || (event.pageY < y1 || event.pageY > y2)) {
					$(btn).hide();
				}
			});
		});

		$(btn).on("mouseout", function (e) {
			if (e.pageX > x2) {
				$(btn).hide();
			}
		});

		tbl.on("mouseout", function (e) {
			if (e.pageX > x2) {
				$(btn).hide();
			}
		});

		$(btn).on("click", function () {
			var rowIndex = td.closest("tr").index();
			callback(rowIndex, colIndex);
		});
	},
	columnDropdownButton: function (option) {
		var tbl = $(this);

		return this.each(function () {

			// Open context menu
			$(this).on("click", "td.show-dropdown", function (e) {
				var cell = $(this),
					roww = $(this).closest("tr");

				$(".dropdown-menu.dropdown-menu-column").remove();

				if (!cell.closest("table").is(tbl)) {
					e.preventDefault();
					return;
				}

				var indx = option.data.map(x => x.colIndex);
				if (!indx || indx.length == 0 || indx.indexOf(cell.index()) == -1) {
					e.preventDefault();
					return;
				}

				var widthOfAfterCell = parseInt(parseFloat(window.getComputedStyle(cell[0], ":after").width).toFixed(0)),
					paddingRightOfCell = parseInt(cell.css("padding-right")),
					righOfAfterCell = parseInt(window.getComputedStyle(cell[0], ":after").right);

				if (e.offsetX > (cell[0].offsetWidth
					- (widthOfAfterCell > paddingRightOfCell ? (widthOfAfterCell - righOfAfterCell) : paddingRightOfCell))) {
					var ul = document.createElement("div");
					ul.setAttribute("role", "menu");
					ul.className = "dropdown-menu dropdown-menu-column";
					ul.style.css = "display: none";

					var source = option.data.filter(p => p.colIndex == cell.index()).map(x => x.source)[0];
					$.each(source, function (idx, item) {
						var dta;

						if (typeof (item) === "object" || Array.isArray(item)) {
							dta = $.map(item, function (value, index) {
								return [value];
							});
						} else {
							dta = [item];
						}
						var strLi = '<li><a tabindex="-1" href="#" code="' + dta[0] + '">'
							+ (dta[1] ? dta[1] : dta[0])
							+ '</a></li>';

						ul.innerHTML += strLi;
					});

					$("body").append(ul);
					// //open menu
					$(ul).data("cellClicked", $(e.target))
						.show()
						.css({
							position: "absolute",
							left: getMenuPosition(e.clientX, 'width', 'scrollLeft'),
							top: getMenuPosition(e.clientY, 'height', 'scrollTop')
						})
						.off('click')
						.on('click', 'a', function (e) {

							var $cellClicked = $(ul).data("cellClicked");
							var $selectedMenu = $(e.target);

							$(ul).remove();

							option.onSelected.call(this, $cellClicked, $selectedMenu);
						});
				}
				return false;
			});

			// //make sure menu closes on any click
			$('body').click(function () {
				$(".dropdown-menu.dropdown-menu-column").remove();
			});
		});

		function getMenuPosition(mouse, direction, scrollDir) {
			var win = $(window)[direction](),
				scroll = $(window)[scrollDir](),
				menu = $(".dropdown-menu.dropdown-menu-column:last")[direction](),
				position = mouse + scroll;

			// opening menu would pass the side of the page
			if (mouse + menu > win && menu < mouse)
				position -= menu;

			return position;
		}

	},
	setExtendDropdown: function (option) {
		var target = option.target,
			source = option.source,
			colIndex = option.colIndex,
			callback = option.onSelected;

		if (!source || source.length == 0) {
			$(target).find(".dropdown-menu").empty();
			return;
		}

		var tbl = $(this), td;
		var cloneProperties = ['font', 'font-size', 'font-family', 'font-weight'];

		$(target).css({ position: "absolute", zIndex: "105", display: "none" });
		$(target).find(".dropdown-menu").empty();

		$.each(source, function (idx, item) {
			var dta;

			if (typeof (item) === "object" || Array.isArray(item)) {
				dta = $.map(item, function (value, index) {
					return [value];
				});
			} else {
				dta = [item];
			}

			$(target).find(".dropdown-menu").append('<a class="dropdown-item" href="#">' + dta[0]
				+ (dta[1] ? ('<span class="sub-text">' + dta[1] + '</span>') : "")
				+ '</a>');
		});


		tbl.parent().parent().append($(target));

		var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
		var x1, x2, y1, y2;
		var dropMenu = $(target).find(".dropdown-menu");

		$(document).on("mouseover", "td", function () {
			if (!$(this).closest("table").is(tbl) || !$(this).closest("tr").find("td:eq(" + colIndex + ")").is($(this))) {
				return;
			}

			td = $(this);

			var parentOffset = td.offset(),
				dOffset = dropMenu.offset();

			x1 = parentOffset.left >= dOffset.left ? parentOffset.left : dOffset.left;
			x2 = (parentOffset.left + td.outerWidth()) >= (dOffset.left + dropMenu.outerWidth())
				? (parentOffset.left + td.outerWidth()) : (dOffset.left + dropMenu.outerWidth());
			y1 = parentOffset.top <= dOffset.top ? parentOffset.top : dOffset.top;
			y2 = (parentOffset.top + td.outerHeight()) >= (dOffset.top + dropMenu.outerHeight())
				? (parentOffset.top + td.outerHeight()) : (dOffset.top + dropMenu.outerHeight());

			$(target).css(td.css(cloneProperties));
			$(target).show()
				.offset({
					top: parentOffset.top + 3,
					left: parentOffset.left + (td.innerWidth() - $(target).width() - 7)
				})
				.height(td.innerHeight() - 5);

			td.on("mouseout", function (event) {
				if ((event.pageX < x1 || event.pageX > x2) || (event.pageY < y1 || event.pageY > y2)) {
					dropMenu.removeClass("show");
					$(target).hide();
				}
			});
		});

		tbl.on("mouseout", function (e) {
			if (e.pageX > x2) {
				dropMenu.removeClass("show");
				$(target).hide();
			}
		});

		$(target).on("mouseout", function (e) {
			if (e.pageX > x2) {
				dropMenu.removeClass("show");
				$(target).hide();
			}
		});

		$(target).on("click", "a.dropdown-item", function () {
			callback(td, $(this).contents().not($(this).children()).text());
		});
	}
});

$.fn.extend({
	newDataTable: function (opt) {
		var tbl = $(this);
		// $('table.dataTable').DataTable().destroy();
		// $('table.dataTable,table.dataTable *').off();
		$.fn.dataTable.ext.errMode = 'none';

		if (opt) {
			if (opt.default_table) {
				return tbl.DataTable(opt);
			}
			// $.fn.dataTable.defaults.rowReorder = true;

			opt['scrollY'] = typeof opt['scrollY'] != "undefined" ? opt['scrollY'] : true;
			opt['scrollX'] = typeof opt['scrollX'] != "undefined" ? opt['scrollX'] : true;
			opt['autoWidth'] = typeof opt['autoWidth'] != "undefined" ? opt['autoWidth'] : true;
			opt['paging'] = typeof opt['paging'] != "undefined" ? opt['paging'] : true;
			opt['searching'] = typeof opt['searching'] != "undefined" ? opt['searching'] : (true);
			opt['scroller'] = typeof opt['scroller'] != "undefined" ? opt['scroller'] : {
				displayBuffer: 4,
				boundaryScale: 0.5
			}
			opt['dom'] = typeof opt['dom'] != "undefined" ? opt['dom'] : ($.fn.dataTable.defaults.dom || 'Bfrtip');
			//console.log(typeof opt['buttons']);
			opt['buttons'] = typeof opt['buttons'] != "undefined" ? opt['buttons'] : [
				{
					extend: 'selectAll',
					text: '<i class="fa fa-check-circle"></i>&ensp;Chọn tất cả',
					className: 'btn btn-sm btn-outline-secondary'
				},
				{
					extend: 'selectNone',
					text: '<i class="fa fa-ban"></i>&ensp;Bỏ chọn',
					className: 'btn btn-sm btn-outline-secondary'
				},
				{
					className: 'ant-btn d-none excel_export_btn',
					extend: 'excelHtml5',
					text: 'Xuất Excel',
					title: '',
					filename: (tbl.data('title') || document.title + ' -' || '') + ' [Trích xuất ' + moment().format('DD-MM-YYYY HH-mm-ss') + ']',
					customize: function (xlsx) {

						var fills = $('fills', xlsx.xl['styles.xml']);
						var fonts = $('fonts', xlsx.xl['styles.xml']);
						console.log(fills, fonts);
						fills.append(`<fill><patternFill patternType="solid"><fgColor rgb="0088CC"/></patternFill></fill>`);
						fonts.append(`<font><sz val="14"/><color rgb="FFFFFF"/></font>`);


						var ocellXfs = $('cellXfs', xlsx.xl['styles.xml']);
						console.log(fills.length, fonts.length, ocellXfs);
						if (!ocellXfs) {
							xlsx.xl['styles.xml'].append('<cellXfs></cellXfs>');
							var ocellXfs = $('cellXfs', xlsx.xl['styles.xml']);
						}

						ocellXfs.append('<xf numFmtId="0" fontId="0" fillId="0" borderId="0" applyFont="0" applyFill="0" applyBorder="0" xfId="0" applyAlignment="1">'
							+ `<alignment vertical="top" horizontal="left" wrapText="1"></alignment>`
							+ '</xf>');
						ocellXfs.attr('count', ocellXfs.attr('count') + 1);
						var oxf = $('xf', xlsx.xl['styles.xml']);
						var topwrap = oxf.length - 2;
						ocellXfs.append('<xf numFmtId="0" fontId="0" fillId="0" borderId="0" applyFont="0" applyFill="0" applyBorder="0" xfId="0" applyAlignment="1">'
							+ `<alignment horizontal="center" vertical="center" wrapText="1"/>`
							+ '</xf>');
						ocellXfs.attr('count', ocellXfs.attr('count') + 1);
						var oxf = $('xf', xlsx.xl['styles.xml']);
						var topwrapcenter = oxf.length - 2;

						ocellXfs.append('<xf numFmtId="0" fontId="5" fillId="6" borderId="1" applyFont="0" applyFill="1" applyBorder="1" xfId="0" applyAlignment="1">'
							+ `<alignment horizontal="center" vertical="center" wrapText="1"/>`
							+ '</xf>');
						ocellXfs.attr('count', ocellXfs.attr('count') + 1);
						var oxf = $('xf', xlsx.xl['styles.xml']);
						var thead = oxf.length - 2;

						var sheet = xlsx.xl.worksheets['sheet1.xml'];
						//$('row c', sheet).attr( 's', '55' );
						$('row c', sheet).attr('s', topwrap);
						$('row c[r^="A"]', sheet).attr('s', topwrapcenter);
						$('row:nth-child(1) c', sheet).attr('s', thead);

					}
				}, {
					className: 'ant-btn d-none csv_export_btn',
					extend: 'csv',
					text: 'Xuất csv',
					titleAttr: tbl.data('title') || ''
				}, {
					className: 'ant-btn d-none pdf_export_btn',
					extend: 'pdf',
					text: 'Xuất pdf',
					titleAttr: tbl.data('title') || ''
				}
			];
			// opt.rowCallback=function (row, data) {
			// 	var colarr=$(tbl.DataTable().settings()[0].aoColumns).toArray()
			// 	colarr.forEach((col,ii)=>{
			// 		if(typeof col.list!="function" && (col.list||[]).length>0){
			// 			var dtx=col.data;
			// 			console.log(col.list,data,data[dtx],dtx)
			// 			if(col.list.map((item)=>{return item.label}).indexOf(data[dtx])){
			// 				data[dtx]=(col.list[col.list.indexOf(data[dtx])]||{}).value||data[dtx];
			// 				console.log("set:",data[dtx])
			// 				tbl.DataTable().row(row).data(data);
			// 			}
			// 		}
			// 	})
			// 	//console.log(tbl.DataTable().colnums,data)
			// }
			if (typeof opt['fnFooterCallback'] == "function") {
				if (tbl.find('tfoot').length == 0) {
					var html = '<tfoot><tr>';
					opt.columnDefs.forEach((rconf, ii) => {
						html += '<td></td>';
					});
					html += '</tr></tfoot>';
					tbl.append(html);
				}
			}

			if (opt.columnDefs && opt.columnDefs.length > 0) {
				opt.columnDefs.forEach((rconf, ii) => {

					var rder = (i) => { return i };
					if (typeof rconf.render == "function") {
						var rder = rconf.render;
					}
					if (rconf.list && typeof rconf.list != "function" && rconf.list.length > 0 && (rconf.className + '').indexOf('autocomplete') != -1) {

						rconf.render = function (data, type, row, conf) {
							var bdt = null;
							conf.settings.aoColumns[conf.col].list.map((item, ii) => {
								if (data == item.label) {
									if (item.label != item.value)
										tbl.DataTable().cell(conf.row, conf.col).data(item.value)
									bdt = item.label
								}
								if (data == item.value) { bdt = item.label }
							});
							if (bdt === null) {
								if (conf.overList == true) {
									bdt = data;
								}
								else {
									//console.log(rconf.data,"------",rconf.className,'autocomplete',(rconf.className+'').indexOf('autocomplete'));
									if (data != "" && data != undefined && data != null && type == "type" && (rconf.className + '').indexOf('autocomplete') != -1) {
										if ((rconf.className + '').indexOf('accept_out_list') == -1) {
											alert(`Không tìm thấy [${data}] trong danh sách !!`);
											tbl.DataTable().cell(conf.row, conf.col).data(null)
										} else {
											bdt = data;
										}
									}

								}
							}
							return rder(bdt, type, row, conf);
						}



						opt.columnDefs[ii] = rconf;
					}
					else
						if (rconf.list && typeof rconf.list == "function") {

							rconf.render = function (data, type, row, conf) {
								var bdt = null;
								(conf.settings.aoColumns[conf.col].list(row)||[]).map((item, ii) => {
									if (data == item.label) {
										if (item.label != item.value)
											tbl.DataTable().cell(conf.row, conf.col).data(item.value)
										bdt = item.label
									}
									if (data == item.value) { bdt = item.label }
								});
								if (bdt === null) {
									bdt = data;
								}
								return rder(bdt, type, row, conf);
							}



							opt.columnDefs[ii] = rconf;
						}

					if ((opt.columnDefs[ii].className + '').indexOf('date') != -1) {
						opt.columnDefs[ii].render = function (data, type, row, conf) {
							if (data) {
								return rder(coverDate(data).format('YYYY-MM-DD HH:mm:ss'), type, row, conf);
							}
							else {
								return '';
							}
						}

					}

					if ((opt.columnDefs[ii].className + '').indexOf('data-type-password') != -1) {
						opt.columnDefs[ii].render = function (data, type, row) {
							if (data) {

								return (data + '').replace(/./g, '*');
							}
							else {
								return '';
							}
						}

					}

					if ((opt.columnDefs[ii].className + '').indexOf('data-type-checkbox') != -1) {
						opt.columnDefs[ii].render = function (data, type, row) {
							if (!data) {
								return '<label class="checkbox checkbox-primary"><input type="checkbox" value="0" class="datatable_checkbox_input"><span class="input-span"></span></label>';
							}
							else {
								return '<label class="checkbox checkbox-primary"><input type="checkbox" value="1" checked class="datatable_checkbox_input"><span class="input-span"></span></label>';
							}
						}

					}





					if (rconf.width) {

						rconf.render = function (data, type, row, conf) {
							var dtxxx = rder(data, type, row, conf);
							//console.log(type);
							if (type == "display" || type == "filter") {
								return '<div class="' + (rconf.className || '') + '"style="white-space:normal;width:' + rconf.width + ';max-width:' + rconf.width + ';min-width: 100%;">' + (dtxxx === null ? '' : (dtxxx || '')) + '</div>';
							}
							else {
								return (dtxxx === null ? '' : dtxxx);
							}

						};

					}







				})
				//console.log(opt.arrayColumns);
			}
			return tbl.DataTable(opt);
		} else {
			return tbl.DataTable();
		}
	},
	allowedit: function () {
		if ($(this).has("input").length) {
			var xx = $(this).find("input").first();
			if (xx.css('display') != 'none' || xx.attr('type') == 'checkbox')
				return false;
		}
		if ($(this).has("select").length) {
			return false
		}
		if ($(this).has("button").length) {
			return false
		}
		if ($(this).parent().hasClass("addnew")) {
			return false;
		}
		if ($(this).parent().find('td:first-child').is($(this))) {
			return false;
		}
		return true;
	},
	getAddNewData: function (_saveColumns) {
		return this.getChangedData(_saveColumns, ".addnew");
	},
	getEditData: function (_saveColumns) {
		return this.getChangedData(_saveColumns, ".editing");
	},
	getChangedData: function (_saveColumns, typeClass) {
		var tbl = $(this).DataTable();
		var result = [];
		var headers = $(this).find('thead:first tr:first');
		var changedData = tbl.rows(typeClass).data().toArray();

		if (changedData.length > 0) {
			$.each(changedData, function (idx, row) {
				var rowData = {};
				if (_saveColumns && _saveColumns.length > 0) {
					$.each(_saveColumns, function (index, item) {
						var colIndex = headers.find('th[col-name="' + item + '"]').index();
						var content = row[colIndex ? colIndex : index];

						var tmp = document.createElement("div");
						tmp.innerHTML = content;

						if ($(tmp).find("input").length > 0) {
							var inp = $(tmp).find("input").first();
							content = inp.attr("type") == "checkbox" ? (inp.is(":checked") ? "1" : "0") : inp.val();
						} else {
							content = $(tmp).text();
						}

						rowData[item] = content;
					});
				} else {
					$.each(row, function (i, t) {
						var colName = headers.find('th:eq(' + i + ')').first().attr('col-name');
						if (colName == "STT") {
							return;
						}
						var content = t;

						var tmp = document.createElement("div");
						tmp.innerHTML = content;

						if ($(tmp).find("input").length > 0) {
							var inp = $(tmp).find("input").first();
							content = inp.attr("type") == "checkbox" ? (inp.is(":checked") ? "1" : "0") : inp.val();
						} else {
							content = $(tmp).text();
						}

						rowData[colName ? colName : i] = content;
					});
				}
				result.push(rowData);
			});
		}
		return result;
	},
	addRows: function (numofRow) {
		var objec = $(this);
		var add = (numofRow && !isNaN(numofRow)) ? parseInt(numofRow) : 0;
		if (add == 0) {
			$.confirm({
				title: 'Nhập số lượng dòng!',
				type: 'red',
				icon: 'fa fa-warning',
				content: `<input style="border:1px solid #b6b6b6;border-radius:6px;padding:5px 10px;font-size:14px;width:100%;" class="input_add_row check_minmax" min=1 max=99 type='number' placeholder="Nhập số lượng dòng !">`,
				buttons: {
					ok: {
						text: 'Chấp nhận',
						btnClass: 'btn-warning',
						keys: ['Enter'],
						action: function () {
							//console.log(objec);
							var nn = $(".input_add_row").val();
							nn = parseInt(nn);
							if (isNaN(nn) || nn <= 0) {
								nn = 1;
							}
							for (var ii = 0; ii < nn; ii++)
								objec.newRow();
						}
					},
					cancel: {
						text: 'Hủy bỏ',
						btnClass: 'btn-default',
						keys: ['ESC']
					}
				}
			});
			setTimeout(() => { $(".input_add_row").focus(); }, 200)

		}
	}
	,
	newRows: function (numofRow) {
		var nur = (numofRow && !isNaN(numofRow)) ? parseInt(numofRow) : 1;

		var objec = $(this);
		var colnums = objec.find('thead:first tr:first').find('th');
		var allRows = [];

		var colStt = colnums.toArray().filter(p => $(p).attr("col-name") == "STT").map(x => $(x).index())[0];
		var eqHidden = colnums.toArray().filter(p => $(p).hasClass("hiden-input")).map(x => $(x).index());

		for (var a = 1; a <= nur; a++) {
			var rowdata = [];

			for (var i = 0; i <= colnums.length - 1; i++) {
				var datatypes = $(colnums[i]).attr('class').match(/data-type-([0-9a-zA-Z]\S+)/);
				var cell_data = "";

				if ($(colnums[i]).attr('col-name') == 'STT') {
					cell_data = a;
				}

				var defaultVal = $(colnums[i]).attr('default-value');
				if (defaultVal) {
					cell_data = defaultVal;
				}

				if (datatypes != null && datatypes[1]) {
					switch (datatypes[1]) {
						case "button":
							cell_data = "<button class='btn btn-xs btn-default'>...</button>";
							break;
						case "numeric":
							cell_data = 0;
							break;
						case "checkbox":
							cell_data = '1';
							break;
					}
				}
				rowdata.push(cell_data);
			}

			allRows.push(rowdata);
		}

		$.each(objec.DataTable().rows().data().toArray(), function (idx, item) {
			objec.DataTable().cell(idx, colStt).data(parseInt(idx) + nur + 1);
		});

		var rowNodes = objec.DataTable().rows
			.add(allRows)
			.order([[colStt, 'asc']])
			.draw(false)
			.nodes();

		$(rowNodes).addClass("addnew").find('td').attr('tabindex', 1);
		$.each(eqHidden, function (k, i) {
			$(rowNodes).find('td:eq(' + i + ')').addClass('hiden-input');
		});
	},
	newRow: function () {
		// if (typeof objec === "undefined" || objec === null) {
		// 	objec = $(this);
		// }
		var objec = $(this);
		var colnums = objec.DataTable().init().columnDefs;

		var rowdata = {};
		var eqHidden = [];
		for (var i = 0; i <= colnums.length - 1; i++) {
			var datatypes = (colnums[i].className || '').match(/data-type-([0-9a-zA-Z]\S+)/);
			var cell_data = "";
			console.log(colnums[i].className, eqHidden, (colnums[i].className || '').indexOf('hiden-input'))
			if ((colnums[i].className || '').indexOf('hiden-input') !== -1) {
				eqHidden.push(i);
			}

			if ((colnums[i].mData || '') == 'STT') {
				cell_data = "00.";
			}

			var defaultVal = (colnums[i]['defaultValue'] || '');
			if (defaultVal) {
				cell_data = defaultVal;
			}


			if (datatypes != null && datatypes[1]) {
				switch (datatypes[1]) {
					case "button":
						cell_data = "<button class='btn btn-xs btn-default'>...</button>";
						break;
					case "numeric":
						cell_data = 0;
						break;
					case "checkbox":
						cell_data = '1';
						break;
				}
			}
			rowdata[(colnums[i].mData || '')] = (cell_data);
		}
		console.log("aaaaa:", eqHidden);
		var rowNodes = objec.DataTable().row.add(rowdata).draw(false)
			.node();

		$(rowNodes).addClass("addnew").find('td').attr('tabindex', 1);
		$.each(eqHidden, function (k, i) {
			$(rowNodes).find('td:eq(' + i + ')').addClass('hiden-input');
		});
	},
	newRow_1: function (callback) {
		// if (typeof objec === "undefined" || objec === null) {
		// 	objec = $(this);
		// }
		var objec = $(this);
		var colnums = objec.find('thead:first tr:first').find('th');

		var rowdata = [];
		var eqHidden = [];
		for (var i = 0; i <= colnums.length - 1; i++) {
			var datatypes = $(colnums[i]).attr('class').match(/data-type-([0-9a-zA-Z]\S+)/);
			var cell_data = "";

			if ($(colnums[i]).hasClass('hiden-input')) {
				eqHidden.push(i);
			}

			if ($(colnums[i]).attr('col-name') == 'STT') {
				cell_data = "00.";
			}

			var defaultVal = $(colnums[i]).attr('default-col-val');
			if (defaultVal) {
				cell_data = defaultVal;
			}


			if (datatypes != null && datatypes[1]) {
				switch (datatypes[1]) {
					case "button":
						cell_data = "<button class='btn btn-xs btn-default'>...</button>";
						break;
					case "numeric":
						cell_data = 0;
						break;
					case "checkbox":
						cell_data = '1';
						break;
				}
			}
			rowdata.push(cell_data);
		}
		var rowNodes = objec.DataTable().row.add(rowdata).draw(false)
			.node();

		$(rowNodes).addClass("addnew").find('td').attr('tabindex', 1);
		$.each(eqHidden, function (k, i) {
			$(rowNodes).find('td:eq(' + i + ')').addClass('hiden-input');
		});
		callback(rowNodes);
	},
	waitingLoad: function (columncount) {
		$(this).removeClass('selected-all').removeClass('deselected-all');

		if (typeof columncount === "undefined" || columncount === null) {
			columncount = $(this).find('thead tr:first').children().length;
		}

		var sub = window.location.pathname.split('/')[1].indexOf('index') > -1 ? "" : window.location.pathname.split('/')[1];
		var baseurl = window.location.origin; //+ "/" + sub;
		$(this).find("tr:not(:first)").remove();
		$(this).find("tbody:first").append('<tr><td colspan="' + columncount + '" align="center"><img src="' + (baseurl + '/assets/img/process-bar.gif') + '"></td></tr>');
	},
	getData: function () {
		var table = $(this).DataTable();
		var rows = [];

		var data = table
			.rows()
			.data()
			.to$();

		$.each(data, function (k, v) {
			var erows2 = [];
			if (v.length > 0) {
				$.each(v, function (k1, v1) {
					var td = "<td>" + v1 + "</td>";
					var inp = $(td).find('input:first, select:first').val();
					if (inp != undefined) {
						erows2.push(inp);
					}
					else {
						erows2.push($(td).text() == "null" ? "" : $(td).text());
					}
				});
				rows.push(erows2);
			}
		});

		return rows;
	},
	getDataByColumns: function (colnames) {
		var tbl = $(this).DataTable();
		var rows = tbl.rows().data().toArray();
		var allRows = [];

		if (rows.length == 0) return {};
		for (var i = 0; i < rows.length; i++) {
			var temp = {};

			for (var j = 0; j < rows[i].length; j++) {
				var celldata = (rows[i][j]).toString().replace(/\<button(.*)\<\/button\>/, '');
				var vlue = celldata;

				var tagInput = celldata.match(/\<input(.*)\>/);
				if (tagInput != null && tagInput[0]) {
					var n = $("<div>" + celldata + "</div>").find('input:first');
					if ($(n).is(":checkbox")) {
						vlue = $(n).attr("value") ? $(n).attr("value") : "0";
					} else {
						vlue = $(n).val();
					}
				} else {
					var tagDiv = celldata.match(/\<div(.*)\<\/div\>/);
					if (tagDiv != null && tagDiv[0]) {
						vlue = $(tagDiv[0]).text();
					}
				}
				temp[colnames[j]] = vlue;
			}
			allRows.push(temp);
		}
		return allRows;
	},
	getRowData: function (colnames, row) {
		var tbl = $(this).DataTable();
		var rows = tbl.rows(row).data().toArray();
		if (rows.length == 0) return {};
		var temp = {};
		for (var j = 0; j < rows[0].length; j++) {
			var celldata = (rows[0][j]).toString().replace(/\<button(.*)\<\/button\>/, '');
			var vlue = celldata;

			var tagInput = celldata.match(/\<input(.*)\>/);
			if (tagInput != null && tagInput[0]) {
				var n = $("<div>" + celldata + "</div>").find('input:first');
				if ($(n).is(":checkbox")) {
					vlue = $(n).attr("value") ? $(n).attr("value") : "0";
				} else {
					vlue = $(n).val();
				}
			} else {
				var tagDiv = celldata.match(/\<div(.*)\<\/div\>/);
				if (tagDiv != null && tagDiv[0]) {
					vlue = $(tagDiv[0]).text();
				}
			}
			temp[colnames[j]] = vlue;
		}
		return temp;
	},
	getEditedRows: function () {
		var table = $(this).DataTable();
		var editrows = [];
		var isImport = $(this).attr('is-import');
		if (!isImport || isImport == "0") {
			table.rows('.editing').every(function (rowIdx, tableLoop, rowLoop) {
				var r = this.row(rowIdx).node();
				var erows = [];
				var etds = $(r).find('td');
				if (etds.length > 0) {
					etds.each(function () {
						var inp = $(this).find('input:first, select:first').val();
						if (inp != undefined) {
							erows.push(inp);
						}
						else {
							erows.push($(this).text() == "null" ? "" : $(this).text());
						}
					});
					editrows.push(erows);
				}
			});
		} else {
			var data = table
				.rows()
				.data()
				.to$();
			$.each(data, function (k, v) {
				var erows2 = [];
				if (v.length > 0) {
					$.each(v, function (k1, v1) {
						var td = "<td>" + v1 + "</td>";
						var inp = $(td).find('input:first, select:first').val();
						if (inp != undefined) {
							erows2.push(inp);
						}
						else {
							erows2.push($(td).text() == "null" ? "" : $(td).text());
						}
					});
					editrows.push(erows2);
				}
			});
		}
		return editrows;
	},
	getNewRows: function () {
		var addnewrows = [];
		$(this).find('tr.addnew').each(function () {
			var nrows = [];
			var ntds = $(this).find('td');
			if (ntds.length > 0) {
				ntds.each(function (td) {
					var inp = $(this).find("input:first, select:first").val();
					if (inp != undefined) {
						nrows.push(inp);
					}
					else {
						nrows.push($(this).text() == "null" ? "" : $(this).text());
					}
				});
				addnewrows.push(nrows);
			}
		});
		return addnewrows;
	},
	validate_required: function () {
		var datas = $(this).find('tr.m-row-selected, tr.editing, tr.addnew').find('td.m-required');
		var checkError = [];
		$.each(datas, function (key, data) {
			var content;
			if ($(data).find('input, select').length > 0) {
				content = $(data).find('input, select').first().val();
			} else {
				content = $(data).text();
			}

			if (!content) {
				var IDRef = $(data).parent().find('td:eq(0)');
				if (!IDRef && !$(data).parent().hasClass('editing')) return;

				$(data).addClass('error');
				checkError.push('error');
			}
		});
		if (checkError.length > 0) {
			toastr["error"]('Vui lòng nhập đầy đủ thông tin!');
			return false;
		}
		return true;
	},
	updateSTT: function (col_index) {
		if (typeof col_index === "undefined" || col_index === null) {
			col_index = 0;
		}
		var tbl = $(this).DataTable();
		var data = tbl.rows().data();
		if (!data || data.length == 0) return;
		$.each(data.toArray(), function (idx, item) {
			tbl.cell(idx, col_index).data(idx + 1);
		});
		tbl.draw(false);
	},
	filterRowIndexes: function (colIndx, key) {
		var tbl = $(this).DataTable();
		return tbl.rows()
			.eq(0)
			.filter(function (rowIdx) {
				return tbl.cell(rowIdx, colIndx).data() === key ? true : false;
			});;
	},
	getSelectedRows: function () {
		var tbl = $(this).DataTable();
		var selectedrows = tbl.rows('.selected');
		if (!selectedrows.data() || selectedrows.data().length == 0) return [];
		return selectedrows;
	},
	getSelectedData: function () {
		;
		var tbl = $(this).DataTable();
		var selectedData = tbl.rows('.selected').data();
		if (!selectedData || selectedData.length == 0) return [];
		return selectedData.toArray();
	},
	confirmDelete: function (callback) {
		var tbl = $(this).DataTable();
		if (tbl.rows('.selected').data().length == 0) return false;

		$.confirm({
			title: 'Thông báo!',
			type: 'orange',
			icon: 'fa fa-warning',
			content: 'Các dòng dữ liệu được chọn sẽ được xóa?',
			buttons: {
				ok: {
					text: 'Chấp nhận',
					btnClass: 'btn-warning',
					keys: ['Enter'],
					action: function () {
						tbl.rows('.selected.addnew').remove().draw(false);
						var delrow = tbl.rows('.selected').data().toArray();
						if (callback && delrow.length > 0) {
							callback(delrow);
						}
					}
				},
				cancel: {
					text: 'Hủy bỏ',
					btnClass: 'btn-default',
					keys: ['ESC']
				}
			}
		});
	},
	realign: function () {
		var bodytbl = $(this);
		window.setTimeout(function () {
			var headtbl = $(bodytbl).closest('.dataTables_scroll').find('.dataTables_scrollHead .dataTables_scrollHeadInner table').first();
			var addw = (window.navigator.userAgent.indexOf('Firefox') > -1 ? 0 : 1);
			$(headtbl).css('width', (parseFloat(window.getComputedStyle(bodytbl[0]).width) + addw) + "px");

			var _thbody = $(bodytbl).find('thead th');
			$.each($(headtbl).find('thead th'), function (k, v) {
				$(v).css('width', parseFloat(getComputedStyle(_thbody[$(v).index()]).width) + 'px');
			});

			var element = $(bodytbl).parent()[0];
			if (element.scrollHeight - element.scrollTop !== element.clientHeight) {
				$(bodytbl).closest('.dataTables_scroll').find('.dataTables_scrollHead .dataTables_scrollHeadInner').first().css("width", element.scrollWidth + 'px');
			}
		}, 2);
	}
});


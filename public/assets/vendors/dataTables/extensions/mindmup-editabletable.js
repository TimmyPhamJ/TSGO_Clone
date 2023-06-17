var cancelEditorType = ["button", "checkbox"];


$.fn.editableTableWidget = function (options) {
	'use strict';
	return $(this).each(function () {
		
		function getCusortPositionDiv(editableDiv) {
			var editableDiv = editableDiv[0];
			var caretPos = 0,
				sel, range;
			if (window.getSelection) {
				sel = window.getSelection();
				if (sel.rangeCount) {
					range = sel.getRangeAt(0);
					if (range.commonAncestorContainer.parentNode == editableDiv) {
						caretPos = range.endOffset;
					}
				}
			} else if (document.selection && document.selection.createRange) {
				range = document.selection.createRange();
				if (range.parentElement() == editableDiv) {
					var tempEl = document.createElement("span");
					editableDiv.insertBefore(tempEl, editableDiv.firstChild);
					var tempRange = range.duplicate();
					tempRange.moveToElementText(tempEl);
					tempRange.setEndPoint("EndToEnd", range);
					caretPos = tempRange.text.length;
				}
			}
			return caretPos;
		}

		function getCusortPositionInput(oField) {
			
			var oField = oField[0];
			var iCaretPos = 0;
			if (document.selection) {
				oField.focus();
				var oSel = document.selection.createRange();
				oSel.moveStart('character', -oField.value.length);
				iCaretPos = oSel.text.length;
			}
			else if (oField.selectionStart || oField.selectionStart == '0')
				iCaretPos = oField.selectionDirection == 'backward' ? oField.selectionStart : oField.selectionEnd;
			return iCaretPos;
		}

		function setInputPosition(elemId, caretPos) {
			var elem = document.getElementById(elemId);

			if (elem != null) {
				if (elem.createTextRange) {
					var range = elem.createTextRange();
					range.move('character', caretPos);
					range.select();
				}
				else {
					if (elem.selectionStart) {
						elem.focus();
						elem.setSelectionRange(caretPos, caretPos);
					}
					else
						elem.focus();
				}
			}
		}
		if (!editor) {
			$('body').append("<input id='editor-input' style='display: none' autocomplete=off/>");
			var editor = $("#editor-input");
		}
		var activeElement = '';
		$(document).off("mousedown touchstart", "#" + $(this).attr("id") + " " + "td").on("mousedown touchstart", "#" + $(this).attr("id") + " " + "td", function (e) {
			activeElement = this;
		})
		$(document).off("mouseup touchend", "#" + $(this).attr("id") + " " + "td").on("mouseup touchend", "#" + $(this).attr("id") + " " + "td", function (e) {
			// var e = $.Event( "keypress", { which: 13 } );
			// editor.trigger(e);
			// var e = $.Event( "keydown", { which: 13 } );
			// editor.trigger(e);
			if (activeElement !== this) return false;
			active = $(this);
			if (editor.length <= 0)
			editor = $("#editor-input");
			if (element.length <= 0)
			element = $('td.focus').closest('table');
			window.tbl_active=active;
			var thCurrent = $(this).closest("table").find('th:eq(' + active.index() + ')');
			if (thCurrent.hasClass('editor-cancel') || $(this).hasClass('editor-cancel') || $(this).closest('tr').hasClass('editor-cancel')) return false;
			if (editor.is(":visible")) {
				var tbl = $(active).closest('table').DataTable();
				tbl.cell(active).data(editor.val()).draw(false);

				editor.hide();
			}
			
			if (e.type == "touchend") {
				if (editor.length <= 0) {
					$("body").append("<input id='editor-input' value=\"" + $(this).text() + "\">");
					editor = $("#editor-input");
				}
				showEditor(false);
				var that = this;

				editor.css({ height: $(this).outerHeight() });
				editor.css({ width: $(this).outerWidth() });
				editor.css({ "position": "absolute", "border": "none", "padding": "6px 8px" }).offset({ left: $(this).offset().left, top: $(this).offset().top }).focus();



			}
			var that = this;
			setTimeout(() => {
				console.log('$(this).outerHeight()', $(that).outerHeight())
				editor.css({ height: $(that).outerHeight() });
				editor.css({ width: $(that).outerWidth() });
			}, 10)

			//alert(1);
			var possibleMove = $(this);
			if (possibleMove.length > 0) {
				$("td.focus").removeClass("focus");
				active.closest('table').find('td.focus').removeClass('focus');
				possibleMove.click();
				possibleMove.addClass("focus");

				if ($(".dt-autofill-handle").length > 0)
					$(".dt-autofill-handle").offset({ left: possibleMove.offset().left + possibleMove.outerWidth() - $(".dt-autofill-handle").outerWidth(), top: possibleMove.offset().top + possibleMove.outerHeight() - $(".dt-autofill-handle").outerHeight() });
				////console.log('stop9');
				e.preventDefault();
				e.stopPropagation();
				return false;
			}



		});
		var builCustomOptions = function () {
			if (!options) {
				return { editor: $('#editor-input') };
			}
			var opts = $.extend({}, options);
			opts.editor = opts.editor.clone();
			return opts;
		},
			buildDefaultOptions = function () {
				var opts = $.extend({}, $.fn.editableTableWidget.defaultOptions);
				opts.editor = opts.editor.clone();
				return opts;
			},
			activeOptions = $.extend(buildDefaultOptions(), builCustomOptions()),
			ARROW_LEFT = 37, ARROW_UP = 38, ARROW_RIGHT = 39, ARROW_DOWN = 40, ENTER = 13, ESC = 27, TAB = 9, BACK_SPACE = 8, DELETE = 46,
			CTRL = 17, CTRL_C = 67, CTRL_V = 86,
			element = $(this),
			editor = activeOptions.editor.css({ "position": "absolute", "z-index": "2" }).hide().appendTo(element.parent()),
			active,
			showEditor = function (select, keyInput) {
				active=element.find('td.focus');
				var tbl = $(active).closest('table').DataTable();
				editor=element.parent().find('> input').first();
				editor.val('');
				console.log('active::',editor,element,element.DataTable().init().columnDefs,element.DataTable().init().columnDefs[active.closest("table").DataTable().cell(active).index().column]);
				if(element.DataTable().init().columnDefs[active.closest("table").DataTable().cell(active).index().column]){
					var defaultValue = element.DataTable().init().columnDefs[active.closest("table").DataTable().cell(active).index().column].defaultValue;
					if (!tbl.cell(active).data()) {
						tbl.cell(active).data(defaultValue)
					}

					var maxlength = element.DataTable().init().columnDefs[active.closest("table").DataTable().cell(active).index().column].maxLength;
					//console.log(maxlength);
					editor.removeAttr('maxlength');
					if (maxlength)
						editor.attr('maxlength', maxlength);


					var isUpperCase = element.DataTable().init().columnDefs[active.closest("table").DataTable().cell(active).index().column].isUpperCase;
					editor.removeAttr('onkeyup');
					if (isUpperCase)
						editor.attr('onkeyup', `var start = this.selectionStart;
					var end = this.selectionEnd;
					this.value = this.value.toUpperCase();
					this.setSelectionRange(start, end);`);


					var inputmask = element.DataTable().init().columnDefs[active.closest("table").DataTable().cell(active).index().column].inputmask;

					//editor.inputmask();
					if (inputmask != undefined)
						editor.inputmask(inputmask);
				}
				



				editor.attr('type', 'text');
				editor.attr('autocomplete', 'off');
				active = element.find('td.focus');
				$('td.focus').removeClass('focus');
				active.addClass('focus');
				if (active.length) {
					var isDateTime = false;
					var header = element.find('th:eq(' + active.index() + ')');
					if (header.hasClass('data-type-password')) {
						editor.attr('type', 'password');
					} else
						if (header.hasClass('data-type-datetime')) {
							isDateTime = true;
							editor.datepicker("destroy");
							editor.datetimepicker({
								controlType: 'select',
								oneLine: true,
								dateFormat: 'yy-mm-dd',
								timeFormat: 'HH:mm:ss',
								timeInput: true,
								minDate: header.hasClass('disable-past-dates')?(new Date()):undefined,
								onClose: function () {
									editor.trigger('blur');
									editor.hide();
									active.trigger('close.datetimepicker');
									active.trigger('click');
								}
							});
						} else if (header.hasClass('data-type-date')) {
							isDateTime = true;
							editor.datetimepicker("destroy");
							editor.datepicker({
								controlType: 'select',
								oneLine: true,
								dateFormat: 'yy-mm-dd',
								timeInput: true,
								minDate: header.hasClass('disable-past-dates')?(new Date()):undefined,
								onClose: function () {
									editor.trigger('blur');
									editor.hide();
									active.trigger('close.datepicker');
									active.trigger('click');
								}
							});
						} else {
							isDateTime = false;
							editor.datepicker("destroy");
							editor.datetimepicker("destroy");
						}



					var check = editor.data('ui-autocomplete') != undefined;

					if (check) {
						editor.autocomplete("destroy");
					}

					if (header.hasClass('multiple_select')) {
						var tbl = $(active).closest('table').DataTable();
						var idm = header.closest('table').attr('id') + "_select2";
						var list = element.DataTable().init().columnDefs[active.closest("table").DataTable().cell(active).index().column].list;

						var cdata = (tbl.cell(active).data() || '');

						var opts = list.map((item) => {
							////console.log(cdata,"----",item.value);
							return `<option value="` + item.value + `" ` + (cdata.split(',').indexOf(item.value) == -1 ? '' : 'selected') + `>` + item.label + `</option>`;
						}).join('');
						var select2m = $(`<span class="multiple_select_box CICO"><select multiple id="${idm}">${opts}</select></span>`);
						$('.multiple_select_box').remove();
						$('body').append(select2m);
						editor.hide();
						editor = $("#" + idm);
						editor = editor.select2();
						editor = editor.closest('.multiple_select_box').find('.select2');
						editor.attr('id', idm + '_sl');
						setTimeout(()=>{editor.find('input').focus();$("#" + idm).select2('open');},100);
						$("#" + idm).on('change', function () {
							if (!$(active).closest('tr').hasClass('addnew')) $(active).closest('tr').addClass('editing');
							tbl.cell(active).data($("#" + idm).val().join(',')).draw(false);
							$("#" + idm).select2('destroy');
							$('.multiple_select_box').remove();
						})
					}

					if (header.hasClass('autocomplete')) {
						var tblID = header.closest("table").attr("id"),
							tableHeader = active.closest("table").parent().prev().find('table');
						////console.log(typeof element.DataTable().init().columnDefs[active.closest("table").DataTable().cell(active).index().column].list,'==============================');
						if (tableHeader) {
							////console.log(element.DataTable().init().columnDefs[active.index()]);
							var srcAttr = tableHeader.find("th:eq(" + active.index() + ")").attr("select-source") || JSON.stringify(element.DataTable().init().columnDefs[active.index()].list) || '[]';
							var src = srcAttr ? JSON.parse(srcAttr) : [];
							var isArr = $.isArray(src);
							var compeleteSrc = !isArr ? Object.values(src) : src;
							////console.log(element.DataTable().init().columnDefs[active.closest("table").DataTable().cell(active).index().column].list,'==============================');
							if ($.isArray(element.DataTable().init().columnDefs[active.closest("table").DataTable().cell(active).index().column].list)) {
								compeleteSrc = element.DataTable().init().columnDefs[active.closest("table").DataTable().cell(active).index().column].list
							}
							if (typeof element.DataTable().init().columnDefs[active.closest("table").DataTable().cell(active).index().column].list == 'function') {
								let rowdata = (tbl.row(active.closest('tr')).data() || '');
								compeleteSrc = element.DataTable().init().columnDefs[active.closest("table").DataTable().cell(active).index().column].list;
								//console.log('element.DataTable().init().columnDefs[active.closest("table").DataTable().cell(active).index().column].list(rowdata)',element.DataTable().init().columnDefs[active.closest("table").DataTable().cell(active).index().column].list(rowdata));
								if(element.DataTable().init().columnDefs[active.closest("table").DataTable().cell(active).index().column].list(rowdata))
								compeleteSrc = element.DataTable().init().columnDefs[active.closest("table").DataTable().cell(active).index().column].list(rowdata);
							}
							//console.log(element,element.DataTable().init().columnDefs[active.closest("table").DataTable().cell(active).index().column].list,compeleteSrc);					
							editor.autocomplete({
								source: compeleteSrc,
								minLength: 0,
								change: function (event, ui) {
									if (!ui.item) {
										if (!header.hasClass('accept_out_list')) {
											alert('Không có giá trị này trong bảng !!');
											tbl.cell(active).data(null).draw(false);
										}

									}
								}

								// create: function( event, ui ) {
								// 	editor.autocomplete("search");
								// }
							});
							editor.show();
							setTimeout(() => { if(editor && editor.autocomplete) editor.autocomplete("search", ''); }, 10);

							editor.on('autocompleteselect', function (e, ui) {
								var tbl = $(active).closest('table').DataTable();
								if (!$(active).closest('tr').hasClass('addnew')) $(active).closest('tr').addClass('editing');
								console.log(ui);
								////console.log('ui.item.rowData',element.DataTable().columns().context[0].aoColumns[0].name,$(active).closest('tr').find('td:first-child').text());
								if (ui.item.rowData != undefined) {

									var rowx = $(active).closest('tr').index();
									if (element.DataTable().columns().context[0].aoColumns[0].name == 'STT')
										ui.item.rowData['STT'] = $(active).closest('tr').find('td:first-child').text();
									////console.log(ui.item.rowData,rowx);
									tbl.row($(active).closest('tr')).data(Object.assign(tbl.row($(active).closest('tr')).data(), ui.item.rowData)).draw(false);
								}
								else
									tbl.cell(active).data(ui.item.value).draw(false);
								if (editor.data('ui-autocomplete') != undefined) {
									editor.autocomplete("destroy");
								}
								editor.removeData('autocomplete');
								editor.hide();
							});
						}
					}

					// alert(1);
					// alert(active.text());	

					var n;
					if (!keyInput) {
						n = editor.is('select') ? active.find('input:first').val() : active.text();
					} else {
						n = (!isDateTime) ? keyInput : "";
					}

					if (header.hasClass('data-type-numeric')) {
						if (!n) {
							n = "0";
						}
						n = n.split(",").join("");
					}

					var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

					if (isFirefox || (!keyInput && n != "")) {
						editor.val(n);
					}

					editor
						.removeClass('error')
						.show()
						.offset(active.offset())
						.css(active.css(activeOptions.cloneProperties)) //double chữ ở chrome ở đây nè
						.css({ width: active.outerWidth() })
						.css({ height: active.outerHeight() })
						.focus();
					var that = this;
					setTimeout(() => {
						editor.css({ height: active.outerHeight() });
						editor.css({ width: active.outerWidth() });
					}, 10);
					if (editor.val() == "0" && header.hasClass('data-type-numeric')) editor.val("");
					active.addClass('focus');
					editor.data("active", active);
					if (select) {
						editor.select();
					}
				}
			},
			setActiveText = function () {
				if(!active)active=window.tbl_active;
				var text = editor.val(),
					evt = $.Event('change'),
					originalContent;
				if (active.text() === text || editor.hasClass('error')) {
					return true;
				}
				originalContent = active.html();
				active.text(text).trigger(evt, text);
				if (evt.result === false) {
					active.html(originalContent);
				}
			},
			movement = function (element, keycode) {

				//console.log(getCusortPositionInput(editor),editor.val().length,"-------------------log-------")
				var cpos = getCusortPositionInput(editor);
				if (keycode === ARROW_RIGHT) { cpos += 1 }
				if (keycode === ARROW_LEFT) { cpos -= 1 }
				//console.log(keycode, cpos);
				if (keycode === ARROW_RIGHT && cpos > editor.val().length) {
					//console.log('next');
					editor.trigger('blur').hide();
					return element.next('td');
				} else if (keycode === ARROW_LEFT && cpos < 0) {
					//console.log('back');
					editor.trigger('blur').hide();
					return element.prev('td');
				} else if (keycode === ARROW_UP && !editor.hasClass('ui-autocomplete-input')) {
					editor.trigger('blur').hide();
					return element.parent().prev().children().eq(element.index());
				} else if (keycode === ARROW_DOWN && !editor.hasClass('ui-autocomplete-input')) {
					editor.trigger('blur').hide();
					return element.parent().next().children().eq(element.index());
				}
				return [];
			};
		editor.blur(function () {
			//alert($("#editor-input").val());
			if (editor.data('ui-autocomplete')) {
				$(".ui-state-active").trigger('click');
			}
			if (editor.is(":hidden")) {
				return;
			}
			if (editor.hasClass('ui-autocomplete-input')) {
				editor.hide();
				return false;
			}

			setActiveText();
			var str = editor.is('select') ? '<input class="hidden-input" value="' + editor.val() + '"/>' + editor.find(':selected').text() : editor.val();
			var tbl = $(active).closest('table').DataTable();

			str = str ? str.trim() : "";


			$(active).removeClass("error");

			var headerEditing = element.parent().prev().find("table").find("thead th:eq(" + active.index() + ")");

			//check cont iso
			var colName = headerEditing.attr("col-name");
			if (colName == "CntrNo") {
				if (!editor.check_cont_iso()) {
					window.message["error"]("Container không đúng chuẩn ISO!");
					$(active).addClass("error");
				}
			}

			tbl.cell(active).data(str).draw(false);

			active.trigger("change");

			var urowIdx = tbl.cell(active).index().row;
			var crow = tbl.row(urowIdx).nodes().to$();
			if (!crow.hasClass("addnew")) {
				crow.addClass("editing");
			}


			if (headerEditing.hasClass('data-type-date')
				|| headerEditing.hasClass('data-type-datetime')) {
				return;
			}

			editor.hide();
		}).keydown(function (e) {

			if (e.which === ENTER) {
				setActiveText();
				var str = editor.is('select') ? '<input class="hidden-input" value="' + editor.val() + '"/>' + editor.find(':selected').text() : editor.val();

				var tbl = $(active).closest('table').DataTable();

				str = str ? str.trim() : "";
				////console.log(editor.data(),'editor.data()');

				// if(editor.data('ui-autocomplete')){
				// 	var atcplSource = editor.data('ui-autocomplete').options.source;
				// 	if(atcplSource && atcplSource.length > 0){
				// 		if(atcplSource.indexOf(str) < 0 && atcplSource.indexOf(str.toUpperCase()) < 0){
				// 			//window.message["error"]("Dữ liệu nhập vào không đúng!");
				// 			$(active).addClass("error");
				// 			tbl.cell(active).data("");
				// 			editor.hide();

				// 			active.focus();

				// 			return;
				// 		}
				// 	}
				// }

				$(active).removeClass("error");

				//check cont iso
				var colName = element.find("thead th:eq(" + active.index() + ")").attr("col-name");
				if (colName == "CntrNo") {
					if (!editor.check_cont_iso()) {
						window.message["error"]("Container không đúng chuẩn ISO!");
						$(active).addClass("error");
					}
				}

				tbl.cell(active).data(str).draw(false);

				active.trigger("change");

				var urowIdx = tbl.cell(active).index().row;
				var crow = tbl.row(urowIdx).nodes().to$();
				if (!crow.hasClass("addnew")) {
					crow.addClass("editing");
				}

				editor.hide();
				//console.log('stop8');
				e.preventDefault();
				e.stopPropagation();
			} else if (e.which === ESC) {
				editor.val(active.text());
				//console.log('stop9');
				e.preventDefault();
				e.stopPropagation();
				editor.hide();
			} else if (e.which === TAB) {
				setActiveText();
				var str1 = editor.is('select') ? '<input class="hidden-input" value="' + editor.val() + '"/>' + editor.find(':selected').text() : editor.val();

				var tbl = $(active).closest('table').DataTable();

				str1 = str1 ? str1.trim() : "";

				if (editor.data('ui-autocomplete')) {
					var atcplSource = editor.data('ui-autocomplete').options.source;
					if (atcplSource && atcplSource.length > 0) {
						if (atcplSource.indexOf(str1) < 0 && atcplSource.indexOf(str1.toUpperCase()) < 0) {
							//window.message["error"]("Dữ liệu nhập vào không đúng!");
							$(active).addClass("error");
							tbl.cell(active).data("");
							editor.hide();

							active.focus();

							return;
						}
					}
				}

				$(active).removeClass("error");

				//check cont iso
				var colName = element.find("thead th:eq(" + active.index() + ")").attr("col-name");
				if (colName == "CntrNo") {
					if (!editor.check_cont_iso()) {
						//window.message["error"]("Container không đúng chuẩn ISO!");
						$(active).addClass("error");
					}
				}

				tbl.cell(active).data(str1).draw(false);

				active.trigger("change");

				var urowIdx = tbl.cell(active).index().row;
				var crow = tbl.row(urowIdx).nodes().to$();
				if (!crow.hasClass("addnew")) {
					crow.addClass("editing");
				}

				editor.hide();
				//console.log('swopx');
				e.preventDefault();
				e.stopPropagation();
			} else if (e.which === ARROW_LEFT || e.which === ARROW_UP || e.which === ARROW_RIGHT || e.which === ARROW_UP) {
				var keycode = e.keycode || e.which;
				var possibleMove = movement(active, keycode);
				console.log('possibleMove.length', keycode, possibleMove.length);
				if (possibleMove.length == 0) {
					return false;
				}


				if (possibleMove.length > 0) {
					$('td.focus').removeClass('focus');
					possibleMove.addClass('focus');
					setActiveText();
					var str1 = editor.is('select') ? '<input class="hidden-input" value="' + editor.val() + '"/>' + editor.find(':selected').text() : editor.val();

					var tbl = $(active).closest('table').DataTable();

					str1 = str1 ? str1.trim() : "";

					if (editor.data('ui-autocomplete')) {
						var atcplSource = editor.data('ui-autocomplete').options.source;
						if (atcplSource && atcplSource.length > 0) {
							if (atcplSource.indexOf(str1) < 0 && atcplSource.indexOf(str1.toUpperCase()) < 0) {
								window.message["error"]("Dữ liệu nhập vào không đúng!");
								$(active).addClass("error");
								tbl.cell(active).data("");
								if ((keycode == 39 || keycode == 37) && editor.hasClass('ui-autocomplete-input')) {
									//console.log("hide");
									editor.hide();
								}

								return;
							}
						}
					}

					$(active).removeClass("error");

					//check cont iso
					var colName = element.find("thead th:eq(" + active.index() + ")").attr("col-name");
					if (colName == "CntrNo") {
						if (!editor.check_cont_iso()) {
							window.message["error"]("Container không đúng chuẩn ISO!");
							$(active).addClass("error");
						}
					}

					tbl.cell(active).data(str1).draw(false);

					active.trigger("change");

					var urowIdx = tbl.cell(active).index().row;
					var crow = tbl.row(urowIdx).nodes().to$();
					if (!crow.hasClass("addnew")) {
						crow.addClass("editing");
					}
					//console.log("stoped");
					if ((keycode == 39 || keycode == 37) && editor.hasClass('ui-autocomplete-input')) {
						//console.log("hide");
						editor.hide();
					}
					active.closest('table').find('td.focus').removeClass('focus');
					possibleMove.addClass('focus');
				}
			} else if (this.selectionEnd - this.selectionStart === this.value.length) {

				var possibleMove = movement(active, e.which);
				if (possibleMove.length > 0) {
					//console.log('hhhh');
					e.preventDefault();
					e.stopPropagation();
				}
			}
		})
			.on('input paste keydown', function (e) {
				active = $("td.focus");
				//var editor = $("#editor-input");
				// var tbl = $(active).closest('table').DataTable();
				// tbl.cell(active).data(editor.val()).draw(false);

				var keycode = e.keycode || e.which;
				//console.log(keycode);
				var possibleMove = movement(active, keycode);
				//console.log("possibleMove.length", possibleMove.length);
				if (possibleMove.length == 0) {
					if ((keycode >= 35 && keycode <= 40) || keycode == 9) {
						var cpos = getCusortPositionInput(editor);
						if (keycode === ARROW_RIGHT) { cpos += 1 }
						if (keycode === ARROW_LEFT) { cpos -= 1 }
						//console.log("kdown keycode",editor.val().length,cpos);
						if (keycode === ARROW_LEFT && editor.val().length > 0 && cpos >= 0) {
							showEditor(false);
							setInputPosition(editor.attr('id'), cpos);
							//showEditor(false);
							return true;
						}
						if (keycode === ARROW_RIGHT && editor.val().length >= cpos) {
							showEditor(false);
							setInputPosition(editor.attr('id'), cpos);
							//showEditor(false);
							return true;
						}
						if (editor.hasClass("ui-autocomplete-input")) {
							return false;
						}

						return false;
					}
				}


				if (element.find('th:eq(' + active.index() + ')').hasClass('data-type-numeric')) {

					if (e.type == "keydown") {
						// Allow: backspace, delete, tab, escape, enter and .
						if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190, 188]) !== -1 ||
							((e.keyCode == 65 || e.keyCode == 86 || e.keyCode == 67) && (e.ctrlKey === true || e.metaKey === true)) ||
							(e.keyCode >= 35 && e.keyCode <= 40)) {
							//editor.hide();
							return;
						}
						// Ensure that it is a number and stop the keypress
						if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
							//console.log('stop3');
							e.preventDefault();
							return;
						}
					} else if (e.type == "paste") {
						var tempval = e.originalEvent.clipboardData.getData('Text').replace(',', '');
						editor.val($.isNumeric(tempval) ? tempval : "");
						//console.log('stop4');
						e.preventDefault();
						return;
					}
				}
				var evt = $.Event('validate');
				active.trigger(evt, editor.val());
				if (evt.result === false) {
					editor.addClass('error');
				} else {
					editor.removeClass('error');
				}

			});





		$(document).off('keypress dblclick').on('keypress dblclick', function (e) {
			if ($('td.focus').length == 0) return;
			element = $('td.focus').closest('table');
			if ($(e.target).prop("tagName") == "INPUT" || $(e.target).hasClass('editor-cancel') || $(e.target).closest('tr').hasClass('editor-cancel')) {
				return;
			}
			if (element == undefined) return false;
			if (editor.is(":visible")) {
				//editor.hide();
				var tbl = $(active).closest('table').DataTable();
				tbl.cell(active).data(editor.val()).draw(false);
				return false;
			}
			var tdActive = element.find('td.focus'),
				thCurrent = element.find('th:eq(' + tdActive.index() + ')'),
				editorID = thCurrent.attr('class').match(/editor-(.*) (.*)/),
				editTag = '',
				keyInput = '';
			//console.log(e.type,thCurrent.attr('class'))
			if (e.type == "keypress") {

				if (thCurrent.hasClass('editor-cancel') || tdActive.hasClass('editor-cancel') || tdActive.closest('tr').hasClass('editor-cancel')) return;

				if (thCurrent.hasClass('data-type-numeric') && !$.isNumeric(e.originalEvent.key)) {
					//console.log('stop6');
					e.preventDefault();
					return;
				}
				else {
					//console.log(tdActive.index(),thCurrent.hasClass('data-type-numeric'),thCurrent,"thCurrent");
				}

				keyInput = e.originalEvent.key;
			}

			if (editorID != null && editorID[1]) {
				var editorElem = editorID[1].split(" ")[0];
				if ($('#' + editorElem).length == 0) return;
				editTag = editorElem;
				keyInput = undefined;
			} else {
				editTag = "editor-input";
			}

			$.each(activeOptions.editor, function (idx, item) {
				if ($(item).attr('id') == editTag) {
					editor = $(item);
				}
			});
			showEditor(false, keyInput);
		});



		$(document).off('keydown paste', '.dataTable').on('keydown paste', '.dataTable', function (e) {
			//return false;
			if (e.type == "paste") {
				var tempval = e.originalEvent.clipboardData.getData('Text').replace(',', '');
				//console.log(tempval);
			}
			//console.log(e,"log2");
			//$('td.focus').last().click();
			element = $('td.focus').closest('table');
			if (element == undefined) return false;
			var prevent = false,
				tdActive = element.find('td.focus'),
				thCurrent = element.find('th:eq(' + tdActive.index() + ')');
			// // if (e.which === ENTER) {
			// // 	showEditor(false);
			// // } else if (e.which === 17 || e.which === 91 || e.which === 93) {
			// // 	showEditor(true);
			// // 	prevent = false;
			// // } else {
			// // 	prevent = false;
			// // }
			// if(e.which === BACK_SPACE || e.which === DELETE || e.which === TAB){
			// 	prevent = false;
			// }

			switch (e.which) {
				case ESC:
					prevent = true;
					break;
				case BACK_SPACE:
					//prevent = true;
					//element.DataTable().cell(tdActive).data('').draw(false);
					//showEditor(false);
					break;
				case DELETE:
				// if(thCurrent.hasClass('editor-cancel')) return;
				// element.DataTable().cell(tdActive).data('').draw(false);
				// tdActive.focus();
				// prevent = true;
				// break;
				case CTRL_C:
					// if(e.ctrlKey){
					// 	var el = document.createElement('textarea');
					// 	el.value = element.DataTable().cell(tdActive).data();
					// 	document.body.appendChild(el);
					// 	el.select();
					// 	document.execCommand('copy');
					// 	document.body.removeChild(el);
					// 	prevent = true;
					// }

					break;
				default:
					prevent = false;
			}

			if (prevent) {
				//console.log("=================================================");
				e.stopPropagation();
				e.preventDefault();
			}

		});

		element.find('td').prop('tabindex', 1);

		$(window).on('resize', function () {
			if (editor.is(':visible')) {
				editor.offset(active.offset())
					.width(active.outerWidth())
					.height(active.outerHeight());
			}
		});

		$.pasteCell(function (e) {

			var tdActive = element.find('td.focus'),
				thCurrent = element.find('th:eq(' + tdActive.index() + ')'),
				editorID = thCurrent.attr('class').match(/editor-(.*) (.*)/),
				editTag = "editor-input",
				rowIdx = tdActive.parent().index(),
				colIdx = tdActive.index();

			var pasteMultiCol, pasteMultiRow;

			var pasteMultiRow = e.split(/(\r\n|\r|\n)/g),
				pasteMultiCol = e.split(/(\t)/g);

			if (pasteMultiRow.length > 1) {

				var row1 = rowIdx;

				$.each(pasteMultiRow, function (i1, v1) {

					var _multicol = v1.split(/(\t)/g);

					if (_multicol.length > 1) {
						var col1 = colIdx;
						$.each(_multicol, function (i2, v2) {

							if (v2 === "\n" || v2 === "\r\n" || v2 === "\r" || v2 === "\t") return;

							fillValues(row1, col1, v2);

							col1 += 1;
						});
					} else {
						if (v1 === "\n" || v1 === "\r\n" || v1 === "\r" || v1 === "\t") return;

						fillValues(row1, colIdx, v1);
					}

					row1 += 1;
				});
			} else if (pasteMultiCol.length > 1) {

				var col2 = colIdx;

				$.each(pasteMultiCol, function (i3, v3) {
					if (v3 === "\n" || v3 === "\r\n" || v3 === "\r" || v3 === "\t") return;

					fillValues(rowIdx, col2, v3);

					col2 += 1;
				});
			} else {

				if (e === "\n" || e === "\r\n" || e === "\r" || e === "\t") return;

				fillValues(rowIdx, colIdx, e);
			}

			element.DataTable().columns.adjust();
		});

		function fillValues(rowIndex, colIndex, val) {
			val = !val ? "" : val;
			val = val.trim().replace("\r\n|\r|\n|\t", "");
			
			var tdActive = element.find('tbody tr:eq(' + rowIndex + ') td:eq(' + colIndex + ')'),
				thCurrent = element.find('th:eq(' + colIndex + ')'),
				editorID = thCurrent.attr('class').match(/editor-(.*) (.*)/),
				editTag = "editor-input";
			if (tdActive.hasClass('editor-cancel') || tdActive.closest('tr').hasClass('editor-cancel')) {
				return;
			}
			if (!tdActive || tdActive.length == 0) {
				return;
			}

			if (editorID != null && editorID[1]) {
				if ($('#' + editorID[1]).length == 0) { return; }
				editTag = editorID[1];
			}

			if (editTag != "editor-input") { return; }

			if (thCurrent.hasClass('data-type-numeric') && !$.isNumeric(val)) return;



			if ((thCurrent.hasClass('data-type-date') || thCurrent.hasClass('data-type-datetime')) && !$.isDateValid(val)) return;
			element.DataTable().cell(tdActive).data(val);
			if(!element.find('tbody tr:eq(' + rowIndex + ')').hasClass('addnew'))
				element.find('tbody tr:eq(' + rowIndex + ')').addClass('editing');
			// tdActive.focus();
			return true;
		};


	});

};

var editor = $("#editor-input");
// setTimeout(()=>{
// 	$("input[id='editor-input']").remove();
// 	$('body').append(`<input id="editor-input">`);
// 	editor = $("#editor-input");
// },500)
$.fn.editableTableWidget.defaultOptions = {
	cloneProperties: ['padding', 'padding-top', 'padding-bottom', 'padding-left', 'padding-right',
		'text-align', 'font', 'font-size', 'font-family', 'font-weight',
		'border', 'border-top', 'border-bottom', 'border-left', 'border-right'],
	editor: editor
};


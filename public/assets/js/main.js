// Author: Manes
// createdate: 06/04/2018

(function( $ ){
	$.fn.createAxisX = function(Col) {
		var temp1 = 1;
		var temp2 = 2;
		var width = (100 / Col);
		// var width = (100 / Col) - 0.12;
		if (Col % 2 == 0) {
			var center = Col / 2;
		}else{
			var center = (Col/2 - 0.5);
		}
		var count = 0;
		for (var i = 0; i < center; i++) {
			this.prepend(function(){
				if (i < 4) {
					return '<span style="width:'+ width + '%' +'">'+ '0' + temp2 +'<\/span>';
				}else{
					return '<span style="width:'+ width + '%' +'">'+ temp2 +'<\/span>';
				}
			});
			if (Col % 2 != 0 && count < 1) {
				this.append('<span style="width:'+ width + '%' +'">00<\/span>');
				count += 1;
			}
			this.append(function(){					
				if (i < 5) {
					return '<span style="width:'+ width + '%' +'">'+ '0' + temp1 +'<\/span>';
				}else{
					return '<span style="width:'+ width + '%' +'">'+ temp1 +'<\/span>';
				}
			});
			temp1 = temp1 + 2;
			temp2 = temp2 + 2;
		}
		return this;
	};

	$.fn.createAxisY = function(arrs){
		var height = 100 / arrs.length;
		for (var i = 0; i < arrs.length; i++) {
			if (parseInt(arrs[i].cTier) < 50 && this.find('#basement-space').length < 1) {
				this.append('<span id="basement-space" style="height:2px"></span>');
			}
			this.append(function(){
				return '<span style="height:'+ height +'%; line-height: '+height+'%;"><i>'+ arrs[i].cTier +'</i></span>';
			});
		}
		return this;
	};		

	$.fn.createTableCell = function(arrs){
		var maxCol = 0;
		for (var i = 0; i < arrs.length; i++) {
			if (maxCol <= arrs[i].cRow.length) {
				maxCol = arrs[i].cRow.length;
			}
		}
		var cellwidth = 100 / maxCol;
		var cellheight = (this.parents('#bayview-above-content').height() / arrs.length) - 3;
		for (var k = 0; k < arrs.length; k++) {
			if (parseInt(arrs[k].cTier) < 50 && this.find('#basement').length < 1) {
				this.append('<tr id="basement"><td colspan="'+ maxCol +'"></td></tr>');
			}
			this.append(function(){
				var content = '';
				if (arrs[k].cRow.length < maxCol) {
					for (var j = 0; j < maxCol; j++) {
						var temp = (maxCol - arrs[k].cRow.length) / 2;
						var check = (maxCol - arrs[k].cRow.length) % 2;
						var center;
						if (check) {
							temp = (temp - 0.5);
							center = ((maxCol / 2) - 0.5);
						}else{
							// temp = temp + 1;
							center = -1;
						}
						var max = maxCol - temp;

						if (j < temp || j >= max || j == center) {
							content = content + '<td class="m-cell-empty" style="width:'+ cellwidth +'%'+'"><\/td>';
						}else{
							if (j < center || !check) {
								content = content + '<td id="'+ arrs[k].cRow[j-temp] +'-'+ arrs[k].cTier +'" style="width:'+ cellwidth +'%;height:'+cellheight+'px"><\/td>';
							}else if(j > center){
								content = content + '<td id="'+ arrs[k].cRow[j-temp - 1] +'-'+ arrs[k].cTier +'" style="width:'+ cellwidth +'%;height:'+cellheight+'px"><\/td>';
							}
							
						}
					}
					return '<tr>' + content + '<\/tr>';
				}else{
					for (var j = 0; j < arrs[k].cRow.length; j++) {							
						content = content + '<td id="'+ arrs[k].cRow[j] +'-'+ arrs[k].cTier +'" style="width:'+ cellwidth +'%;height:'+cellheight+'px"><\/td>';
					}
					return '<tr>' + content + '<\/tr>';
				}
			});					
		}			
	}

		// load container
		$.fn.loadContainer_New = function(datas, iOldVBay){
			for (var i = 0; i < datas.length; i++) {
				var content = 	'<div class="m-table-block1">'+
                 					'<div class="m-cell-header"><span class="CntrNo">'+datas[i].CntrNo+'</span></div>'+
                 				'</div>'+
                 				'<div class="m-table-block2 m-flex-content">'+
					                '<span class="OprID">'+ (datas[i].OprID ? datas[i].OprID : '') +'</span>'+
					                '<span class="ISO_SZTP">'+ (datas[i].ISO_SZTP ? datas[i].ISO_SZTP : '') +'</span>'+
					                '<span class="Status">'+(datas[i].Status ? datas[i].Status+'(<b class="ContCondition">'+(datas[i].ContCondition ? datas[i].ContCondition : '-')+'</b>)' : '')+'</span>'+
				                '</div>'+
                 				'<div class="m-table-block3 m-flex-content">'+
                 					'<span data-value="'+datas[i].PODischarge+'" class="PODischarge">'+(datas[i].PODischarge ? datas[i].PODischarge.slice(2) : '')+'</span>'+
                 					'<span class="CMDWeight">'+(datas[i].CMDWeight ? datas[i].CMDWeight : '')+'</span>'+
                 					'<div class="m-corner-info">'+
                 						'<span class="contCode">'+getContSign(datas[i])+'</span>'+
                 						'<span class="myRG" style="display:none">'+datas[i].myRG+'</span>';
                 					'</div>'+
                 				'</div>';
                if (datas[i].ISO_SZTP && (datas[i].ISO_SZTP.substring(0, 1) == "4" || datas[i].ISO_SZTP.substring(0, 1) == "L") && parseInt(datas[i].cVBay) % 2 == 0) {
                	if (parseInt(iOldVBay) < parseInt(datas[i].cVBay)) {
                		$('#'+datas[i].cVRow+'-'+datas[i].cVTier).addClass('m-cont-disable');//.html(content);
            		}
            		else {
            			$('#'+datas[i].cVRow+'-'+datas[i].cVTier).html(content);
						$('#'+datas[i].cVRow+'-'+datas[i].cVTier).css({
							'background': '#'+(datas[i].BackColor ? datas[i].BackColor.substr(2, 6)+'aa' : 'fff')
						});
						$('#'+datas[i].cVRow+'-'+datas[i].cVTier).css('font-size', ($('#'+datas[i].cVRow+'-'+datas[i].cVTier).width() * 0.1)+'px');

						if(datas[i].myRG == "" && datas[i].LOCK == "1" && datas[i].CntrClass == "1") {
							// $('#'+datas[i].cVRow+'-'+datas[i].cVTier).addClass('m-success-up');
						};
						$('#'+datas[i].cVRow+'-'+datas[i].cVTier).find('span').css('color', '#'+(datas[i].ForeColor ? datas[i].ForeColor.substr(2, 6) : 'fff'));
            		};
                }
                else {
                	$('#'+datas[i].cVRow+'-'+datas[i].cVTier).html(content);
					$('#'+datas[i].cVRow+'-'+datas[i].cVTier).css({
						'background': '#'+(datas[i].BackColor ? datas[i].BackColor.substr(2, 6)+'aa' : 'fff')
					});
					$('#'+datas[i].cVRow+'-'+datas[i].cVTier).css('font-size', ($('#'+datas[i].cVRow+'-'+datas[i].cVTier).width() * 0.1)+'px');

					if(datas[i].myRG == "" && datas[i].LOCK == "1" && datas[i].CntrClass == "1") {
						// $('#'+datas[i].cVRow+'-'+datas[i].cVTier).addClass('m-success-up');
					};
					$('#'+datas[i].cVRow+'-'+datas[i].cVTier).find('span').css('color', '#'+(datas[i].ForeColor ? datas[i].ForeColor.substr(2, 6) : 'fff'));
                };
			}
		};
		$.fn.loadContainer = function(datas, axis = '', status='front'){
			for (var i = 0; i < datas.length; i++) {
				var content= '<div class="m-table-block1">'+
                 '<div class="m-cell-header"><span class="CntrNo">'+datas[i].CntrNo+'</span></div>'+
                 '</div>'+
                 '<div class="m-table-block2 m-flex-content">'+
                 '<span class="OprID">'+datas[i].OprID+'</span>'+
                 '<span class="ISO_SZTP">'+datas[i].ISO_SZTP+'</span>'+
                 '<span class="Status">'+(datas[i].Status ? datas[i].Status+'(<b class="ContCondition">'+(datas[i].ContCondition ? datas[i].ContCondition : '-')+'</b>)' : '')+'</span>'+
                 '</div>'+
                 '<div class="m-table-block3 m-flex-content">'+
                 '<span data-value="'+datas[i].PODischarge+'" class="PODischarge">'+(datas[i].PODischarge ? datas[i].PODischarge.slice(2) : '')+'</span>'+
                 '<span class="CMDWeight">'+datas[i].CMDWeight+'</span>'+
                 '<div class="m-corner-info">'+
                 '<span class="contCode">'+getContSign(datas[i])+'</span>'+
                 '<span class="myRG" style="display:none">'+datas[i].myRG+'</span>';
                 '</div>'+
                 '</div>';
				// var content = '<span class="CntrNo">'+datas[i].CntrNo+'</span>'+
				// '<span>'+datas[i].OprID+'</span>'+
				// '<span>'+datas[i].ISO_SZTP+'</span>'+								
				// '<span>'+(datas[i].PODischarge ? datas[i].PODischarge : '')+'</span>'+
				// '<span>'+(datas[i].CMDWeight ? datas[i].CMDWeight : '')+'</span>'+
				// '<span>'+datas[i].Status+'</span>' +
				// console.log(datas);
				if (status == 'front') {
					if (axis.length == 0) {
						$('#'+datas[i].cVRow+'-'+datas[i].cVTier).html(content);
						$('#'+datas[i].cVRow+'-'+datas[i].cVTier).css({
							'background': '#'+(datas[i].BackColor ? datas[i].BackColor.substr(2, 6)+'aa' : 'fff')
							// 'box-shadow': 'inset 0 -4px 10px #'+(datas[i].BackColor ? datas[i].BackColor.substr(2, 6)+'aa' : 'fff')
							// 'border': '2px solid black'
						});

						$('#'+datas[i].cVRow+'-'+datas[i].cVTier).css('font-size', ($('#'+datas[i].cVRow+'-'+datas[i].cVTier).width() * 0.1)+'px');

						if(datas[i].myRG == "" && datas[i].LOCK == "1" && datas[i].CntrClass == "1") {
							$('#'+datas[i].cVRow+'-'+datas[i].cVTier).addClass('m-success-up');
						};
						$('#'+datas[i].cVRow+'-'+datas[i].cVTier).find('span').css('color', '#'+(datas[i].ForeColor ? datas[i].ForeColor.substr(2, 6) : 'fff'));
					}
					else{
						$('#'+axis).html(content);
						$('#'+axis).css('background', '#'+(datas[i].BackColor ? datas[i].BackColor.substr(2, 6) : 'fff'));
						$('#'+axis).find('span').css('color', '#'+(datas[i].ForeColor ? datas[i].ForeColor.substr(2, 6) : 'fff'));
					}
				}else if(status == 'back'){
					if (axis.length == 0) {
						$('#'+datas[i].cVRow+'-'+datas[i].cVTier).addClass('m-cont-disable').html(content);
					}else{
						$('#'+axis).addClass('m-cont-disable').html(content);
					}
				}
			}
		};

		$.fn.isEmpty = function(){
			if ($.trim(this.html()) == '') {
				return true;
			}else{
				return false;
			}
		};

		// change bay
		$.fn.changePos = function(selected){
			this.html($('.' + selected).html());
			$('.' + selected).html('');
		};

		$.fn.checkContRule = function(type1, type2){
			var curentpos, belowpos;
			var curenttype, belowtype, upponpos;
			var message = 'KhĂ´ng hoĂ n thĂ nh: \n';
			var patt = /(L|4)/i;
			var patt2 = /(L|4)/i;
			curentpos = this.attr('id');
			if(!curentpos) 	return;
			var tmpStrPos=curentpos.split("-");
			if(tmpStrPos[0])
			{
				belowpos = curentpos.substr(0, 3)+(parseInt(curentpos.substr(3, 1)) - 1);
				curenttype = patt.test(type1);
				belowtype = patt2.test(type2);
				var test = this.html();
			//check rule
			// console.log(curentpos+'-'+belowpos);
			// console.log($('#'+curentpos).html());
			// console.log($('#'+curentpos+' .CntrNo').html() + '-' + $('#'+belowpos+' .CntrNo').html());
			if (this.html().length > 0 && !this.hasClass('m-success-down')) {
				$('#'+curentpos).addClass('m-crash-down');
				message += '- trĂ¹ng vá»‹ trĂ­ cont';
				return message;
			}else{
				if (curentpos.substr(3, 1) == 1) {
					return true;
				}else{
					if ($('#' + belowpos).html().length > 0 && !$('#' + belowpos).hasClass('m-crash-down') && !$('#' + belowpos).hasClass('m-success-down') || $('#'+curentpos+' .CntrNo').html() == $('#'+belowpos+' .CntrNo').html()) {
						if (curenttype == true && belowtype == true) {
							return true;
						}else if (curenttype == false && belowtype == false) {
							return true;
						}else if(curenttype == true && belowtype == false){
							message += '- khĂ´ng thá»ƒ Ä‘áº·t cont 40 trĂªn cont 20 \n';
							return message;
						}else if(curenttype == false && belowtype == true){
							message += '- khĂ´ng thá»ƒ Ä‘áº·t cont 20 trĂªn cont 40 \n';
							return message;
						}					
					}else{
						message += '- trá»‘ng vá»‹ trĂ­ bĂªn dÆ°á»›i \n';
						return message;
					}
				}
			}	
		}

		$.fn.checkContRule_NEW = function(ISO_1, ISO_2) {

		}
	}

	$.fn.searchEngine = function(arrToFind, keyword){
		keyword = keyword.toUpperCase();
		var patt = new RegExp(keyword);
		var matchresult = [];						
		for (var i = 0; i < arrToFind.length; i++) {
			if (patt.test(arrToFind[i]) == true) {
				matchresult.push(arrToFind[i]);
			}else{
				continue;
			}
		}

		return matchresult;
	}

	$.fn.Tallycheck = function(){
		switch (this.parents('.m-list-drop').attr('id')){
			case 'tally-ship-content':
			this.parent().addClass('m-list-disable');
			$('#tally-plan-content ul, #tally-wgroup-content ul').removeClass('m-list-disable');
			break;
			case 'tally-plan-content':
			$('#tally-plan').val(this.html());
			if ($('#tally-wgroup-content ul li').hasClass('m-list-select')) {
				this.parent().addClass('m-list-disable');
				$('#tally-wgroup-content ul').addClass('m-list-disable');
			}
			break;
			case 'tally-wgroup-content':
			if ($('#tally-plan-content ul li').hasClass('m-list-select')) {
				this.parent().addClass('m-list-disable');
				$('#tally-plan-content ul').addClass('m-list-disable');
			}
			break;
			case 'tally-device-content':
			this.parent().addClass('m-list-disable');
			return true;
			break;
		}
		return false;
	}			

	$.fn.showTooltip = function(){
		var pos = this.offset();
		var x = pos.left;
		var y = pos.top;


		this.hover(function(){
			$('.m-tooltip').html(this.value).css({
				top: y+'px',
				left: x+'px'
			}).show('fade', {direction: 'up'}, 300);
		}, function(){
			$('.m-tooltip').hide('fade', {direction: 'up'}, 200);
		});
	}

		// get time
		$.fn.clock = function(time){			
			if (this.find('.m-clock').length > 0) {				
				if (time.match('T') != null) {
					time = time.replace('T', ' ');
				}else{
					
				}
				
				var date = new Date(time);
				var dateT = date.getTime();
				var now = new Date();
				var nowT = now.getTime();			
				var Time = ((nowT-dateT) > 0 ? (nowT-dateT) : 0);

				this.find('.m-clock').stopwatch({startTime: Time, format: '{HH}:{MM}'}).stopwatch('start');
			}else{
				return;
			}
		}

		//select focus and show list
		$.fn.showSelect = function(){
			this.focus(function(){
				$(this).attr("size",$(this).attr("expandto"));
				var x = "select[tabindex='" + (parseInt($(this).attr('tabindex'),10) + 1) + "']";
				$(x).fadeTo(50,0);
			});
			this.blur(function(){
				$(this).attr("size",1); 
				var x = "select[tabindex='" + (parseInt($(this).attr('tabindex'),10) + 1) + "']";       
				$(x).fadeTo('fast',1.0);            
			});
		}

		$.fn.mPosition = function(){

			var pos = this.html().split('/');
			var curpos = pos[0].split('-');
			var oldpos = pos[1].split('-');

			result = [curpos, oldpos];	
			return result;
		}
		
	})( jQuery );

	//mapping CJMODE_CD		
	function jobType(data){
		var cjmode;
		var cjmodeout = null;
		var modetype = (data.CJMode_CD ? data.CJMode_CD : (data.CJMODE_OUT_CD ? data.CJMODE_OUT_CD : data.CJMODE_CD));
		// if (data.cYardJob == 'YF' || data.cYardJob == 'LO' || data.cYardJob == 'GO') {
		// 	modetype = (data.CJMode_OUT_CD ? data.CJMode_OUT_CD : data.CJMODE_OUT_CD);
		// }
		// if (typeof modeout == 'undefined' || modeout === null) {
		// 	modetype = typeof cjmode == 'undefined' ? data.CJMode_CD : data.CJMODE_CD;
		// }else {
		// 	modetype = data.CJMODE_OUT_CD;
		// }
		console.log(modetype);
		switch (modetype){
			case 'NTAU':
			cjmode = 'Nháº­p TĂ u';
			break;
			case 'HBAI':
			cjmode = 'Háº¡ BĂ£i';
			break;
			case 'XTAU':
			cjmode = 'Xuáº¥t TĂ u';
			break;
			case 'CTAU':
			cjmode = 'Chuyá»ƒn TĂ u';
			break;
			case 'XBAI':
			cjmode = 'Xuáº¥t BĂ£i';
			break;
			case 'TRAR':
			cjmode = 'Tráº£ Rá»—ng';
			break;
			case 'CAPR':
			cjmode = 'Cáº¥p Rá»—ng';
			break;
			case 'LAYN':
			cjmode = 'Láº¥y NguyĂªn';
			break;
		}
		var result = {
			CJModeName: cjmode,
			CJMode_CD: modetype
		};
		return result;
	}		
function jobType_CD(data){
		var cjmode_cd = data.CJMODE_CD;
		var cjmodeout = null;
		var modetype;
		var modeout = data.CJMODE_OUT_CD;			
		if (typeof modeout == 'undefined' || modeout === null) {
			modetype = typeof cjmode == 'undefined' ? data.CJMode_CD : data.CJMODE_CD;				
		}else {
			modetype = data.CJMODE_OUT_CD;
		}			
		switch (modetype){
			case 'Nháº­p TĂ u':
			cjmode_cd ='NTAU' ;
			break;
			case 'Háº¡ BĂ£i':
			cjmode_cd = 'HBAI';
			break;
			case 'Xuáº¥t TĂ u':
			cjmode_cd = 'XTAU';
			break;
			case 'Chuyá»ƒn TĂ u':
			cjmode_cd = 'CTAU';
			break;
			case 'Xuáº¥t BĂ£i':
			cjmode_cd = 'XBAI';
			break;
			case 'Tráº£ Rá»—ng':
			cjmode_cd = 'TRAR';
			break;
			case 'Cáº¥p Rá»—ng':
			cjmode_cd = 'CAPR';
			break;
			case 'Láº¥y NguyĂªn':
			cjmode_cd = 'LAYN';
			break;
		}
		var result = {
			cjmode_cd: cjmode_cd,
			CJMODE_name: modetype
		};
		return result;
	}		

		//get time
		function getTime(){
			var date = new Date();

			var y = date.getFullYear();
			var M = (date.getMonth()+1);
			var d = date.getDate();
			var h = date.getHours();
			var m = date.getMinutes();

			y = (y < 10) ? "0" + y : y;
			M = (M < 10) ? "0" + M : M;
			d = (d < 10) ? "0" + d : d;
			h = (h < 10) ? "0" + h : h;
			m = (m < 10) ? "0" + m : m;

			var time = h+':'+m+' '+d+'/'+M+'/'+y;

			return time;
		}

		//nofication function

		function Logs(mess){
			$('.nofication-content').append(function(){
				var time = getTime();
				var content = '<span><b>'+time+' : </b>'+ mess +'</span></br>';
				return content;
			});
		}

		function mCon(num){
			return parseInt(num) < 10 ? '0' + num : num;
		}

		// function load container on bay
        function loadContBay(){
            var tempselect = '<div class="m-table-block1">'+
            '<div><span class="CntrNo">'+ $('.m-row-picked .CntrNo').attr('id') +'</span></div>'+
            '</div>'+
            '<div class="m-table-block2">'+
            '<span class="OprID">'+$('.m-row-picked .OprID').html()+'</span>'+
            '<span class="ISO_SZTP">'+ $('.m-row-picked .ISO_SZTP').html() +'</span>'+
            '<span class="Status">'+$('.m-row-picked .Status').html()+'</span>'+
            '</div>'+
            '<div class="m-table-block3">'+
            '<span class="cPOD">'+$('.m-row-picked .cPOD').html()+'</span>'+
            '<span class="CMDWeight">'+ $('.m-row-picked .CMDWeight').html() +'</span>'+
            // '<span class="ContCondition">'+ $('.m-row-picked .ContCondition').html() +'</span>'+
            '</div>';
            return tempselect;
        }

        // cont type sign
        function getContSign(cont){
        	if (!cont.CARGO_TYPE || !cont.ISO_SZTP) {
        		return '';
        	};
        	var sign = '';
        	var cargo,checkIso, checkCargo, checkHeight;
        	checkIso = cont.ISO_SZTP.charAt(2);
        	checkHeight = cont.ISO_SZTP.charAt(1);
        	cargo = cont.CARGO_TYPE;
        	Iso = cont.ISO_SZTP;

    		if(cargo == 'DR' || cargo == 'DG'){
    			return (cont.CLASS ? cont.CLASS : '---');
        	}

        	switch (checkIso){
        		case 'P':
        		sign = 'F';
        		return sign;
        		break;
        		case 'R':
        		sign = 'R'+(checkHeight > 3 ? 'H' : '');
        		return sign;
        		break;
        		case 'T':
        		sign = 'T';
        		return sign;
        		break;
        		case 'U':
        		sign = 'O';
        		return sign;
        		break;
        	}

        	if (checkHeight > 3) {
        		sign = 'H';
        		return sign;
        	}

        	return sign;
        }

        // draw guide cont
        function drawGuideCont(){
        	var tempselect = '<div class="m-table-block1">'+
			'<div><span class="CntrNo">'+ $('#'+joblist[i].id+' .CntrNo').html() +'</span></div>'+
			'</div>'+
			'<div class="m-table-block2">'+
			'<span class="OprID">'+$('#'+joblist[i].id+' .OprID').html()+'</span>'+
			'<span class="ISO_SZTP">'+ $('#'+joblist[i].id+' .ISO_SZTP').html() +'</span>'+
			'<span class="Status>'+$('#'+joblist[i].id+' .Status').html()+'</span>'+
			'</div>'+
			'<div class="m-table-block3">'+
			'<span class="POD">'+$('#'+joblist[i].id+' .cPOD').html()+'</span>'+
			'<span class="CMDWeight">'+ $('#'+joblist[i].id+' .CMDWeight').html() +'</span>'+
			'<span class="ContCondition">'+$('#'+joblist[i].id+' .ContCondition').html()+'</span>'+
			'</div>';

			return tempselect;
        }

		//drawPlanCotainer
		function guideAll(bay){			
			var multijob = [];
			return;
			if ($('.m-hex-picked-success').length > 0) {//cancel multy select
				$('.m-success-down').html('').removeClass('m-success-down');
				$('.m-success-up').removeClass('m-success-up');
			}

			if ($('.m-hex-picked-crash').length > 0) {

			}

			$('.m-hex-picked-success').removeClass('m-hex-picked-success');
			$('.m-hex-picked-crash').removeClass('m-hex-picked-crash');

			if ($('#multible-select').prop('checked') == true && $('.m-tech-row').length > 0) {
				var joblist = $('.m-tech-row');
				var jobarr = [];
				var jobtype, conttype, jobpos, tempcheck, contbay;

				for (var i = 0; i < joblist.length; i++) {//split bay from position
					var curentpos, belowpos;
					var jobbay = joblist[i].childNodes;
					jobtype = jobbay[0].childNodes;
					jobtype = jobtype[2].getElementsByClassName('cYardJob');
					jobtype = jobtype[3].innerHTML;

					conttype = jobbay[0].childNodes;
					conttype = conttype[0].innerHTML;

					// jobpos = jobbay[1].childNodes;
					jobpos = jobbay[1].getElementsByClassName("job-pos");
					jobpos = jobpos[0].innerHTML.split('/');					
					jobpos1 = jobpos[0].split('-');
					jobpos2 = jobpos[1].split('-');					
					contbay1 = jobpos1[1];
					contbay2 = jobpos2[1];
					newBlock_pos=jobpos1[0];
					oldBlock_pos=jobpos2[0];

					curentpos = jobpos1[2]+'-'+jobpos1[3];
					belowpos = jobpos1[2]+'-'+(parseInt(jobpos1[3]) - 1);

					oldpos = jobpos2[2]+'-'+jobpos2[3];
					belowoldpos = jobpos2[2]+'-'+(parseInt(jobpos2[3]) - 1);
					if (jobtype == 'YO' ? bay.match(contbay2) : bay.match(contbay1)) {
						switch(jobtype){
							case 'LO':
							case 'GO':							
							if ($('#'+curentpos+' .CntrNo').attr('id') == $('#'+joblist[i].id +' .CntrNo').attr('id')) {
								$('#'+curentpos).addClass('m-success-up');
								joblist[i].className += ' m-hex-picked-success';
							}else{
								joblist[i].className += ' m-hex-picked-crash';
							}
							break;
							case 'YF':
							case 'YY':
							if (jobpos1[1] || jobpos1[1].length > 0) {
								var tempselect = '<div class="m-table-block1">'+
								'<div><span class="CntrNo">'+ $('#'+joblist[i].id+' .m-hex-block1 .CntrNo').html() +'</span></div>'+
								'</div>'+
								'<div class="m-table-block2">'+
								'<span class="OprID">'+$('#'+joblist[i].id+' .m-hex-block2 .OprID').html()+'</span>'+
								'<span class="ISO_SZTP">'+ $('#'+joblist[i].id+' .m-hex-block1 .ISO_SZTP').html() +'</span>'+
								'<span class="Status>'+$('#'+joblist[i].id+' .m-hex-block1 .Status').html()+'</span>'+
								'</div>'+
								'<div class="m-table-block3">'+
								'<span class="POD">'+$('#'+joblist[i].id+' .m-hex-block2 .cPOD').html()+'</span>'+
								'<span class="CMDWeight">'+ $('#'+joblist[i].id+' .m-hex-block2 .CMDWeight').html() +'</span>'+
								'<span class="ContCondition">'+$('#'+joblist[i].id+' .m-hex-block2 .ContCondition').html()+'</span>'+
								'</div>';

								var tempcheck = $('#'+curentpos).checkContRule(conttype, $('#'+belowpos+' .m-table-block2 span:eq(1)').html());
								if (tempcheck == true) {
									$('#'+curentpos).addClass('m-success-down').html(tempselect);
									$('#'+joblist[i].id).addClass('m-hex-picked-success');
								}else{
									if ($('#'+belowpos).hasClass('m-crash-up')) {
										$('#'+curentpos).addClass('m-success-down').html(tempselect);
										$('#'+joblist[i].id).addClass('m-hex-picked-success');
									}else{
										$('#'+joblist[i].id).addClass('m-hex-picked-crash');
										if (!$('#'+curentpos) && $('#'+curentpos).html().length > 0) {
											$('#'+curentpos).addClass('m-crash-down');
										}else{
											$('#'+curentpos).addClass('m-crash-down').html(tempselect);
										}
									}
								}
							}
		     				// if ($('#'+oldpos+' .m-table-block1 div span').html() == $('#'+joblist[i].id +' .m-hex-block1 span:eq(1)').html()) {
							// 	$('#'+oldpos).addClass('m-success-up');
							// }
							break;
							case 'YO':
							console.log($('#'+joblist[i].id));
							if ($('#'+oldpos+' .m-table-block1 div span').html() == $('#'+joblist[i].id +' .job-pos').html()) {
								$('#'+oldpos).addClass('m-success-up');
								joblist[i].className += ' m-hex-picked-success';
							}else{
								joblist[i].className += ' m-hex-picked-crash';
							}
							break;
							case 'DF':
							case 'GF':							
							var tempselect = '<div class="m-table-block1">'+
							'<div><span>'+ $('#'+joblist[i].id+' .m-hex-block1 span:eq(1)').html() +'</span></div>'+
							'</div>'+
							'<div class="m-table-block2">'+
							'<span class="OprID">'+$('#'+joblist[i].id+' .m-hex-block2 span:eq(0)').html()+'</span>'+
							'<span class="ISO_SZTP">'+ $('#'+joblist[i].id+' .m-hex-block1 span:eq(0)').html() +'</span>'+
							'<span class="Status">'+$('#'+joblist[i].id+' .m-hex-block1 span:eq(2)').html()+'</span>'+
							'</div>'+
							'<div class="m-table-block3">'+
							'<span></span>'+
							'<span>'+ $('#'+joblist[i].id+' .m-hex-block2 span:eq(2)').html() +'</span>'+
							'<span>A</span>'+
							'</div>';

							var tempcheck = $('#'+curentpos).checkContRule(conttype, $('#'+belowpos+' .m-table-block2 span:eq(1)').html());
							if (tempcheck == true) {
								$('#'+curentpos).addClass('m-success-down').html(tempselect);
								$('#'+joblist[i].id).addClass('m-hex-picked-success');
							}else{
								if ($('#'+belowpos).hasClass('m-crash-up')) {
									$('#'+curentpos).addClass('m-success-down').html(tempselect);
									$('#'+joblist[i].id).addClass('m-hex-picked-success');
								}else{
									$('#'+joblist[i].id).addClass('m-hex-picked-crash');
									if (!$('#'+curentpos) && $('#'+curentpos).html().length > 0) {
										$('#'+curentpos).addClass('m-crash-down');
									}else{
										$('#'+curentpos).addClass('m-crash-down').html(tempselect);
									}
								}
							}
							break;						
						}
					}					
				}
			}else{
				$('.m-hex-picked-success').removeClass('m-hex-picked-success');
				$('.m-hex-picked-crash').removeClass('m-hex-picked-crash');				
			}
		}

		function loadContBay_WithRowIndex(r){
			if(r || r == 0) {
				var content= '<div class="m-table-block1">'+
                     '<div class="m-cell-header"><span class="CntrNo">'+$('#joblist .m-tech-row:eq(' + r + ') .CntrNo').attr('id')+'</span></div>'+
                     '</div>'+
                     '<div class="m-table-block2 m-flex-content">'+
                     '<span class="OprID">'+$('#joblist .m-tech-row:eq(' + r + ') .OprID').html()+'</span>'+
                     '<span class="ISO_SZTP">'+$('#joblist .m-tech-row:eq(' + r + ') .ISO_SZTP').html()+'</span>'+
                     '<span class="Status">'+$('#joblist .m-tech-row:eq(' + r + ') .Status').html()+
                     	'(<b class="ContCondition">'+'-'+'</b>)'+'</span>'+
                     '</div>'+
                     '<div class="m-table-block3 m-flex-content">'+
                     '<span class="cPOD">'+$('#joblist .m-tech-row:eq(' + r + ') .cPOD').html()+'</span>'+
                     // '<span data-value="'+_cntr[i].POD+'" class="POD">'+(_cntr[i].POD ? _cntr[i].POD.slice(2) : '')+'</span>'+
                     '<span class="CMDWeight">'+$('#joblist .m-tech-row:eq(' + r + ') .CMDWeight').html()+'</span>'+
                     '<span style="margin-left: .2rem; font-weight: bold" class="ShipID">'+($('#joblist .m-tech-row:eq(' + r + ') .ShipID').html() != "STORAGE" ? $('#joblist .m-tech-row:eq(' + r + ') .ShipID').html() : "---")+'</span>'+
                     '<div class="m-corner-info">'+
                     '<span class="contCode">'+'-'+'</span>'+
                     '</div>'+
                     '</div>';
                return content;
				// var tempselect = '<div class="m-table-block1">'+
		  //           '<div><span class="CntrNo">'+ $('#joblist .m-tech-row:eq(' + r + ') .CntrNo').attr('id') +'</span></div>'+
		  //           '</div>'+
		  //           '<div class="m-table-block2">'+
		  //           '<span class="cYardJob">'+$('#joblist .m-tech-row:eq(' + r + ') .cYardJob').html()+'</span>'+
		  //           '<span class="ISO_SZTP">'+ $('#joblist .m-tech-row:eq(' + r + ') .ISO_SZTP').html() +'</span>'+
		  //           '<span class="Status">'+$('#joblist .m-tech-row:eq(' + r + ') .Status').html()+'</span>'+
		  //           '</div>'+
		  //           '<div class="m-table-block3">'+
		  //           '<span class="cPOD">'+$('#joblist .m-tech-row:eq(' + r + ') .cPOD').html()+'</span>'+
		  //           '<span class="CMDWeight">'+ $('#joblist .m-tech-row:eq(' + r + ') .CMDWeight').html() +'</span>'+
		  //           // '<span class="ContCondition">'+ $('.m-row-picked .ContCondition').html() +'</span>'+
		  //           '</div>';
	            // return tempselect;
			}
			else {
				return "";
			};
        }

        // get time
		$.fn.clock = function(time){
			if (this.find('.m-clock').length > 0) {
				if (time.match('T') != null) {
					time = time.replace('T', ' ');
				}else{
					
				}
				
				var date = new Date(time);
				var dateT = date.getTime();
				var now = new Date();
				var nowT = now.getTime();
				var Time = ((nowT-dateT) > 0 ? (nowT-dateT) : 0);

				this.find('.m-clock').stopwatch({startTime: Time}).stopwatch('start');
			}else{
				return;
			}
		}

		function countTime(time){
			console.log(time);
			if (time.match('T') != null) {
				time = time.replace('T', ' ');
			}else{
				
			}
			
			var date = new Date(time);
			var dateT = date.getTime();
			var now = new Date();
			var nowT = now.getTime();
			var duration = ((nowT-dateT) > 0 ? (nowT-dateT) : 0);

			var seconds = parseInt((duration % 1000) / 100),
		    minutes = Math.floor((duration / (1000 * 60)) % 60),
		    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
		  hours = (hours < 10) ? "0" + hours : hours;
		  minutes = (minutes < 10) ? "0" + minutes : minutes;
		  seconds = (seconds < 10) ? "0" + seconds : seconds;
		  var result = hours + ":" + minutes;
		  if (hours >= 1 || minutes >= 30) {
		  	return '<b style="color: red"><span class="m-time-h">'+ hours + '</span>:<span class="m-time-m">' + minutes+'</span>:<span class="m-time-s">' + seconds +'</span></b>';
		  }else{
		  	return '<b><span class="m-time-h">'+ hours + '</span>:<span class="m-time-m">' + minutes+'</span>:<span class="m-time-s">' + seconds +'</span></b>';
		  }
		}

		function clockTime(){
			if ($('.m-time').length > 0) {
				var temp = $('.m-time');
				for (var i = 0; i < temp.length; i++) {
					var h = temp.eq(i).find('.m-time-h');
					var m = temp.eq(i).find('.m-time-m');
					var s = temp.eq(i).find('.m-time-s');
					if(s.html() == 59){
						s.html('00');
						m.html((parseInt(m.html())+1 < 10 ? '0'+(parseInt(m.html())+1) : parseInt(m.html())+1));
					}else{
						s.html((parseInt(s.html())+1 < 10 ? '0'+(parseInt(s.html())+1) : parseInt(s.html())+1));
					}
					if (m.html() == 59) {
						m.html('00');
						h.html((parseInt(h.html())+1 < 10 ? '0'+(parseInt(h.html())+1) : parseInt(h.html())+1));
					}
				}
			}
		}

		function guideAll_1(bay, moreType) {
			// if (!moreType) {
			// 	$('.m-hex-picked-success').removeClass('m-hex-picked-success');
			// 	$('.m-hex-picked-crash').removeClass('m-hex-picked-crash');
			// 	$('.m-success-down').removeClass('m-success-down');
			// 	$('.m-success-up').removeClass('m-success-up');
			// };
			for (var i = 0; i < $('.m-crash-down').length; i++) {
				if ($('.m-crash-down').hasClass('m-cont-stacking')) {
					$('.m-crash-down:eq('+i+')').removeClass('m-crash-down');
				}else{
					$('.m-crash-down:eq('+i+')').removeClass('m-crash-down').html('');
				}
			}
			$('.m-success-down').html('');
			$('.m-hex-picked-success').removeClass('m-hex-picked-success');
			$('.m-hex-picked-crash').removeClass('m-hex-picked-crash');
			$('.m-success-down').removeClass('m-success-down');
			$('.m-crash-down').removeClass('m-crash-down');
			$('.m-success-up').removeClass('m-success-up');
			$('.m-crash-up').removeClass('m-crash-up');
			var block;
			if ($('#getAllJob').prop('checked') == true) {
				block = $('#bay-block').val();
			}
			for (var i=0; i < $('#joblist .m-tech-row').length; i++) {
				var iCntrNo = $('#joblist .m-tech-row:eq(' + i + ') .CntrNo').attr('id');
				var iPosition = $('#joblist .m-tech-row:eq(' + i + ') .job-pos').mPosition();
				var icYardJob = $('#joblist .m-tech-row:eq(' + i + ') .cYardJob').html();
				var iPositionActive;
				var iPositionActiveMore;
				var iNangHa;

				switch (icYardJob) {
					// case "YO":
	    //                 iNangHa = "UP";
	    //                 iPositionActive = iPosition[1];
	    //                 break;
                    case "YO":	
	                case "GO":
	                case "LO":
	                    iPositionActive = iPosition[0];
	                    iNangHa = "UP";
	                    break;
	                case "DF":
	                case "GF":
	                	iNangHa = "DOWN";
	                    iPositionActive = iPosition[0];
	                    break;
	                case "YY":
	                	iNangHa = "DOWN";
	                    iPositionActive = iPosition[1];
	                    iPositionActiveMore = iPosition[0];
	                    break;
	                case "YF":
	                    iNangHa = "DOWN";
	                    iPositionActive = iPosition[1];
	                    break;
	                default: break;
				};
				//Check BAY cá»§a ListJob so vá»›i Bay Hiá»‡n táº¡i
				if(block ? bay.match(iPositionActive[1]) && block == iPositionActive[0] : bay.match(iPositionActive[1])) {
					var tRow = iPositionActive[2];
					var tTier = iPositionActive[3];
					switch (iNangHa){
						case "UP":
							if ( $('#' + tRow + '-' + tTier + ' .CntrNo').html() == iCntrNo) {
								$('#' + tRow + '-' + tTier).addClass('m-success-up');
								$('#joblist .m-tech-row:eq(' + i + ')').addClass('m-hex-picked-success');
							}
							else {

							};
							break;
						case "DOWN":
							if (iPositionActive[1]) {
								var tISO = $('#' + tRow + '-' + (parseInt(tTier) - 1) + ' .m-table-block2 .ISO_SZTP').html();
                                var tempcheck = $('#'+tRow+'-'+tTier).checkContRule($('#joblist .m-tech-row:eq(' + i + ') .ISO_SZTP').html(), tISO);
                                if ($('#' + iPositionActive[2] + '-' + iPositionActive[3]).html().length > 0) {
                                	$('#' + iPositionActive[2] + '-' + iPositionActive[3]).addClass('m-crash-down');
                                	continue;
                                };
								$('#' + iPositionActive[2] + '-' + iPositionActive[3]).html(loadContBay_WithRowIndex(i));
								$('#'+iPositionActive[2] + '-' + iPositionActive[3]).css('font-size', ($('#'+iPositionActive[2] + '-' + iPositionActive[3]).width() * 0.1)+'px');
                                if (tempcheck == true) {
									$('#joblist .m-tech-row:eq(' + i + ')').addClass('m-hex-picked-success');
									$('#' + tRow + '-' + tTier).addClass('m-success-down');
								}
								else {
									$('#joblist .m-tech-row:eq(' + i + ')').addClass('m-hex-picked-crash');
									$('#' + tRow + '-' + tTier).addClass('m-crash-down');
								};
								if (icYardJob == "YY" && bay.match(iPositionActiveMore[1])) {
									if ( $('#' + iPositionActiveMore[2] + '-' + iPositionActiveMore[3] + ' .CntrNo').html() == iCntrNo) {
										$('#' + iPositionActiveMore[2] + '-' + iPositionActiveMore[3]).addClass('m-success-up');
										$('#joblist .m-tech-row:eq(' + i + ')').addClass('m-hex-picked-success');
									}
								};
							};
							break;
						default: break;
					};
				};
				if (icYardJob == "YY" && bay.match(iPositionActiveMore[1])) {
					if ( $('#' + iPositionActiveMore[2] + '-' + iPositionActiveMore[3] + ' .CntrNo').html() == iCntrNo) {
						$('#' + iPositionActiveMore[2] + '-' + iPositionActiveMore[3]).addClass('m-success-up');
						$('#joblist .m-tech-row:eq(' + i + ')').addClass('m-hex-picked-success');
					};
				};
			};
		}

// select option
"use strict";
  var pluginName = "selectionator";
  var defaults = {
    propertyName: "selectionator",
    src: null,
    orgElement: null,
    checkedItems: {},
    // custom callback events
    onError: function(error) {}
  };
  function Plugin(element, options) {
    this.element = element;
    this.selector = null;
    this.options = $.extend({}, defaults, options);
    this._defaults = defaults;
    this._name = pluginName;
    this.init();
  }
  Plugin.prototype = {
    init: function () {
      console.log("options: ", this.options);
      var that = this;
      var self = $(that.element);
      that.options.src = that.element.getAttribute('data-src');
      that.selector = that.createFromJson(that.options.data);
      that.options.orgElement = that.element.parentNode.replaceChild(that.selector, that.element);
      $(that.selector).addClass(that._name);
    },
    createFromJson: function(options) {
      var that = this;
      var select = document.createElement('select');
      var popup = document.createElement('div');
      var header = document.createElement('div');
      var search = document.createElement('span');
      var overlay = document.createElement('span');
      overlay.className = 'overlay';
      var shadow = document.createElement('span');
      shadow.className = 'shadow';
      var placeholder = document.createTextNode('NhĂ³m lá»c : ');
      search.className = 'search';
      search.appendChild(shadow);     
      search.appendChild(overlay);   
      search.appendChild(placeholder);   
      popup.appendChild(search);
      var menu = document.createElement('ul');
      select.style.display = 'none';
      menu.className = 'list';
      var box = document.createElement('div');
      box.className = 'menu';
      box.appendChild(menu);
      popup.appendChild(box);
      options.optgroups.forEach(function(optgroup, index) {


        var menuItem = document.createElement('li');
        //menuItem.className('header');
        var header = document.createElement('span');
        header.className = 'header';
        var caption = document.createTextNode(optgroup.label);
        header.appendChild(caption);
        menuItem.appendChild(header);
        var menuItems = document.createElement('ul');
        menuItems.className = 'optgroup';
        menuItem.appendChild(menuItems);
        menu.appendChild(menuItem);

        optgroup.options.forEach(function(option, index) {
          var opt = new Option(option.text, option.value, option.defaultSelected, option.selected);
          select.options.add(opt);
          var item = document.createElement('li');
          var label = document.createElement('label');
          label.setAttribute("for", option.value);
          var checkbox = document.createElement('input');
          $(checkbox).data(option);
          checkbox.setAttribute('type', 'checkbox');

          checkbox.addEventListener('change', function(event){
            var checkbox = event.target;
            var tempText = 'ÄĂ£ chá»n : ';
            var $el = $(event.srcElement);
            event.srcElement.value = option.text;
            if (checkbox.checked) {
	            that.options.checkedItems[option.value] = event.srcElement;
            } else {
            	delete that.options.checkedItems[event.srcElement.id];
              	// that.options.checkedItems.pop();
              	// that.options.checkedItems = that.options.checkedItems.filter(function(items, index){
               //  	return items.value != $el.data().value;
              	// });
            }
            $.each(that.options.checkedItems, function(key, values){
            	tempText += values.value + ', ';
            });
            placeholder.nodeValue = tempText;
          });
          checkbox.id = option.value;
          var caption = document.createTextNode(option.text);
          label.appendChild(caption);
          item.appendChild(checkbox);
          item.appendChild(label);
          menuItems.appendChild(item);
        });
      });
      return popup;
    },
    onAddFriend: function(data) {
      var that = this;
      return that.options.onAddFriend(that, data);
    },
    onRemoveFriend: function(data){
      var that = this;
      var self = $(that.element);
      return that.options.onRemoveFriend(data);
    },
    destroy: function() {
      var that = this;
      $(that.element).unbind("destroyed", that.teardown);
      that.teardown();
    },
    teardown: function() {
      var that = this;
      $(that.element).removeClass(that._name);
      $(that.selector).replaceWith(that.options.orgElement);
      $(that.element).removeData(that._name);
      that.unbind();
      that.element = null;
    },
    bind: function() { },
    unbind: function() { }
  };
  $.fn[pluginName] = function (options) {
    return this.each(function () {
      if (!$.data(this, pluginName)) {
        $.data(this, pluginName, new Plugin(this, options));
      }
    });
  };
  
$('[has-ripple="true"]').click(function () {
$(this).toggleClass('clicked');
$('.menu').toggleClass('open');
});

$('.menu a').each(function (index) {
  var thismenuItem        = $(this);
  
  thismenuItem.click(function (event) {
    event.preventDefault();
    
    $('.menuitem-wrapper').eq(index).addClass('spin');
    
    var timer = setTimeout(function () {
      $('body').removeAttr('class').addClass('bg-'+index);
      $('.menuitem-wrapper').eq(index).removeClass('spin');
      $('.menu').removeClass('open');
      $('.menu-btn').removeClass('clicked');
    }, 800);
  });
});

function fullScreen() {
  // Kind of painful, but this is how it works for now
  if (document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen();
  } else if (document.documentElement.mozRequestFullScreen) {
    document.documentElement.mozRequestFullScreen();
  } else if (document.documentElement.webkitRequestFullscreen) {
    document.documentElement.webkitRequestFullscreen();
  } else if (document.documentElement.msRequestFullscreen) {
    document.documentElement.msRequestFullscreen();
  }
}

function smolScreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
}



function lock(orientation) {

  fullScreen();
  screen.orientation.lock(orientation);
}

window.addEventListener('orientationchange', function(){
	if (window.matchMedia("(orientation: portrait)").matches) {
		lock('portrait-primary');
	}

	if (window.matchMedia("(orientation: landscape)").matches) {
	   lock('landscape-primary');
	}
}, false);
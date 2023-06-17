	<?php
defined('BASEPATH') OR exit('No direct script access allowed');
?>

<link href="<?=base_url('assets/vendors/bootstrap-select/dist/css/bootstrap-select.min.css');?>" rel="stylesheet" />
<style>
	@media (max-width: 767px) {
		.f-text-right    {
			text-align: right;
		}
	}
	.no-pointer{
		pointer-events: none;
	}

	#contenttable_wrapper .dataTables_scroll #cell-context .dropdown-menu  .dropdown-item .sub-text{
		margin-left: 7px;
		font-size: 12px;
		font-style: italic;
	}
</style>

<div class="row">
	<div class="col-xl-12">
		<div class="ibox collapsible-box">
			<i class="la la-angle-double-up dock-right"></i>
			<div class="ibox-head">
				<div class="ibox-title">LOẠI XE</div>
				<div class="button-bar-group mr-3">
					<button id="addrow" class="btn btn-outline-success btn-sm mr-1" 
										title="Thêm dòng mới">
						<span class="btn-icon"><i class="fa fa-plus"></i>Thêm dòng</span>
					</button>

					<button id="save" class="btn btn-outline-primary btn-sm mr-1"
										data-loading-text="<i class='la la-spinner spinner'></i>Lưu dữ liệu"
										title="Lưu dữ liệu">
						<span class="btn-icon"><i class="fa fa-save"></i>Lưu</span>
					</button>

					<button id="delete" class="btn btn-outline-danger btn-sm mr-1" 
										data-loading-text="<i class='la la-spinner spinner'></i>Xóa dòng"
										title="Xóa những dòng đang chọn">
						<span class="btn-icon"><i class="fa fa-trash"></i>Xóa dòng</span>
					</button>
				</div>
			</div>
			<div class="row ibox-footer border-top-0">
				<div class="col-md-12 col-sm-12 col-xs-12 table-responsive">
					<table id="contenttable" class="table table-striped display nowrap" cellspacing="0" style="width: 99.5%">
						<thead>
						<tr>
							<th class="editor-cancel" col-name="STT">STT</th>
							<th col-name="rowguid"></th>
							<th col-name="BrandID">Hãng xe</th>
							<th col-name="CarTypeID">Loại xe</th>
							<th col-name="CarTypeName">Tên đầy đủ</th>
							<th col-name="EngineType">Loại động cơ</th>
							<th col-name="CarYear">Năm sản xuất</th>
							<th col-name="CarColor">Màu xe</th>
						</tr>
						</thead>
						<tbody>		
							<?php if(count($carTypeList) > 0) {
								  		$i = 1; ?>
								<?php foreach($carTypeList as $item){  ?>									
									<tr>
										<td col-name="STT"><?=$i;?></td>
										<td col-name="rowguid"><?=$item['rowguid'];?></td>
										<td col-name="BrandID"><input class='hiden-input' value="<?=$item['BrandID'];?>"> <?=$item['BrandName'];?></td>
										<td col-name="CarTypeID"><?=$item['CarTypeID'];?></td>		
										<td col-name="CarTypeName"><?=$item['CarTypeName'];?></td>		
										<td col-name="EngineType"><?=$item['EngineType'];?></td>		
										<td col-name="CarYear"><?=$item['CarYear'];?></td>		
										<td col-name="CarColor"><?=$item['CarColor'];?></td>		
									</tr>
									<?php $i++; }  ?>
							<?php } ?>							
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</div>

<div id="cell-context" class="btn-group">
	<button type="button" class="btn btn-sm btn-secondary dropdown-toggle dropdown-toggle-split show-table" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
	<div class="dropdown-menu dropdown-menu-right"></div>
</div>

<div id="cell-context-2" class="btn-group">
	<button type="button" class="btn btn-sm btn-secondary dropdown-toggle dropdown-toggle-split show-table" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
	<div class="dropdown-menu dropdown-menu-right"></div>
</div>

<!-- Add more row modal --> 
<div class="modal fade" id="add-row-modal" tabindex="-1" role="dialog" aria-labelledby="groups-modalLabel-1" aria-hidden="true" data-whatever="id" style="padding-left: 14%; top: 200px">
	<div class="modal-dialog" role="document" style="width: 300px!important">
		<div class="modal-content" style="border-radius: 4px">
			<div class="modal-body">
				<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
					<div class="row form-group">
						<label class="col-md-4 col-sm-4 col-xs-4 col-form-label" style="text-align: right; margin-right: 5px">Số dòng</label>
						<input id="rowsNumeric" class="col-md-6 col-sm-6 col-xs-6 form-control form-control-sm border-e" placeholder="Số dòng" type="number" value="1" min="0">
					</div>
				</div>
			</div>
			<div class="modal-footer">
				<div  style="margin: 0 auto!important;">
					<button class="btn btn-sm btn-rounded btn-gradient-blue btn-labeled btn-labeled-left btn-icon" id="apply-add-row" data-dismiss="modal">
						<span class="btn-label"><i class="ti-check"></i></span>Xác nhận</button>
					<button class="btn btn-sm btn-rounded btn-gradient-peach btn-labeled btn-labeled-left btn-icon" data-dismiss="modal">
						<span class="btn-label"><i class="ti-close"></i></span>Đóng</button>
				</div>
			</div>
		</div>
	</div>
</div>

<script type="text/javascript">
	$(document).ready(function () {	
		var tbl 			= $('#contenttable'),
			_columns 		= ['STT', 'rowguid', 'BrandID', 'CarTypeID', 'CarTypeName', 'EngineType', 'CarYear', 'CarColor'],
			carTypeList		= {},
			carBrandList 	= {},
			carYear 		= {},
			parentMenuList 	= {};


		/* Add year to Car Year List */
		for (i = 2000; i < 2031; i++){
			carYear[i] = i;
		}

		<?php if(isset($carTypeList) && count($carTypeList) >= 0){?>
			carTypeList = <?=json_encode($carTypeList);?>;
		<?php } ?>

		<?php if(isset($carBrandList) && count($carBrandList) >= 0){?>
			carBrandList = <?=json_encode($carBrandList);?>;
		<?php } ?>

		<?php if(isset($parentMenuList) && count($parentMenuList) >= 0){?>
			parentMenuList = <?=json_encode($parentMenuList);?>;
		<?php } ?>

		for (i = 0; i < parentMenuList.length; i++){
			if (parentMenuList[i]['MenuAct'] == 'Common'){
				$('#' + parentMenuList[i]['MenuAct']).addClass('active');
			}
			else{
				$('#' + parentMenuList[i]['MenuAct']).removeClass();
			}
		}
		
		var dataTbl = tbl.newDataTable({
			scrollY: '65vh',
			columnDefs: [
				{ type: "num", className: "text-center", targets: _columns.indexOf('STT') },
				{ className: "text-center", targets: _columns.getIndexs(['BrandID', 'CarTypeID', 'CarTypeName', 'EngineType', 'CarYear', 'CarColor'])},
				{ className: "hiden-input", targets: _columns.getIndexs(['rowguid'])},
			],
			order: [[ _columns.indexOf('STT'), 'asc' ]],
			paging: false,
            keys:true,
            autoFill: {
                focus: 'focus'
            },
            select: true,
            rowReorder: false,
            arrayColumns: _columns
		});

		tbl.editableTableWidget();

		// Add new event
		var numCount = 0;
		/* Add new row event */
		$('#addrow').on('click', function(){
			$('#add-row-modal').modal("show");
		});

		var sumNumRows = 0;
		$("#apply-add-row").on("click", function(){
			numRows = parseInt($('#rowsNumeric').val()); // Numeric of new rows user added
			sumNumRows += numRows;
			if (numRows == 1){
				tbl.newRow();
				rowsExist = $("#contenttable").DataTable().rows().nodes().length;
				for (i = 0; i < rowsExist; i++){
					cell = tbl.find("tbody tr:eq(" + i + ") td:eq("+ _columns.indexOf("STT") +")");
					tbl.DataTable().cell(cell).data(i+1).draw(false);
				}
			}
			else{
				numRowsExist = $("#contenttable").DataTable().rows().nodes().length;
				numRowHasAddNewClass = 0;
				index = 1;
				for (i = numRowsExist - 1; i >= 0 ; i--){
					var crRow = tbl.find("tbody tr:eq("+i+")");
					if(crRow.hasClass("addnew"))
						numRowHasAddNewClass++;
					else{
						cell = tbl.find("tbody tr:eq(" + i + ") td:eq("+ _columns.indexOf("STT") +")");
						tbl.DataTable().cell(cell).data(sumNumRows + index).draw(false);
						index++;
					}
				}
				tbl.newMoreRows(numRows, numRowHasAddNewClass);
			}
		});

		$("#add-row-modal").bind('keypress', function(e) {
       		if(e.which == 13){
	       		numRows = parseInt($('#rowsNumeric').val()); // Numeric of new rows user added
	        	sumNumRows += numRows;
	        	if (numRows == 1){
	        		tbl.newRow();
	        		rowsExist = $("#contenttable").DataTable().rows().nodes().length;
					for (i = 0; i < rowsExist; i++){
						cell = tbl.find("tbody tr:eq(" + i + ") td:eq("+ _columns.indexOf("STT") +")");
						tbl.DataTable().cell(cell).data(i+1).draw(false);
					}
				}
				else{
					numRowsExist = $("#contenttable").DataTable().rows().nodes().length;
					numRowHasAddNewClass = 0;
					index = 1;
					for (i = numRowsExist - 1; i >= 0 ; i--){
						var crRow = tbl.find("tbody tr:eq("+i+")");
						if(crRow.hasClass("addnew"))
							numRowHasAddNewClass++;
						else{
							cell = tbl.find("tbody tr:eq(" + i + ") td:eq("+ _columns.indexOf("STT") +")");
				        	tbl.DataTable().cell(cell).data(sumNumRows + index).draw(false);
				        	index++;
						}
					}
					tbl.newMoreRows(numRows, numRowHasAddNewClass);
				}
				$("#add-row-modal").modal("hide");
			}
       	});

       	/* Prevent press '-' */
       	$("#rowsNumeric").keydown(function(event) {
		  	if (event.which == 189) {
		    	event.preventDefault();
		   	}
		});

		// Save button event
		$('#save').on('click', function(){
            if(tbl.DataTable().rows( '.addnew, .editing' ).data().toArray().length == 0){
            	$('.toast').remove();
            	toastr["info"]("Không có dữ liệu thay đổi!");
            }else{
            	var newData = tbl.getAddNewData();

				for (i = 0; i < newData.length; i++){
					if (!newData[i]['BrandID']){
						toastr['error']("Vui lòng chọn Hãng xe!");
						return;
					}

					if (!newData[i]['CarTypeID']){
						toastr['error']("Vui lòng nhập Mã loại xe!");
						return;
					}
					else{
						for (j = 0; j < carTypeList.length; j++){
							if (newData[i]['CarTypeID'] == carTypeList[j]['CarTypeID']){
								toastr['error']("Đã tồn tại Mã loại xe: " + newData[i]['CarTypeID']);
								return;
							}
						}	
					}		

					if (!newData[i]['CarTypeName']){
						toastr['error']("Vui lòng nhập Tên đầy đủ cho Loại xe: " + newData[i]['CarTypeID'] + "!");
						return;
					}

					if (!newData[i]['EngineType']){
						toastr['error']("Vui lòng nhập Loại động cơ cho Loại xe: " + newData[i]['CarTypeID'] + "!");
						return;
					}

					if (!newData[i]['CarYear']){
						toastr['error']("Vui lòng nhập Năm sản xuất cho Loại xe: " + newData[i]['CarTypeID'] + "!");
						return;
					}


					if (!newData[i]['CarColor']){
						toastr['error']("Vui lòng nhập Màu xe cho Loại xe: " + newData[i]['CarTypeID'] + "!");
						return;
					}
				}

            	$.confirm({
		            title: 'Thông báo!',
		            type: 'orange',
		            icon: 'fa fa-warning',
		            content: 'Tất cả các thay đổi sẽ được lưu lại!\nTiếp tục?',
		            buttons: {
		                ok: {
		                    text: 'Xác nhận lưu',
		                    btnClass: 'btn-warning',
		                    keys: ['Enter'],
		                    action: function(){
		                        saveData();
		                    }
		                },
		                cancel: {
		                    text: 'Hủy bỏ',
		                    btnClass: 'btn-default',
		                    keys: ['ESC']
		                }
		            }
		        });
            }
        });


        //save functions
        function saveData(){        	
			var newData = tbl.getAddNewData();
			
			if(newData.length > 0){
				var fnew = {
					'action': 'add',
					'data': newData
				};
				postSave(fnew);
			}

			var editData = tbl.getEditData();

			if(editData.length > 0){
				var fedit = {
					'action': 'edit',
					'data': editData
				};
				postSave(fedit);
			}
		}

		function postSave(formData){
			var saveBtn = $('#save');
			saveBtn.button('loading');
        	$('.ibox.collapsible-box').blockUI();

			$.ajax({
                url: "<?=site_url(md5('Common') . '/' . md5('cmCarType'));?>",
                dataType: 'json',
                data: formData,
                type: 'POST',
                success: function (datas) {
                    if(datas.deny) {
                        toastr["error"](datas.deny);
                        return;
                    }

                    if(formData.action == 'edit'){
                    	tbl.DataTable().rows( '.editing' ).nodes().to$().removeClass("editing");

                    	var data = datas.result;

		                if(data.error && data.error.length > 0){
		                	for (var i = 0; i < data.error.length; i++) {
		                		toastr["error"](data.error[i].substring(0, data.error[i].length - 36));

		                		tbl.updateSTT( _columns.indexOf( "STT" ) );
				                var	str 	= data.error[i].split(':')[1].trim(),
				                	valueID = str.substring(0, str.length - 36),
				                	compareStr = str.substring(str.length - 37, str.length),
				                	cRow 	= tbl.filterRowIndexes( _columns.indexOf( "rowguid" ), compareStr)['context'][0]['_select_lastCell'].row,
				                	cell 	= tbl.find("tbody tr:eq(" + cRow + ") td:eq("+ _columns.indexOf("CarTypeID") +")");			    
	                			tbl.DataTable().cell(cell).data(valueID).draw(false);	                			
		                	}
		                }

		                if(data.success && data.success.length > 0){
		                	for (var i = 0; i < data.success.length; i++) {
		                		toastr["success"]( data.success[i] );
		                	}
		                }
                    }

                    if(formData.action == 'add'){
                    	toastr["success"]("Thêm mới thành công!");
                    	tbl.DataTable().rows( '.addnew' ).nodes().to$().removeClass("addnew");
                    	tbl.updateSTT(_columns.indexOf("STT"));
                    	location.reload();
                    }

                    saveBtn.button('reset');
        			$('.ibox.collapsible-box').unblock();
                },
                error: function(err){
                	toastr["error"]("Error!");
                	saveBtn.button('reset');
                	$('.ibox.collapsible-box').unblock(); 
                	console.log(err);
                }
            });
		}

		// Delete rows
		$('#delete').on('click', function(){
			if(tbl.getSelectedRows().length == 0){
            	$('.toast').remove();
            	toastr["info"]("Vui lòng chọn các dòng dữ liệu để xóa!");
            }
            else{
            	tbl.confirmDelete(function(data){
            		postDel(data);
            	});
            }
		});

		function postDel(data){
			$('.ibox.collapsible-box').blockUI();
			var delBtn = $('#delete');
			delBtn.button('loading');

			var delData = data.map(p=>p[_columns.indexOf("CarTypeID")]);

			var fdel = {
					'action': 'delete',
					'data': delData
				};

			$.ajax({
                url: "<?=site_url(md5('Common') . '/' . md5('cmCarType'));?>",
                dataType: 'json',
                data: fdel,
                type: 'POST',
                success: function (data) {
                    delBtn.button('reset');
					var data = data.result;
	                if(data.error && data.error.length > 0){
	                	for (var i = 0; i < data.error.length; i++) {
	                		toastr["error"](data.error[i]);
	                	}
	                }

	                if(data.success && data.success.length > 0){
	                	for (var i = 0; i < data.success.length; i++) {
	                		var valueID = data.success[i].split(':')[1].trim();
	                		var indexes = tbl.filterRowIndexes( _columns.indexOf( "BrandID" ), valueID);
	                		tbl.DataTable().rows( indexes ).remove().draw( false );
	                		tbl.updateSTT( _columns.indexOf( "STT" ) );
	                		toastr["success"]( data.success[i] );
	                	}
	                }

					$('.ibox.collapsible-box').unblock();
                },
                error: function(err){
                	delBtn.button('reset');
					$('.ibox.collapsible-box').unblock();
					toastr["error"]("Error!");
					console.log(err);
                }
            });
		}

		/* Set dropdown for Car Brand */
		tbl.setExtendDropdown({
			target: "#cell-context",
			source: carBrandList,
			colIndex: _columns.indexOf("BrandID"), // ô cần show drop-down box
			onSelected: function(cell, value){ // Thao tác sau khi người dùng lựa chọn
				//value
				var carBrand = carBrandList.filter( p => p.BrandID == value).map( x => x.BrandName );
				tbl.DataTable().cell(cell).data(
					'<input class="hiden-input" value="'+ value  +'">' + carBrand
				).draw(false);

				var rowIdx = tbl.DataTable().cell(cell).index()['row'];

				if(!tbl.DataTable().row( rowIdx ).nodes().to$().hasClass("addnew"))
					tbl.DataTable().row( rowIdx ).nodes().to$().addClass("editing");
			}
		});

		/* Set dropdown for Car Year */
		tbl.setExtendDropdown({
			target: "#cell-context-2",
			source: carYear,
			colIndex: _columns.indexOf("CarYear"), // ô cần show drop-down box
			onSelected: function(cell, value){ // Thao tác sau khi người dùng lựa chọn
				//value
				tbl.DataTable().cell(cell).data(value).draw(false);

				var rowIdx = tbl.DataTable().cell(cell).index()['row'];

				if(!tbl.DataTable().row( rowIdx ).nodes().to$().hasClass("addnew"))
					tbl.DataTable().row( rowIdx ).nodes().to$().addClass("editing");
			}
		});
	});
</script>
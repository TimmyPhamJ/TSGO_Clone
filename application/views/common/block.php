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
				<div class="ibox-title">BÃI</div>
				<div class="button-bar-group mr-3">
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
			<div class="ibox-body pt-3 pb-3 bg-f9 border-e">
				<div class="row border-e has-block-content bg-white pb-1">
					<div class="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-xs-11 pb-1 border-e" style="background-color: #f2f2f2">
						<div class="row form-group border-e" style="height: 30px; background-color: #0b4660">
							<div style="margin: auto!important; color: #ffffff"><b>THÔNG TIN BÃI</b></div>>
						</div>
						<div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12"><form id="inputForm">							
							<div class="row form-group" style="height: 50px">
								<label class="col-md-6 col-sm-6 col-xs-6 col-form-label">Yard ID</label>
								<label class="col-md-6 col-sm-6 col-xs-6 col-form-label">Sức chứa</label>	
								<select id="YardID" class="selectpicker col-md-6 col-sm-6 col-xs-6" data-width="100%" data-style="tn-default btn-sm" title="YardID">
									<?php if(count($yardList) > 0)?>
										<?php foreach($yardList as $item) {  ?>
											<option value="<?=$item['YardID']?>"><?=$item['YardID'];?></option>
									<?php }?>
								</select>
								<div class="col-md-6 col-sm-6 col-xs-6">
									<input id="Capacity" class="form-control form-control-sm" style="background-color: #dddddd" placeholder="Sức chứa" type="text">
								</div>
							</div>
							<div class="row form-group" style="height: 50px">			
								<label class="col-md-6 col-sm-6 col-xs-6 col-form-label">Block</label>								
								<label class="col-md-6 col-sm-6 col-xs-6 col-form-label">Max Bay</label>
								<div class="col-md-6 col-sm-6 col-xs-6">
									<input id="Block" class="form-control form-control-sm" placeholder="Block" type="text">
								</div>
								<div class="col-md-6 col-sm-6 col-xs-6">
									<input id="MaxBay" class="form-control form-control-sm" placeholder="Max Bay" type="number" min="1">
								</div>
							</div>
							<div class="row form-group" style="height: 50px">							
								<label class="col-md-6 col-sm-6 col-xs-6 col-form-label">Row</label>
								<label class="col-md-6 col-sm-6 col-xs-6 col-form-label">Tier</label>				
								<div class="col-md-6 col-sm-6 col-xs-6">
									<input id="MaxRow" class="form-control form-control-sm" placeholder="Max Row" type="number" min="1">
								</div>
									<div class="col-md-6 col-sm-6 col-xs-6">
									<input id="MaxTier" class="form-control form-control-sm" placeholder="Max Tier" type="number" min="1">
									</div>
								</div>
							</div></form>
						</div>
						<div class="col-xl-8 col-lg-8 col-md-12 col-sm-12 col-xs-12 mt-3">
							<div class="col-md-12 col-sm-12 col-xs-12 table-responsive">
								<table id="contenttable" class="table table-striped display nowrap" cellspacing="0" style="width: 99%">
									<thead>
										<tr>
											<th class="editor-cancel" col-name="STT">STT</th>
											<th class="editor-cancel" col-name="YardID">Yard ID</th>
											<th class="editor-cancel" col-name="Block">Block</th>
											<th class="editor-cancel" col-name="MaxBay">Max Bay</th>
											<th class="editor-cancel" col-name="MaxRow">Max Row</th>
											<th class="editor-cancel" col-name="MaxTier">Max Tier</th>
											<th class="editor-cancel" col-name="Capacity">Sức chứa</th>
										</tr>
									</thead>									
									<tbody>										
									</tbody>
								</table>
							</div>	
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<script type="text/javascript">
	$(document).ready(function () {
		var tbl 			= $('#contenttable'),
			_columns 		= ['STT', 'YardID', 'Block', 'MaxBay', 'MaxRow', 'MaxTier', 'Capacity'],
			input_type, 
			parentMenuList 	= {};;

		var dataTbl = tbl.newDataTable({
			scrollY: '30vh',
			columnDefs: [
				{ type: "num", className: "text-center", targets: _columns.getIndexs(['STT'])},
				{ className: "text-center", targets: _columns.getIndexs(['YardID', 'Block', 'MaxBay', 'MaxRow', 'MaxTier', 'Capacity'])},
			],
			order: [[ _columns.indexOf('STT'), 'asc' ]],
			paging: false,
            keys:true,
            autoFill: {
                focus: 'focus'
            },
            select: {
            	style: 'single',
            	info: false,
            },
            rowReorder: false,
            arrayColumns: _columns
		});

		tbl.editableTableWidget();

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
		
		/* "Thêm mới" Button Click Event */
		$('#addrow').on('click', function(){
			$('#inputForm').trigger('reset');
			$('#YardID').selectpicker("refresh");
			tbl.dataTable().fnClearTable();
			input_type = "add";
		});

		/* Yard ID change event */
		$("#YardID").on('change', function(){
			input_type = "add";		

			// Load data to table
			tbl.waitingLoad();

			var formData = {
				'action': 'view',
				'YardID': $('#YardID').val(),
			};

			$.ajax({
				url: "<?=site_url(md5('Common') . '/' . md5('cmBlock'));?>",
				dataType: 'json',
				data: formData,
				type: 'POST',
				success: function (data) {
					var rows = [];
					if(data.list.length > 0) {
						for (i = 0; i < data.list.length; i++) {
							var rData = data.list[i], r = [];
							$.each(_columns, function(idx, colname){
								var val = "";
								switch(colname){
									case "STT": 
										val = i+1; 
										break;						
									default:
										val = rData[colname];
										break;	
								}
								r.push(val);
							});
							rows.push(r);
						}
					}

					tbl.dataTable().fnClearTable();
		        	if(rows.length > 0){
						tbl.dataTable().fnAddData(rows);
					}
				},
				error: function(err){
					console.log(err);
				}
			});
		});		

		/* Set value for Capacity */
		$('#MaxBay, #MaxRow, #MaxTier').on('change', function(){
			if ($("#MaxBay").val() && $("#MaxRow").val() &&  $("#MaxTier").val())
				$("#Capacity").val(parseInt($("#MaxBay").val()) * parseInt($("#MaxRow").val()) * parseInt($("#MaxTier").val()));
		});

		/* Prevent press - */
		$('#MaxBay, #MaxRow, #MaxTier').keydown(function(event) {
		  	if (event.which == 189) {
		    	event.preventDefault();
		   	}
		});

		/* Button "Lưu": Click Event*/
		$('#save').on('click', function(){
			var YardID	 	= $('#YardID').val(),
				Block 		= $('#Block').val(),
				MaxBay		= $('#MaxBay').val(),
				MaxRow  	= $('#MaxRow').val(),
				MaxTier 	= $('#MaxTier').val(),
				Capacity	= $('#Capacity').val();

			if (YardID == ""){
				toastr["error"]('Vui lòng chọn Yard ID!');	
				return;
			}

			if (Block == ""){
				toastr["error"]('Vui lòng nhập Block!');	
				return;
			}

			if (MaxBay == ""){
				toastr["error"]('Vui lòng nhập Bay!');	
				return;
			}

			if (MaxRow == ""){
				toastr["error"]('Vui lòng nhập Row!');	
				return;
			}

			if (MaxTier == ""){
				toastr["error"]('Vui lòng nhập Tier!');	
				return;
			}

			if (Capacity == ""){
				toastr["error"]('Vui lòng nhập Sức chứa!');	
				return;
			}

			var blockArr = [{
				'YardID': 	YardID,
				'Block': 	Block,
				'MaxBay': 	MaxBay,
				'MaxRow': 	MaxRow,
				'MaxTier': 	MaxTier,
				'Capacity': Capacity,
			}];

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
			                    saveData(blockArr);
			                }
			            },
			            cancel: {
			                text: 'Hủy bỏ',
			                btnClass: 'btn-default',
			                keys: ['ESC']
			            }
			        }
			});
		});

		function saveData(formData){
			var fData = {
				'action': input_type,
				'data': formData
			};
			postSave(fData);
		}

		function postSave(formData){
			var saveBtn = $('#save');
        	
			$.ajax({
                url: "<?=site_url(md5('Common') . '/' . md5('cmBlock'));?>",
                dataType: 'json',
                data: formData,
                type: 'POST',
                success: function (data) {                	
                    if(data.deny) {
                        toastr["error"](data.deny);
                        return;
                    }

                    if(formData.action == 'edit'){
                    	toastr["success"]("Cập nhật thành công!");
                    	location.reload();
                 		return;
                    }

                    if(formData.action == 'add'){
                    	toastr["success"]("Thêm mới thành công!");	
                    	location.reload();
                    	return;
                    }

                    location.reload();
                },
                error: function(err){
                	toastr["error"]("Error!");
                	console.log(err);
                }
            });
		}

		tbl.on('click', function(){
			var data         =  tbl.getSelectedData();

			var YardID 		=  data[0][_columns.indexOf("YardID")],		
				Block 		=  data[0][_columns.indexOf("Block")],			
				MaxBay 		=  data[0][_columns.indexOf("MaxBay")],
				MaxRow 		=  data[0][_columns.indexOf("MaxRow")], 
				MaxTier		=  data[0][_columns.indexOf("MaxTier")], 
				Capacity	=  data[0][_columns.indexOf("Capacity")];
			
			// Set input type equals edit
			input_type = 'edit';

			// Set value for input tab
			$('#YardID').val(YardID);
			$('#Block').val(Block);
			$('#MaxBay').val(MaxBay);
			$('#MaxRow').val(MaxRow);
			$('#MaxTier').val(MaxTier);
			$('#Capacity').val(Capacity);
		});

		// Button Delete: Click Event
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
			var delData = data.map( function( item ){
				var objDel = {
					"YardID" : item[ _columns.indexOf( "YardID" ) ],
					"Block"  : item[ _columns.indexOf( "Block" ) ],
					"MaxBay" 	 : item[ _columns.indexOf( "MaxBay" ) ],
					"MaxRow" 	 : item[ _columns.indexOf( "MaxRow" ) ],
					"MaxTier" 	 : item[ _columns.indexOf( "MaxTier" ) ],
				};
				return objDel;
			});

			var fdel = {
					'action': 'delete',
					'data': delData
				};

			$.ajax({
                url: "<?=site_url(md5('Common') . '/' . md5('cmBlock'));?>",
                dataType: 'json',
                data: fdel,
                type: 'POST',
                success: function (data) {
                    if(data.deny) {
                        toastr["error"](data.deny);
                        return;
                    }
                    tbl.DataTable().rows('.selected').remove().draw(false); // Delete row in table
                	tbl.updateSTT(_columns.indexOf("STT"));
               		toastr["success"]("Xóa dữ liệu thành công!");
                },
                error: function(err){
                	toastr["error"]("Error!");
                	console.log(err);
                }
            });
		}
	});
</script>
<script src="<?=base_url('assets/vendors/bootstrap-select/dist/js/bootstrap-select.min.js');?>"></script>

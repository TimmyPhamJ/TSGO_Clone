<!DOCTYPE html>

<html lang="en">

<head>

	<!DOCTYPE html>

<html lang="en">

<head>

    <meta charset="UTF-8">

    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <meta name="referrer" content="origin-when-crossorigin" id="meta_referrer" />

    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />

    <meta http-equiv="Pragma" content="no-cache" />

    <meta http-equiv="Expires" content="0" />

    <title><?=$title;?></title>

    <!--    favicon-->

    <link rel="icon" href="<?=base_url('assets/img/icons/favicon.ico');?>" type="image/ico">

    <!-- GLOBAL MAINLY STYLES-->

    <link href="<?=base_url('assets/vendors/jquery-ui/jquery-ui.css');?>" rel="stylesheet" />

    <link href="<?=base_url('assets/vendors/bootstrap/dist/css/bootstrap.min.css');?>" rel="stylesheet" />

    <link href="<?=base_url('assets/vendors/font-awesome/css/font-awesome.min.css');?>" rel="stylesheet" />

    <link href="<?=base_url('assets/vendors/line-awesome/css/line-awesome.min.css');?>" rel="stylesheet" />

    <link href="<?=base_url('assets/vendors/themify-icons/css/themify-icons.css');?>" rel="stylesheet" />



    <link href="<?=base_url('assets/vendors/jquery-confirm/jquery-confirm.min.css');?>" rel="stylesheet" />



    <!-- PLUGINS STYLES-->

    <link href="<?=base_url('assets/vendors/dataTables/datatables.min.css');?>" rel="stylesheet" />

    <link href="<?=base_url('assets/vendors/dataTables/jquery.dataTables.min.css');?>" rel="stylesheet" />

    <!--    DATATABLES SCROLL-->

    <link href="<?=base_url('assets/vendors/dataTables/scroller.dataTables.min.css');?>" rel="stylesheet" />



    <link href="<?=base_url('assets/vendors/toastr/toastr.min.css');?>" rel="stylesheet" type="text/css" />



    <!--    CUSTOMIZE FOR DATATABLES-->

    <link href="<?=base_url('assets/css/custom.datatables.css');?>" rel="stylesheet" />



    <!-- THEME STYLES-->

    <link href="<?=base_url('assets/css/main.min.css');?>" rel="stylesheet" />

    <link href="<?=base_url('assets/css/ro2.css');?>" rel="stylesheet" />

    <!-- PAGE LEVEL STYLES-->

	

	<!-- CORE PLUGINS-->

    <script src="<?=base_url('assets/vendors/popper.js/dist/umd/popper.min.js');?>"></script>

    

    <script src="<?=base_url('assets/vendors/jquery/dist/jquery.min.js');?>"></script>

    <script src="<?=base_url('assets/vendors/jquery/dist/jquery2-1-4.min.js');?>"></script>

    <script src="<?=base_url('assets/vendors/jquery-ui/jquery-ui.js');?>"></script>

    <script src="<?=base_url('assets/vendors/bootstrap/dist/js/bootstrap.min.js');?>"></script>

    <script src="<?=base_url('assets/vendors/metisMenu/dist/metisMenu.min.js');?>"></script>

    <script src="<?=base_url('assets/vendors/jquery-slimscroll/jquery.slimscroll.min.js');?>"></script>

    <script src="<?=base_url('assets/vendors/jquery-validation/dist/jquery.validate.min.js');?>"></script>

    <script src="<?=base_url('assets/vendors/jquery-confirm/jquery-confirm.min.js');?>"></script>



    <script src="<?=base_url('assets/vendors/moment/min/moment.min.js');?>"></script>

    

    <script src="<?=base_url('assets/js/contextmenu.js');?>"></script>



    <link href="<?=base_url('assets/vendors/datetimepicker/jquery-ui-timepicker-addon.css');?>" rel="stylesheet" />

    <script src="<?=base_url('assets/vendors/datetimepicker/jquery-ui-timepicker-addon.js');?>"></script>



    <!--    custom for eblling js-->

    <script src="<?=base_url('assets/js/ro2.js');?>"></script>

    <script src="<?=base_url('assets/js/datatables.ext.js');?>"></script>

    

    <!-- PAGE LEVEL PLUGINS-->

    <script src="<?=base_url('assets/vendors/dataTables/datatables.min.js');?>"></script>



    <!--    TABLES SCROLL-->

    <script src="<?=base_url('assets/vendors/dataTables/dataTables.scroller.min.js');?>"></script>

    <script type="text/javascript" src="<?=base_url('assets/vendors/dataTables/extensions/key_table.min.js');?>"></script>

    <script type="text/javascript" src="<?=base_url('assets/vendors/dataTables/extensions/mindmup-editabletable.js');?>"></script>

    <script type="text/javascript" src="<?=base_url('assets/vendors/dataTables/extensions/numeric-input-example.js');?>"></script>

    <script type="text/javascript" src="<?=base_url('assets/vendors/dataTables/extensions/autofill.min.js');?>"></script>

    <script type="text/javascript" src="<?=base_url('assets/vendors/dataTables/extensions/scroller.min.js');?>"></script>

    <script type="text/javascript" src="<?=base_url('assets/vendors/dataTables/extensions/select.min.js');?>"></script>

    <script type="text/javascript" src="<?=base_url('assets/vendors/dataTables/extensions/buttons.min.js');?>"></script>



    <!-- Toastr js -->

    <script src="<?=base_url('assets/vendors/toastr/toastr.min.js');?>"></script>



    <!-- Loader -->

    <script src="<?=base_url('assets/vendors/loaders/blockui.min.js');?>"></script>

    <script src="<?=base_url('assets/vendors/loaders/progressbar.min.js');?>"></script>



    <!-- Socket -->

    <script src="<?=base_url('/sockets/node_modules/socket.io-client/dist/socket.io.js');?>"></script>



    <script type="text/javascript">

        var socket = io.connect('https://<?=HOST;?>/');

    </script>

	

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



		input[type="text"]:focus{

			background-color: #f6fcff;

		}

		.top-bar{

			position: relative;

			background-color: #207b99;

			height: 55px;

			margin: 0;

		}

		.trapezoid{

 			height: 55px;

		    width: 350px;

			margin: 0 auto;	

			padding: 0px;

			border-bottom: #207b99 solid 1px;

			

		}

		.trapezoid-child{

			height: 55px;

		    width: 265px;

			background: #ffffff;

			margin: 0 auto;	

			text-align: center;

		}

		.right-btn-group{

			position: absolute;

			top: 7px;

			right: 10px;

		

		}

		.mainTittle{

			color: white;

			font-size: 1.6vw;

			margin-top: auto;

			margin-bottom: auto;

			padding-top: 10px;

			height: 100%;

   			display: table;

   			width: 100%;

		}

		.btn{

			margin-right: 15px;

		}

		.user-info{

			position: absolute;

			top: 7px;

			left: 47%!important;

			font-size: 18px;

			color: #005b7f;

		}

		.screen-name{

			position: absolute;

			top: 70px;

			left: 43%;

			font-size: 50%;

			color: #ffffff;

		}

		.body-content{

			position: relative;

			top: 0.6rem;

			left: 0%;

			right: 0%

		}

		.buttonGroup{

			margin-left: auto!important;

			margin-right: auto!important;

		}

		#chooseGate{

			font-size: 1.25rem; 

			font-family: Times New Roman; 

			border-radius: 10px; 

			height: 2rem; 

			width: 10vw; 

			border: white solid 1px; 

			color: white; 

			background-color: #207b99; 

			margin-top: 0.8rem;

		}

		#passGate{

			font-size: 1.25rem; 

			font-family: Times New Roman; 

			border-radius: 10px; 

			height: 2rem; 

			width: 8.5vw; 

			border: white solid 1px; 

			color: white; 

			background-color: #207b99; 

			margin-top: 0.8rem;

		}

	</style>

</head>

<body style="background-color: #f2f4f8;">

	<div class="col-xl-12 top-bar">

		<div class="row">

			<div class="left-btn-group col-4" style="text-align: center;">

				<div class="row">

					<div class="col-6 mainTittle"><b>GIAO NHẬN CỔNG</b></div>

					<div class="col-6">

						<button id="chooseGate">

							<p style="font-size: 1.25vw; font-style: italic; margin-top: auto; margin-bottom: auto">Chọn cổng...</p>

						</button>

					</div>

				</div>

			</div>

			<div  class="col-4">

				<div class="buttonGroup">

					<button id="btn1" hidden class="btn btn-success btn-icon-only btn-circle"><i class="la la-refresh"></i></button>	



					<button id="passGate"><p style="font-size: 1.25vw; margin-top: auto; margin-bottom: auto">QUA CỔNG</</p></button>



					<button id="btn2" hidden class="btn btn-danger btn-icon-only btn-circle"><i class="la la-print"></i></button>

					<button id="btn3" hidden class="btn btn-white btn-icon-only btn-circle"><i class="la la-power-off"></i></button>	

				</div>

			</div>

			<div class="right-btn-group col-4">

				<div style="float: right;">

					<ul id="right-out" class="nav navbar-toolbar">

                    	<li class="dropdown dropdown-user">

							<a id="user-info" class="nav-link dropdown-toggle link" style="font-size: 1.25vw; padding-right: 0; color: white; ">

		                	Người dùng: &ensp;<span id="user_fullname"><?=$this->session->userdata('FullName');?></span>

		                	<span id="user_name" style="display: none;"><?=$this->session->userdata('UserID');?></span>

		            		</a>

		            	</li>

 						<li>

				           <a id="alogout" class="d-flex align-items-center ml-2" title="Đăng xuất" href="<?=site_url(md5('user') . '/' . md5('logout'));?>" style="margin-top: 0.75rem; height: 1.25vw"><i class="ti-shift-right" style="color: white"></i></a>

		            	</li>

		            </ul>		

				</div>

			</div>		

		</div>

	</div>

	<div class="body-content">

		<div class="col-xl-12" style="background-color: #f2f4f8; font-size: 0.95rem">

			<div class="ibox collapsible-box">

				<form class=" mt-0 pt-0 pb-0" style="background-color: #f2f4f8;" id="inputForm">

					<div class="row">

						<div class="col-lg-4 col-md-6 col-sm-12 col-xs-12" style="background-color: #f2f4f8;">

							<div class="ibox-body pt-0 pb-0">

								<div class="row ibox pb-0 border-e">

									<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-2">

										<div class="row" style="text-align: center; background-color: #0b4660; color: #ffffff; border-radius: 5px;">	

												<label class="col-md-12 col-sm-6 col-xs-6 col-form-label">

													<b>THÔNG TIN LỆNH</b>

												</label>

										</div>

										<div class="row">

											<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-1" style="height: 55px;">

												<div class="row form-group">

													<label class="col-md-12 col-sm-12 col-xs-12 col-form-label">Tên tàu</label>

													<div class="col-md-12 col-sm-12 col-xs-10">

														<input id="VesselName" style="height: 28px; font-size: 12px; padding-left: 11px" class="form-control" placeholder="Tên tàu" type="text">

													</div>

													<input hidden id="StockRef">

													<input hidden id="ClassID">

													<input hidden id="PinCode">

													<input hidden id="EirNo">

												</div>

											</div>

										</div>

										<div class="row">

											<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-1" style="height: 55px;">

												<div class="row form-group">

													<label class="col-md-6 col-sm-6 col-xs-6 col-form-label">Chuyến nhập/ xuất</label>

													<label class="col-md-6 col-sm-6 col-xs-6 col-form-label">Hãng tàu</label>

													<div class="col-md-6 col-sm-6 col-xs-6">

														<input id="InOutBoundVoyage" style="height: 28px; font-size: 12px; padding-left: 11px" class="form-control" placeholder="Chuyến nhập/ xuất" type="text">

													</div>

													<div class="col-md-6 col-sm-6 col-xs-6">

														<input id="VesselType" style="height: 28px; font-size: 12px; padding-left: 11px" class="form-control" placeholder="Hãng tàu" type="text">

													</div>

												</div>

											</div>

										</div>										

										<div class="row">

											<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-1" style="height: 55px;">

												<div class="row form-group">

													<label class="col-md-6 col-sm-6 col-xs-6 col-form-label">ETB</label>

													<label class="col-md-6 col-sm-6 col-xs-6 col-form-label">ETD</label>

													<div class="col-md-6 col-sm-6 col-xs-6">

														<input id="ETB" style="height: 28px; font-size: 12px; padding-left: 11px" class="form-control" placeholder="ETB" type="text">

													</div>

													<div class="col-md-6 col-sm-6 col-xs-6">

														<input id="ETD" style="height: 28px; font-size: 12px; padding-left: 11px" class="form-control" placeholder="ETD" type="text">

													</div>

												</div>

											</div>

										</div>		

										<div class="row">

											<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-1" style="height: 55px;">

												<div class="row form-group">

													<label class="col-md-6 col-sm-6 col-xs-6 col-form-label">Số vận đơn/ booking</label>

													<label class="col-md-6 col-sm-6 col-xs-6 col-form-label">Số hóa đơn</label>

													<div class="col-md-6 col-sm-6 col-xs-6">

														<input id="BillOfLadingORBookingNo"  style="height: 28px; font-size: 12px; padding-left: 11px" class="form-control form-control-sm" placeholder="Số vận đơn/ booking" type="text">

													</div>

													<div class="col-md-6 col-sm-6 col-xs-6">

														<input id="IMO" class="form-control form-control-sm" placeholder="Số hóa đơn" type="text">

													</div>

												</div>

											</div>

										</div>								

										<div class="row">

											<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-1" style="height: 55px;">

												<div class="row form-group">

													<label class="col-md-6 col-sm-6 col-xs-6 col-form-label">Phương án</label>

													<label class="col-md-6 col-sm-6 col-xs-6 col-form-label">Phương thức</label>

													<div class="col-md-6 col-sm-6 col-xs-6">

														<input id="JobModeID"  style="height: 28px; font-size: 12px; padding-left: 11px" class="form-control form-control-sm" placeholder="Phương án" type="text">

													</div>

													<div class="col-md-6 col-sm-6 col-xs-6">

														<input id="MethodID" class="form-control form-control-sm" placeholder="Phương thức" type="text">

													</div>

												</div>

											</div>

										</div>

										<div class="row">

											<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-1" style="height: 55px">

												<div class="row form-group">

													<label class="col-md-6 col-sm-6 col-xs-6 col-form-label">Ngày tạo lệnh</label>

													<label class="col-md-6 col-sm-6 col-xs-6 col-form-label">Ngày hạn lệnh</label>

													<div class="col-md-6 col-sm-6 col-xs-6">

														<input id="IssueDate" style="height: 28px; font-size: 12px; padding-left: 11px" class="form-control form-control-sm input-required" placeholder="Ngày tạo lệnh" type="text">

													</div>

													<div class="col-md-6 col-sm-6 col-xs-6">

														<input id="ExpDate" style="height: 28px; font-size: 12px; padding-left: 11px" class="form-control form-control-sm input-required" placeholder="Ngày hạn lệnh" type="text">

													</div>

												</div>

											</div>

										</div>								

										<div class="row">

											<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-1" style="height: 55px;">

												<div class="row form-group">

													<label class="col-md-6 col-sm-2 col-xs-2 col-form-label">Loại xe</label>

													<label class="col-md-6 col-sm-2 col-xs-2 col-form-label">Hãng xe</label>													

													

													<div class="col-md-6 col-sm-6 col-xs-6">

														<input id="CarTypeID" style="height: 28px; font-size: 12px; padding-left: 11px" class="form-control" placeholder="Loại xe" type="text">

													</div>

													<div class="col-md-6 col-sm-6 col-xs-6">

														<input id="BrandID" style="height: 28px; font-size: 12px; padding-left: 11px" class="form-control" placeholder="Hãng xe" type="text">

													</div>

												</div>

											</div>

										</div>

										<div class="row">

											<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-1" style="height: 55px;">

												<div class="row form-group">

													<label class="col-md-6 col-sm-6 col-xs-6 col-form-label">POD/ FPOD</label>

													<label class="col-md-6 col-sm-6 col-xs-6 col-form-label">Transit Mode</label>

													<div class="col-md-6 col-sm-6 col-xs-6">

														<input id="PODandFPOD" class="form-control form-control-sm" placeholder="POD/ FPOD" type="text">

													</div>

													<div class="col-md-6 col-sm-6 col-xs-6">

														<input id="TransitID"  style="height: 28px; font-size: 12px; padding-left: 11px" class="form-control form-control-sm" placeholder="Transit Mode" type="text">

													</div>													

												</div>

											</div>

										</div>

										<div class="row">

											<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-1" style="height: 55px;">

												<div class="row form-group">

													<label class="col-md-12 col-sm-12 col-xs-12 col-form-label">Chủ hàng</label>

													<div class="col-md-12 col-sm-12 col-xs-10">

														<input id="ShipperName" style="height: 28px; font-size: 12px; padding-left: 11px" class="form-control" placeholder="Chủ hàng" type="text">

													</div>

												</div>

											</div>

										</div>

									</div>

								</div>

							</div>

						</div>

						<div class="col-lg-4 col-md-6 col-sm-12 col-xs-12" style="background-color: #f2f4f8; border-radius: 5px;">

							<div class="ibox-body pt-0 pb-0">

								<div class="row ibox mb-0 pb-1 border-e" style="padding-bottom: 0px">

									<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">

										<div class="row">

											<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="height: 30%;">

												<div class="row" style="text-align: center; background-color: #0b4660; color: #ffffff; border-radius: 5px;">	

													<label class="col-md-12 col-sm-6 col-xs-6 col-form-label">

														<b>DANH SÁCH XE</b>

													</label>

												</div>

											</div>

										</div>

									</div>

									<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt-1">

										<table id="contenttable" class="table table-striped display nowrap" cellspacing="0" style="width: 100%">

						                    <thead>

							                    <tr>

							                        <th class="editor-cancel" col-name="IO">I/O</th>

							                        <th col-name="TruckNo">Số xe</th>

							                        <th col-name="BillOfLadingORBookingNo">Số vận đơn/ booking</th>

							                        <th col-name="VINNO">Số PINCODE</th>

							                        <th col-name="CargoType">Loại hàng</th> <!-- R: Roro, B: bulk -->

							                        <th col-name="EirNo">Số lệnh</th>

							                        <th col-name="StockRef">StockRef</th>

							                        <th col-name="Sequence">Sequence</th>

							                    </tr>

						                    </thead>

						                    <tbody>

						                    </tbody>

						                </table>

									</div>

								</div>

							</div>

						</div>

						<div class="col-lg-4 col-md-6 col-sm-12 col-xs-12" style="background-color: #f2f4f8; border-radius: 5px;">

							<div class="ibox-body pt-0 pb-0 mb-1">

								<div class="row ibox mb-0 pb-1 border-e" style="padding-bottom: 0px">

									<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-2">

										<div class="row" style="text-align: center; background-color: #0b4660; color: #ffffff; border-radius: 5px;">	

												<label class="col-md-12 col-sm-6 col-xs-6 col-form-label">

													<b>TRUY VẤN THÔNG TIN</b>

												</label>

										</div>

										<div class="row">

											<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-1" style="height: 55px">

												<div class="row form-group">

													<label class="col-md-6 col-sm-2 col-xs-2 col-form-label">Số PIN/ Số lệnh</label>

													<label class="col-md-6 col-sm-2 col-xs-2 col-form-label">Số PINCODE</label>

													

													<div class="col-md-6 col-sm-6 col-xs-6">

														<input id="PINCodeOREirNo" style="height: 28px; font-size: 12px; padding-left: 11px" class="form-control" placeholder="Số PIN/ Số lệnh" type="text">

													</div>

													<div class="col-md-6 col-sm-6 col-xs-6">

														<input id="VINNo" style="height: 28px; font-size: 12px; padding-left: 11px" class="form-control" placeholder="Số PINCODE" type="text">

														<input hidden id="Sequence">

													</div>

												</div>

											</div>

										</div>

										<div class="row">

											<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-1" style="height: 55px">

												<div class="row form-group">

													<label class="col-6 col-form-label">Vị trí</label>

													<label class="col-6 col-form-label">Trọng lượng</label>



													<div class="col-md-6 col-sm-6 col-xs-6">

														<input id="ordPos" style="height: 28px; font-size: 12px; padding-left: 11px" class="form-control" placeholder="Vị trí" type="text">

													</div>

													<div class="col-md-6 col-sm-6 col-xs-6">

														<input id="CarWeight" style="height: 28px; font-size: 12px; padding-left: 11px" class="form-control" placeholder="Trọng lượng" type="text">

													</div>

												</div>

											</div>

										</div>

									</div>

								</div>

							</div>	

							<div class="ibox-body pt-0 pb-2" style="margin-top: 0px;">

								<div class="row ibox mb-0 pb-1 border-e" style="padding-bottom: 0px">

									<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-2">

										<div class="row">

											<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="height: 29%;">

												<div class="row" style="text-align: center; background-color: #0b4660; color: #ffffff; border-radius: 5px;">	

													<label class="col-md-12 col-sm-6 col-xs-6 col-form-label">

														<b>THÔNG TIN PHƯƠNG TIỆN</b>

													</label>

												</div>

												<div class="row">

													<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-1" style="height: 55px">		

														<div class="row form-group">

															<label class="col-md-6 col-sm-12 col-xs-12 col-form-label">Thông tin tài xế</label>

															<label class="col-md-6 col-sm-12 col-xs-12 col-form-label">Số điện thoại</label>



															<div class="col-md-6 col-sm-6 col-xs-6">

																<input id="VesselName" style="height: 28px; font-size: 12px; padding-left: 11px" class="form-control" placeholder="Thông tin tài xế" type="text">

															</div>

															<div class="col-md-6 col-sm-6 col-xs-6">

																<input id="LBP" style="height: 28px; font-size: 12px; padding-left: 11px" class="form-control" placeholder="Số điện thoại" type="text">

															</div>

														</div>

													</div>

												</div>

												<div class="row">

													<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-1" style="height: 55px">		

														<div class="row form-group">

															<label class="col-md-6 col-sm-2 col-xs-2 col-form-label">Số xe</label>

															<label class="col-md-6 col-sm-2 col-xs-2 col-form-label">Trọng lượng xe (tấn)</label>

															

															<div class="col-md-6 col-sm-6 col-xs-6">

																<input id="TruckNo" style="height: 28px; font-size: 12px; padding-left: 11px" class="form-control" placeholder="Số xe" type="text">

															</div>



															<div class="col-md-6 col-sm-6 col-xs-6">

																<input id="TruckWeight" style="height: 28px; font-size: 12px; padding-left: 11px" class="form-control" placeholder="Trọng lượng xe" type="text">

															</div>

														</div>

													</div>

												</div>

												<div class="row">

													<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-1" style="height: 55px">		

														<div class="row form-group" style="height: 55px;">

															<label class="col-md-6 col-sm-12 col-xs-12 col-form-label">Trọng lượng đăng kiểm</label>

															

															<label class="col-md-6 col-sm-12 col-xs-12 col-form-label">Ghi chú</label>



															

														

															<div class="col-md-6 col-sm-6 col-xs-6">

																<input id="RegisterWeight" style="height: 28px; font-size: 12px; padding-left: 11px" class="form-control" placeholder="Trọng lượng đăng kiểm" type="text">

															</div>



															<div class="col-md-6 col-sm-6 col-xs-6">

																<input id="Remark" style="height: 28px; font-size: 12px; padding-left: 11px" class="form-control" placeholder="Ghi chú" type="text">

															</div>															

														</div>

													</div>

												</div>

												<div class="row">

													<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-1 mt-2" style="height: 70px">		

														<div class="row form-group">

															<!--

															<div class="col-md-6 col-sm-6 col-xs-6 mt-0">

																<button class="btn btn-sm btn-success btn-labeled btn-labeled-left btn-icon" style="width: 6rem; height: 2rem!important; border-radius: 10px; padding-bottom: 5px!important" id="btnScales">

                                    								<span class="btn-label"><i class="la la-cart-arrow-down"></i></span>Cân

                                    							</button>

															</div>

															-->

															<div class="col-md-6 col-sm-6 col-xs-6 mt-0">

																<button class="btn btn-sm btn-danger btn-labeled btn-labeled-left btn-icon" style="width: 11rem; height: 2rem!important; border-radius: 10px; padding-bottom: 5px!important">

                                    								<span class="btn-label"><i class="la la-warning"></i></span>Kiểm tra tình trạng

                                    							</button>

															</div>

														</div>

													</div>

												</div>

											</div>

										</div>

									</div>

								</div>

							</div>

						</div>					

					</div>

				</form>	

			</div>

		</div>

	</div>

</body>



<div class="modal fade" id="choose-gate-modal" tabindex="-1" role="dialog" aria-labelledby="groups-modalLabel-1" aria-hidden="true" data-whatever="id" style="padding-left: auto; padding-right: auto; margin-top: 5%">

    <div class="modal-dialog" role="document" style="min-width: 512!important;">

        <div class="modal-content" style="border-radius: 10px!important;">

            <div class="modal-header">

                <h5 class="modal-title text-gradient-peach" id="groups-modalLabel-1"><b>CHỌN CỔNG</b></h5>

            </div>

            <div class="modal-body" style="margin: auto">                

            	<?php if(count($gateList) > 0) { ?>	

            		<?php $i = 1; ?>		

					<?php foreach($gateList as $item){  ?>												

	               		<button id="chooseGate<?=$i;?>" class="btn <?= ($item['InOut'] == 1 ? 'btn-outline-success' : 'btn-outline-danger') ?>" style="border-radius: 20px; width: 6rem!important"><?=$item['GateID'];?></button>

	               	<?php $i++; } ?>

                <?php } ?>

            </div>

        </div>

    </div>

</div>

<div class="modal" id="inqrbox">

			<div class="modal-dialog">

				<div class="modal-content">

					<div class="modal-header">

						<button type="button" class="close" data-dismiss="modal" aria-label="Close">

							<span aria-hidden="true">&times;</span>

						</button>

						<h4 class="modal-title">Qr Code</h4>

					</div>

					<div class="modal-body" id="print_box" style="position: static">

						<div id="interactive" class="viewport"></div>

						<div class="error"></div>

					</div>

					<div class="modal-footer">

					<button id="print_btn" type="button" class="btn btn-primary pull-left" data-dismiss="modal">In</button>				

						<button type="button" class="btn btn-primary" data-dismiss="modal">Đóng</button>

					</div>

				</div><!-- /.modal-content -->

			</div><!-- /.modal-dialog -->

		</div><!-- /.modal -->



<!-- ORD Eir modal-->

<div class="modal fade" id="ord-eir-modal" tabindex="-1" role="dialog" aria-labelledby="groups-modalLabel-1" aria-hidden="true" data-whatever="id" style="padding: auto; padding-top: 4%">

    <div class="modal-dialog" role="document" style="min-width: 1250px!important">

        <div class="modal-content" style="border-radius: 4px">

            <div class="modal-header">

                <h5 class="modal-title text-primary" id="groups-modalLabel-1">Danh mục lệnh</h5>

            </div>

            <div class="modal-body" style="padding: 0px 15px 15px 15px">

                <div class="row ibox-footer border-top-0 mt-3">

                    <div class="col-md-12 col-sm-12 col-xs-12 table-responsive">

                        <table id="tblORDEir" class="table table-striped display nowrap" cellspacing="0" style="min-width: 99.5%">

                            <thead>

                                <tr style="width: 100%">

                                    <th class="editor-cancel" col-name="STT">STT</th>

									<th col-name="rowguid">rowguid</th>

									<th col-name="VoyageKey">VoyageKey</th>

									<th col-name="EirNo">Số lệnh</th>

									<th col-name="PinCode">Mã pin</th>

									<th col-name="ClassID">Nhập/ xuất tàu</th>	

									<th col-name="BillOfLadingORBookingNo">Số vận đơn/ Booking</th>

									<th col-name="BillOfLading">Số vận đơn</th>

									<th col-name="BookingNo">Số booking</th>

									<th col-name="VINNo">Số PINCODE</th>

									<th col-name="ordPos">Vị trí</th>

									<th col-name="IssueDate" class="data-type-datetime">Ngày lệnh</th>

									<th col-name="ExpDate" class="data-type-datetime">Hạn lệnh</th>

									<th col-name="CarTypeID">Loại xe</th>

									<th col-name="BrandID">Hãng xe</th>

									<th col-name="CarWeight">Trọng lượng</th>

									<th col-name="JobModeID">Phương án</th>

									<th col-name="MethodID">Phương thức</th>

									<th col-name="Remark">Ghi chú</th>		

									<th col-name="IsLocalForeign">Hàng nội/ ngoại</th>

									<th col-name="ETB">ETB</th>

									<th col-name="ETD">ETD</th>

									<th col-name="POD">POD</th>

									<th col-name="FPOD">FPOD</th>

									<th col-name="TransitID">TransitID</th>

									<th col-name="ShipperName">ShipperName</th>

									<th col-name="InboundVoyage">InboundVoyage</th>

									<th col-name="OutboundVoyage">OutboundVoyage</th>

									<th col-name="VesselName">VesselName</th>

									<th col-name="Block">Block</th>

									<th col-name="Bay">Bay</th>

									<th col-name="Row">Row</th>

									<th col-name="Tier">Tier</th>

									<th col-name="Area">Area</th>

									<th col-name="CusTypeID">Loại khách hàng</th>

									<th col-name="CusID">Khách hàng</th>

									<th col-name="PaymentTypeID">Loại hình thanh toán</th>

									<th col-name="InvNo">Số hóa đơn</th>

									<th col-name="InvDraftNo">Số phiếu thu</th>

									<th col-name="KeyNo">Mã chìa khóa</th>

									<th col-name="Sequence">Sequence</th>

									<th col-name="POL">POL</th>

									<th col-name="POD">POD</th>

									<th col-name="FPOD">FPOD</th>

									<th col-name="UnitID">Đơn vị tính</th>

                                </tr>

                            </thead>

                            <tbody>

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

            <div class="modal-footer">

                <div  style="margin: 0 auto!important;">

					<button class="btn btn-sm btn-rounded btn-gradient-blue btn-labeled btn-labeled-left btn-icon" id="apply-ord-eir" data-dismiss="modal">

						<span class="btn-label"><i class="ti-check"></i></span>Xác nhận</button>

					<button class="btn btn-sm btn-rounded btn-gradient-peach btn-labeled btn-labeled-left btn-icon" data-dismiss="modal">

						<span class="btn-label"><i class="ti-close"></i></span>Đóng</button>

				</div>

            </div>

        </div>

    </div>

</div>



<!--

<div class="modal fade" id="scales-modal" tabindex="-1" role="dialog" aria-labelledby="groups-modalLabel-1" aria-hidden="true" data-whatever="id" style="padding: auto; padding-top: 1%">

    <div class="modal-dialog" role="document" style="min-width: 1250px!important">

        <div class="modal-content" style="border-radius: 4px">

            <div class="modal-header">

                <h5 class="modal-title text-primary" id="groups-modalLabel-1">PHẦN MỀM CÂN GIẢ LẬP</h5>

            </div>

            <div class="modal-body" style="padding: 0px 15px 15px 15px">

                <div class="row ibox-footer border-top-0 mt-3">

                    <div class="col-md-6 col-sm-6 col-xs-6">

                        <div class="row form-group">

                        	<h5 style="margin-left: auto; margin-right: auto"><b>THÔNG TIN CÂN HÀNG</b></h5>

                        </div>

                        <div class="row form-group">

                        	<div class="col-6">

                        		<div class="row mt-2">

                        			<label class="col-md-4 col-sm-4 col-xs-4 col-form-label">Phiếu cân</label>

                        			<div class="col-md-8 col-sm-8 col-xs-8">

										<input id="" style="height: 28px; font-size: 12px; padding-left: 11px" class="form-control" placeholder="Số phiếu cân" type="text">

									</div>	

                        		</div>

                        		<div class="row mt-2">

                        			<label class="col-md-4 col-sm-4 col-xs-4 col-form-label">Số lệnh</label>

                        			<div class="col-md-8 col-sm-8 col-xs-8">

										<input id="" style="height: 28px; font-size: 12px; padding-left: 11px" class="form-control" placeholder="Số lệnh" type="text">

									</div>	

                        		</div>

                        		<div class="row mt-2">

                        			<label class="col-md-4 col-sm-4 col-xs-4 col-form-label">Số xe</label>

                        			<div class="col-md-8 col-sm-8 col-xs-8">

										<input id="scalesTruckNo" style="height: 28px; font-size: 12px; padding-left: 11px" class="form-control" placeholder="Số xe" type="text">

									</div>	

                        		</div>

                        		<div class="row mt-2">

                        			<label class="col-md-4 col-sm-4 col-xs-4 col-form-label">TL xe</label>

                        			<div class="col-md-8 col-sm-8 col-xs-8">

										<input id="" style="height: 28px; font-size: 12px; padding-left: 11px" class="form-control" placeholder="Trọng lượng xe" type="text">

									</div>	

                        		</div>

                        		<div class="row mt-2">

                        			<label class="col-md-4 col-sm-4 col-xs-4 col-form-label">TL Rơ mooc</label>

                        			<div class="col-md-8 col-sm-8 col-xs-8">

										<input id="" style="height: 28px; font-size: 12px; padding-left: 11px" class="form-control" placeholder="Trọng lượng Rơ mooc" type="text">

									</div>	

                        		</div>                   		

                        	</div>

                        	<div class="col-6">           

                        		<div class="row">

                        			<label class="col-md-12 col-sm-12 col-xs-12 col-form-label" style="text-align: center;">TRỌNG LƯỢNG HIỆN TẠI</label>

                        			<div class="col-md-2 col-sm-2 col-xs-2">

                        			</div>

                        			<div class="col-md-8 col-sm-8 col-xs-8">

                        				<input id="currentWeight" style="height: 35px; font-size: 20px; text-align: center; padding-left: 11px;" class="form-control" type="number">

                        			</div>

                        			<div class="col-md-2 col-sm-2 col-xs-2">

                        				<label class="col-form-label" style="float: left">(kg)</label>

                        			</div>

                        		</div>       

                        		<div class="row mt-2">

                        		</div>      		

                        		<div class="row mt-2">

                        			<label class="col-md-4 col-sm-4 col-xs-4 col-form-label">TL xe vào</label>

									<div class="col-md-8 col-sm-8 col-xs-8 input-group">

                                        <input class="form-control form-control-sm" type="text" placeholder="Trọng lượng xe vào" style="background-color: #f1f1f1" id="CarWeightIn">

                                        <span class="input-group-addon" id="btnCarWeightIn">

                                           	<i class="la la-balance-scale"></i>

                                        </span>

                                    </div>

                        		</div>

                        		<div class="row mt-2">

                        			<label class="col-md-4 col-sm-4 col-xs-4 col-form-label">TL xe ra</label>

                        			<div class="col-md-8 col-sm-8 col-xs-8 input-group">

                                        <input class="form-control form-control-sm" type="text" placeholder="Trọng lượng xe ra" style="background-color: #f1f1f1">

                                        <span class="input-group-addon" id="btnCarWeightOut">

                                           	<i class="la la-balance-scale"></i>

                                        </span>

                                    </div>

                        		</div>

                        		<div class="row mt-2">

                        			<label class="col-md-4 col-sm-4 col-xs-4 col-form-label">Ghi chú</label>

                        			<div class="col-md-8 col-sm-8 col-xs-8">

										<input id="" style="height: 28px; font-size: 12px; padding-left: 11px" class="form-control" placeholder="Ghi chú" type="text">

									</div>	

                        		</div>

                        	</div>

                        </div>

                        <div class="row form-group mt-2">

                        	<h5 style="margin-left: auto; margin-right: auto"><b>THÔNG TIN THANH TOÁN</b></h5>

                        </div>

                        <div class="row form-group">

                        	<div class="col-6">

                        		<div class="row mt-2">

                        			<label class="col-md-4 col-sm-4 col-xs-4 col-form-label">Phiếu TC</label>

                        			<div class="col-md-8 col-sm-8 col-xs-8">

										<input id="" style="height: 28px; font-size: 12px; padding-left: 11px" class="form-control" placeholder="Số phiếu tính cước" type="text">

									</div>	

                        		</div>

                        		<div class="row mt-2">

                        			<label class="col-md-4 col-sm-4 col-xs-4 col-form-label">Hóa đơn</label>

                        			<div class="col-md-8 col-sm-8 col-xs-8">

										<input id="" style="height: 28px; font-size: 12px; padding-left: 11px" class="form-control" placeholder="Hóa đơn" type="text">

									</div>	

                        		</div>

                        	</div>

                        	<div class="col-6">

                        		<div class="row mt-2">

                        			<label class="col-md-4 col-sm-4 col-xs-4 col-form-label">Tổng tiền</label>

                        			<div class="col-md-8 col-sm-8 col-xs-8">

										<input id="" style="height: 28px; font-size: 12px; padding-left: 11px" class="form-control" placeholder="Tổng tiền" type="text">

									</div>	

                        		</div>

                        		<div class="row mt-2">

                        			<label class="col-md-4 col-sm-4 col-xs-4 col-form-label">Khách hàng</label>

                        			<div class="col-md-8 col-sm-8 col-xs-8">

										<input id="" style="height: 28px; font-size: 12px; padding-left: 11px" class="form-control" placeholder="Khách hàng" type="text">

									</div>	

                        		</div>

                        		<div class="row mt-2">

                        			<label class="mt-1 ml-3 radio radio-success">

			                                <input type="radio" name="IsLocalForeign" class="css-checkbox" value="1" />

			                                <span class="input-span"></span><span style="margin-left: 0;">Trả trước</span>

			                            </label>	

										<label class="mt-1 ml-4 radio radio-success">

			                                <input type="radio" checked name="IsLocalForeign" class="css-checkbox" value="2" />

			                                <span class="input-span"></span>Trả sau

			                        	</label>

                        		</div>

                        	</div>

                        </div>

                    </div>

                    <div class="col-md-6 col-sm-6 col-xs-6 table-responsive">

                    	<table id="tblScales" class="table table-striped display nowrap" cellspacing="0" style="min-width: 99.5%">

                            <thead>

                                <tr style="width: 100%">

                                    <th class="editor-cancel" col-name="STT">STT</th>

									<th col-name="1">Mã phiếu cân</th>

									<th col-name="TruckNo">Trọng lượng</th>

									<th col-name="TimeIn">Thời gian vào</th>

									<th col-name="WeightIn">Trọng lượng vào</th>	

									<th col-name="TimeOut">Thời gian ra</th>

									<th col-name="WeightOut">Trọng lượng ra</th>	

                                </tr>

                            </thead>

                            <tbody>

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

            <div class="modal-footer">

                <div  style="margin: 0 auto!important;">

					<button class="btn btn-sm btn-rounded btn-gradient-blue btn-labeled btn-labeled-left btn-icon" id="apply-scales" data-dismiss="modal">

						<span class="btn-label"><i class="ti-check"></i></span>Xác nhận</button>

					<button class="btn btn-sm btn-rounded btn-gradient-peach btn-labeled btn-labeled-left btn-icon" data-dismiss="modal" id="quit-scales">

						<span class="btn-label"><i class="ti-close"></i></span>Đóng</button>

				</div>

            </div>

        </div>

    </div>

</div>

-->



<script type="text/javascript">

    $(document).ready(function () {

    	var _columns	= ["IO", "TruckNo", "BillOfLadingORBookingNo", "VINNo", "CargoType", "EirNo", "StockRef", "Sequence"],

    		_ordEirColumn = ["STT", "rowguid", "VoyageKey", "EirNo", "PinCode", "ClassID", "BillOfLadingORBookingNo", "BillOfLading", "BookingNo", "VINNo", "ordPos", "IssueDate", "ExpDate", "CarTypeID", "BrandID", "CarWeight", "JobModeID", "MethodID", "Remark", "IsLocalForeign", "ETB", "ETD", "POD", "FPOD", "TransitID", "ShipperName", "InboundVoyage", "OutboundVoyage", "VesselName", "Block", "Bay", "Row", "Tier", "Area", "CusTypeID", "CusID", "PaymentTypeID", "InvNo", "InvDraftNo", "KeyNo","Sequence", "UnitID", "POL", "POD", "FPOD"],

    		//_scalesColumns = ["STT", "1", "TruckNo", "TimeIn", "WeightIn", "TimeOut", "WeightOut"],

    		tbl 		= $("#contenttable"),

    		tblORDEir 	= $("#tblORDEir"),

    		//tblScales   = $("#tblScales"),

    		gateData,

    		yardData,

    		stockBulkData,

    		stockInBulkData,

    		stockOutBulkData,

    		quayBulkData,

    		stockOutData,

    		//scalesData,

    		gateList 	= [],

    		chooseGateModal = $("#choose-gate-modal"),

    		//scalesModal 	= $("#scales-modal"),

			ordEirModal  	= $("#ord-eir-modal");



    	$("#inputForm").hide();



    	<?php if(isset($gateList) && count($gateList) >= 0){?>

			gateList = <?= json_encode($gateList);?>;

		<?php } ?>



		tbl.newDataTable({

			scrollY: '70.30vh',

			columnDefs: [	

				{ className: "text-center", targets: _columns.getIndexs(["IO", "VINNo", "TruckNo", "BillOfLadingORBookingNo", "Sequence"]) },

				{ className: "hiden-input", targets: _columns.getIndexs(["CargoType", "EirNo"])},

			],

			order: [[ _columns.indexOf('VINNo'), 'asc' ]],

			paging: false,

            keys:true,

            autoFill: {

                focus: 'focus'

            },

            select: {

            	style: 'single',

            	info: false,

            },

            buttons: [],

            //searching: false,

            paging: false,

            info: false,

            rowReorder: false,

            arrayColumns: _columns,            

		});

        tbl.editableTableWidget({editor: $("#status, #httt, #editor-input")});

  		$($.fn.dataTable.tables(true)).DataTable().columns.adjust();



        /* Initial tblORDEir */

		tblORDEir.newDataTable({

			scrollY: '20vh',

			columnDefs: [

				{ type: "num", className: "text-center", targets: _ordEirColumn.getIndexs(["STT", "Bay", "Row", "Tier"])},		

				{ className: "text-center", targets: _ordEirColumn.getIndexs(["EirNo", "PinCode", "ClassID", "IsLocalForeign", "BillOfLadingORBookingNo", "VINNo", "ordPos", "IssueDate", "ExpDate", "CarTypeID", "BrandID", "CarWeight", "Remark", "JobModeID", "MethodID", "ETB", "ETD", "POD", "FPOD", "VesselName", "Area", "CusTypeID", "CusID", "PaymentTypeID", "InvNo", "InvDraftNo", "KeyNo", "Sequence", "ShipperName", "InboundVoyage", "OutboundVoyage"]) },

				{ className: "hiden-input", targets: _ordEirColumn.getIndexs(["rowguid", "VoyageKey", "BillOfLading", "BookingNo", "Block", "Bay", "Row", "Tier", "UnitID", "POL", "POD", "FPOD"])},

			],

			order: [[ _ordEirColumn.indexOf('STT'), 'asc' ]],

			paging: false,

            keys:true,

            autoFill: {

                focus: 'focus'

            },

            select: {

            	style: 'single',

            	info: false,

            },

            buttons: [],

            searching: false,

            paging: false,

            info: false,

            rowReorder: false,

            arrayColumns: _ordEirColumn,            

		});



		/* Initial tblORDEir */

		/*

		tblScales.newDataTable({

			scrollY: '47vh',

			columnDefs: [

				{ type: "num", className: "text-center", targets: _scalesColumns.getIndexs(["STT"])},		

				{ className: "text-center", targets: _scalesColumns.getIndexs(["1", "TruckNo", "TimeIn", "WeightIn", "TimeOut", "WeightOut"]) },

			],

			order: [[ _scalesColumns.indexOf('STT'), 'asc' ]],

			paging: false,

            keys:true,

            autoFill: {

                focus: 'focus'

            },

            select: {

            	style: 'single',

            	info: false,

            },

            buttons: [],

            searching: true,

            paging: false,

            info: false,

            rowReorder: false,

            arrayColumns: _scalesColumns,            

		});

		*/



		// Adjust column in table when show modal

		ordEirModal.on('shown.bs.modal', function(e){

			$($.fn.dataTable.tables(true)).DataTable().columns.adjust();

		});



        $("#chooseGate").on('click', function(){

        	chooseGateModal.modal('show');

        });



        $("#chooseGate1, #chooseGate2, #chooseGate3, #chooseGate4").on('click', function(){

        	$("#chooseGate").html($("#" + this.id).text());

        	chooseGateModal.modal('hide');

        	$("#inputForm").trigger('reset');

    		$("#inputForm").show();



    		tbl.dataTable().fnClearTable();

   			tbl.waitingLoad();



   			var checkStatus = '';

    		if ($("#" + this.id).text().substring(0, 2) == 'IN'){

    			checkStatus = 'S';

    			$('#inputForm input').removeAttr('readonly')

    		}

    		else{

    			if ($("#" + this.id).text().substring(0, 3) == 'OUT'){

    				checkStatus = 'O';

    				$('#inputForm input').attr('readonly', 'readonly');

    			}

    		}

    		

    		/* Load gate list with table stock for RORO */

    		var formData = {

    			'action': 'view',

    			'child_action': 'loadGateList',

    		};



    		$.ajax({

				url: "<?=site_url(md5('gate'));?>",

				dataType: 'json',

				data: formData,

				type: 'POST',

				success: function (data) {

					tbl.dataTable().fnClearTable();



					if (data.gateListWithStock.length > 0){

						var dataList = data.gateListWithStock,

							rows = [];

						for(k = 0; k < dataList.length; k++){

							var r = [] , rData = dataList[k];

							if (rData['VMStatus'] == checkStatus){

                                $.each(_columns, function(idx, colname){

									var val = "";

                                    switch(colname){

                                    	case "IO":

                                    		if (rData['JobModeID'] == 'HBAI'){

                                    			val = 'I';

                                    		}

                                    		else{

                                    			if (rData['JobModeID'] == 'LAYN'){

                                    				val = 'O';

                                    			}

                                    		}

                                    		break;

                                    	case "BillOfLadingORBookingNo":

			                            	if (rData['BillOfLading']){

			                            		val = rData['BillOfLading'];

			                            	}

			                            	else if (rData['BookingNo']){	

			                            		val = rData['BookingNo'];

			                            	}

                                    		break;

                                    	case "CargoType":

                                    		val = 'R';

                                    		break;

                                    	default:

                                    		val = rData[colname];

                                    		break;

                                    };

                                    r.push(val);

                                });

                                rows.push(r);

							}

						}



                        if(rows.length > 0){

                            tbl.dataTable().fnAddData(rows);

                        }

					}



					/* Gate Bulk */

					if ((data.gateListWithBulk.length > 0) && ($("#chooseGate").text().substring(0, 3) == 'OUT')){

						var dataList = data.gateListWithBulk,

							rows = [];

						for(k = 0; k < dataList.length; k++){

							var r = [] , rData = dataList[k];

	                        

							$.each(_columns, function(idx, colname){

								var val = "";

	                            switch(colname){

	                            	case "IO":

	                            		if (rData['JobModeID'] == 'XGT'){

	                            			val = 'O';

	                            		}

	                            		break;

	                            	case "BillOfLadingORBookingNo":

	                            		if (rData['BillOfLading']){

	                            			val = rData['BillOfLading'];

	                            		}

	                            		else{

	                            			if (rData['BookingNo']){

	                            				val = rData['BookingNo'];

	                            			}

	                            		}

	                            		break;

	                            	case "CargoType":

                                    		val = 'B';

                                    		break;

	                            	default:

	                            		val = rData[colname];

	                            		break;

	                            };

	                            r.push(val);

	                        });

	                        rows.push(r);

						}



	                    if(rows.length > 0){

	                        tbl.dataTable().fnAddData(rows);

	                    }

					}



					if ((data.gateBulkListWithBL.length > 0) && ($("#chooseGate").text().substring(0, 3) == 'OUT')){

						var dataList = data.gateBulkListWithBL,

							rows = [];

						for(k = 0; k < dataList.length; k++){



							var r = [] , rData = dataList[k];

	                        

	                        if (!(rData['FinishDate'])){

								$.each(_columns, function(idx, colname){

									var val = "";

		                            switch(colname){

		                            	case "IO":

		                            		if (rData['JobModeID'] == 'LAYN'){

		                            			val = 'O';

		                            		}

		                            		break;

		                            	case "BillOfLadingORBookingNo":

		                            		if (rData['BillOfLading']){

		                            			val = rData['BillOfLading'];

		                            		}

		                            		else{

		                            			if (rData['BookingNo']){

		                            				val = rData['BookingNo'];

		                            			}

		                            		}

		                            		break;

		                            	case "CargoType":

	                                    		val = 'B';

	                                    		break;

		                            	default:

		                            		val = rData[colname];

		                            		break;

		                            };

		                            r.push(val);

		                        });

	                        	rows.push(r);

	                        }

						}



	                    if(rows.length > 0){

	                        tbl.dataTable().fnAddData(rows);

	                    }

					}

				},

				error: function(err){

					console.log(err);

				}

			});

        });



        $("#PINCodeOREirNo").on('keydown', function(e){

          	if (e.which == 13){

        		e.preventDefault();

        		if (this.value == ''){

	        		toastr['warning']("Vui lòng nhập giá trị Số PIN/ Số lệnh cần tìm!");

        		}



        		var formData = {

        			'action': 'view',

        			'child_action': 'getDataByPinCodeOrEirNo',

        			'PINCodeOREirNo': this.value,

        		};

 

        		$.ajax({

					url: "<?=site_url(md5('gate'));?>",

					dataType: 'json',

					data: formData,

					type: 'POST',

					success: function (data) {					

						if (formData.PINCodeOREirNo.substring(0,1) == 'R'){

							if (data.eirList.length > 0){

								var rows = [];



								for (i = 0; i < data.eirList.length; i++){                     

	                            	var rData = data.eirList[i], r = [];

	                                

	                                $.each(_ordEirColumn, function(idx, colname){

	                                    var val = "";

	                                    switch(colname){

	                                        case "STT": 

	                                            val = i + 1; 

	                                           break;

	                                        case "BillOfLadingORBookingNo":

	                                        	if (rData['BillOfLading']){

	                                        		val = rData['BillOfLading'];

	                                        	}

	                                        	else{

	                                        		val = rData['BookingNo'];

	                                        	}

	                                        	break;                                      

		 	  								case "IssueDate":

		 	  								case "ExpDate":

		 	  								case "ETB":

		 	  								case "ETD":

		 	  									val = getDateTime(rData[colname]);

		 	  									break;

		 	  								/*

	                                        case "ClassID":

		                                        if (rData[colname] == 1)

													val='<input class="hiden-input" value="1">' + "Nhập";

												else

													val='<input class="hiden-input" value="2">' + "Xuất";

												break;

											*/

	                                        case "ordPos":

												if (rData['Block'] && rData['Bay'] && rData['Row'] && rData['Tier']){

													val = rData['Block'] + '-';

												

													if (parseInt(rData['Bay']) < 10){

														val += '0';

													}

													val += parseInt(rData['Bay']) + '-';



													if (parseInt(rData['Row']) < 10){

														val += '0';

													}

													val += parseInt(rData['Row']);



													if (rData['Tier'] != 1){

														val += ('-' + rData['Tier']);

													}

												}

												else{

													val = '';

												}

												break;

											case "UnitID":

											case "POL":

											case "POD":

											case "FPOD":

												val = '';

												break;

	                                        default:

	                                        	val = '';

	                                            if (rData[colname] != ''){

	                                                val = rData[colname]; 

	                                            }

	                                            break;  

	                                    }

	                                    r.push(val);

	                                });

	                                rows.push(r);

	                            }



	                            tblORDEir.dataTable().fnClearTable();

	                            if(rows.length > 0){

	                                tblORDEir.dataTable().fnAddData(rows);

	                                ordEirModal.modal('show');

	                            }

							}



							return;

						}



						if (formData.PINCodeOREirNo.substring(0,1) == 'B'){

							if (data.bulkList.length > 0){

								var rows = [];             

								for (i = 0; i < data.bulkList.length; i++){   

									if (!(data.bulkList[i]['FinishDate'])){

										var rData = data.bulkList[i], r = [];



		                                $.each(_ordEirColumn, function(idx, colname){

		                                    var val = "";

		                                    switch(colname){

		                                        case "STT": 

		                                            val = i + 1; 

		                                           break;

		                                        case "BillOfLadingORBookingNo":

		                                        	if (rData['BillOfLading']){

		                                        		val = rData['BillOfLading'];

		                                        	}

		                                        	else{

		                                        		val = rData['BookingNo'];

		                                        	}

		                                        	break;	                                        

			 	  								case "IssueDate":

			 	  								case "ExpDate":

			 	  								case "ETB":

			 	  								case "ETD":

			 	  									val = getDateTime(rData[colname]);

			 	  									break;	

			 	  								case "CarWeight":

			 	  									val = rData['CargoWeight'];

			 	  									break;

			 	  								case "Block":

			 	  								case "Bay":

			 	  								case "Row":

			 	  								case "Tier":

			 	  								case "Area":	 	  								

			 	  								case "BrandID":	 	  								

			 	  								case "CarTypeID":	 	  								

												case "VINNo":		 	  									

		                                        case "ordPos":

		                                       	case "Remark":	

		                                       	case "KeyNo":									

		                                       	case "Sequence":									

													val = '';

													break;											

		                                        default:

		                                        	val = '';

		                                            if (rData[colname] != ''){

		                                                val = rData[colname]; 

		                                            }

		                                            break;  

		                                    }

		                                    r.push(val);

		                                });

		                                rows.push(r);

									}	                            	

	                            }



	                            tblORDEir.dataTable().fnClearTable();

	                            if(rows.length > 0){

	                                tblORDEir.dataTable().fnAddData(rows);

	                                ordEirModal.modal('show');

	                            }

							}

							else{

								toastr['warning']("Không tìm thấy lệnh!");

								return;	

							}

						}	

					},

					error: function(err){

						console.log(err);

					}

				});

        	}

        });



        $("#VINNo").on('keydown', function(e){

          	if (e.which == 13){

          		$("#inputForm").blockUI();



        		e.preventDefault();



        		if (this.value == ''){

	        		toastr['warning']("Vui lòng nhập giá trị Số PINCODE cần tìm!");

        		}



        		var formData = {

        			'action': 'view',

        			'child_action': 'getDataByVINNo',

        			'VINNo': this.value,

        		};



        		$.ajax({

					url: "<?=site_url(md5('gate'));?>",

					dataType: 'json',

					data: formData,

					type: 'POST',

					success: function (data) {

						$("#inputForm").unblock();

						if (data.list.length > 0){

							var rData = data.list[0],

				       			rowguid 		= rData['rowguid'],

				       			PinCode 		= rData['PinCode'],

				       			EirNo 			= rData['EirNo'],

				       			VoyageKey 		= rData['VoyageKey'],

				       			BrandID 		= rData['BrandID'],

				       			ClassID 		= rData['ClassID'],

				       			IsLocalForeign 	= rData['IsLocalForeign'],

				       			CarTypeID 		= rData['CarTypeID'],

				       			IssueDate 		= rData['IssueDate'],

				       			ExpDate 		= rData['ExpDate'],

				       			BillOfLading 	= rData['BillOfLading'],

				       			BookingNo 		= rData['BookingNo'],

				       			VINNo 			= rData['VINNo'],

				       			JobModeID		= rData['JobModeID'],

				       			MethodID 		= rData['MethodID'],

				       			ETB 			= rData['ETB'],

				       			ETD 			= rData['ETD'],

				       			POD 			= rData['POD'],

				       			FPOD 			= rData['FPOD'],

				       			Block 			= rData['Block'],

				       			Bay 			= rData['Bay'],

				       			Row 			= rData['Row'],

				       			Tier 			= rData['Tier'],

				       			Area 			= rData['Area'],

				       			TransitID		= rData['TransitID'],

				       			ShipperName		= rData['ShipperName'],

				       			InboundVoyage	= rData['InboundVoyage'],

				       			OutboundVoyage	= rData['OutboundVoyage'],

				       			VesselName		= rData['VesselName'],

				       			CusTypeID		= rData['CusTypeID'],

				       			CusID 			= rData['CusID'],

				       			EirNo 			= rData['EirNo'],

				       			PinCode 		= rData['PinCode'],

				       			PaymentTypeID 	= rData['PaymentTypeID'],

				       			InvNo 			= rData['InvNo'],

				       			InvDraftNo 		= rData['InvDraftNo'],

				       			KeyNo 			= rData['KeyNo'] ? rData['KeyNo'] : 0,

				       			Sequence 		= rData['Sequence'],

				       			CarWeight 		= rData['CarWeight'],

				       			InOut;



				       		/* Get position */

				       		if (rData['Block'] && rData['Bay'] && rData['Row'] && rData['Tier']){

								ordPos = rData['Block'] + '-';

							

								if (parseInt(rData['Bay']) < 10){

									ordPos += '0';

								}

								ordPos += parseInt(rData['Bay']) + '-';



								if (parseInt(rData['Row']) < 10){

									ordPos += '0';

								}

								ordPos += parseInt(rData['Row']);



								if (rData['Tier'] != 1){

									ordPos += ('-' + rData['Tier']);

								}

							}

							else{

								ordPos = '';

							}





				       		for (i = 0; i < gateList.length; i++){

				       			if (gateList[i]['GateID'] == $("#chooseGate").html()){

				       				InOut = gateList[i]['InOut'];

				       				i = gateList.length;

				       			}

				       		}

				       		

				       		$("#PINCodeOREirNo").val(EirNo);

				       		$("#BrandID").val(BrandID);

				       		$("#CarTypeID").val(CarTypeID);

				       		$("#IssueDate").val(IssueDate);

				       		$("#ExpDate").val(ExpDate);

				       		$("#ordPos").val(ordPos);

				       		$("#VINNo").val(VINNo);

				       		$("#JobModeID").val(JobModeID);

				       		$("#MethodID").val(MethodID);

				       		$("#CarWeight").val(CarWeight);

				       		$("#ETB").val(ETB);

				       		$("#ETD").val(ETD);

				       		$("#TransitID").val(TransitID);

				       		$("#ShipperName").val(ShipperName);

				       		$("#VesselName").val(VesselName);

				       		$("#PODandFPOD").val(POD + "/" + FPOD);

				       		$("#InOutBoundVoyage").val(InboundVoyage + "/" + OutboundVoyage);



				       		if (BillOfLading){

				       			$("#BillOfLadingORBookingNo").val(BillOfLading);

				       		}

				       		else{

				       			$("#BillOfLadingORBookingNo").val(BookingNo);

				       		}



				       		gateData = [{

				       			'StockRef': rowguid,

				       			'VoyageKey': VoyageKey,

				       			'GateInID': $("#chooseGate").html(),

				       			'InOut': InOut,

				       			'ClassID':   ClassID,

				       			'TransitID': TransitID,

				       			'CusTypeID': CusTypeID, 

				       			'CusID': CusID,

				       			'EirNo': EirNo,

				       			'InvDraftNo': InvDraftNo,

				       			'InvNo': InvNo,

				       			'PaymentTypeID': PaymentTypeID,

				       			'BillOfLading': BillOfLading ? BillOfLading : '',

				       			'BookingNo': BookingNo ? BookingNo : '',

				       			'VINNo': VINNo,

				       			'KeyNo': KeyNo,

				       			'JobTypeID': 'GO',

				       			'JobModeID': JobModeID,

				       			'MethodID': MethodID,

				       			'Sequence': '',

				       			'CarWeight': CarWeight,

				       			'Block': Block,

				       			'Bay': Bay,

				       			'Row': Row,

				       			'Tier': Tier,

				       			'Area': Area,

				       			'Remark': $("#Remark").text(),

				       			'TruckNo': '',

				       			'CargoType': 'R',

				       		}];



				       		yardData = [{

				       			'StockRef': rowguid,

				       			'VoyageKey': VoyageKey,

				       			'IsLocalForeign': IsLocalForeign,

				       			'ClassID':   ClassID,

				       			'TransitID': TransitID,

				       			'BillOfLading': BillOfLading ? BillOfLading : '',

				       			'BookingNo': BookingNo ? BookingNo : '',

				       			'VINNo': VINNo,

				       			'KeyNo': KeyNo,

				       			'CarWeight': CarWeight,

				       			'JobTypeID': 'GO',

				       			'JobStatus': 'KT',

				       			'StartDate': getDateTimeFormatString(new Date()),

				       			'FinishDate': '',

				       			'JobModeID': JobModeID,

				       			'MethodID': MethodID,

				       			'EirNo': EirNo,

				       			'PinCode': PinCode,

				       			'PaymentTypeID': PaymentTypeID,

				       			'Sequence': Sequence,

				       			'OldBlock': '',

				       			'OldBay': '',

				       			'OldRow': '',

				       			'OldTier': '',

				       			'OldArea': '',

				       			'Block': Block,

				       			'Bay': Bay,

				       			'Row': Row,

				       			'Tier': Tier,

				       			'Area': Area,

				       			'WorkGroupID': '',

				       			'Remark': $("#Remark").text(),

				       			'CargoType': 'R',

				       		}];

						}

						else{

							toastr['warning']("Không tìm thấy lệnh theo với Số PINCODE: " + $("#VINNo").val() + "!");

							return;

						}	

					},

					error: function(err){

						$("#inputForm").unblock();

						console.log(err);

					}

				});

        	}

        });

			

        $(document).on("click", "#contenttable tbody tr",  function(){

        	if ($("#chooseGate").text().substring(0, 3) == 'OUT'){

        		if (tbl.getDataByColumns(_columns).length == 0){

        			return;

        		}



        		$("#inputForm").blockUI();

	        	

    			var tblData 	= tbl.getSelectedRows().data().toArray(),

    				VINNo 		= tblData[0][_columns.indexOf('VINNo')],

    				EirNo 		= tblData[0][_columns.indexOf('EirNo')],

    				StockRef	= tblData[0][_columns.indexOf('StockRef')],

    				Sequence	= tblData[0][_columns.indexOf('Sequence')],

    				TruckNo = tblData[0][_columns.indexOf('TruckNo')],

    				CargoType	= tblData[0][_columns.indexOf('CargoType')];



    			$("#EirNo").val(EirNo);



	        	/* RORO */

    			if (CargoType == 'R'){

    				var formData = {

		    			'action': 'view',

		    			'child_action': 'getDataByVINNo',

		    			'VINNo': VINNo,

		    		};



		    		$.ajax({

						url: "<?=site_url(md5('gate'));?>",

						dataType: 'json',

						data: formData,

						type: 'POST',

						success: function (data) {

							$("#inputForm").unblock();

							if (data.list.length > 0){

								var rData = data.list[0],

					       			rowguid 		= rData['rowguid'],

					       			PinCode 		= rData['PinCode'],

					       			EirNo 			= rData['EirNo'],

					       			VoyageKey 		= rData['VoyageKey'],

					       			BrandID 		= rData['BrandID'],

					       			ClassID 		= rData['ClassID'],

					       			IsLocalForeign 	= rData['IsLocalForeign'],

					       			CarTypeID 		= rData['CarTypeID'],

					       			IssueDate 		= rData['IssueDate'],

					       			ExpDate 		= rData['ExpDate'],

					       			BillOfLading 	= rData['BillOfLading'],

					       			BookingNo 		= rData['BookingNo'],

					       			VINNo 			= rData['VINNo'],

					       			JobModeID		= rData['JobModeID'],

					       			MethodID 		= rData['MethodID'],

					       			ETB 			= rData['ETB'],

					       			ETD 			= rData['ETD'],

					       			POD 			= rData['POD'],

					       			FPOD 			= rData['FPOD'],

					       			Block 			= rData['Block'],

					       			Bay 			= rData['Bay'],

					       			Row 			= rData['Row'],

					       			Tier 			= rData['Tier'],

					       			Area 			= rData['Area'],

					       			TransitID		= rData['TransitID'],

					       			ShipperName		= rData['ShipperName'],

					       			InboundVoyage	= rData['InboundVoyage'],

					       			OutboundVoyage	= rData['OutboundVoyage'],

					       			VesselName		= rData['VesselName'],

					       			CusTypeID		= rData['CusTypeID'],

					       			CusID 			= rData['CusID'],

					       			EirNo 			= rData['EirNo'],

					       			PinCode 		= rData['PinCode'],

					       			PaymentTypeID 	= rData['PaymentTypeID'],

					       			InvNo 			= rData['InvNo'],

					       			InvDraftNo 		= rData['InvDraftNo'],

					       			KeyNo 			= rData['KeyNo'] ? rData['KeyNo'] : 0,

					       			Sequence 		= rData['Sequence'],

					       			CarWeight 		= rData['CarWeight'],

					       			TruckNo	= rData['TruckNo'],

					       			Remark			= rData['Remark'],

					       			InOut;



					       		/* Get position */

					       		if (rData['Block'] && rData['Bay'] && rData['Row'] && rData['Tier']){

									ordPos = rData['Block'] + '-';

								

									if (parseInt(rData['Bay']) < 10){

										ordPos += '0';

									}

									ordPos += parseInt(rData['Bay']) + '-';



									if (parseInt(rData['Row']) < 10){

										ordPos += '0';

									}

									ordPos += parseInt(rData['Row']);



									if (rData['Tier'] != 1){

										ordPos += ('-' + rData['Tier']);

									}

								}

								else{

									ordPos = '';

								}





					       		for (i = 0; i < gateList.length; i++){

					       			if (gateList[i]['GateInID'] == $("#chooseGate").html()){

					       				InOut = gateList[i]['InOut'];

					       				i = gateList.length;

					       			}

					       		}



					       		if (JobModeID =='LAYN'){

					       			$("#Remark").val(Remark);

					       		}

					       		

					       		$("#PINCodeOREirNo").val(EirNo);

					       		$("#BrandID").val(BrandID);

					       		$("#CarTypeID").val(CarTypeID);

					       		$("#IssueDate").val(IssueDate);

					       		$("#ExpDate").val(ExpDate);

					       		$("#ordPos").val(ordPos);

					       		$("#VINNo").val(VINNo);

					       		$("#JobModeID").val(JobModeID);

					       		$("#MethodID").val(MethodID);

					       		$("#CarWeight").val(CarWeight);

					       		$("#ETB").val(ETB);

					       		$("#ETD").val(ETD);

					       		$("#TransitID").val(TransitID);

					       		$("#ShipperName").val(ShipperName);

					       		$("#VesselName").val(VesselName);

					       		$("#PODandFPOD").val(POD + "/" + FPOD);

					       		$("#ClassID").val(ClassID);

					       		$("#StockRef").val(StockRef);



					       		var InOutBoundVoyage = '';

					       		if (InboundVoyage){

					       			InOutBoundVoyage += InboundVoyage

					       		}

					       		if (OutboundVoyage){

					       			InOutBoundVoyage += ("/" + OutboundVoyage);

					       		}

					       		$("#InOutBoundVoyage").val(InOutBoundVoyage);



					       		$("#TruckNo").val(TruckNo);



					       		if (BillOfLading){

					       			$("#BillOfLadingORBookingNo").val(BillOfLading);

					       		}

					       		else{

					       			$("#BillOfLadingORBookingNo").val(BookingNo);

					       		}

					       	}

					    },

						error: function(err){

							$("#inputForm").unblock();

							console.log(err);

						}

					});

    			}

    			else if (CargoType == 'B'){ /* BULK */

    				var formData = {

		    			'action': 'view',

		    			'child_action': 'loadEirBulkByEirNo',

		    			'EirNo': EirNo,

		    		};



		       		$("#TruckNo").val(TruckNo);

		       		$("#Sequence").val(Sequence);



		    		$.ajax({

						url: "<?=site_url(md5('gate'));?>",

						dataType: 'json',

						data: formData,

						type: 'POST',

						success: function (data) {

							$("#inputForm").unblock();

							if (data.list.length > 0){

								var rData = data.list[0],

					       			rowguid 		= rData['rowguid'],

					       			PinCode 		= rData['PinCode'],

					       			EirNo 			= rData['EirNo'],

					       			VoyageKey 		= rData['VoyageKey'],					       		

					       			ClassID 		= rData['ClassID'],

					       			IsLocalForeign 	= rData['IsLocalForeign'],					       			

					       			IssueDate 		= rData['IssueDate'],

					       			ExpDate 		= rData['ExpDate'],

					       			BillOfLading 	= rData['BillOfLading'],

					       			BookingNo 		= rData['BookingNo'],					       			

					       			JobModeID		= rData['JobModeID'],

					       			MethodID 		= rData['MethodID'],

					       			ETB 			= rData['ETB'],

					       			ETD 			= rData['ETD'],

					       			POD 			= rData['POD'],

					       			FPOD 			= rData['FPOD'],					       			

					       			Area 			= rData['Area'],

					       			TransitID		= rData['TransitID'],

					       			ShipperName		= rData['ShipperName'],

					       			InboundVoyage	= rData['InboundVoyage'],

					       			OutboundVoyage	= rData['OutboundVoyage'],

					       			VesselName		= rData['VesselName'],

					       			CusTypeID		= rData['CusTypeID'],

					       			CusID 			= rData['CusID'],

					       			EirNo 			= rData['EirNo'],

					       			PinCode 		= rData['PinCode'],

					       			PaymentTypeID 	= rData['PaymentTypeID'],

					       			InvNo 			= rData['InvNo'],

					       			InvDraftNo 		= rData['InvDraftNo'],

					       			KeyNo 			= rData['KeyNo'] ? rData['KeyNo'] : 0,

					       			Sequence 		= rData['Sequence'],

					       			CargoWeight 	= rData['CargoWeight'],

					       			TruckNo		= rData['TruckNo'],

					       			Remark			= rData['Remark'],

					       			UnitID			= rData['UnitID'],

					       			InOut;



					       		/* Get position */

					       		if (rData['Block'] && rData['Bay'] && rData['Row'] && rData['Tier']){

									ordPos = rData['Block'] + '-';

								

									if (parseInt(rData['Bay']) < 10){

										ordPos += '0';

									}

									ordPos += parseInt(rData['Bay']) + '-';



									if (parseInt(rData['Row']) < 10){

										ordPos += '0';

									}

									ordPos += parseInt(rData['Row']);



									if (rData['Tier'] != 1){

										ordPos += ('-' + rData['Tier']);

									}

								}

								else{

									ordPos = '';

								}





					       		for (i = 0; i < gateList.length; i++){

					       			if (gateList[i]['GateInID'] == $("#chooseGate").html()){

					       				InOut = gateList[i]['InOut'];

					       				i = gateList.length;

					       			}

					       		}



					       		if (JobModeID =='LAYN'){

					       			$("#Remark").val(Remark);

					       		}

					       		

					       		$("#PINCodeOREirNo").val(EirNo);

					       		$("#IssueDate").val(IssueDate);

					       		$("#ExpDate").val(ExpDate);

					       		$("#ordPos").val(ordPos);

					       		$("#VINNo").val(VINNo);

					       		$("#JobModeID").val(JobModeID);

					       		$("#MethodID").val(MethodID);

					       		$("#CarWeight").val(CargoWeight);

					       		$("#ETB").val(ETB);

					       		$("#ETD").val(ETD);

					       		$("#TransitID").val(TransitID);

					       		$("#ShipperName").val(ShipperName);

					       		$("#VesselName").val(VesselName);

					       		$("#ClassID").val(ClassID);

					       		

					       		var InOutBoundVoyage = '';

					       		if (InboundVoyage){

					       			InOutBoundVoyage += InboundVoyage

					       		}

					       		if (OutboundVoyage){

					       			InOutBoundVoyage += ("/" + OutboundVoyage);

					       		}

					       		$("#InOutBoundVoyage").val(InOutBoundVoyage);



					       		if (BillOfLading){

					       			$("#BillOfLadingORBookingNo").val(BillOfLading);

					       		}

					       		else{

					       			$("#BillOfLadingORBookingNo").val(BookingNo);

					       		}



					       		stockOutData = [{

					       			'StockRef': rowguid,

									'EirNo':   	EirNo,

									'DateOut': 	'',

									'UnitID': 	UnitID,

									'Sequence': '',

									'RemainCargoWeight': '',

								}];



								stockOutBulkData = [{

									'StockRef': rowguid,

									'EirNo': EirNo,

									'Sequence': '',

									'TruckNo': $("#TruckNo").val(),

									'DateOut': '',

									'UnitID': 'TNE',	           

								}];

					       	}

					    },

						error: function(err){

							$("#inputForm").unblock();

							console.log(err);

						}

					});

    			}	



	        }

		});



        $(document).on("dblclick", "#tblORDEir tbody tr",  function(){

       		var ordEirData 		= tblORDEir.getSelectedRows().data().toArray()[0],

       			rowguid 		= ordEirData[_ordEirColumn.indexOf('rowguid')],

       			VoyageKey 		= ordEirData[_ordEirColumn.indexOf('VoyageKey')],

       			BrandID 		= ordEirData[_ordEirColumn.indexOf('BrandID')],

       			ClassID 		= ordEirData[_ordEirColumn.indexOf('ClassID')],

       			IsLocalForeign 	= ordEirData[_ordEirColumn.indexOf('IsLocalForeign')],

       			CarTypeID 		= ordEirData[_ordEirColumn.indexOf('CarTypeID')],

       			IssueDate 		= ordEirData[_ordEirColumn.indexOf('IssueDate')],

       			ExpDate 		= ordEirData[_ordEirColumn.indexOf('ExpDate')],

       			BillOfLading 	= ordEirData[_ordEirColumn.indexOf('BillOfLading')],

       			BookingNo 		= ordEirData[_ordEirColumn.indexOf('BookingNo')],

       			ordPos 			= ordEirData[_ordEirColumn.indexOf('ordPos')],

       			VINNo 			= ordEirData[_ordEirColumn.indexOf('VINNo')],

       			JobModeID		= ordEirData[_ordEirColumn.indexOf('JobModeID')],

       			MethodID 		= ordEirData[_ordEirColumn.indexOf('MethodID')],

       			ETB 			= ordEirData[_ordEirColumn.indexOf('ETB')],

       			ETD 			= ordEirData[_ordEirColumn.indexOf('ETD')],

       			POD 			= ordEirData[_ordEirColumn.indexOf('POD')],

       			FPOD 			= ordEirData[_ordEirColumn.indexOf('FPOD')],

       			Block 			= ordEirData[_ordEirColumn.indexOf('Block')],

       			Bay 			= ordEirData[_ordEirColumn.indexOf('Bay')],

       			Row 			= ordEirData[_ordEirColumn.indexOf('Row')],

       			Tier 			= ordEirData[_ordEirColumn.indexOf('Tier')],

       			Area 			= ordEirData[_ordEirColumn.indexOf('Area')],

       			TransitID		= ordEirData[_ordEirColumn.indexOf('TransitID')],

       			ShipperName		= ordEirData[_ordEirColumn.indexOf('ShipperName')],

       			InboundVoyage	= ordEirData[_ordEirColumn.indexOf('InboundVoyage')],

       			OutboundVoyage	= ordEirData[_ordEirColumn.indexOf('OutboundVoyage')],

       			VesselName		= ordEirData[_ordEirColumn.indexOf('VesselName')],

       			CusTypeID		= ordEirData[_ordEirColumn.indexOf('CusTypeID')],

       			CusID 			= ordEirData[_ordEirColumn.indexOf('CusID')],

       			EirNo 			= ordEirData[_ordEirColumn.indexOf('EirNo')],

       			PinCode 		= ordEirData[_ordEirColumn.indexOf('PinCode')],

       			PaymentTypeID 	= ordEirData[_ordEirColumn.indexOf('PaymentTypeID')],

       			InvNo 			= ordEirData[_ordEirColumn.indexOf('InvNo')],

       			InvDraftNo 		= ordEirData[_ordEirColumn.indexOf('InvDraftNo')],

       			KeyNo 			= ordEirData[_ordEirColumn.indexOf('KeyNo')] ? ordEirData[_ordEirColumn.indexOf('KeyNo')] : 0,

       			Sequence 		= ordEirData[_ordEirColumn.indexOf('Sequence')],

       			CarWeight 		= ordEirData[_ordEirColumn.indexOf('CarWeight')],

       			POL 			= ordEirData[_ordEirColumn.indexOf('POL')],

       			POD 			= ordEirData[_ordEirColumn.indexOf('POD')],

       			FPOD 			= ordEirData[_ordEirColumn.indexOf('FPOD')],

       			UnitID 			= ordEirData[_ordEirColumn.indexOf('UnitID')],

       			currentDate 	= getDateTimeFormatString(new Date()),

       			InOut;



       		for (i = 0; i < gateList.length; i++){

       			if (gateList[i]['GateID'] == $("#chooseGate").html()){

       				InOut = gateList[i]['InOut'];

       				i = gateList.length;

       			}

       		}



       		$("#StockRef").val(rowguid);

       		$("#ClassID").val(ClassID);

       		$("#BrandID").val(BrandID);

       		$("#CarTypeID").val(CarTypeID);

       		$("#IssueDate").val(IssueDate);

       		$("#ExpDate").val(ExpDate);

       		$("#ordPos").val(ordPos);

       		$("#VINNo").val(VINNo);

       		$("#JobModeID").val(JobModeID);

       		$("#MethodID").val(MethodID);

       		$("#CarWeight").val(CarWeight);

       		$("#ETB").val(ETB);

       		$("#ETD").val(ETD);

       		$("#TransitID").val(TransitID);

       		$("#ShipperName").val(ShipperName);

       		$("#VesselName").val(VesselName);

       		$("#EirNo").val(EirNo);

       		$("#PinCode").val(PinCode);



       		var PODandFPOD = '';

       		if (POD){

       			PODandFPOD += POD;

       		}

       		if (FPOD){

       			PODandFPOD += ("/" + FPOD);

       		}

       		$("#PODandFPOD").val(PODandFPOD);



       		$("#InOutBoundVoyage").val(InboundVoyage + "/" + OutboundVoyage);

       		$("#Sequence").val(Sequence);



       		if (BillOfLading){

       			$("#BillOfLadingORBookingNo").val(BillOfLading);

       		}

       		else{

       			$("#BillOfLadingORBookingNo").val(BookingNo);

       		}



       		gateData = [{

       			'StockRef': rowguid,

       			'VoyageKey': VoyageKey,

       			'GateInID': $("#chooseGate").html(),

       			'InOut': InOut,

       			'ClassID':   ClassID,

       			'TransitID': TransitID,

       			'CusTypeID': CusTypeID, 

       			'CusID': CusID,

       			'EirNo': EirNo,

       			'InvDraftNo': InvDraftNo,

       			'InvNo': InvNo,

       			'PaymentTypeID': PaymentTypeID,

       			'BillOfLading': BillOfLading ? BillOfLading : '',

       			'BookingNo': BookingNo ? BookingNo : '',

       			'VINNo': VINNo,

       			'KeyNo': KeyNo,

       			'JobTypeID': 'GO',

       			'JobModeID': JobModeID,

       			'MethodID': MethodID,

       			'Sequence': 0,

       			'CarWeight': CarWeight,

       			'Block': Block,

       			'Bay': Bay,

       			'Row': Row,

       			'Tier': Tier,

       			'Area': Area,

       			'Remark': $("#Remark").text(),

       			'TruckNo': $("#TruckNo").val(),

       			'StartDate': '',

       		}];



       		yardData = [{

       			'StockRef': rowguid,

       			'VoyageKey': VoyageKey,

       			'IsLocalForeign': IsLocalForeign,

       			'ClassID':   ClassID,

       			'TransitID': TransitID,

       			'BillOfLading': BillOfLading ? BillOfLading : '',

       			'BookingNo': BookingNo ? BookingNo : '',

       			'VINNo': VINNo,

       			'KeyNo': KeyNo,

       			'CarWeight': CarWeight,

       			'JobTypeID': 'GO',

       			'JobStatus': 'KT',

       			'StartDate': '',

       			'FinishDate': '',

       			'JobModeID': JobModeID,

       			'MethodID': MethodID,

       			'EirNo': EirNo,

       			'PinCode': PinCode,

       			'PaymentTypeID': PaymentTypeID,

       			'Sequence': Sequence,

       			'OldBlock': '',

       			'OldBay': '',

       			'OldRow': '',

       			'OldTier': '',

       			'OldArea': '',

       			'Block': Block,

       			'Bay': Bay,

       			'Row': Row,

       			'Tier': Tier,

       			'Area': Area,

       			'WorkGroupID': '',

       			'Remark': $("#Remark").text(),

       			'CargoType': 'R',

       		}];



       		stockBulkData = [{

       			'ClassID':   ClassID,

       			'TransitID': TransitID ? TransitID : '',

       			'VoyageKey': VoyageKey,

       			'BillOfLading': BillOfLading ? BillOfLading : '',

       			'BookingNo': BookingNo ? BookingNo : '',

       			'CargoWeight': CarWeight,

       			'UnitID': UnitID ? UnitID : '',

       			'JobModeInID': JobModeID,

       			'MethodInID': MethodID,

       			'JobModeOutID': '',

       			'MethodOutID': '',

       			'Area': '',

       			'CommodityDescription': '',

       			'CntrNo': '',

       			'IsDifferent': '',

       			'DeclareContent': '',

       			'OldVoyageKey': '',

       			'InvNo': InvNo,

       			'EirNo': EirNo,

       			'OrderNo': '',

       			'PinCode': PinCode,

       			'POL': POL,

       			'POD': POD,

       			'FPOD': FPOD,

       			'Remark': $("#Remark").text(),

       			'CustomsQualified': '',

       		}];



       		stockInBulkData = [{

       			'StockRef': rowguid,

       			'EirNo': EirNo,

       			'DateIn': currentDate,

       			'CargoWeightGetIn': $("#TruckWeight").val(),

       			'UnitID': UnitID ? UnitID : '',

       			'Sequence': 1,

       			'IsFinish': 0,

       		}];



       		quayBulkData = [{

       			'StockRef': rowguid,

       			'VoyageKey': VoyageKey,

       			'ClassID': ClassID,

       			'IsLocalForeign': IsLocalForeign,

       			'BillOfLading': BillOfLading ? BillOfLading : '',

       			'BookingNo': BookingNo ? BookingNo : '',

       			'VINNo': '',

       			'EirNo': EirNo,

       			'TransitID': TransitID ? TransitID : '',

       			'CarWeight': $("#TruckWeight").val(),

       			'JobTypeID': 'LD',

       			'JobStatus': 'KT',

       			'StartDate': currentDate,

       			'FinishDate': '',

       			'JobModeInID': JobModeID,

       			'MethodInID': MethodID,

       			'JobModeOutID': '',

       			'MethodOutID': '',

       			'KeyCheck': 0,

       			'Sequence': '',

       			'Block': '',

       			'Bay': '',

       			'Row': '',

       			'Tier': '',

       			'Area': '',

       			'PaymentTypeID': PaymentTypeID,

       			'BillCheck': 0,

       			'Remark': $("#Remark").text(),

       		}];



       		/*

       		scalesData = [{

	        	'EirNo': EirNo,

	        	'TruckNo': '',

	        	'JobModeID': JobModeID,

	        	'RegisterWeight': '',

	        	'FirstWeightScale': '',

	        	'SecondWeightScale': '',

	        	'Sequence': '',

	        }];

	       */



	       	/*

	       	stockOutBulkData = [{

				'StockRef': rowguid,

				'EirNo': EirNo,

				'TruckNo': $("#TruckNo").val(),

				'DateOut': '',

				'CargoWeightGetOut': '',

				'UnitID': '',	           

				'Sequence': 1, // update later

				'RemainCargoWeight': '',

			}];

			*/



       		ordEirModal.modal('hide');

		});

	

		$("#apply-ord-eir").on('click', function(){

			var ordEirData 		= tblORDEir.getSelectedRows().data().toArray()[0],

       			rowguid 		= ordEirData[_ordEirColumn.indexOf('rowguid')],

       			VoyageKey 		= ordEirData[_ordEirColumn.indexOf('VoyageKey')],

       			BrandID 		= ordEirData[_ordEirColumn.indexOf('BrandID')],

       			ClassID 		= ordEirData[_ordEirColumn.indexOf('ClassID')],

       			IsLocalForeign 	= ordEirData[_ordEirColumn.indexOf('IsLocalForeign')],

       			CarTypeID 		= ordEirData[_ordEirColumn.indexOf('CarTypeID')],

       			IssueDate 		= ordEirData[_ordEirColumn.indexOf('IssueDate')],

       			ExpDate 		= ordEirData[_ordEirColumn.indexOf('ExpDate')],

       			BillOfLading 	= ordEirData[_ordEirColumn.indexOf('BillOfLading')],

       			BookingNo 		= ordEirData[_ordEirColumn.indexOf('BookingNo')],

       			ordPos 			= ordEirData[_ordEirColumn.indexOf('ordPos')],

       			VINNo 			= ordEirData[_ordEirColumn.indexOf('VINNo')],

       			JobModeID		= ordEirData[_ordEirColumn.indexOf('JobModeID')],

       			MethodID 		= ordEirData[_ordEirColumn.indexOf('MethodID')],

       			ETB 			= ordEirData[_ordEirColumn.indexOf('ETB')],

       			ETD 			= ordEirData[_ordEirColumn.indexOf('ETD')],

       			POD 			= ordEirData[_ordEirColumn.indexOf('POD')],

       			FPOD 			= ordEirData[_ordEirColumn.indexOf('FPOD')],

       			Block 			= ordEirData[_ordEirColumn.indexOf('Block')],

       			Bay 			= ordEirData[_ordEirColumn.indexOf('Bay')],

       			Row 			= ordEirData[_ordEirColumn.indexOf('Row')],

       			Tier 			= ordEirData[_ordEirColumn.indexOf('Tier')],

       			Area 			= ordEirData[_ordEirColumn.indexOf('Area')],

       			TransitID		= ordEirData[_ordEirColumn.indexOf('TransitID')],

       			ShipperName		= ordEirData[_ordEirColumn.indexOf('ShipperName')],

       			InboundVoyage	= ordEirData[_ordEirColumn.indexOf('InboundVoyage')],

       			OutboundVoyage	= ordEirData[_ordEirColumn.indexOf('OutboundVoyage')],

       			VesselName		= ordEirData[_ordEirColumn.indexOf('VesselName')],

       			CusTypeID		= ordEirData[_ordEirColumn.indexOf('CusTypeID')],

       			CusID 			= ordEirData[_ordEirColumn.indexOf('CusID')],

       			EirNo 			= ordEirData[_ordEirColumn.indexOf('EirNo')],

       			PinCode 		= ordEirData[_ordEirColumn.indexOf('PinCode')],

       			PaymentTypeID 	= ordEirData[_ordEirColumn.indexOf('PaymentTypeID')],

       			InvNo 			= ordEirData[_ordEirColumn.indexOf('InvNo')],

       			InvDraftNo 		= ordEirData[_ordEirColumn.indexOf('InvDraftNo')],

       			KeyNo 			= ordEirData[_ordEirColumn.indexOf('KeyNo')] ? ordEirData[_ordEirColumn.indexOf('KeyNo')] : 0,

       			Sequence 		= ordEirData[_ordEirColumn.indexOf('Sequence')],

       			CarWeight 		= ordEirData[_ordEirColumn.indexOf('CarWeight')],

       			POL 			= ordEirData[_ordEirColumn.indexOf('POL')],

       			POD 			= ordEirData[_ordEirColumn.indexOf('POD')],

       			FPOD 			= ordEirData[_ordEirColumn.indexOf('FPOD')],

       			UnitID 			= ordEirData[_ordEirColumn.indexOf('UnitID')],

       			currentDate 	= getDateTimeFormatString(new Date()),

       			InOut;



       		for (i = 0; i < gateList.length; i++){

       			if (gateList[i]['GateID'] == $("#chooseGate").html()){

       				InOut = gateList[i]['InOut'];

       				i = gateList.length;

       			}

       		}



       		$("#StockRef").val(rowguid);

       		$("#ClassID").val(ClassID);

       		$("#BrandID").val(BrandID);

       		$("#CarTypeID").val(CarTypeID);

       		$("#IssueDate").val(IssueDate);

       		$("#ExpDate").val(ExpDate);

       		$("#ordPos").val(ordPos);

       		$("#VINNo").val(VINNo);

       		$("#JobModeID").val(JobModeID);

       		$("#MethodID").val(MethodID);

       		$("#CarWeight").val(CarWeight);

       		$("#ETB").val(ETB);

       		$("#ETD").val(ETD);

       		$("#TransitID").val(TransitID);

       		$("#ShipperName").val(ShipperName);

       		$("#VesselName").val(VesselName);

       		$("#PODandFPOD").val(POD + "/" + FPOD);

       		$("#InOutBoundVoyage").val(InboundVoyage + "/" + OutboundVoyage);

       		$("#Sequence").val(Sequence);

			$("#EirNo").val(EirNo);

       		$("#PinCode").val(PinCode);



       		if (BillOfLading){

       			$("#BillOfLadingORBookingNo").val(BillOfLading);

       		}

       		else{

       			$("#BillOfLadingORBookingNo").val(BookingNo);

       		}



       		gateData = [{

       			'StockRef': rowguid,

       			'VoyageKey': VoyageKey,

       			'GateInID': $("#chooseGate").html(),

       			'InOut': InOut,

       			'ClassID':   ClassID,

       			'TransitID': TransitID,

       			'CusTypeID': CusTypeID, 

       			'CusID': CusID,

       			'EirNo': EirNo,

       			'InvDraftNo': InvDraftNo,

       			'InvNo': InvNo,

       			'PaymentTypeID': PaymentTypeID,

       			'BillOfLading': BillOfLading ? BillOfLading : '',

       			'BookingNo': BookingNo ? BookingNo : '',

       			'VINNo': VINNo,

       			'KeyNo': KeyNo,

       			'JobTypeID': 'GO',

       			'JobModeID': JobModeID,

       			'MethodID': MethodID,

       			'Sequence': Sequence,

       			'CarWeight': CarWeight,

       			'Block': Block,

       			'Bay': Bay,

       			'Row': Row,

       			'Tier': Tier,

       			'Area': Area,

       			'Remark': $("#Remark").text(),

       			'TruckNo': $("#TruckNo").val(),

       			'StartDate': '',

       		}];



       		yardData = [{

       			'StockRef': rowguid,

       			'VoyageKey': VoyageKey,

       			'IsLocalForeign': IsLocalForeign,

       			'ClassID':   ClassID,

       			'TransitID': TransitID,

       			'BillOfLading': BillOfLading ? BillOfLading : '',

       			'BookingNo': BookingNo ? BookingNo : '',

       			'VINNo': VINNo,

       			'KeyNo': KeyNo,

       			'CarWeight': CarWeight,

       			'JobTypeID': 'GO',

       			'JobStatus': 'KT',

       			'StartDate': '',

       			'FinishDate': '',

       			'JobModeID': JobModeID,

       			'MethodID': MethodID,

       			'EirNo': EirNo,

       			'PinCode': PinCode,

       			'PaymentTypeID': PaymentTypeID,

       			'Sequence': Sequence,

       			'OldBlock': '',

       			'OldBay': '',

       			'OldRow': '',

       			'OldTier': '',

       			'OldArea': '',

       			'Block': Block,

       			'Bay': Bay,

       			'Row': Row,

       			'Tier': Tier,

       			'Area': Area,

       			'WorkGroupID': '',

       			'Remark': $("#Remark").text(),

	   			'CargoType': 'R',

       		}];



       		stockBulkData = [{

       			'ClassID':   ClassID,

       			'TransitID': TransitID ? TransitID : '',

       			'VoyageKey': VoyageKey,

       			'BillOfLading': BillOfLading ? BillOfLading : '',

       			'BookingNo': BookingNo ? BookingNo : '',

       			'CargoWeight': CarWeight,

       			'UnitID': UnitID ? UnitID : '',

       			'JobModeInID': JobModeID,

       			'MethodInID': MethodID,

       			'JobModeOutID': '',

       			'MethodOutID': '',

       			'Area': '',

       			'CommodityDescription': '',

       			'CntrNo': '',

       			'IsDifferent': '',

       			'DeclareContent': '',

       			'OldVoyageKey': '',

       			'InvNo': InvNo,

       			'EirNo': EirNo,

       			'OrderNo': '',

       			'PinCode': PinCode,

       			'POL': POL,

       			'POD': POD,

       			'FPOD': FPOD,

       			'Remark': $("#Remark").text(),

       			'CustomsQualified': '',

       		}];



       		stockInBulkData = [{

       			'StockRef': rowguid,

       			'EirNo': EirNo,

       			'DateIn': currentDate,

       			'CargoWeightGetIn': $("#TruckWeight").val(),

       			'UnitID': UnitID ? UnitID : '',

       			'Sequence': 1,

       			'IsFinish': 0,

       		}];



       		quayBulkData = [{

       			'StockRef': rowguid,

       			'VoyageKey': VoyageKey,

       			'EirNo': EirNo,	

       			'ClassID': ClassID,

       			'IsLocalForeign': IsLocalForeign,

       			'BillOfLading': BillOfLading ? BillOfLading : '',

       			'BookingNo': BookingNo ? BookingNo : '',

       			'VINNo': '',

       			'TransitID': TransitID ? TransitID : '',

       			'CarWeight': $("#TruckWeight").val(),

       			'JobTypeID': 'LD',

       			'JobStatus': 'KT',

       			'StartDate': currentDate,

       			'FinishDate': '',

       			'JobModeInID': JobModeID,

       			'MethodInID': MethodID,

       			'JobModeOutID': '',

       			'MethodOutID': '',

       			'KeyCheck': 0,

       			'Sequence': '',

       			'Block': '',

       			'Bay': '',

       			'Row': '',

       			'Tier': '',

       			'Area': '',

       			'PaymentTypeID': PaymentTypeID,

       			'BillCheck': 0,

       			'Remark': $("#Remark").text(),

       			'TruckNo': '',

       		}];



       		/*

       		scalesData = [{

	        	'EirNo': EirNo,

	        	'TruckNo': '',

	        	'JobModeID': JobModeID,

	        	'RegisterWeight': '',

	        	'FirstWeightScale': '',

	        	'SecondWeightScale': '',

	        	'Sequence': '',

	        }];

	       */



	       /*

	       stockOutBulkData = {

				'StockRef': rowguid,

       			'VoyageKey': VoyageKey,

				'EirNo': EirNo,

				'TruckNo': $("#TruckNo").val(),

				'DateOut': '',

				'CargoWeightGetOut': '',

				'UnitID': '',	           

				'Sequence': 1, // update later

				'RemainCargoWeight': '',

			}

			*/



       		ordEirModal.modal('hide');

		});

		

        tbl.dataTable().fnClearTable();

        $("#passGate").on('click', function(){

        	if ($("#chooseGate").text().substring(0, 2) == 'IN'){

        		if (!($("#EirNo").val())){

	        		toastr['error']("Vui lòng chọn lệnh!");

	        		return;

	        	}



	        	if ($("#EirNo").val().substring(0,1) == 'R'){ /* RORO */

		        	if (!($("#VINNo").val())){

		        		toastr['error']("Vui lòng nhập Số PINCODE!");

		        		return;

		        	}



		        	/* Check Car Number */

		        	if (!($("#TruckNo").val())){

		        		toastr['error']("Vui lòng nhập số xe!");

		        		return;

		        	}



		        	/* Prepare data */

		        	var rows = [];

		        	if ($("#JobModeID").val() == 'HBAI'){

		        		rows.push('I');

		        	}

		        	else{

		        		rows.push('O');

		        	}

		        	rows.push($("#TruckNo").val());

		        	rows.push($("#BillOfLadingORBookingNo").val());

		        	rows.push($("#VINNo").val());

		        	rows.push($("#EirNo").val().substring(0,1));

		        	rows.push($("#EirNo").val());

		        	rows.push($("#StockRef").val());

		        	rows.push('');

		        	

		            tbl.dataTable().fnAddData(rows);



		            var currentDate = getDateTimeFormatString(new Date());



		            gateData[0].CarWeight = $("#TruckWeight").val();

		            gateData[0].TruckNo = $("#TruckNo").val();

		            gateData[0].StartDate = currentDate;

		            quayBulkData[0].TruckNo = $("#TruckNo").val();

		            gateData[0].CargoType = 'R';

		            yardData[0].CargoType = 'R';

		            yardData[0].StartDate = currentDate;



		            var gateFormData = {

			            	'action': 'add',

			            	'child_action': 'addNewGateData',

			            	'data': gateData,

		            	},

		            	updateEirForm = {

		            		'action': 'edit',

		            		'child_action': 'updateORDEir',

		            		'rowguid': $("#StockRef").val(),

		            		'EirNo': yardData[0]['EirNo'],

		            		'FinishDate': currentDate,

		            	};



		            postSave(gateFormData);



		            var yardFormData = {

		            	'action': 'add',

		            	'child_action': 'addNewYardData',

		            	'data': yardData,

	            	};

	           		postSave(yardFormData);

		        }

		        /* BULK */

		        else if ($("#EirNo").val().substring(0,1) == 'B'){ 

		        	/* Check Truck Number */

		        	if (!($("#TruckNo").val())){

		        		toastr['error']("Vui lòng nhập số xe!");

		        		return;

		        	}

		        	else{

		        		/* Check truck is in processing queue (not have FinishDate) */

	        			var checkForm = {

		        				'action': 'view',

		        				'child_action': 'checkTruckInQueue',

		        				'TruckNo': $("#TruckNo").val(),

		        			};



		        		$("#passGate").attr("disabled", true);



	        			$.ajax({

				            url: "<?=site_url(md5('gate'));?>",

				            dataType: 'json',

				            data: checkForm,

				            type: 'POST',

				            success: function (data) {

				                if(data.deny) {

				                    toastr["error"](data.deny);

				                    return;

				                }



				               	if (data.list == 1){

				               		toastr['error']("Số xe: " + $("#TruckNo").val() + " đang được khai thác tại Cổng!");

		        					$("#passGate").attr("disabled", false);

				               		return;

				               	}

				               	else{

				               		/* ClassID == 1 */

				               		if ($("#ClassID").val() == 1){

				               			//stockOutBulkData.TruckNo = $("#TruckNo").val();



				               			/*

				               			var	stockOutBulkForm = {

				               					'action': 'add',

				               					'child_action': 'addStockOutWithClassOut',

				               					'data': stockOutBulkData,

				               				};	

				               			

				               			postSave(stockOutBulkForm);

				               			*/

							            var currentDate = getDateTimeFormatString(new Date());

				               			

				               			gateData[0].CarWeight = $("#TruckWeight").val();

							            gateData[0].TruckNo = $("#TruckNo").val();

							            gateData[0].StartDate = currentDate;

		            					gateData[0].CargoType = 'B';



				               			var gateFormData = {

								            	'action': 'add',

								            	'child_action': 'addNewGateData',

								            	'data': gateData,

							            	};



							            postSave(gateFormData);

				               		}

				               		/* ClassID == 2 */

				               		else{

				               			/* Prepare data */

							        	var rows = [];

							        	if ($("#JobModeID").val() == 'HBAI'){

							        		rows.push('I');

							        	}

							        	else{

							        		rows.push('O');

							        	}

							        	rows.push($("#TruckNo").val());

							        	rows.push($("#BillOfLadingORBookingNo").val());

							        	rows.push($("#VINNo").val());

							        	rows.push($("#EirNo").val().substring(0,1));

							        	rows.push($("#EirNo").val());

							        	rows.push($("#StockRef").val());

							        	rows.push('');

							        	

							            tbl.dataTable().fnAddData(rows);



							            var currentDate = getDateTimeFormatString(new Date());



							            gateData[0].CarWeight = $("#TruckWeight").val();

							            gateData[0].TruckNo = $("#TruckNo").val();

							            gateData[0].StartDate = currentDate;

		            					gateData[0].CargoType = 'B';

							            quayBulkData[0].TruckNo = $("#TruckNo").val();

							            yardData[0].StartDate = currentDate;



							            var gateFormData = {

								            	'action': 'add',

								            	'child_action': 'addNewGateData',

								            	'data': gateData,

							            	},

							            	updateEirForm = {

							            		'action': 'edit',

							            		'child_action': 'updateORDEir',

							            		'rowguid': $("#StockRef").val(),

							            		'EirNo': yardData[0]['EirNo'],

							            		'FinishDate': currentDate,

							            	};



							            postSave(gateFormData);



							            updateEirForm.child_action = 'updateORDBulk';

						        		delete updateEirForm.FinishDate;

										postSave(updateEirForm);

				               		}

				               	}

				            },

				            error: function (err){

				                console.log(err);

				                return;

				            },

				        });  

		        	}		        	

		        }

        	}

        	else{

        		/* GATE OUT */

        		if ($("#chooseGate").text().substring(0, 3) == 'OUT'){ 

	        		if ($("#EirNo").val().substring(0,1) == 'R'){

	        			var currentDate = getDateTimeFormatString(new Date()),

	        				updateStockForm = {

				                'action': 'edit',

				                'child_action': 'updateStockData',

				                'PINCodeOREirNo': $("#EirNo").val(),

				                'VINNo': $("#VINNo").val(),

				                'VMStatus': 'D',				                

				                'DateOut': currentDate,

				            };

		 

				        $.ajax({

				            url: "<?=site_url(md5('gate'));?>",

				            dataType: 'json',

				            data: updateStockForm,

				            type: 'POST',

				            success: function (data) {

				                if(data.deny) {

				                    toastr["error"](data.deny);

				                    return;

				                }



				                toastr['success']("Cập nhật dữ liệu Biến động bãi thành công!");

								tbl.dataTable().fnClearTable();

								$("#inputForm").trigger('reset');

				            },

				            error: function (err){

				                console.log(err);

				                return;

				            },

				        });  

				       	

				       	var updateGateForm = {

					     		'action': 'edit',

					            'child_action': 'updateGateData',

					            'StockRef': $("#StockRef").val(),

					      		'VINNo': $("#VINNo").val(),

					       		'GateOutID': $("#chooseGate").html(),

					       		'FinishDate': updateStockForm.DateOut,

					       		'Remark': $("#Remark").val(),

				        	};



				        $.ajax({

				            url: "<?=site_url(md5('gate'));?>",

				            dataType: 'json',

				            data: updateGateForm,

				            type: 'POST',

				            success: function (data) {

				                if(data.deny) {

				                    toastr["error"](data.deny);

				                    return;

				                }



				                toastr['success']("Cập nhật dữ liệu GATE JOB thành công!");

								$("#inputForm").trigger('reset');

								tbl.DataTable().rows('.selected').remove().draw(false);

								tbl.updateSTT(_columns.indexOf("STT"));

				            },

				            error: function (err){

				                console.log(err);

				                return;

				            },

				        }); 

	        		}

	        		else if ($("#EirNo").val().substring(0,1) == 'B'){

				     	if ($("#ClassID").val() == 1){

				     		var currentDate = getDateTimeFormatString(new Date()),

								updateGateForm = {

									'action': 'edit',

									'child_action': 'updateGateData',

									'TruckNo': $("#TruckNo").val(),

					                'Sequence': $("#Sequence").val(),

									'PINCodeOREirNo': $("#EirNo").val(),

									'GateOutID': $("#chooseGate").html(),

						        	'FinishDate': currentDate,

						       		'Remark': $("#Remark").val(),

								};



							stockOutBulkData[0].DateOut = currentDate;

							stockOutBulkData[0].Sequence = $("#Sequence").val();



							var stockOutFormData = {

									'action': 'add',

									'child_action': 'addStockOutWithClassIn',

									'data': stockOutBulkData,

								};



		       				$("#passGate").attr("disabled", false);

							postSave(updateGateForm);

							postSave(stockOutFormData);

				     	}

				     	else{

							var currentDate = getDateTimeFormatString(new Date()),

								updateGateForm = {

									'action': 'edit',

									'child_action': 'updateGateData',

									'TruckNo': $("#TruckNo").val(),

					                'Sequence': $("#Sequence").val(),

									'PINCodeOREirNo': $("#EirNo").val(),

									'GateOutID': $("#chooseGate").html(),

						        	'FinishDate': currentDate,

						       		'Remark': $("#Remark").val(),

								};



							stockOutData[0].DateOut = updateGateForm.FinishDate;



							var	stockOutForm = {

									'action': 'add',

									'child_action': 'addStockOut',

									'TruckNo': $("#TruckNo").val(),

									'data': stockOutData,

								};



							$.ajax({

					            url: "<?=site_url(md5('gate'));?>",

					            dataType: 'json',

					            data: stockOutForm,

					            type: 'POST',

					            success: function (data) {

					                if(data.deny) {

					                    toastr["error"](data.deny);

					                    return;

					                }

					                toastr['success']("Thêm dữ liệu STOCK OUT thành công!");



					                $.ajax({

					            		url: "<?=site_url(md5('gate'));?>",

							            dataType: 'json',

							            data: updateGateForm,

							            type: 'POST',

							            success: function (data) {

							                if(data.deny) {

							                    toastr["error"](data.deny);

							                    return;

							                }



							                toastr['success']("Cập nhật dữ liệu GATE JOB thành công!");

											$("#inputForm").trigger('reset');				                

				        					tbl.DataTable().rows('.selected').remove().draw(false);

											tbl.updateSTT(_columns.indexOf("STT"));

							            },

							            error: function (err){

							                console.log(err);

							                return;

							            },

							        }); 

					            },

					            error: function (err){

					                console.log(err);

					                return;

					            },

					        }); 

		        		}

		        	}

        		}

        	}

		});



        function getDateTimeFormatString(d){

            year    = d.getFullYear();

            month   = d.getMonth() + 1;

            day     = d.getDate();

            hour    = d.getHours(),

            min     = d.getMinutes(),

            sec     = d.getSeconds(),

            fillMonth = '',

            fillDay   = '',

            fillHour  = '',

            fillMin   = '',

            fillSec   = '';

            

            if (month < 10)

                fillMonth = '0';

            if (day < 10)

                fillDay = '0';

            if (hour < 10)

                fillHour = '0';

            if (min < 10)

                fillMin = '0';

            if (sec < 10)

                fillSec = '0';



            return (year + '-' + fillMonth + month + '-' + fillDay + day + " " + fillHour + hour + ':' + fillMin + min + ':' + fillSec + sec);

        }



		function get_qr(truck,ord){

        	if ($("#chooseGate").text().substring(0, 2) == 'IN'){

        		if ($("#EirNo").val().substring(0,1) == 'B'){

        			$.ajax({

		                url: "<?=site_url(('api').'/'.md5('GetTruckBarCode'));?>",

		                dataType: 'json',

		                data: {"TruckNo":truck,"OrderNo":ord},

		                type: 'POST',

		                success: function (data) {

		                	//alert(data.img);

		                	$("#inqrbox").modal('show');

		                	$("#inqrbox").find("#print_box").html('<center><img src="'+data.img+'"><br>'+data.TruckNo+'-'+data.OrderNo+'-'+data.JobModeID+'<br>'+data.NOTE+'</center>');

		                	if(parseFloat(data.WEIGHT)>0)

		                	$("#TruckWeight").val(data.WEIGHT);

		                },

		                error: function(err){

		                	toastr["error"]("Error!");

		                	console.log(err);

		                }

		            });

        		}

			}

		}



		function PrintElem(elem)

		{

		    var mywindow = window.open('', 'PRINT', 'height='+screen.height+',width='+screen.width);



		    mywindow.document.write('<html><head><title>In QR</title>');

		    mywindow.document.write('</head><body>');

		    var style="img{image-rendering: pixelated;width:60%;} @media print {@page { size: A5 landscape;margin: 0; } .p_count{display:none;} a{text-decoration:none;}}";

		    mywindow.document.write('<style>' + style  + '</style>');

		    //mywindow.document.write('<h1>' + document.title  + '</h1>');

		    mywindow.document.write(document.getElementById(elem).innerHTML);

		    mywindow.document.write('</body></html>');



		    mywindow.document.close(); // necessary for IE >= 10

		    mywindow.focus(); // necessary for IE >= 10*/



		    mywindow.print();

		    mywindow.close();



		    return true;

		}



		$(document).on("click","#print_btn",function(){

			PrintElem('print_box');

		});



        function postSave(formData){

			$.ajax({

                url: "<?=site_url(md5('gate'));?>",

                dataType: 'json',

                data: formData,

                type: 'POST',

                success: function (data) {

                    if(data.deny) {

                        toastr["error"](data.deny);

                        return;

                    }



                    if(formData.action == 'add'){



	        			if ($("#EirNo").val().substring(0,1) != 'B'){

                   			$("#inputForm").trigger('reset');

                   		}



                    	if (formData.child_action == 'addNewGateData'){

                    		toastr["success"]("Thêm mới dữ liệu Gate Job thành công!");  

		       				$("#passGate").attr("disabled", false);



                    		if (($("#EirNo").val().substring(0,1) == 'B') && ($("#JobModeID").val() == 'XGT')){ 

				           		var stockInBulkForm = {

				           				'action': 'add',

					            		'child_action': 'addStockInBulk',

					            		'TruckNo': $("#TruckNo").val(),

					            		'data': stockInBulkData,

				           			},

				           			quayBulkForm = {

				           				'action': 'add',

					            		'child_action': 'addQuayBulkForOut',

				           				'data': quayBulkData,

				           			},

				           			eir = $("#EirNo").val(),

				           			truck = $("#EirNo").val();



								postSave(stockInBulkForm);

								postSave(quayBulkForm);

							}

							get_qr($("#TruckNo").val(), $("#EirNo").val());

                    		return;

                    	}



                    	if (formData.child_action == 'addNewYardData'){

                    		toastr["success"]("Thêm mới dữ liệu Yard Job thành công!");

                            var transferData = [{

		                        'Block': formData.data[0]['Block'],

		                        'Bay':   formData.data[0]['Bay'],

		                        'Row':   formData.data[0]['Row'],

		                        'Tier':  formData.data[0]['Tier'],

		                        'VINNo': formData.data[0]['VINNo'],

		                    }];



		                    socket.emit('TransferToYardJob', JSON.stringify(transferData));

                    		return;

                    	}



                    	if (formData.child_action == 'addStockBulk'){

                    		toastr["success"]("Thêm mới dữ liệu Stock thành công!");

                    		return;

                    	}



                    	if (formData.child_action == 'addStockInBulk'){

                    		toastr["success"]("Thêm mới dữ liệu Stock-In thành công!");

                    		return;

                    	}



                    	if (formData.child_action == 'addQuayBulkForOut'){

                    		toastr["success"]("Thêm mới dữ liệu Stock-In thành công!");

                    		$("#inputForm").trigger('reset');

		        			$("#passGate").attr("disabled", false);

                    		return;

                    	}



                    	if (formData.child_action == 'addStockOutWithClassOut' || 

                    		formData.child_action == 'addStockOutWithClassIn'

                    	){

                    		toastr["success"]("Thêm mới dữ liệu Stock-Out thành công!");

		        			$("#passGate").attr("disabled", false);

                    		return;

                    	}



                    	/*

                    	if (formData.child_action == 'addScalesData'){

                    		toastr["success"]("Thêm mới dữ liệu Thông tin phương tiện thành công!");

                    		return;	

                    	}

                    	*/

                    }



                    if(formData.action == 'edit'){

                    	if (formData.child_action == 'updateORDEir'){

                    		toastr["success"]("Cập nhật dữ liệu lệnh thành công!");

                    		return;

                    	}



                    	if (formData.child_action == 'updateORDBulk'){

                    		toastr["success"]("Cập nhật dữ liệu lệnh thành công!");

                    		return;

                    	}



                    	if (formData.child_action == 'updateGateData'){

                    		toastr["success"]("Cập nhật dữ liệu Cổng thành công!");

                    		$("#inputForm").trigger('reset');

		       				$("#passGate").attr("disabled", false);

                    		tbl.DataTable().rows('.selected').remove().draw(false);

							tbl.updateSTT(_columns.indexOf("STT"));

							return;

                    	}

                    }

                },

                error: function(err){

		       		$("#passGate").attr("disabled", false);

                	toastr["error"]("Error!");

                	console.log(err);

                }

            });

		}



		socket.on('updateGateOutByYard', function(data){

			if ($("#chooseGate").text().substring(0, 3) == 'OUT'){

				tbl.dataTable().fnClearTable();

	   			tbl.waitingLoad();



	   			var checkStatus = 'O',

	    			formData = {

		    			'action': 'view',

		    			'child_action': 'loadGateList',

		    		};



	    		$.ajax({

					url: "<?=site_url(md5('gate'));?>",

					dataType: 'json',

					data: formData,

					type: 'POST',

					success: function (data) {

						tbl.dataTable().fnClearTable();

						if (data.list.length > 0){

							var dataList = data.list,

								rows = [];

							for(k = 0; k < dataList.length; k++){

								var r = [] , rData = dataList[k];



								if (rData['VMStatus'] == checkStatus){

	                                $.each(_columns, function(idx, colname){

										var val = "";

	                                    switch(colname){

	                                    	case "IO":

	                                    		if (rData['JobModeID'] == 'HBAI'){

	                                    			val = 'I';

	                                    		}

	                                    		else{

	                                    			if (rData['JobModeID'] == 'LAYN'){

	                                    				val = 'O';

	                                    			}

	                                    		}

	                                    		break;

	                                    	default:

	                                    		val = rData[colname];

	                                    		break;

	                                    };

	                                    r.push(val);

	                                });

	                                rows.push(r);

								}

							}



	                        if(rows.length > 0){

	                            tbl.dataTable().fnAddData(rows);

	                        }

						}

					},

					error: function(err){

						console.log(err);

					}

				});

			}

		});

		

		//scalesModal.modal('show');

		/*

		$("#currentWeight").val("0.00");

		$("#btnScales").on('click', function(e){

			e.preventDefault();



			if (!($("#PINCodeOREirNo").val())){

				toastr['error']("Vui lòng chọn lệnh trước khi cân!");

				return;

			}



			if (!($("#TruckNo").val())){

				toastr['error']("Vui lòng nhập Số xe trước khi cân!");

				return;	

			}

			

			$("#scalesTruckNo").val($("#TruckNo").val());

			scalesModal.modal('show');

		});



		$("#currentWeight").on('click', function(){

			if ($("#currentWeight").val()){

				$("#currentWeight").val('');

			}

		});



		$("#btnCarWeightIn").on('click', function(){

			if (!($("#currentWeight").val())){

				toastr['error']('Vui lòng nhập Trọng lượng hiện tại!');

				return;

			}

			$("#CarWeightIn").val($("#currentWeight").val());

		});



		$("#btnCarWeightOut").on('click', function(){

			alert(2);

		});



		$("#apply-scales, #quit-scales").on('click', function(){

			$("#TruckWeight").val($("#CarWeightIn").val() / 1000);



	        if ($("#PINCodeOREirNo").val().substring(0,1) == 'B'){

	        	for (i = 0; i < quayBulkData.length; i++)

				{

					quayBulkData[i].CarWeight = $("#TruckWeight").val();

				}



				for (i = 0; i < stockInBulkData.length; i++)

				{

					stockInBulkData[i].CargoWeightGetIn = $("#TruckWeight").val();

				}



				for (i = 0; i < gateData.length; i++)

				{

					gateData[i].CarWeight = $("#TruckWeight").val();

				}



				scalesData[0].TruckNo = $("#TruckNo").val();

				scalesData[0].FirstWeightScale = $("#TruckWeight").val();	

	        }

		});

		*/



        // Remove class error when change value

        $(document).on('input', '.error input', function () {

            $(this).parent().removeClass('error');

        });



        /* ------------------------------------------------------- */

        $('[data-action="reloadUI"]').on('click', function (e) {

            var block = $(this).attr('data-reload-target');

            $(block).block({ 

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

        });

    });

</script>

</html>



<script src="<?=base_url('assets/vendors/bootstrap-select/dist/js/bootstrap-select.min.js');?>"></script>



<script>

    var resizefunc = [];



    $.extend( true, $.fn.dataTable.defaults, {

        language: {

            info: "Số dòng: _TOTAL_",

            emptyTable: "------------ Không có dữ liệu hiển thị ------------",

            infoFiltered: "(trên _MAX_ dòng)",

            infoEmpty: "Số dòng: 0",

            search: '<span>Tìm:</span> _INPUT_',

            zeroRecords:    "------------ Không có dữ liệu được tìm thấy ------------",

            sThousands: ",",

            sDecimal: ".",

            select: {

                rows: {

                    _: "Đã chọn %d dòng",

                    0: ""

                }

            }

        },

        search: {

            regex: true

        },

        info: true,

        orderClasses: false,

        paging: false,

        scrollY: 419,

        scrollX: true,

        lengthChange: false,

        scrollCollapse: false,

        deferRender: true,

        processing: true,

        autoWidth: true,

        dom: '<"datatable-header"fl<"datatable-info-right"Bip>><"datatable-scroll-wrap"t>',

        buttons: [

            {extend: 'selectAll', text: 'Chọn tất cả', className: 'btn btn-xs btn-default'},

            {extend: 'selectNone', text: 'Bỏ chọn', className: 'btn btn-xs btn-default'}

        ],

        destroy: true

    });

</script>


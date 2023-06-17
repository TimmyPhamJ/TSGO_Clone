<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="referrer" content="origin-when-crossorigin" id="meta_referrer" />
    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
    <meta http-equiv="Pragma" content="no-cache" />
    <meta http-equiv="Expires" content="0" />
    <title><?= $title; ?></title>
    <!--    favicon-->
    <link rel="icon" href="<?= base_url('assets/img/icons/favicon.ico'); ?>" type="image/ico">
    <!-- GLOBAL MAINLY STYLES-->
    <link href="<?= base_url('assets/vendors/jquery-ui/jquery-ui.css'); ?>" rel="stylesheet" />
    <link href="<?= base_url('assets/vendors/bootstrap/dist/css/bootstrap.min.css'); ?>" rel="stylesheet" />
    <link href="<?= base_url('assets/vendors/font-awesome/css/font-awesome.min.css'); ?>" rel="stylesheet" />
    <link href="<?= base_url('assets/vendors/line-awesome/css/line-awesome.min.css'); ?>" rel="stylesheet" />
    <link href="<?= base_url('assets/vendors/themify-icons/css/themify-icons.css'); ?>" rel="stylesheet" />

    <link href="<?= base_url('assets/vendors/jquery-confirm/jquery-confirm.min.css'); ?>" rel="stylesheet" />

    <!-- PLUGINS STYLES-->
    <link href="<?= base_url('assets/vendors/dataTables/datatables.min.css'); ?>" rel="stylesheet" />
    <link href="<?= base_url('assets/vendors/dataTables/jquery.dataTables.min.css'); ?>" rel="stylesheet" />
    <!--    DATATABLES SCROLL-->
    <link href="<?= base_url('assets/vendors/dataTables/scroller.dataTables.min.css'); ?>" rel="stylesheet" />

    <link href="<?= base_url('assets/vendors/toastr/toastr.min.css'); ?>" rel="stylesheet" type="text/css" />

    <!--    CUSTOMIZE FOR DATATABLES-->
    <link href="<?= base_url('assets/css/custom.datatables.css'); ?>" rel="stylesheet" />

    <!-- THEME STYLES-->
    <link href="<?= base_url('assets/css/main.min.css'); ?>" rel="stylesheet" />
    <link href="<?= base_url('assets/css/ro2.css'); ?>" rel="stylesheet" />
    <!-- PAGE LEVEL STYLES-->

    <!-- CORE PLUGINS-->
    <script src="<?= base_url('assets/vendors/popper.js/dist/umd/popper.min.js'); ?>"></script>

    <script src="<?= base_url('assets/vendors/jquery/dist/jquery.min.js'); ?>"></script>
    <script src="<?= base_url('assets/vendors/jquery/dist/jquery2-1-4.min.js'); ?>"></script>
    <script src="<?= base_url('assets/vendors/jquery-ui/jquery-ui.js'); ?>"></script>
    <script src="<?= base_url('assets/vendors/bootstrap/dist/js/bootstrap.min.js'); ?>"></script>
    <script src="<?= base_url('assets/vendors/metisMenu/dist/metisMenu.min.js'); ?>"></script>
    <script src="<?= base_url('assets/vendors/jquery-slimscroll/jquery.slimscroll.min.js'); ?>"></script>
    <script src="<?= base_url('assets/vendors/jquery-validation/dist/jquery.validate.min.js'); ?>"></script>
    <script src="<?= base_url('assets/vendors/jquery-confirm/jquery-confirm.min.js'); ?>"></script>

    <script src="<?= base_url('assets/vendors/moment/min/moment.min.js'); ?>"></script>

    <script src="<?= base_url('assets/js/contextmenu.js'); ?>"></script>

    <link href="<?= base_url('assets/vendors/datetimepicker/jquery-ui-timepicker-addon.css'); ?>" rel="stylesheet" />
    <script src="<?= base_url('assets/vendors/datetimepicker/jquery-ui-timepicker-addon.js'); ?>"></script>

    <!--    custom for eblling js-->
    <script src="<?= base_url('assets/js/ro2.js'); ?>"></script>
    <script src="<?= base_url('assets/js/datatables.ext.js'); ?>"></script>

    <!-- PAGE LEVEL PLUGINS-->
    <script src="<?= base_url('assets/vendors/dataTables/datatables.min.js'); ?>"></script>

    <!--    TABLES SCROLL-->
    <script src="<?= base_url('assets/vendors/dataTables/dataTables.scroller.min.js'); ?>"></script>
    <script type="text/javascript" src="<?= base_url('assets/vendors/dataTables/extensions/key_table.min.js'); ?>"></script>
    <script type="text/javascript" src="<?= base_url('assets/vendors/dataTables/extensions/mindmup-editabletable.js'); ?>"></script>
    <script type="text/javascript" src="<?= base_url('assets/vendors/dataTables/extensions/numeric-input-example.js'); ?>"></script>
    <script type="text/javascript" src="<?= base_url('assets/vendors/dataTables/extensions/autofill.min.js'); ?>"></script>
    <script type="text/javascript" src="<?= base_url('assets/vendors/dataTables/extensions/scroller.min.js'); ?>"></script>
    <script type="text/javascript" src="<?= base_url('assets/vendors/dataTables/extensions/select.min.js'); ?>"></script>
    <script type="text/javascript" src="<?= base_url('assets/vendors/dataTables/extensions/buttons.min.js'); ?>"></script>

    <!-- Toastr js -->
    <script src="<?= base_url('assets/vendors/toastr/toastr.min.js'); ?>"></script>

    <!-- Loader -->
    <script src="<?= base_url('assets/vendors/loaders/blockui.min.js'); ?>"></script>
    <script src="<?= base_url('assets/vendors/loaders/progressbar.min.js'); ?>"></script>

    <!-- Socket -->
    <script src="<?= base_url('/sockets/node_modules/socket.io-client/dist/socket.io.js'); ?>"></script>

    <script type="text/javascript">
        var socket = io.connect('https://<?= HOST; ?>' / ');
    </script>

    <!-- Shorten text
    <script type="text/javascript" src="jquery.shorten.1.0.js"></script> -->

    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossorigin="anonymous">

    <style>
        .no-pointer {
            pointer-events: none;
        }

        input[type="text"]:focus {
            background-color: #f6fcff;
        }

        .top-bar {
            position: relative;
            background-color: #207b99;
            height: 50px;
            margin: 0;
            display: flex;
        }

        .trapezoid {
            height: 100px;
            width: 300px;
            background: #005b7f;
            transform: perspective(100px) rotateX(-30deg);
            margin: 0 auto;
            padding: 0px;
        }

        .right-btn-group {
            display: flex;
            position: absolute;
            top: 8px;
            right: 0;
            width: 70%;

        }

        .left-btn-group {
            position: absolute;
            top: 10px;
            width: 25%;
            width: 30%;
        }

        .btn {
            margin-right: 15px;
        }

        .user-info {
            position: fixed;
            top: 2%;
            left: 46.5%;
            font-size: 18px;
            color: white;
        }

        .middle-info {
            position: fixed;
            top: 6.25%;
            left: 39%;
            font-size: 18px;
            color: white;
        }

        .input-in-top-style,
        .input-in-top-style:focus {
            border-bottom: solid 1px white;
            border-top: none;
            border-left: none;
            border-right: none;
            background-color: #207b99;
            margin-left: 10px;
            width: 30%;
            color: white;
        }

        .btn.btn-white.btn-rounded {
            margin-bottom: 10px;
            height: 2.25rem;
        }

        #contenttable_wrapper .dataTables_scroll #cell-context .dropdown-menu .dropdown-item .sub-text {
            margin-left: 7px;
            font-size: 1rem;
            font-style: italic;
        }

        ::placeholder {
            color: white;
        }

        .modal-body {
            padding-bottom: 0px !important;
            padding-top: 10px !important;
        }

        .m-fullscreen-request {
            display: none;
            background: rgba(0, 0, 0, 0.5);
            height: 100vh;
            width: 100vw;
            z-index: 999;
            position: fixed;
            top: 0;
            left: 0;
            text-align: center;

            @media screen and (max-width: $break-md) {
                display: block;
            }

            h3 {
                margin-top: 15%;
                color: #fff;
            }
        }

        /*
        a {
            color: #0254EB
        }
        a:visited {
            color: #0254EB
        }
        a.morelink {
            text-decoration:none;
            outline: none;
        }
        .morecontent span {
            display: none;
        }
        .comment {
            width: 400px;
            background-color: #f0f0f0;
            margin: 10px;
        }
        */
    </style>
    <link href="<?= base_url('assets/vendors/bootstrap-select/dist/css/bootstrap-select.min.css'); ?>" rel="stylesheet" />

<body style="background-color: #f2f4f8;">
    <div class="col-xl-12 top-bar">
        <div class="left-btn-group col-xl-4">
            <input class="input-in-top-style col-4" id='VesselName' placeholder="Tàu">
            <input class="input-in-top-style col-4" id='InOutBoundVoyage' placeholder="Chuyến">
        </div>
        <!--
        <div  class="trapezoid col-xl-4">
            
        </div>
        -->
        <div class="right-btn-group col-xl-8" id='controlButtonDiv'>
            <div style="float: left;">
                <button class="btn btn-white btn-rounded" id="NT"><b><span class="button-text">NHẬP TÀU</span></b></button>
                <button class="btn btn-white btn-rounded" id="XT"><b><span class="button-text">XUẤT TÀU</span></b></button>
                <button class="btn btn-white btn-rounded" id="DC"><b><span class="button-text">ĐẢO CHUYỂN</span></b></button>
                <input hidden id='VoyageKey'>
            </div>
            <div style="float: right; margin-left: auto;">
                <ul id="right-out" class="nav navbar-toolbar" s>
                    <li class="dropdown dropdown-user">
                        <a id="user-info" class="nav-link dropdown-toggle link" style="padding-right: 0; color: white; ">
                            Người dùng: &ensp;<span id="user_fullname"><?= $this->session->userdata('FullName'); ?></span>
                            <span id="user_name" style="display: none;"><?= $this->session->userdata('UserID'); ?></span>
                        </a>
                    </li>
                    <li>
                        <a id="alogout" class="d-flex align-items-center ml-2" title="Đăng xuất" href="<?= site_url(md5('user') . '/' . md5('logout')); ?>" style="margin-top: 0.75rem;"><i class="ti-shift-right" style="color: white"></i></a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    </div>
    <div class="col-xl-12 mt-5" id="mainContentDiv">
        <div class="ibox collapsible-box">
            <div class="row ibox-footer border-top-0">
                <div class="col-md-12 col-sm-12 col-xs-12 table-responsive">
                    <table id="contenttable" class="table table-striped display nowrap" cellspacing="0" style="width: 99.5%">
                        <thead>
                            <tr>
                                <th class="editor-cancel" col-name="STT">STT</th>
                                <th class="editor-cancel" col-name="StockRef">StockRef</th>
                                <th class="editor-cancel" col-name="VoyageKey">VoyageKey</th>
                                <th class="editor-cancel" col-name="IsLocalForeign">Hàng nội/ ngoại</th>
                                <th class="editor-cancel" col-name="ClassID">Loại nhập/ xuất</th>
                                <th class="editor-cancel" col-name="BillOfLading">Số vận đơn</th>
                                <th class="editor-cancel" col-name="BookingNo">Số booking</th>
                                <th class="editor-cancel" col-name="JobStatus">Trạng thái</th>
                                <th class="editor-cancel" col-name="JobTypeID">Loại công việc</th>
                                <th class="editor-cancel" col-name="JobTypeName">Loại công việc</th>
                                <th class="editor-cancel" col-name="BillOfLadingORBookingNo">Số vận đơn/ booking</th>
                                <th class="editor-cancel" col-name="VINNo">Số PINCODE/ Số xe</th>
                                <th class="editor-cancel" col-name="TransitID">Loại hình vận chuyển</th>
                                <th class="editor-cancel" col-name="CarWeight">Trọng lượng</th>
                                <th class="editor-cancel" col-name="JobModeInID">Phương án vào</th>
                                <th class="editor-cancel" col-name="MethodInID">Phương thức vào</th>
                                <th class="editor-cancel" col-name="JobModeOutID">Phương án ra</th>
                                <th class="editor-cancel" col-name="MethodOutID">Phương thức ra</th>
                                <th class="editor-cancel" col-name="DamagedTypeID">Loại hình hư hỏng</th>
                                <th class="editor-cancel" col-name="DamagedID">Loại hư hỏng</th>
                                <th class="editor-cancel" col-name="KeyCheck">KeyCheck</th>
                                <th class="editor-cancel" col-name="Block">Block</th>
                                <th class="editor-cancel" col-name="Bay">Bay</th>
                                <th class="editor-cancel" col-name="Row">Row</th>
                                <th class="editor-cancel" col-name="Tier">Tier</th>
                                <th class="editor-cancel" col-name="Area">Area</th>
                                <th class="editor-cancel" col-name="PaymentTypeID">Loại hình thanh toán</th>
                                <!--
                                <th class="editor-cancel" col-name="JobModeInOut">Phương án</th>
                                <th class="editor-cancel" col-name="MethodInOut">Phương thức</th>
                            -->
                                <th class="editor-cancel" col-name="BillCheck">BillCheck</th>
                                <th class="editor-cancel" col-name="Sequence">Sequence</th>
                                <th class="editor-cancel" col-name="Remark">Ghi chú</th>
                                <th class="editor-cancel" col-name="EirNo">Số lệnh</th>
                                <th class="editor-cancel" col-name="CargoType">Loại hàng</th>
                                <th class="editor-cancel" col-name="rowguid">rowguid</th>
                            </tr>
                        </thead>
                        <tbody>
                            <!--
                            <?php if (count($jobQuayList) > 0) {
                                $i = 1; ?>
                                <?php foreach ($jobQuayList as $item) {  ?> 
                                    <tr>
                                        <td class="editor-cancel" col-name="STT"><?= $i ?></td>
                                        <td col-name="StockRef"><?= $item['rowguid'] ?></td>
                                        <td col-name="VoyageKey"><?= $item['VoyageKey'] ?></td>
                                        <td col-name="IsLocalForeign"><?= $item['IsLocalForeign'] ?></td>
                                        <td col-name="ClassID"><?= $item['ClassID'] ?></td>
                                        <td col-name="BillOfLading"><?= $item['BillOfLading'] ?></td>
                                        <td col-name="BookingNo"><?= $item['BookingNo'] ?></td>
                                        <td col-name="VINNo"><?= $item['VINNo'] ?></td>
                                        <td col-name="TransitID"><?= $item['TransitID'] ?></td>
                                        <td col-name="CarWeight"></td>
                                        <td col-name="JobTypeID"></td>
                                        <td col-name="JobStatus">
                                            <input class='hiden-input' value='<?= $item['JobStatus'] ?>'><?= $item['VMStatusDesc'] ?>
                                        </td>
                                        <td col-name="JobModeInID"><?= $item['JobModeInID'] ?></td>
                                        <td col-name="MethodInID"><?= $item['MethodInID'] ?></td>
                                        <td col-name="JobModeOutID"><?= $item['JobModeOutID'] ?></td>
                                        <td col-name="MethodOutID"><?= $item['MethodOutID'] ?></td>
                                        <td col-name="DamagedTypeID"></td>
                                        <td col-name="DamagedID"></td>
                                        <td col-name="KeyCheck"></td>
                                        <td col-name="Block"></td>
                                        <td col-name="Bay"></td>
                                        <td col-name="Row"></td>
                                        <td col-name="Tier"></td>
                                        <td col-name="Area"></td>
                                        <td col-name="PaymentTypeID"></td>
                                        <td col-name="JobModeInOut">
                                            <?php
                                            if ($item['JobModeInID']) {
                                                echo ($item['JobModeInID']);
                                            } else {
                                                echo ('<i>Không có phương án vào</i>');
                                            }
                                            echo (" | ");
                                            if ($item['JobModeOutID']) {
                                                echo ($item['JobModeOutID']);
                                            } else {
                                                echo ('<i>Không có phương án ra</i>');
                                            }
                                            ?>
                                        </td>
                                        <td col-name="MethodInOut">
                                            <?php
                                            if ($item['MethodInID']) {
                                                echo ($item['MethodInID']);
                                            } else {
                                                echo ('<i>Không có phương thức vào</i>');
                                            }
                                            echo (" | ");
                                            if ($item['MethodOutID']) {
                                                echo ($item['MethodOutID']);
                                            } else {
                                                echo ('<i>Không có phương thức ra</i>');
                                            }
                                            ?>
                                        </td>
                                        <td col-name="BillCheck"></td>                            
                                        <td col-name="Remark"><?= $item['Remark'] ?></td>
                                    </tr>
                                    <?php $i++;
                                }
                            } ?>
                        -->
                        </tbody>
                    </table>
                    <input style="position: absolute; z-index: 2; top: 1px; left: 347px; padding: 6px 8px; text-align: center; font: 400 14px/21px apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Arial, sans-serif; border: 1px solid rgb(183, 202, 226); width: 407px; height: 33px; display: none;" id="editor-input">
                </div>
            </div>
        </div>
    </div>
    <footer class="page-footer">
        <div class="font-13">2018 © <b>C.E.H</b> - Certified Ethical Hacker</div>
        <div class="to-top"><i class="fa fa-angle-double-up"></i></div>
    </footer>
</body>

<div class="m-fullscreen-request">
    <h3>Mở chế độ toàn màn hình</h3>
</div>

<!--
<div class="user-info"><b>User:</b> Tally</div>     
<div class="middle-info">
    <input class="input-in-top-style" style="background-color: #005b7f!important">
    <input class="input-in-top-style" style="background-color: #005b7f!important">
</div>     
-->

<!--
<div id="cell-context" class="btn-group">
    <button type="button" class="btn btn-sm btn-secondary dropdown-toggle dropdown-toggle-split show-table" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
    <div class="dropdown-menu dropdown-menu-right"></div>
</div>
-->

<!-- Vessel modal-->
<div class="modal fade" id="vessel-modal" tabindex="-1" role="dialog" aria-labelledby="groups-modalLabel-1" aria-hidden="true" data-whatever="id" style="padding: auto; padding-top: 4%">
    <div class="modal-dialog" role="document" style="min-width: 1250px!important">
        <div class="modal-content" style="border-radius: 4px">
            <div class="modal-header">
                <h5 class="modal-title text-primary" id="groups-modalLabel-1">Danh mục tàu</h5>
            </div>
            <div class="modal-body" style="padding: 0px 15px 15px 15px">
                <div class="row ibox-footer border-top-0 mt-3">
                    <div class="col-md-12 col-sm-12 col-xs-12 table-responsive">
                        <table id="tblVessel" class="table table-striped display nowrap" cellspacing="0" style="width: 99.5%">
                            <thead>
                                <tr style="width: 100%">
                                    <th col-name="STT">STT</th>
                                    <th col-name="VoyageKey"></th>
                                    <th col-name="VesselID">Mã tàu</th>
                                    <th col-name="VesselName">Tên tàu</th>
                                    <th col-name="InboundVoyage">Chuyến nhập</th>
                                    <th col-name="OutboundVoyage">Chuyến xuất</th>
                                    <th col-name="ETA" class="data-type-datetime">ETA</th>
                                    <th col-name="ETD" class="data-type-datetime">ETD</th>
                                    <th col-name="Status">Status</th>
                                    <th col-name="InLane">Chuyến xuất</th>
                                    <th col-name="OutLane">Chuyến xuất</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php if (count($vesselList) > 0) {
                                    $i = 1; ?>
                                    <?php foreach ($vesselList as $item) {  ?>
                                        <tr>
                                            <td class="editor-cancel" col-name="STT"><?= $i ?></td>
                                            <td col-name="VoyageKey"><?= $item['VoyageKey'] ?></td>
                                            <td col-name="VesselID"><?= $item['VesselID'] ?></td>
                                            <td col-name="VesselName"><?= $item['VesselName'] ?></td>
                                            <td col-name="InboundVoyage"><?= $item['InboundVoyage'] ?></td>
                                            <td col-name="OutboundVoyage"><?= $item['OutboundVoyage'] ?></td>
                                            <td col-name="ETA" class="ETA"><?= $item['ETA'] ?></td>
                                            <td col-name="ETD" class="ETD"><?= $item['ETD'] ?></td>
                                            <td col-name="Status"><?= $item['Status'] ?></td>
                                            <td col-name="InLane"><?= $item['InLane'] ?></td>
                                            <td col-name="OutLane"><?= $item['OutLane'] ?></td>
                                        </tr>
                                <?php $i++;
                                    }
                                } ?>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <div style="margin: 0 auto!important;">
                    <button class="btn btn-sm btn-rounded btn-gradient-blue btn-labeled btn-labeled-left btn-icon" id="apply-vessel">
                        <span class="btn-label"><i class="ti-check"></i></span>Xác nhận</button>
                    <button class="btn btn-sm btn-rounded btn-gradient-peach btn-labeled btn-labeled-left btn-icon" id="close-vessel">
                        <span class="btn-label"><i class="ti-close"></i></span>Đóng</button>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- NT Roro modal -->
<div class="modal fade" id="NT-roro-modal" tabindex="-1" role="dialog" aria-labelledby="groups-modalLabel" aria-hidden="true" data-whatever="id" style="margin-left: 0%!important; margin-top: 1%">
    <div class="modal-dialog" role="document" style="min-width: 1024px!important">
        <div class="modal-content" style="border-radius: 4px">
            <div class="modal-header">
                <h5 class="modal-title text-primary" id="groups-modalLabel">THÔNG TIN NHẬP TÀU</h5>
                <button class="btn btn-danger btn-iconvar-only btn-circle btn-sm btn-air" id="closeButton">
                    <i class="la la-close"></i>
                </button>
            </div>
            <div class="modal-body">
                <div class="col-12">
                    <div class="row">
                        <div class="col-6" id="detailContentTab" style="margin-left: auto; margin-right: auto;">
                            <div class="row form-group">
                                <label class="col-md-4 col-sm-4 col-xs-4 col-form-label" style="text-align: right; margin-right: 5px">Số PINCODE</label>
                                <input id="VINNo" class="col-md-6 col-sm-6 col-xs-6 form-control form-control-sm border-e" placeholder="Số PINCODE" type="text" readonly>
                            </div>
                            <div class="row form-group">
                                <label class="col-md-4 col-sm-4 col-xs-4 col-form-label" style="text-align: right; margin-right: 5px">Vị trí</label>
                                <input id="carPosition" class="col-md-6 col-sm-6 col-xs-6 form-control form-control-sm border-e" placeholder="Vị trí" type="text" readonly>
                                <input hidden id="Block">
                                <input hidden id="Bay">
                                <input hidden id="Row">
                                <input hidden id="Tier">
                                <input hidden id="StartDate">
                                <input hidden id="FinishDate">
                            </div>
                            <div class="row form-group">
                                <label class="col-md-4 col-sm-4 col-xs-4 col-form-label" style="text-align: right; margin-right: 5px">Hư hỏng</label>
                                <label class="checkbox checkbox-success">
                                    <input type="checkbox" name="chbDamaged">
                                    <span class="input-span mt-2"></span>
                                </label>
                            </div>
                            <div class="row form-group">
                                <label class="col-md-4 col-sm-4 col-xs-4 col-form-label" style="text-align: right; margin-right: 5px">Ghi chú</label>
                                <input id="Remark" class="col-md-6 col-sm-6 col-xs-6 form-control form-control-sm border-e" placeholder="" type="text">
                            </div>
                        </div>
                        <div class="col-6" id='damagedDiv'>
                            <div>
                                <h5 style="text-align: center;">DANH MỤC HƯ HỎNG</h5>
                            </div>
                            <div class="row" style="border: #0b4660 1px solid; border-radius: 5px;">
                                <div class="col-4">
                                    <div class="row form-group" style="background-color: #0b4660; color: white; border-right: white 1px solid">
                                        <label style="margin-left: auto; margin-right: auto; margin-top: auto; margin-bottom: auto;">
                                            <?php if (count($damagedTypeList) > 0) {
                                                echo ($damagedTypeList[0]['DamagedTypeName']);
                                            } ?>
                                        </label>
                                    </div>
                                    <?php foreach ($damagedList as $item) {
                                        if ($item['DamagedTypeID'] == $damagedTypeList[0]['DamagedTypeID']) { ?>
                                            <div class="row form-group ml-1">
                                                <label class="checkbox checkbox-success mr-2">
                                                    <input type="checkbox" id="chb<?= $item["DamagedID"] ?>" class="mt-2">
                                                    <span class="input-span"></span>
                                                    <?php
                                                    echo ('<input class="hiden-input" value="' . $item["DamagedID"] . '">' . $item['DamagedName']);
                                                    ?>
                                                </label>
                                            </div>
                                    <?php }
                                    } ?>
                                </div>
                                <div class="col-4">
                                    <div class="row form-group" style="background-color: #0b4660; color: white; border-right: white 1px solid">
                                        <label style="margin-left: auto; margin-right: auto; margin-top: auto; margin-bottom: auto;">
                                            <?php if (count($damagedTypeList) > 0) {
                                                echo ($damagedTypeList[1]['DamagedTypeName']);
                                            } ?>
                                        </label>
                                    </div>
                                    <?php foreach ($damagedList as $item) {
                                        if ($item['DamagedTypeID'] == $damagedTypeList[1]['DamagedTypeID']) { ?>
                                            <div class="row form-group ml-1">
                                                <label class="checkbox checkbox-success mr-2">
                                                    <input type="checkbox" id="chb<?= $item["DamagedID"] ?>" class="mt-2">
                                                    <span class="input-span"></span>
                                                    <?php
                                                    echo ('<input class="hiden-input" value="' . $item["DamagedID"] . '">' . $item['DamagedName']);
                                                    ?>
                                                </label>
                                            </div>
                                    <?php }
                                    } ?>
                                </div>
                                <div class="col-4">
                                    <div class="row form-group" style="background-color: #0b4660; color: white;">
                                        <label style="margin-left: auto; margin-right: auto; margin-top: auto; margin-bottom: auto;">
                                            <?php if (count($damagedTypeList) > 0) {
                                                echo ($damagedTypeList[2]['DamagedTypeName']);
                                            } ?>
                                        </label>
                                    </div>
                                    <?php foreach ($damagedList as $item) {
                                        if ($item['DamagedTypeID'] == $damagedTypeList[2]['DamagedTypeID']) { ?>
                                            <div class="row form-group ml-1">
                                                <label class="checkbox checkbox-success mr-2">
                                                    <input type="checkbox" id="chb<?= $item["DamagedID"] ?>" class="mt-2">
                                                    <span class="input-span"></span>
                                                    <?php
                                                    echo ('<input class="hiden-input" value="' . $item["DamagedID"] . '">' . $item['DamagedName']);
                                                    ?>
                                                </label>
                                            </div>
                                    <?php }
                                    } ?>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <div style="margin: 0 auto!important;">
                    <button class="btn btn-sm btn-rounded btn-gradient-blue btn-labeled btn-labeled-left btn-icon" id="StartJob">
                        <span class="btn-label"><i class="ti-check"></i></span>Bắt đầu
                    </button>

                    <button class="btn btn-sm btn-rounded btn-gradient-peach btn-labeled btn-labeled-left btn-icon" id="FinishJob">
                        <span class="btn-label"><i class="ti-close"></i></span>Hoàn tất
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- NT Bulk modal -->
<div class="modal fade" id="NT-bulk-modal" tabindex="-1" role="dialog" aria-labelledby="groups-modalLabel-1" aria-hidden="true" data-whatever="id" style="padding: auto; padding-top: 4%">
    <div class="modal-dialog" role="document" style="min-width: 1250px!important">
        <div class="modal-content" style="border-radius: 4px">
            <div class="modal-header">
                <h5 class="modal-title text-primary" id="groups-modalLabel-1">Danh mục thiết bị</h5>
            </div>
            <div class="modal-body" style="padding: 0px 15px 15px 15px">
                <div class="row ibox-footer border-top-0 mt-3">
                    <div class="col-md-4 col-sm-4 col-xs-4">
                        <div class="row form-group">
                            <label class="col-md-4 col-sm-6 col-xs-6 col-form-label" style="text-align: right;">Số xe</label>
                            <input id="TruckNo" class="col-md-6 col-sm-6 col-xs-6 form-control form-control-sm border-e" placeholder="Số xe" readonly>
                        </div>
                        <div class="row form-group">
                            <label class="col-md-4 col-sm-6 col-xs-6 col-form-label">Thời gian bắt đầu</label>
                            <input id="TimeStart" class="col-md-6 col-sm-6 col-xs-6 form-control form-control-sm border-e" placeholder="Thời gian bắt đầu" readonly>
                        </div>
                        <div class="row form-group">
                            <div class="col-md-12 col-sm-12 col-xs-12">
                                <button class="btn btn-sm btn-danger btn-labeled btn-labeled-left btn-icon btn-rounded" style="float: right; margin-right: 50px;" id="StopTransferCargo">
                                    <span class="btn-label"><i class="ti-close"></i></span>Hết hàng
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-8 col-sm-8 col-xs-8 table-responsive">
                        <table id="tblEquipment" class="table table-striped display nowrap" cellspacing="0" style="width: 99.5%">
                            <thead>
                                <tr style="width: 100%">
                                    <th col-name="STT">STT</th>
                                    <th col-name="EqipmentTypeID">Mã loại thiết bị</th>
                                    <th col-name="EqipmentID">Mã thiết bị</th>
                                    <th col-name="EqipmentName">Tên thiết bị</th>
                                    <th col-name="IsOwn">Sở hữu</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <div style="margin: 0 auto!important;">
                    <button class="btn btn-sm btn-rounded btn-gradient-blue btn-labeled btn-labeled-left btn-icon" id="StartBulkJob">
                        <span class="btn-label"><i class="ti-check"></i></span>Bắt đầu</button>
                    <button class="btn btn-sm btn-rounded btn-gradient-peach btn-labeled btn-labeled-left btn-icon" id="FinishBulkJob">
                        <span class="btn-label"><i class="ti-close"></i></span>Hoàn tất</button>
                </div>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript">
    $(document).ready(function() {
        var _columns = ["STT", "StockRef", "VoyageKey", "IsLocalForeign", "ClassID", "BillOfLading", "BookingNo", "JobStatus", "JobTypeID", "JobTypeName", "BillOfLadingORBookingNo", "VINNo", "TransitID", "CarWeight", "JobModeInID", "MethodInID", "JobModeOutID", "MethodOutID", "DamagedTypeID", "DamagedID", "KeyCheck", "Block", "Bay", "Row", "Tier", "Area", "PaymentTypeID", /*"JobModeInOut", "MethodInOut",*/ "BillCheck", "Sequence", "Remark", "EirNo", "CargoType", "rowguid"],
            _vesselColumns = ["STT", "VoyageKey", "VesselID", "VesselName", "InboundVoyage", "OutboundVoyage", "ETA", "ETD", "Status", "InLane", "OutLane"],
            _equiqmentColumns = ["STT", "EquipmentTypeID", "EquipmentID", "EquipmentName", "IsOwn"],
            tbl = $("#contenttable"),
            tblVessel = $("#tblVessel"),
            tblEquipment = $("#tblEquipment"),
            vesselModal = $("#vessel-modal"),
            NTRoroModal = $("#NT-roro-modal"),
            NTBulkModal = $("#NT-bulk-modal"),
            stockList = {},
            jobTypeList = {},
            jobQuayList = {},
            damagedList = {},
            damagedTypeList = {};

        /*
        function fullScreen() {
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

        function lock(orientation) {
            fullScreen();
            screen.orientation.lock(orientation);
        }

        window.addEventListener("orientationchange", function() {
            if (window.orientation == 90 || window.orientation == -90) {
                window.lockOrientation("orientation");
            }
            else{
            }

        }, false);
        */

        $('.m-fullscreen-request').click(function() {
            openFullscreen();
            $(this).remove();
        });


        /* Get the element you want displayed in fullscreen */
        var elem = document.getElementsByClassName("m-fullscreen-request")[0];

        /* Function to open fullscreen mode */
        function openFullscreen() {
            if (elem.requestFullscreen) {
                elem.requestFullscreen();
            } else if (elem.mozRequestFullScreen) {
                /* Firefox */
                elem.mozRequestFullScreen();
            } else if (elem.webkitRequestFullscreen) {
                /* Chrome, Safari & Opera */
                elem.webkitRequestFullscreen();
            } else if (elem.msRequestFullscreen) {
                /* IE/Edge */
                elem.msRequestFullscreen();
            }
        }



        $('#NT').hide();
        $('#XT').hide();
        $('#DC').hide();
        $("#damagedDiv").hide();
        $("#mainContentDiv").hide();

        $('.ETA, .ETD').each((key, val) => {
            let text = $(val).text();
            $(val).text(getDateTime(text));
        });


        <?php if (isset($stockList) && count($stockList) >= 0) { ?>
            stockList = <?= json_encode($stockList); ?>;
        <?php } ?>

        <?php if (isset($jobTypeList) && count($jobTypeList) >= 0) { ?>
            jobTypeList = <?= json_encode($jobTypeList); ?>;
        <?php } ?>

        <?php if (isset($jobQuayList) && count($jobQuayList) >= 0) { ?>
            jobQuayList = <?= json_encode($jobQuayList); ?>;
        <?php } ?>

        <?php if (isset($damagedTypeList) && count($damagedTypeList) >= 0) { ?>
            damagedTypeList = <?= json_encode($damagedTypeList); ?>;
        <?php } ?>

        <?php if (isset($damagedList) && count($damagedList) >= 0) { ?>
            damagedList = <?= json_encode($damagedList); ?>;
        <?php } ?>

        var dataTable = tbl.newDataTable({
            scrollY: '55vh',
            columnDefs: [{
                    type: "num",
                    className: "text-center",
                    targets: _columns.indexOf('STT')
                },
                {
                    className: "text-center",
                    targets: _columns.getIndexs(['JobTypeName', 'BillOfLadingORBookingNo', 'VINNo', "JobModeInID", "MethodInID", /*'JobModeInOut', 'MethodInOut',*/ 'JobStatus', 'Remark'])
                },
                {
                    className: "hiden-input",
                    targets: _columns.getIndexs(["StockRef", "VoyageKey", "IsLocalForeign", "ClassID", "BillOfLading", "BookingNo", "TransitID", "CarWeight", "JobModeOutID", "MethodOutID", "DamagedTypeID", "DamagedID", "KeyCheck", "Block", "Bay", "Row", "Tier", "Area", "PaymentTypeID", "BillCheck", "Sequence", "JobTypeID", "EirNo", "CargoType", "rowguid"])
                },
            ],
            order: [
                [_columns.indexOf('STT'), 'asc']
            ],
            paging: false,
            keys: true,
            autoFill: {
                focus: 'focus'
            },
            select: true,
            rowReorder: false,
            buttons: [],
            arrayColumns: _columns,
        });
        tbl.editableTableWidget({
            editor: $("#status, #httt, #editor-input")
        });

        /* Initial vessel table */
        tblVessel.newDataTable({
            scrollY: '30vh',
            columnDefs: [{
                    type: "num",
                    className: "text-center",
                    targets: _vesselColumns.indexOf('STT')
                },
                {
                    className: "text-center",
                    targets: _vesselColumns.getIndexs(["VesselName", "InboundVoyage", "OutboundVoyage", "ETA", "ETD", "InLane", "OutLane"])
                },
                {
                    className: "hiden-input",
                    targets: _vesselColumns.getIndexs(["VoyageKey", "VesselID", "Status"])
                },
            ],
            order: [
                [_vesselColumns.indexOf('STT'), 'asc']
            ],
            paging: false,
            keys: true,
            autoFill: {
                focus: 'focus'
            },
            select: {
                style: 'single',
                info: false,
            },
            rowReorder: false,
            buttons: [],
            arrayColumns: _vesselColumns,
        });

        $('#vessel-modal').on('shown.bs.modal', function(e) {
            $($.fn.dataTable.tables(true)).DataTable().columns.adjust();
        });

        $("#VesselName").on('click', function() {
            vesselModal.modal('show');
            $("#mainContentDiv").show();
        });

        /* Initial equiment table */
        tblEquipment.newDataTable({
            scrollY: '30vh',
            columnDefs: [{
                    type: "num",
                    className: "text-center",
                    targets: _equiqmentColumns.indexOf('STT')
                },
                {
                    className: "text-center",
                    targets: _equiqmentColumns.getIndexs(["EquipmentTypeID", "EquipmentID", "EquipmentName", "IsOwn"])
                },
            ],
            order: [
                [_equiqmentColumns.indexOf('STT'), 'asc']
            ],
            paging: false,
            keys: true,
            autoFill: {
                focus: 'focus'
            },
            select: {
                style: 'single',
                info: false,
            },
            rowReorder: false,
            buttons: [],
            arrayColumns: _equiqmentColumns,
        });

        $('#NT-bulk-modal').on('shown.bs.modal', function(e) {
            $($.fn.dataTable.tables(true)).DataTable().columns.adjust();
        });


        $('#StartDate, #FinishDate').datetimepicker({
            controlType: 'select',
            oneLine: true,
            dateFormat: 'dd/mm/yy',
            timeFormat: 'HH:mm:00',
            timeInput: true,
            onSelect: function() {
                /* Do nothing */
            }
        });

        // Get current Date-Time String
        function returnDateTimeFormatString(d) {
            year = d.getFullYear();
            month = d.getMonth() + 1;
            day = d.getDate();
            hour = d.getHours(),
                min = d.getMinutes(),
                sec = d.getSeconds(),
                fillMonth = '',
                fillDay = '',
                fillHour = '',
                fillMin = '',
                fillSec = '';

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

            return (year + '-' + fillMonth + month + '-' + fillDay + day + " " + fillHour + hour + ":" + fillMin + min + ":" + fillSec + sec);
        }

        /*
        tbl.setExtendDropdown({
            target: "#cell-context",
            source: jobTypeList,
            colIndex: _columns.indexOf("JobTypeID"), 
            onSelected: function(cell, value){ 
                var jobTypeName = jobTypeList.filter( p => p.JobTypeID == value).map( x => x.JobTypeName );
                tbl.DataTable().cell(cell).data(
                    '<input class="hiden-input" value="'+ value  +'">' + jobTypeName
                ).draw(false);

                var rowIdx = tbl.DataTable().cell(cell).index()['row'];

                if(!tbl.DataTable().row( rowIdx ).nodes().to$().hasClass("addnew"))
                    tbl.DataTable().row( rowIdx ).nodes().to$().addClass("editing");

                NTRoroModal.modal('show');
            },
        }); 
        */

        $(document).on("dblclick", "#contenttable td", function(e) {
            var target = e['currentTarget'][''];
            if (target == _columns.indexOf("Remark")) {
                var row = e['target']['_DT_CellIndex'].row,
                    col = e['target']['_DT_CellIndex'].column,
                    cell = tbl.find("tbody tr:eq(" + row + ") td:eq(" + col + ")");
            }
        });

        $(document).on("click", "#contenttable td", function(e) {
            $('#NT').hide();
            $('#XT').hide();

            if (tbl.getSelectedRows().length > 0) {
                var JobModeID = tbl.getSelectedRows().data().toArray()[0][_columns.indexOf("JobModeInID")];

                if (JobModeID == 'NTAU') {
                    $('#NT').show();
                } else if (JobModeID == 'XGT') {
                    $('#XT').show();
                }
            } else {
                /* Do nothing */
            }
        });

        $("#NT").on('click', function() {
            $("#StartJob").show();

            var tblData = tbl.getSelectedRows().data().toArray()[0],
                CargoType = tblData[_columns.indexOf("CargoType")],
                VINNo = tblData[_columns.indexOf("VINNo")],
                Row = tblData[_columns.indexOf("Row")];

            /* RORO */
            if (CargoType == 'R') {
                $("#carPosition").val('');
                $("#Remark").val('');
                $("input[type='checkbox']").attr('checked', false);
                NTRoroModal.modal('show');

                if (Row) {
                    if (Row != 0) {
                        var Block = tblData[_columns.indexOf("Block")],
                            Bay = tblData[_columns.indexOf("Bay")],
                            Tier = tblData[_columns.indexOf("Tier")],
                            Remark = tblData[_columns.indexOf("Remark")],
                            carPosition = Block;

                        $("#Block").val(Block);
                        $("#Bay").val(Bay);
                        $("#Row").val(Row);
                        $("#Tier").val(Tier);

                        if (Bay < 10) {
                            carPosition += ('-' + '0' + Bay);
                        } else {
                            carPosition += ('-' + Bay);
                        }

                        if (Row < 10) {
                            carPosition += ('-' + '0' + Row);
                        } else {
                            carPosition += ('-' + Row);
                        }

                        if (Tier != 1) {
                            pos += '-' + Tier;
                        }

                        $("#carPosition").val(carPosition);
                        $("#Remark").val(Remark);
                        $("#StartJob").hide();
                    }
                }

                $("#VINNo").val(VINNo);
            } else if (CargoType == 'B') {
                updateEquipmentTable();
                NTBulkModal.modal('show');
                $("#TruckNo").val('');
                $("#TimeStart").val('');
            }
        });

        $("#XT").on('click', function() {
            /* Prepare data */
            var tblData = tbl.getSelectedRows().data().toArray()[0],
                VoyageKey = tblData[_columns.indexOf('VoyageKey')],
                JobModeInID = tblData[_columns.indexOf('JobModeInID')],
                MethodInID = tblData[_columns.indexOf('MethodInID')],
                BillOfLading = tblData[_columns.indexOf('BillOfLading')],
                BookingNo = tblData[_columns.indexOf('BookingNo')],
                Sequence = tblData[_columns.indexOf('Sequence')],
                EirNo = tblData[_columns.indexOf('EirNo')],
                TruckNo = tblData[_columns.indexOf('VINNo')],
                StockRef = tblData[_columns.indexOf('StockRef')];

            var updateQuayData = [{
                    'StockRef': StockRef,
                    'JobStatus': 'HT',
                    'FinishDate': getDateTimeFormatString(new Date()),
                    'JobModeOutID': JobModeInID,
                    'MethodOutID': MethodInID,
                    'Sequence': Sequence,
                    'EirNo': EirNo,
                    'TruckNo': TruckNo,
                }],
                updateQuayForm = {
                    'action': 'edit',
                    'child_action': 'updateQuayData',
                    'data_type': 'bulk',
                    'data': updateQuayData,
                };

            $.ajax({
                url: "<?= site_url(md5('tally')); ?>",
                dataType: 'json',
                data: updateQuayForm,
                type: 'POST',
                success: function(data) {
                    if (data.deny) {
                        toastr["error"](data.deny);
                        return;
                    }

                    toastr['success']('Cập nhật dữ liệu QUAY JOB thành công!');
                    tbl.DataTable().rows('.selected').remove().draw(false);
                    tbl.updateSTT(_columns.indexOf("STT"));
                },
                error: function(err) {
                    console.log(err);
                    return;
                }
            });

            var updateStockBulkData = [{
                    'VoyageKey': VoyageKey,
                    'BillOfLading': BillOfLading,
                    'BookingNo': BookingNo,
                    'JobModeOutID': JobModeInID,
                    'MethodOutID': MethodInID,
                }],
                updateStockBulkForm = {
                    'action': 'edit',
                    'child_action': 'updateStockBulkData',
                    'data': updateStockBulkData,
                };

            $.ajax({
                url: "<?= site_url(md5('tally')); ?>",
                dataType: 'json',
                data: updateStockBulkForm,
                type: 'POST',
                success: function(data) {
                    if (data.deny) {
                        toastr["error"](data.deny);
                        return;
                    }

                    toastr['success']('Cập nhật dữ liệu Stock (hàng rời) thành công!');
                    tbl.DataTable().rows('.selected').remove().draw(false);
                    tbl.updateSTT(_columns.indexOf("STT"));
                },
                error: function(err) {
                    console.log(err);
                    return;
                }
            });
        });

        $("#StartJob").on('click', function() {
            /* Get empty position */
            var tblData = tbl.getSelectedRows().data().toArray()[0],
                VINNo = tblData[_columns.indexOf("VINNo")],
                VoyageKey = tblData[_columns.indexOf("VoyageKey")],
                ClassID = tblData[_columns.indexOf("ClassID")],
                IsLocalForeign = tblData[_columns.indexOf("IsLocalForeign")],
                BillOfLading = ClassID == 1 ? tblData[_columns.indexOf("BillOfLading")] : '';

            $("#VINNo").val(VINNo);

            var formData = {
                'action': 'view',
                'child_action': 'getMinPos',
                'VoyageKey': VoyageKey,
                'ClassID': ClassID,
                'IsLocalForeign': IsLocalForeign,
                'BillOfLading': BillOfLading,
            }

            $.ajax({
                url: "<?= site_url(md5('tally')); ?>",
                dataType: 'json',
                data: formData,
                type: 'POST',
                success: function(data) {
                    if (data.list.length > 0) {
                        var rData;

                        for (k = 0; k < data.list.length; k++) {
                            if (data.list[k]['IsAvailable'] == 1) {
                                rData = data.list[k];
                                k = data.list.length;
                            }
                        }
                        $("#Block").val(rData['Block']);
                        $("#Bay").val(rData['Bay']);
                        $("#Row").val(rData['Row']);
                        $("#Tier").val(rData['Tier']);

                        /* Update value for contenttable */
                        var insertRow = tbl.getSelectedRows()['context'][0]["_select_lastCell"].row,
                            insertColRow = _columns.indexOf("Row"),
                            insertColBay = _columns.indexOf("Bay"),
                            insertColBlock = _columns.indexOf("Block"),
                            insertColTier = _columns.indexOf("Tier"),
                            cellRow = tbl.find("tbody tr:eq(" + insertRow + ") td:eq(" + insertColRow + ")"),
                            cellBay = tbl.find("tbody tr:eq(" + insertRow + ") td:eq(" + insertColBay + ")"),
                            cellBlock = tbl.find("tbody tr:eq(" + insertRow + ") td:eq(" + insertColBlock + ")"),
                            cellColumn = tbl.find("tbody tr:eq(" + insertRow + ") td:eq(" + insertColTier + ")");

                        tbl.DataTable().cell(cellRow).data(rData['Row']).draw(false);
                        tbl.DataTable().cell(cellBay).data(rData['Bay']).draw(false);
                        tbl.DataTable().cell(cellBlock).data(rData['Block']).draw(false);
                        tbl.DataTable().cell(cellColumn).data(rData['Tier']).draw(false);


                        /* Set car position */
                        var carPostion = '';

                        carPosition = rData['Block'];

                        if (parseInt(rData['Bay']) < 10) {
                            carPosition += ('-' + '0' + rData['Bay']);
                        } else {
                            carPosition += ('-' + rData['Bay']);
                        }

                        if (parseInt(rData['Row']) < 10) {
                            carPosition += ('-' + '0' + rData['Row']);
                        } else {
                            carPosition += ('-' + rData['Row']);
                        }

                        if (parseInt(rData['Tier']) != 1) {
                            carPosition += ('-' + rData['Tier']);
                        }

                        $("#carPosition").val(carPosition);


                        /* Get time start Job */
                        var date = new Date(),
                            StockRef = tbl.getSelectedRows().data().toArray()[0][_columns.indexOf('StockRef')],
                            row = tbl.getSelectedRows()['context'][0]["_select_lastCell"].row,
                            col = _columns.indexOf('JobStatus'),
                            cell = tbl.find("tbody tr:eq(" + row + ") td:eq(" + col + ")"),
                            Remark = $("#Remark").val();
                        /*
                            formData    = {
                                'action': 'edit',
                                'child_action': 'updateQuayJobStatus',
                                'StockRef': StockRef,
                                'Remark': Remark,
                                'JobStatus': 'BD',
                            };    

                        $.ajax({
                            url: "<?= site_url(md5('tally')); ?>",
                            dataType: 'json',
                            data: formData,
                            type: 'POST',
                            success: function (data) {
                                if(data.deny) {
                                    toastr["error"](data.deny);
                                    return;
                                }
                                
                                tbl.DataTable().cell(cell).data(
                                    '<input class="hiden-input" value="BD">Bắt đầu'
                                ).draw(false);

                                $("#StartDate").val((returnDateTimeFormatString(date)));

                                toastr['success']("Cập nhật trạng thái công việc thành công!");
                                return;
                            },
                            error: function(err){
                                console.log(err);
                                return;
                            }
                        });  
                        */

                        $("#StartDate").val((returnDateTimeFormatString(date)));

                        var data = [{
                                'StockRef': StockRef,
                                'JobStatus': 'BD',
                                'StartDate': getSQLDateTimeFormat($("#StartDate").val()),
                                'Block': $("#Block").val(),
                                'Bay': $("#Bay").val(),
                                'Row': $("#Row").val(),
                                'Tier': $("#Tier").val(),
                                'Area': '',
                                'Remark': Remark,
                            }],
                            yardJobFormData = {
                                'action': 'edit',
                                'child_action': 'updateQuayJobData',
                                'data': data,
                            };

                        $.ajax({
                            url: "<?= site_url(md5('tally')); ?>",
                            dataType: 'json',
                            data: yardJobFormData,
                            type: 'POST',
                            success: function(data) {
                                if (data.deny) {
                                    toastr["error"](data.deny);
                                    return;
                                }
                                tbl.DataTable().cell(cell).data(
                                    '<input class="hiden-input" value="BD">Bắt đầu'
                                ).draw(false);


                                toastr['success']("Thêm thành công dữ liệu YARD JOB!");
                            },
                            error: function(err) {
                                console.log(err);
                                return;
                            }
                        });

                        var updatePosFormData = {
                            'action': 'edit',
                            'child_action': 'updatePosNotAvailable',
                            'Block': $("#Block").val(),
                            'Bay': $("#Bay").val(),
                            'Row': $("#Row").val(),
                            'Tier': $("#Tier").val(),
                        };

                        $.ajax({
                            url: "<?= site_url(md5('tally')); ?>",
                            dataType: 'json',
                            data: updatePosFormData,
                            type: 'POST',
                            success: function(data) {
                                if (data.deny) {
                                    toastr["error"](data.deny);
                                    return;
                                }

                                toastr['success']("Cập nhật trạng thái vị trí Block thành công!");
                                return;
                            },
                            error: function(err) {
                                console.log(err);
                                return;
                            }
                        });

                        /* Socket real-time */
                        socket.emit('StartQuayJob', VINNo);

                        /* Out */
                        return;
                    }
                },
                error: function(err) {
                    console.log(err);
                    return;
                }
            });
        });

        $("#FinishJob").on('click', function() {
            /* Get time finish Job */
            var date = new Date();
            $("#FinishDate").val((returnDateTimeFormatString(date)));

            var tblData = tbl.getSelectedRows().data().toArray()[0]
            StockRef = tblData[_columns.indexOf('StockRef')],
                VoyageKey = tblData[_columns.indexOf('VoyageKey')],
                ClassID = tblData[_columns.indexOf('ClassID')],
                IsLocalForeign = tblData[_columns.indexOf('IsLocalForeign')],
                BillOfLading = tblData[_columns.indexOf('BillOfLading')],
                VINNo = tblData[_columns.indexOf('VINNo')],
                JobModeID = tblData[_columns.indexOf('JobModeInID')],
                MethodID = tblData[_columns.indexOf('MethodInID')],
                PaymentTypeID = tblData[_columns.indexOf('PaymentTypeID')],
                BillCheck = tblData[_columns.indexOf('BillCheck')],
                KeyNo = tblData[_columns.indexOf('KeyCheck')],
                CarWeight = tblData[_columns.indexOf('CarWeight')],
                JobTypeID = tblData[_columns.indexOf('JobTypeID')],
                Sequence = tblData[_columns.indexOf('Sequence')],
                row = tbl.getSelectedRows()['context'][0]["_select_lastCell"].row,
                col = _columns.indexOf('JobStatus'),
                cell = tbl.find("tbody tr:eq(" + row + ") td:eq(" + col + ")"),
                Remark = $("#Remark").val(),
                data = [{
                    'StockRef': StockRef,
                    'JobStatus': 'HT',
                    'FinishDate': getSQLDateTimeFormat($("#FinishDate").val()),
                    'Area': '',
                    'Remark': Remark,

                }],
                formData = {
                    'action': 'edit',
                    'child_action': 'updateQuayJobData',
                    'data': data,
                };

            /* Socket real-time */
            socket.emit('FinishQuayJob', VINNo);

            var yardJobData = [{
                    'StockRef': StockRef,
                    'VoyageKey': VoyageKey,
                    'JobStatus': 'KT',
                    'ClassID': ClassID,
                    'IsLocalForeign': IsLocalForeign,
                    'BillOfLading': BillOfLading,
                    'BookingNo': '',
                    'VINNo': VINNo,
                    'JobModeID': JobModeID,
                    'MethodID': MethodID,
                    'JobTypeID': JobTypeID,
                    'PaymentTypeID': PaymentTypeID,
                    'StartDate': getSQLDateTimeFormat($("#FinishDate").val()),
                    'FinishDate': '',
                    'BillCheck': BillCheck,
                    'KeyNo': KeyNo,
                    'OldBlock': '',
                    'OldBay': '',
                    'OldRow': '',
                    'OldTier': '',
                    'OldArea': '',
                    'Block': $("#Block").val(),
                    'Bay': $("#Bay").val(),
                    'Row': $("#Row").val(),
                    'Tier': $("#Tier").val(),
                    'Area': '',
                    'Remark': Remark,
                    'EirNo': '',
                    'PinCode': '',
                    'Sequence': Sequence,
                    'WorkGroupID': '',
                    'CargoType': 'R',
                }],
                yardJobFormData = {
                    'action': 'add',
                    'child_action': 'addYardJob',
                    'data': yardJobData,
                };

            $.ajax({
                url: "<?= site_url(md5('tally')); ?>",
                dataType: 'json',
                data: formData,
                type: 'POST',
                success: function(data) {
                    if (data.deny) {
                        toastr["error"](data.deny);
                        return;
                    }

                    toastr['success']("Cập nhật dữ liệu QUAY JOB thành công!");

                    tbl.waitingLoad();

                    var VoyageKey = $("#VoyageKey").val(),
                        formData = {
                            'action': 'view',
                            'child_action': 'loadJobQuayList',
                            'VoyageKey': VoyageKey,
                        };


                    $.ajax({
                        url: "<?= site_url(md5('tally')); ?>",
                        dataType: 'json',
                        data: formData,
                        type: 'POST',
                        success: function(data) {
                            var rows = [],
                                index = 0;
                            if (data.list.length > 0) {
                                for (i = 0; i < data.list.length; i++) {
                                    var rData = data.list[i],
                                        r = [];
                                    if (rData['JobStatus'] == 'KT' || rData['JobStatus'] == 'BD') {
                                        $.each(_columns, function(idx, colname) {
                                            var val = "";
                                            switch (colname) {
                                                case "STT":
                                                    val = ++index;
                                                    break;
                                                case "JobStatus":
                                                    if (rData[colname] == 'KT') {
                                                        val = '<input class="hiden-input" value="KT">Khởi tạo';
                                                    } else {
                                                        val = '<input class="hiden-input" value="BD">Bắt đầu';
                                                    }
                                                    break;
                                                case "JobTypeID":
                                                    val = 'DF';
                                                    break;
                                                case "JobTypeName":
                                                    val = 'Dở tàu';
                                                    break;
                                                case "CarWeight":
                                                case "DamagedTypeID":
                                                case "DamagedID":
                                                    val = '';
                                                    break;
                                                case "BillOfLadingORBookingNo":
                                                    if (rData['BillOfLading']) {
                                                        val = rData['BillOfLading'];
                                                    } else {
                                                        if (rData['BookingNo']) {
                                                            val = rData['BookingNo'];
                                                        }
                                                    }
                                                    break;
                                                default:
                                                    val = '';
                                                    if (rData[colname] != '') {
                                                        val = rData[colname];
                                                    }
                                                    break;
                                            }
                                            r.push(val);
                                        });
                                        rows.push(r);
                                    }
                                }
                            }

                            tbl.dataTable().fnClearTable();
                            if (rows.length > 0) {
                                tbl.dataTable().fnAddData(rows);
                            }
                        },
                        error: function(err) {
                            console.log(err);
                            return;
                        }
                    });

                },
                error: function(err) {
                    console.log(err);
                    return;
                }
            });

            /* Update the position is available */
            /*
            var updatePosFormData = {
                'action': 'edit',
                'child_action': 'updatePosAvailable',
                'Block': $("#Block").val(),
                'Bay': $("#Bay").val(),
                'Row': $("#Row").val(),
                'Tier': $("#Tier").val(),
            };          

            $.ajax({
                url: "<?= site_url(md5('tally')); ?>",
                dataType: 'json',
                data: updatePosFormData,
                type: 'POST',
                success: function (data) {
                    if(data.deny) {
                        toastr["error"](data.deny);
                        return;
                    }

                    toastr['success']("Cập nhật trạng thái vị trí Block thành công!");
                    return;
                },
                error: function(err){
                    console.log(err);
                    return;
                }
            });  
            */

            /* Add damaged data */
            if ($('input[type="checkbox"][name="chbDamaged"]').is(":checked")) {
                var data = [];
                for (i = 0; i < damagedList.length; i++) {
                    if ($("#chb" + damagedList[i]['DamagedID']).is(':checked')) {
                        var objData = {
                            'StockRef': StockRef,
                            'VoyageKey': VoyageKey,
                            'VINNo': VINNo,
                            'DamagedID': damagedList[i]['DamagedID'],
                        }
                        data.push(objData);
                    }
                }

                if (data.length > 0) {
                    var formData = {
                        'action': 'add',
                        'child_action': 'addDamagedDetails',
                        'data': data,
                    };

                    $.ajax({
                        url: "<?= site_url(md5('tally')); ?>",
                        dataType: 'json',
                        data: formData,
                        type: 'POST',
                        success: function(data) {
                            if (data.deny) {
                                toastr["error"](data.deny);
                                return;
                            }

                            toastr['success']("Lưu danh sách hư hỏng thành công!");
                        },
                        error: function(err) {
                            console.log(err);
                            return;
                        }
                    });
                }
            }

            $.ajax({
                url: "<?= site_url(md5('tally')); ?>",
                dataType: 'json',
                data: yardJobFormData,
                type: 'POST',
                success: function(data) {
                    if (data.deny) {
                        toastr["error"](data.deny);
                        return;
                    }

                    toastr['success']("Thêm thành công dữ liệu YARD JOB!");

                    var data = [{
                        'Block': $("#Block").val(),
                        'Bay': $("#Bay").val(),
                        'Row': $("#Row").val(),
                        'Tier': $("#Tier").val(),
                        'VINNo': VINNo,
                    }];
                    socket.emit('TransferToYardJob', JSON.stringify(data));
                },
                error: function(err) {
                    console.log(err);
                    return;
                }
            });

            var updateStockVMStatusFormData = {
                'action': 'edit',
                'child_action': 'updateStockVMStatus',
                'StockRef': StockRef,
                'VMStatus': 'I',
                'Remark': Remark,
            };

            $.ajax({
                url: "<?= site_url(md5('tally')); ?>",
                dataType: 'json',
                data: updateStockVMStatusFormData,
                type: 'POST',
                success: function(data) {
                    if (data.deny) {
                        toastr["error"](data.deny);
                        return;
                    }

                    toastr['success']("Cập nhật trạng thái Biến động bãi thành công!");
                },
                error: function(err) {
                    console.log(err);
                    return;
                }
            });

            NTRoroModal.modal('hide');
        });

        $("#closeButton").on('click', function() {
            NTRoroModal.modal('hide');
        });

        $("#StartBulkJob").on('click', function() {
            if (!($("#TruckNo").val())) {
                toastr['error']("Vui lòng nhập chọn thiết bị!");
                return;
            }

            var d = new Date();
            $("#TimeStart").val(returnDateTimeFormatString(d));

            var tblData = tbl.getSelectedRows().data().toArray()[0],
                rowguid = tblData[_columns.indexOf('rowguid')],
                updateQuayBulkJobForm = {
                    'action': 'edit',
                    'child_action': 'updateQuayBulkJobData',
                    'rowguid': rowguid,
                    'TruckNo': $("#TruckNo").val(),
                    'JobStatus': 'BD',
                    'StartDate': getDateTimeFormatString(d),
                };

            $.ajax({
                url: "<?= site_url(md5('tally')); ?>",
                dataType: 'json',
                data: updateQuayBulkJobForm,
                type: 'POST',
                success: function(data) {
                    if (data.deny) {
                        toastr["error"](data.deny);
                        return;
                    }
                    toastr['success']('Cập nhật dữ liệu QUAY JOB thành công!');
                },
                error: function(err) {
                    console.log(err);
                    return;
                }
            });
        });

        $("#FinishBulkJob").on('click', function() {
            var d = new Date();
            tblData = tbl.getSelectedRows().data().toArray()[0],
                rowguid = tblData[_columns.indexOf('rowguid')],
                StockRef = tblData[_columns.indexOf('StockRef')],
                /*
                updateQuayBulkJobForm = {
                    'action': 'edit',
                    'child_action': 'updateQuayBulkJobData',
                    'rowguid': rowguid,
                    'JobStatus': 'HT',
                    'FinishDate': getDateTimeFormatString(d),
                };
                */
                stockInData = [{
                    'StockRef': StockRef,
                    'EirNo': '',
                    'DateIn': getDateTimeFormatString(d),
                    'TruckNo': $("#TruckNo").val(),
                    'CargoWeightGetIn': '',
                    'UnitID': 'TNE',
                    'UnitID': '',
                    'Sequence': 1,
                    'IsFinish': 0,
                }],
                stockInBulkForm = {
                    'action': 'add',
                    'child_action': 'addStockInBulkData',
                    'data': stockInData,
                };

            NTBulkModal.modal('hide');

            /*
            $.ajax({
                url: "<?= site_url(md5('tally')); ?>",
                dataType: 'json',
                data: updateQuayBulkJobForm,
                type: 'POST',
                success: function (data) {
                    if(data.deny) {
                        toastr["error"](data.deny);
                        return;
                    }
                    toastr['success']('Cập nhật dữ liệu QUAY JOB thành công!');
                    reloadTableData();

                },
                error: function(err){
                    console.log(err);
                    return;
                }
            }); 
            */

            $.ajax({
                url: "<?= site_url(md5('tally')); ?>",
                dataType: 'json',
                data: stockInBulkForm,
                type: 'POST',
                success: function(data) {
                    if (data.deny) {
                        toastr["error"](data.deny);
                        return;
                    }
                    toastr['success']('Thêm dữ liệu STOCK IN thành công!');
                    reloadTableData();
                },
                error: function(err) {
                    console.log(err);
                    return;
                }
            });
        });

        $(document).on("click", "#tblEquipment td", function(e) {
            var tblEquipmentData = tblEquipment.getSelectedRows().data().toArray()[0],
                EquipmentID = tblEquipmentData[_equiqmentColumns.indexOf('EquipmentID')];

            $("#TruckNo").val(EquipmentID);
        });


        /* Add code from footer file */
        $('#sidebar-collapse').slimScroll({
            height: "100%",
            railOpacity: "0.9"
        });
        toastr.options = {
            "closeButton": false,
            "debug": false,
            "newestOnTop": false,
            "progressBar": false,
            "positionClass": "toast-top-right",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "1000",
            "hideDuration": "1000",
            "timeOut": "5000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "swing",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        };

        $('a.nav-link.sidebar-toggler.js-sidebar-toggler').on('click', function() {
            setTimeout(function() {
                $('.dataTable tbody').closest('table').each(function(k, v) {
                    $(v).realign();
                });
            }, 250);
        });

        function reloadTableData() {
            tbl.waitingLoad();

            var VoyageKey = tblVessel.getSelectedRows().data().toArray()[0][_vesselColumns.indexOf("VoyageKey")],
                formData = {
                    'action': 'view',
                    'child_action': 'loadJobQuayList',
                    'VoyageKey': VoyageKey,
                };

            $("#VoyageKey").val(VoyageKey);

            $.ajax({
                url: "<?= site_url(md5('tally')); ?>",
                dataType: 'json',
                data: formData,
                type: 'POST',
                success: function(data) {
                    var rows = [],
                        index = 0;
                    if (data.list.length > 0) {
                        for (i = 0; i < data.list.length; i++) {
                            var rData = data.list[i],
                                r = [];
                            if (rData['JobStatus'] == 'KT' || rData['JobStatus'] == 'BD') {
                                $.each(_columns, function(idx, colname) {
                                    var val = "";
                                    switch (colname) {
                                        case "STT":
                                            val = ++index;
                                            break;
                                        case "JobStatus":
                                            if (rData[colname] == 'KT') {
                                                val = '<input class="hiden-input" value="KT">Khởi tạo';
                                            } else {
                                                val = '<input class="hiden-input" value="BD">Bắt đầu';
                                            }
                                            break;
                                        case "JobTypeID":
                                            val = 'DF';
                                            break;
                                        case "JobTypeName":
                                            val = 'Dở tàu';
                                            break;
                                        case "BillOfLadingORBookingNo":
                                            if (rData['BillOfLading']) {
                                                val = rData['BillOfLading'];
                                            } else {
                                                if (rData['BookingNo']) {
                                                    val = rData['BookingNo'];
                                                }
                                            }
                                            break;
                                            /*
                                            case "JobModeInOut":
                                                if (rData['JobModeInID']){
                                                    val += rData['JobModeInID'];
                                                }
                                                else{
                                                    val += '<i>Không có phương án vào</i>';
                                                }
                                                                                            
                                                val += " | ";
                                                
                                                if (rData['JobModeOutID']){
                                                    val += rData['JobModeOutID'];
                                                }
                                                else{
                                                    val += '<i>Không có phương án ra</i>';
                                                }
                                                break;
                                            case "MethodInOut":
                                                if (rData['MethodInID']){
                                                    val += rData['MethodInID'];
                                                }
                                                else{
                                                    val += '<i>Không có phương thức vào</i>';
                                                }
                                                                                            
                                                val += " | ";
                                                
                                                if (rData['MethodOutID']){
                                                    val += rData['MethodOutID'];
                                                }
                                                else{
                                                    val += '<i>Không có phương thức ra</i>';
                                                }
                                                break;
                                            */
                                        case "CarWeight":
                                        case "DamagedTypeID":
                                        case "DamagedID":
                                            break;
                                        case "VINNo":
                                            if (rData['TruckNo'] != '' && rData[colname] != null) {
                                                val = rData[colname];
                                            } else if (rData['TruckNo'] != '') {
                                                val = rData['TruckNo'];
                                            }
                                            break;
                                        default:
                                            if (rData[colname] != '' && rData[colname] != null) {
                                                val = rData[colname];
                                            } else {
                                                /* Do nothing */
                                            }
                                            break;
                                    }
                                    r.push(val);
                                });
                                rows.push(r);
                            }
                        }
                    }

                    tbl.dataTable().fnClearTable();
                    if (rows.length > 0) {
                        tbl.dataTable().fnAddData(rows);
                    }
                },
                error: function(err) {
                    console.log(err);
                    return;
                }
            });
        }

        tblVessel.find("tbody tr").on("dblclick", function() {
            var vesselData = tblVessel.getSelectedRows().data().toArray()[0];

            $("#VesselName").val(vesselData[_vesselColumns.indexOf('VesselName')]);
            $("#InOutBoundVoyage").val(vesselData[_vesselColumns.indexOf('InboundVoyage')] + " | " + vesselData[_vesselColumns.indexOf('OutboundVoyage')]);

            vesselModal.modal('hide');
            reloadTableData();
        });

        $("#apply-vessel").on('click', function() {
            if (tblVessel.getSelectedRows().length == 0) {
                toastr['error']("Vui lòng chọn tàu!");
                return;
            } else {
                var vesselData = tblVessel.getSelectedRows().data().toArray()[0],
                    VoyageKey = vesselData[_vesselColumns.indexOf("VoyageKey")];

                $("#VesselName").val(vesselData[_vesselColumns.indexOf('VesselName')]);
                $("#InOutBoundVoyage").val(vesselData[_vesselColumns.indexOf('InboundVoyage')] + "|" + vesselData[_vesselColumns.indexOf('OutboundVoyage')]);

                vesselModal.modal('hide');

                $("#VoyageKey").val(VoyageKey);

                tbl.waitingLoad();

                var formData = {
                    'action': 'view',
                    'child_action': 'loadJobQuayList',
                    'VoyageKey': VoyageKey,
                };

                $.ajax({
                    url: "<?= site_url(md5('tally')); ?>",
                    dataType: 'json',
                    data: formData,
                    type: 'POST',
                    success: function(data) {
                        var rows = [],
                            index = 1;
                        if (data.list.length > 0) {
                            for (i = 0; i < data.list.length; i++) {
                                var rData = data.list[i],
                                    r = [];
                                if (rData['JobStatus'] == 'KT' || rData['JobStatus'] == 'BD') {
                                    $.each(_columns, function(idx, colname) {
                                        var val = "";
                                        switch (colname) {
                                            case "STT":
                                                val = index++;
                                                break;
                                            case "JobStatus":
                                                val = '<input class="hiden-input" value="KT">Khởi tạo';
                                                break;
                                            case "JobTypeID":
                                                val = 'DF';
                                                break;
                                            case "JobTypeName":
                                                val = 'Dở tàu';
                                                break;
                                            case "CarWeight":
                                            case "DamagedTypeID":
                                            case "DamagedID":
                                                break;
                                            case "BillOfLadingORBookingNo":
                                                if (rData['BillOfLading']) {
                                                    val = rData['BillOfLading'];
                                                } else {
                                                    if (rData['BookingNo']) {
                                                        val = rData['BookingNo'];
                                                    }
                                                }
                                                break;
                                            case "VINNo":
                                                if (rData[colname] != null) {
                                                    val = rData[colname];
                                                } else if (rData['TruckNo'] != '') {
                                                    val = rData['TruckNo'];
                                                }
                                                break;
                                            default:
                                                if (rData[colname] != '' && rData[colname] != null) {
                                                    val = rData[colname];
                                                } else {
                                                    /* Do nothing */
                                                }
                                                break;
                                        }
                                        r.push(val);
                                    });
                                    rows.push(r);
                                }
                            }

                            tbl.dataTable().fnClearTable();
                            if (rows.length > 0) {
                                tbl.dataTable().fnAddData(rows);
                            }
                        }
                    },
                    error: function(err) {
                        console.log(err);
                        return;
                    }
                });
            }
        });

        /* SOCKET */
        socket.on('StartQuayJob', function(data) {
            var VINNo = data,
                index = tbl.filterRowIndexes(_columns.indexOf("VINNo"), VINNo);
            row = parseInt(tbl.DataTable().rows(index).data()['selector'].rows[0]),
                col = _columns.indexOf('JobStatus');

            if (row >= 0) {
                var cell = tbl.find("tbody tr:eq(" + row + ") td:eq(" + col + ")"),
                    value = '<input class="hiden-input" value="BD">Bắt đầu';
                tbl.DataTable().cell(cell).data(value).draw(false);
            }
        });

        socket.on('FinishQuayJob', function(data) {
            var VINNo = data,
                index = tbl.filterRowIndexes(_columns.indexOf("VINNo"), VINNo);

            tbl.DataTable().rows(index).remove().draw(false);
            tbl.updateSTT(_columns.indexOf("STT"));
        });

        socket.on('reloadJobQuay', function(data) {
            reloadDatatables();
        });

        socket.on('transferDataFromBulkManifest', function(data) {
            var data = JSON.parse(data);

            tbl.waitingLoad();

            if ($("#VoyageKey").val() && $("#VoyageKey").val() == data[0]['VoyageKey']) {
                var formData = {
                    'action': 'view',
                    'child_action': 'loadJobQuayList',
                    'VoyageKey': $("#VoyageKey").val(),
                };

                $.ajax({
                    url: "<?= site_url(md5('tally')); ?>",
                    dataType: 'json',
                    data: formData,
                    type: 'POST',
                    success: function(data) {
                        var rows = [],
                            index = 1;
                        if (data.list.length > 0) {
                            for (i = 0; i < data.list.length; i++) {
                                var rData = data.list[i],
                                    r = [];
                                if (rData['JobStatus'] == 'KT' || rData['JobStatus'] == 'BD') {
                                    $.each(_columns, function(idx, colname) {
                                        var val = "";
                                        switch (colname) {
                                            case "STT":
                                                val = index++;
                                                break;
                                            case "JobStatus":
                                                val = '<input class="hiden-input" value="KT">Khởi tạo';
                                                break;
                                            case "JobTypeID":
                                                val = 'DF';
                                                break;
                                            case "JobTypeName":
                                                val = 'Dở tàu';
                                                break;
                                            case "CarWeight":
                                            case "DamagedTypeID":
                                            case "DamagedID":
                                                break;
                                            case "BillOfLadingORBookingNo":
                                                if (rData['BillOfLading']) {
                                                    val = rData['BillOfLading'];
                                                } else {
                                                    if (rData['BookingNo']) {
                                                        val = rData['BookingNo'];
                                                    }
                                                }
                                                break;
                                            case "VINNo":
                                                if (rData[colname] != null) {
                                                    val = rData[colname];
                                                } else if (rData['TruckNo'] != '') {
                                                    val = rData['TruckNo'];
                                                }
                                                break;
                                            default:
                                                if (rData[colname] != '' && rData[colname] != null) {
                                                    val = rData[colname];
                                                } else {
                                                    /* Do nothing */
                                                }
                                                break;
                                        }
                                        r.push(val);
                                    });
                                    rows.push(r);
                                }
                            }

                            tbl.dataTable().fnClearTable();
                            if (rows.length > 0) {
                                tbl.dataTable().fnAddData(rows);
                            }
                        }
                    },
                    error: function(err) {
                        tbl.dataTable().fnClearTable();
                        console.log(err);
                        return;
                    }
                });
            }
        });

        function reloadDatatables() {
            if ($("#VoyageKey").val()) {
                tbl.waitingLoad();

                var VoyageKey = $("#VoyageKey").val(),
                    formData = {
                        'action': 'view',
                        'child_action': 'loadJobQuayList',
                        'VoyageKey': VoyageKey,
                    };

                $.ajax({
                    url: "<?= site_url(md5('tally')); ?>",
                    dataType: 'json',
                    data: formData,
                    type: 'POST',
                    success: function(data) {
                        var rows = [],
                            index = 0;
                        if (data.list.length > 0) {
                            for (i = 0; i < data.list.length; i++) {
                                var rData = data.list[i],
                                    r = [];
                                if (rData['JobStatus'] == 'KT' || rData['JobStatus'] == 'BD') {
                                    $.each(_columns, function(idx, colname) {
                                        var val = "";
                                        switch (colname) {
                                            case "STT":
                                                val = ++index;
                                                break;
                                            case "JobStatus":
                                                if (rData[colname] == 'KT') {
                                                    val = '<input class="hiden-input" value="KT">Khởi tạo';
                                                } else {
                                                    val = '<input class="hiden-input" value="BD">Bắt đầu';
                                                }
                                                break;
                                            case "JobTypeID":
                                                val = 'DF';
                                                break;
                                            case "JobTypeName":
                                                val = 'Dở tàu';
                                                break;
                                            case "CarWeight":
                                            case "DamagedTypeID":
                                            case "DamagedID":
                                                break;
                                            case "BillOfLadingORBookingNo":
                                                if (rData['BillOfLading']) {
                                                    val = rData['BillOfLading'];
                                                } else {
                                                    if (rData['BookingNo']) {
                                                        val = rData['BookingNo'];
                                                    }
                                                }
                                                break;
                                            default:
                                                if (rData[colname] != '') {
                                                    val = rData[colname];
                                                } else {
                                                    /* Do nothing */
                                                }
                                                break;
                                        }
                                        r.push(val);
                                    });
                                    rows.push(r);
                                }
                            }
                        }

                        tbl.dataTable().fnClearTable();
                        if (rows.length > 0) {
                            tbl.dataTable().fnAddData(rows);
                        }
                    },
                    error: function(err) {
                        console.log(err);
                        return;
                    }
                });
            }
        }

        $("#close-vessel").on('click', function() {
            if ($("#VesselName").val() == '') {
                toastr['error']("Vui lòng chọn tàu!");
                return;
            } else {
                vesselModal.modal('hide');
            }
        });


        $('input[type="checkbox"][name="chbDamaged"]').change(function() {
            if (this.checked) {
                $("#damagedDiv").show();
            } else {
                $("#damagedDiv").hide();
            }
        });

        function getDateTimeFormatString(d) {
            year = d.getFullYear();
            month = d.getMonth() + 1;
            day = d.getDate();
            hour = d.getHours(),
                min = d.getMinutes(),
                sec = d.getSeconds(),
                fillMonth = '',
                fillDay = '',
                fillHour = '',
                fillMin = '',
                fillSec = '';

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

        function updateEquipmentTable() {
            var formData = {
                'action': 'view',
                'child_action': 'loadEquipmentList',
            };

            tblEquipment.waitingLoad();
            $.ajax({
                url: "<?= site_url(md5('tally')); ?>",
                dataType: 'json',
                data: formData,
                type: 'POST',
                success: function(data) {
                    var rows = [],
                        index = 1;

                    if (data.list.length > 0) {
                        for (i = 0; i < data.list.length; i++) {
                            var rData = data.list[i],
                                r = [];
                            //if (rData['EquipmentTypeID'] == ''){
                            $.each(_equiqmentColumns, function(idx, colname) {
                                var val = "";
                                switch (colname) {
                                    case "STT":
                                        val = index++;
                                        break;
                                    case "IsOwn":
                                        val = '<label class="checkbox checkbox-success"><input type="checkbox"' + (rData[colname] == 1 ? "checked" : "") + '><span class="input-span"></span></label>';
                                        break;
                                    default:
                                        val = rData[colname];
                                        break;
                                }
                                r.push(val);
                            });
                            rows.push(r);
                            //}
                        }
                    }

                    tblEquipment.dataTable().fnClearTable();
                    if (rows.length > 0) {
                        tblEquipment.dataTable().fnAddData(rows);
                    }
                },
                error: function(err) {
                    tblEquipment.dataTable().fnClearTable();
                    console.log(err);
                    return;
                }
            });
        }

        tblEquipment.on('change', 'tbody tr td input[type="checkbox"]', function(e) {
            var inp = $(e.target);
            if (inp.is(":checked")) {
                inp.attr("checked", "");
                inp.val("1");
            } else {
                inp.removeAttr("checked");
                inp.val("0");
            }

            var crCell = inp.closest('td');
            var crRow = inp.closest('tr');
            var eTable = tblEquipment.DataTable();

            eTable.cell(crCell).data(crCell.html()).draw(false);
            if (!crRow.hasClass("addnew")) {
                eTable.row(crRow).nodes().to$().addClass("editing");
            }
        });

        $("#StopTransferCargo").on('click', function() {
            var tblData = tbl.getSelectedRows().data().toArray()[0],
                VoyageKey = tblData[_columns.indexOf('VoyageKey')],
                JobModeInID = tblData[_columns.indexOf('JobModeInID')],
                MethodInID = tblData[_columns.indexOf('MethodInID')],
                BillOfLading = tblData[_columns.indexOf('BillOfLading')],
                BookingNo = tblData[_columns.indexOf('BookingNo')],
                Sequence = tblData[_columns.indexOf('Sequence')],
                EirNo = tblData[_columns.indexOf('EirNo')],
                TruckNo = tblData[_columns.indexOf('VINNo')],
                StockRef = tblData[_columns.indexOf('StockRef')];

            var updateQuayData = [{
                    'StockRef': StockRef,
                    'JobStatus': 'HT',
                    'FinishDate': getDateTimeFormatString(new Date()),
                    'JobModeOutID': JobModeInID,
                    'MethodOutID': MethodInID,
                    'Sequence': Sequence,
                    'EirNo': EirNo,
                    'TruckNo': TruckNo,
                }],
                updateQuayForm = {
                    'action': 'edit',
                    'child_action': 'updateQuayData',
                    'data_type': 'bulk',
                    'data': updateQuayData,
                };

            $.confirm({
                title: 'Thông báo!',
                type: 'orange',
                icon: 'fa fa-warning',
                content: 'Xác nhận hết hàng cho record này?',
                buttons: {
                    ok: {
                        text: 'Đồng ý',
                        btnClass: 'btn-warning',
                        keys: ['Enter'],
                        action: function() {
                            NTBulkModal.modal('hide');

                            $.ajax({
                                url: "<?= site_url(md5('tally')); ?>",
                                dataType: 'json',
                                data: updateQuayForm,
                                type: 'POST',
                                success: function(data) {
                                    if (data.deny) {
                                        toastr["error"](data.deny);
                                        return;
                                    }

                                    toastr['success']('Cập nhật dữ liệu thành công!');
                                    tbl.DataTable().rows('.selected').remove().draw(false);
                                    tbl.updateSTT(_columns.indexOf("STT"));
                                },
                                error: function(err) {
                                    console.log(err);
                                    return;
                                }
                            });
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

        // Get current Date-Time String
        function returnDateTimeFormatString(d) {
            year = d.getFullYear();
            month = d.getMonth() + 1;
            day = d.getDate();
            hour = d.getHours(),
                min = d.getMinutes(),
                sec = d.getSeconds(),
                fillMonth = '',
                fillDay = '',
                fillHour = '',
                fillMin = '',
                fillSec = '';

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

            return (fillDay + day + '/' + fillMonth + month + '/' + year + ' ' + fillHour + hour + ':' + fillMin + min + ':' + fillSec + sec);
        }

        function getSQLDateTimeFormat(date) {
            if (date.substring(2, 3) == '/')
                return date.substring(6, 10) + '-' + date.substring(3, 5) + '-' + date.substring(0, 2) + date.substring(10, date.length);
            else
                return date;
        }

        // Remove class error when change value
        $(document).on('input', '.error input', function() {
            $(this).parent().removeClass('error');
        });

        /* ------------------------------------------------------- */
        $('[data-action="reloadUI"]').on('click', function(e) {
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
<script src="<?= base_url('assets/vendors/bootstrap-select/dist/js/bootstrap-select.min.js'); ?>"></script>

<script>
    var resizefunc = [];

    $.extend(true, $.fn.dataTable.defaults, {
        language: {
            info: "Số dòng: _TOTAL_",
            emptyTable: "------------ Không có dữ liệu hiển thị ------------",
            infoFiltered: "(trên _MAX_ dòng)",
            infoEmpty: "Số dòng: 0",
            search: '<span>Tìm:</span> _INPUT_',
            zeroRecords: "------------ Không có dữ liệu được tìm thấy ------------",
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
        buttons: [{
                extend: 'selectAll',
                text: 'Chọn tất cả',
                className: 'btn btn-xs btn-default'
            },
            {
                extend: 'selectNone',
                text: 'Bỏ chọn',
                className: 'btn btn-xs btn-default'
            }
        ],
        destroy: true
    });
</script>
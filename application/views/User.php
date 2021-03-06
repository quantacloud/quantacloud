<?php
    /* User view - main page (files management) */
    use \library\MVC as l;
    $_t = new l\Template(self::$txt->Global->user);

    $_t->addCss([
	    'Interface/box',
	    'Interface/MessageBox',
	    'Interface/progress_bar',
		'2018/style',
		'2018/transfers',
		'2018/tree',
		'2018/selection'
	])->addJs([
		'Interface/modules/Arrows',
		'Interface/modules/Box',
		'Interface/modules/Decryption',
		'Interface/modules/Encryption',
		'Interface/modules/ExtIcons',
		'Interface/modules/Favorites',
		'Interface/modules/Files',
		'Interface/modules/Folders',
	    'Interface/modules/MessageBox',
		'Interface/modules/Move',
		'Interface/modules/Rm',
		'Interface/modules/Selection',
		'Interface/modules/Time',
	    'Interface/modules/Transfers',
		'Interface/modules/Trash',
		'Interface/modules/Upload',
		'check',
		'src/crypto/sjcl',
		'Interface/idb.filesystem.min',
	    'Interface/Request',
		'Interface/interface'
	]);

	echo $_t->getHead();
	echo $_t->getHeader();
	echo $_t->getSidebar();
?>
    <div class="container-max">
		<div id="display">
			<input type="radio" id="display_list" name="display">
			<label for="display_list" class="nomargin"><i class="fa fa-th-list" aria-hidden="true"></i></label>

			<input type="radio" id="display_mosaic" name="display" checked>
			<label for="display_mosaic" class="nomargin"><i class="fa fa-th-large" aria-hidden="true"></i></label>
		</div>

        <section id="desktop">
            <!-- Hidden upload form -->
            <form class="hidden">
                <input type="file" id="upFilesInput" name="files[]" multiple="multiple" class="hide" onchange="Upload.upFiles(this.files)" onclick="reset()">
            </form>

            <div id="returnArea"></div>
            <!-- mui contains all contents of interface : storage infos, link to parent folder, #tree (files and folders) ... -->
            <div id="mui">
                <?php echo self::$txt->Global->loading; ?>
            </div>
        </section>
    </div>
	<div id="selection">
		<div class="fixed">
			<section class="selection">
				<button id="up_btn" class="btn btn-large mbottom" onclick="Upload.dialog()"><?php echo self::$txt->RightClick->upFiles; ?></button>
				<a href="#" id="up_icon" class="blue block" onclick="Upload.dialog(event)" title="<?php echo self::$txt->RightClick->upFiles; ?>"><i class="fa fa-upload" aria-hidden="true"></i></a>
				<a href="#" id="create_btn" class="blue block" onclick="Folders.create(event)" title="<?php echo self::$txt->RightClick->nFolder; ?>"><i class="fa fa-folder-o" aria-hidden="true"></i> <?php echo self::$txt->RightClick->nFolder; ?></a>

				<!-- Selection infos will be displayed there -->
			</section>

			<!-- Box -->

			<div class="story">
				<p class="mono keep"><strong><?php echo self::$txt->Story->keep; ?></strong></p><hr>
				<p class="join"><?php echo self::$txt->Story->join; ?></p>

				<!--<p><a href="#"><?php echo self::$txt->Story->read; ?></a></p>-->

				<p><a href="<?php echo MVC_ROOT; ?>/Upgrade" class="btn btn-large btn-b"><?php echo self::$txt->Story->premium; ?></a></p>
				<p><a href="https://muonium.io/#!/donate" target="_blank" class="btn btn-large btn-c"><?php echo self::$txt->Story->donate; ?></a></p>

				<!--<p class="help"><a href="#"><?php echo self::$txt->Story->help; ?></a></p>-->
			</div>

			<div id="quota_container"></div>

			<p class="center"><a href="<?php echo MVC_ROOT; ?>/Upgrade" class="mono"><?php echo self::$txt->Profile->getmore; ?></a></p>

			<div class="selection_bottom">
				<!--<a href="#" class="btn btn-actions"></a>-->
				<!--<a href="#" class="mono up">Privacy</a>-->
			</div>
		</div>
	</div>

    <div id="transfers" class="hide">
        <section class="top">
            <?php echo self::$txt->Global->transfers; ?>
			<span onclick="Transfers.close()"><i class="fa fa-times" aria-hidden="true"></i></span>
            <span onclick="Transfers.minimize()"><i class="fa fa-window-minimize" aria-hidden="true"></i></span>
        </section>

        <section class="toggle">
            <ul>
                <li class="selected" onclick="Transfers.showUp()"><?php echo self::$txt->User->uploading; ?></li>
                <li onclick="Transfers.showDl()"><?php echo self::$txt->User->downloading; ?></li>
            </ul>
        </section>

        <section class="content">
            <div class="transfers_upload"><?php echo self::$txt->User->nothing; ?></div>
            <div class="transfers_download"><?php echo self::$txt->User->nothing; ?></div>
        </section>
    </div>

    <div id="box" class="hide"></div>
	<a href="#" id="dl_decrypted"></a>
	<script>
		$(document).ready(UserLoader);
	</script>
<?php
    echo $_t->getFooter();
?>

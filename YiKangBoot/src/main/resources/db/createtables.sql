    #字典表
	DROP TABLE IF EXISTS `yikang`.`dict`;
	CREATE TABLE `yikang`.`dict` (
		`id` BIGINT(20) NOT NULL COMMENT '字典表主键',
		`catagery` INT NOT NULL COMMENT '字典值分类: 1 manage',
		`key` VARCHAR(50) NOT NULL COMMENT '字典key值',
		`value` VARCHAR(10240) NOT NULL COMMENT '字典value值',
		`comment` VARCHAR(200) NULL COMMENT '字典项注释',
		PRIMARY KEY (`id`));
	
	#向字典表插入数据
	BEGIN;
	INSERT INTO `yikang`.`dict` VALUES 
	(909087627976704002, 1, 'stars', '5', '岗位星级评定最高值');
	COMMIT;
	

	#生产车间
	DROP TABLE IF EXISTS `yikang`.`workshop`;
	CREATE TABLE `yikang`.`workshop` (
		`id` BIGINT(20) NOT NULL  COMMENT '生产车间表主键',
		`name` VARCHAR(50) NOT NULL COMMENT '生产车间名称',
		`comment` VARCHAR(200) NULL COMMENT '生产车间注释',
		`delflag` TINYINT NOT NULL DEFAULT 0 COMMENT '生产车间表删除标记 0：未删除,1:已删除',
		PRIMARY KEY (`id`));
	#向生产车间表插入数据
	BEGIN;
	INSERT INTO `yikang`.`workshop` VALUES 
	(909087628014452738, 'WorkShop 1', '第一个生产车间', 0),
	(909087628014452739, 'WorkShop 2', '第二个生产车间', 0),
	(909087628014452740, 'WorkShop 3', '第三个生产车间', 0),
	(909087628014452741, 'WorkShop 4', '第四个生产车间', 0),
	(909087628014452742, 'WorkShop 5', '第五个生产车间', 0);
	COMMIT;	
		
    #产品家族
	DROP TABLE IF EXISTS `yikang`.`productfamily`;
    CREATE TABLE `yikang`.`productfamily`(
    	`id` BIGINT(20) NOT NULL COMMENT '生产家族表主键',
    	`name` VARCHAR(50) NOT NULL COMMENT '生产家族名称',
		`comment` VARCHAR(200) NULL COMMENT '生产家族注释',
		`delflag` TINYINT NOT NULL DEFAULT 0 COMMENT '生产家族表删除标记',
		PRIMARY KEY (`id`));

	#向产品家族表插入数据
	BEGIN;
	INSERT INTO `yikang`.`productfamily` VALUES 
	(909087628014452743, 'productfamily 1', '第一个产品家族', 0),
	(909087628014452744, 'productfamily 2', '第二个产品家族', 0),
	(909087628014452745, 'productfamily 3', '第三个产品家族', 0),
	(909087628014452746, 'productfamily 4', '第四个产品家族', 0),
	(909087628014452747, 'productfamily 5', '第五个产品家族', 0);
	COMMIT;	

    #生产线
    DROP TABLE IF EXISTS `yikang`.`line`;
    CREATE TABLE `yikang`.`line`(
    	`id` BIGINT(20) NOT NULL COMMENT '生产线表主键',
    	`name` VARCHAR(50) NOT NULL COMMENT '生产家线名称',
        `workshop_id` BIGINT(20) NOT NULL COMMENT '生产车间ID',    	
		`comment` VARCHAR(200) NULL COMMENT '生产线注释',
		`delflag` TINYINT NOT NULL DEFAULT 0 COMMENT '生产线删除标记',		
		PRIMARY KEY (`id`));
	#向生产线表插入数据
	BEGIN;
	INSERT INTO `yikang`.`line` VALUES 
	(909087628014452748, 'line 1', 909087628014452738, '第一个生产线', 0),
	(909087628014452749, 'line 2', 909087628014452739, '第二个生产线', 0),
	(909087628014452750, 'line 3', 909087628014452740, '第三个生产线', 0),
	(909087628014452751, 'line 4', 909087628014452741, '第四个生产线', 0),
	(909087628014452752, 'line 5', 909087628014452742, '第五个生产线', 0);
	COMMIT;	


    #生产线工位
    DROP TABLE IF EXISTS `yikang`.`lineseat`;
    CREATE TABLE `yikang`.`lineseat`(
    	`id` BIGINT(20) NOT NULL COMMENT '坐席表主键',
    	`line_id` BIGINT(20) NOT NULL COMMENT '生产线ID',
    	`serise` INT NOT NULL COMMENT '坐席再生产线中的位置',
    	`job_id` BIGINT(20) NOT NULL COMMENT '岗位ID',
    	`name` VARCHAR(50) NOT NULL COMMENT '坐席名称',
		`comment` VARCHAR(200) NULL COMMENT '备注信息',
		`delflag` TINYINT NOT NULL DEFAULT 0 COMMENT '坐席删除标记',		
		PRIMARY KEY (`id`));
    	#向岗位表插入数据
	BEGIN;
	INSERT INTO `yikang`.`lineseat` VALUES
	(909087628018647053, 909087628014452748, 0, 909087628018647044, 'Al1s1岗位1', '产线1第1号工位（岗位1：A类）', 0),
	(909087628018647054, 909087628014452748, 1, 909087628018647045, 'Bl1s2岗位2', '产线1第2号工位（岗位2：B类）', 0),
	(909087628018647055, 909087628014452748, 2, 909087628018647046, 'Cl1s3岗位3', '产线1第3号工位（岗位3：C类）', 0),
	(909087628018647056, 909087628014452748, 3, 909087628018647047, 'Al1s4岗位4', '产线1第4号工位（岗位4：A类）', 0),
	(909087628018647057, 909087628014452748, 4, 909087628018647048, 'Bl1s5岗位5', '产线1第5号工位（岗位5：B类）', 0),

	(909087628018647058, 909087628014452749, 0, 909087628018647044, 'Al2s1岗位1', '产线2第1号工位（岗位1：A类）', 0),
	(909087628018647059, 909087628014452749, 1, 909087628018647045, 'Bl2s2岗位2', '产线2第2号工位（岗位2：B类）', 0),
	(909087628018647060, 909087628014452749, 2, 909087628018647046, 'Cl2s3岗位3', '产线2第3号工位（岗位3：C类）', 0),
	(909087628018647061, 909087628014452749, 3, 909087628018647047, 'Al2s4岗位4', '产线2第4号工位（岗位4：A类）', 0),
	(909087628018647062, 909087628014452749, 4, 909087628018647048, 'Bl2s5岗位5', '产线2第5号工位（岗位5：B类）', 0);
	COMMIT;	
    
    #生产线工位上工表
    DROP TABLE IF EXISTS `yikang`.`lineseat_operator`;
    CREATE TABLE `yikang`.`lineseat_operator`(
		`id` BIGINT(20) NOT NULL COMMENT '上工状态表主键',
        `lineseat_id` BIGINT(20) NOT NULL COMMENT '工位表主键',
        `operator_id` BIGINT(20) NOT NULL COMMENT '员工表主键',
        `starttime` DATETIME NOT NULL COMMENT '上工时间',
        PRIMARY KEY (`id`));

    #岗位
    DROP TABLE IF EXISTS `yikang`.`job`;
    CREATE TABLE `yikang`.`job`(
    	`id` BIGINT(20) NOT NULL COMMENT '岗位表主键',
    	`name` VARCHAR(50) NOT NULL  COMMENT '岗位名称',
        `joblevel_id` BIGINT(20) NOT NULL COMMENT '岗位级别',    	
	`starlevel` TINYINT NOT NULL COMMENT '岗位星级要求',
	`comment` VARCHAR(200) NULL COMMENT '岗位注释',
	`delflag` TINYINT NOT NULL DEFAULT 0 COMMENT '岗位删除标记',
	PRIMARY KEY (`id`));
	#向岗位表插入数据
	BEGIN;
	INSERT INTO `yikang`.`job` VALUES
	(909087628018647044, '岗位1', 909087628018647041, 1, 'A岗位1', 0),
	(909087628018647045, '岗位2', 909087628018647042, 1, 'B岗位2', 0),
	(909087628018647046, '岗位3', 909087628018647043, 1, 'C岗位3', 0),
	(909087628018647047, '岗位4', 909087628018647041, 1, 'A岗位4', 0),
	(909087628018647048, '岗位5', 909087628018647042, 1, 'B岗位5', 0),
	(909087628018647049, '岗位6', 909087628018647043, 1, 'C岗位6', 0),
	(909087628018647050, '岗位7', 909087628018647041, 1, 'A岗位7', 0),
	(909087628018647051, '岗位8', 909087628018647042, 1, 'B岗位8', 0),
	(909087628018647052, '岗位9', 909087628018647043, 1, 'C岗位9', 0);
	COMMIT;	


    #岗位级别
	DROP TABLE IF EXISTS `yikang`.`joblevel`;
	CREATE TABLE `yikang`.`joblevel` (
		`id` BIGINT(20) NOT NULL COMMENT '岗位级别表主键',
		`name` VARCHAR(50) NOT NULL COMMENT '岗位级别名称',
		`comment` VARCHAR(200) NULL COMMENT '岗位级别注释',
		`delflag` TINYINT NOT NULL DEFAULT 0 COMMENT '岗位级别删除标记',
		PRIMARY KEY (`id`));
	#向岗位级别表插入数据
	BEGIN;
	INSERT INTO `yikang`.`joblevel` VALUES
	(909087628018647041, 'A', 'A级岗位', 0),
	(909087628018647042, 'B', 'B级岗位', 0),
	(909087628018647043, 'C', 'C级岗位', 0);
	COMMIT;		

	#生产型号
	DROP TABLE IF EXISTS `yikang`.`productcode`;
	CREATE TABLE `yikang`.`productcode` (
		`id` BIGINT(20) NOT NULL  COMMENT '生产型号表主键',
        `workshop_id` BIGINT(20) NOT NULL COMMENT '生产车间ID',
        `productfamily_id` BIGINT(20) NOT NULL COMMENT '生产家族ID',
		`productcode` VARCHAR(50) NOT NULL COMMENT '生产型号',
		`target` INT NOT NULL COMMENT '计划每小时生产数量',
		`cycletime` VARCHAR(50) NULL COMMENT 'cycle time，记录用户输入',
		`EU` VARCHAR(50) NOT NULL COMMENT '',
		`comment` VARCHAR(200) NULL  COMMENT '生产型号注释',
		`delflag` TINYINT NOT NULL DEFAULT 0 COMMENT '生产型号删除标记',
		PRIMARY KEY (`id`));
		#向岗位级别表插入数据
	BEGIN;
	INSERT INTO `yikang`.`productcode` VALUES
	(909087628022841347, 909087628014452738, 909087628014452743, '001', 101,'120', '12.01', 'shop1family1-001', 0),
	(909087628022841348, 909087628014452738, 909087628014452743, '002', 102,'120', '12.02', 'shop1family1-002', 0),
	(909087628022841349, 909087628014452738, 909087628014452743, '003', 103,'120', '12.03', 'shop1family1-003', 0),

	(909087628022841350, 909087628014452739, 909087628014452744, '201', 201,'120', '12.04', 'shop2family2-001', 0),
	(909087628022841351, 909087628014452739, 909087628014452744, '202', 202,'120', '12.05', 'shop2family2-002', 0),
	(909087628022841352, 909087628014452739, 909087628014452744, '203', 203,'120', '12.06', 'shop2family2-003', 0),
	
	(909087628022841353, 909087628014452740, 909087628014452745, '301', 301,'120', '12.07', 'shop3family3-001', 0),
	(909087628022841354, 909087628014452740, 909087628014452745, '302', 302,'120', '12.08', 'shop3family3-002', 0),
	(909087628022841355, 909087628014452740, 909087628014452745, '303', 303,'120', '12.09', 'shop3family3-003', 0),
	
	(909087628022841356, 909087628014452741, 909087628014452746, '401', 401,'120', '12.10', 'shop4family4-001', 0),
	(909087628022841357, 909087628014452741, 909087628014452746, '402', 402,'120', '12.11', 'shop4family4-002', 0),
	(909087628022841358, 909087628014452741, 909087628014452746, '403', 403,'120', '12.12', 'shop4family4-003', 0);
	COMMIT;	

	#批次号
    DROP TABLE IF EXISTS `yikang`.`batchno`;
    CREATE TABLE `yikang`.`batchno` (
		`id` BIGINT(20) NOT NULL COMMENT '批次号主键',
        `name` VARCHAR(50) NOT NULL COMMENT '批次号名称',
		`productcode_id` BIGINT(20) NOT NULL  COMMENT '生产型号ID',
		`target` INT NOT NULL COMMENT '批次生产目标个数',
		`state`	INT NOT NULL COMMENT '批次生产状态：0 新建,1生产中,2已完成',
        `comment` VARCHAR(200) NULL COMMENT '批次注释',
        `delflag` TINYINT NOT NULL DEFAULT 0 COMMENT '批次号删除标记',
        PRIMARY KEY (`id`));
	#向批次号表中插入数据
	BEGIN;
	INSERT INTO `yikang`.`batchno` VALUES
	(909087628022841359, '909087628022841359', 909087628022841347, 10000, 2, '测试完成的批次号', 0),
	(909087628022841360, '909087628022841360', 909087628022841348, 10000, 2, '测试完成的批次号', 0),
	(909087628022841361, '909087628022841361', 909087628022841349, 10000, 2, '测试完成的批次号', 0),

	(909087628022841362, '909087628022841362', 909087628022841350, 20000, 1, '测试进行的批次号', 0),
	(909087628022841363, '909087628022841363', 909087628022841351, 20000, 1, '测试进行的批次号', 0),
	(909087628022841364, '909087628022841364', 909087628022841352, 20000, 1, '测试进行的批次号', 0),

	(909087628022841365, '909087628022841365', 909087628022841353, 30000, 0, '测试新建的批次号', 0),
	(909087628022841366, '909087628022841365', 909087628022841354, 30000, 0, '测试新建的批次号', 0),
	(909087628022841367, '909087628022841365', 909087628022841355, 30000, 0, '测试新建的批次号', 0);
	COMMIT;	

    #停机原因类别
	DROP TABLE IF EXISTS `yikang`.`mode`;
    CREATE TABLE `yikang`.`mode`(
    	`id` BIGINT(20) NOT NULL COMMENT '停机原因类别表主键',
    	`name` VARCHAR(50) NOT NULL COMMENT '停机原因类别名称',
		`comment` VARCHAR(200) NULL COMMENT '停机原因类别备注信息',
		`delflag` TINYINT NOT NULL DEFAULT 0  COMMENT '停机原因类别删除标记',
		PRIMARY KEY (`id`));
    	#向停机原因类别表插入数据
	BEGIN;
	INSERT INTO `yikang`.`mode` VALUES
	(909087628027035650, '停电', '停电', 0),
	(909087628027035651, '原料不足', '原料不足', 0),
	(909087628027035652, '机器维修', '机器维修', 0);
	COMMIT;		

    #停机原因
	DROP TABLE IF EXISTS `yikang`.`reason`;
    CREATE TABLE `yikang`.`reason`(
    	`id` BIGINT(20) NOT NULL COMMENT '停机原因表主键',
    	`name` VARCHAR(50) NOT NULL COMMENT '停机原因名称',
    	`mode_id` BIGINT(20) NOT NULL COMMENT '停机原因类别ID',    	
		`comment` VARCHAR(200) NULL COMMENT '停机原因注释',
		`delflag` TINYINT NOT NULL DEFAULT 0 COMMENT '停机原因删除标记',
		PRIMARY KEY (`id`));
	#向停机原因表中插入数据
	BEGIN;
	INSERT INTO `yikang`.`reason` VALUES
	(909087628027035653, '社区停电', 909087628027035650, '小区停电', 0),
	(909087628027035654, '产线停电', 909087628027035650, '产线停电', 0),

	(909087628027035655, '电线不足', 909087628027035651, '电线不足', 0),
	(909087628027035656, '塑料不足', 909087628027035651, '塑料不足', 0),
	
	(909087628027035657, '产线维修', 909087628027035652, '产线维修', 0),
	(909087628027035658, '空调维修', 909087628027035652, '空调维修', 0);
	COMMIT;	


	#操作员
	DROP TABLE IF EXISTS `yikang`.`operator`;
    CREATE TABLE `yikang`.`operator`(
    	`id` BIGINT(20) NOT NULL COMMENT '操作员表主键',
        `workid` VARCHAR(50) NOT NULL COMMENT '操作员工号',
    	`name` VARCHAR(50) NOT NULL COMMENT '操作员名称',
    	`avatar` VARCHAR(100) NULL COMMENT '操作员头像图片路径',
    	`shift_id` BIGINT(20) NOT NULL COMMENT '班次ID',
		`comment` VARCHAR(200) NULL COMMENT '操作员注释',
		`delflag` TINYINT NOT NULL DEFAULT 0 COMMENT '操作员删除标记',
		PRIMARY KEY (`id`));
    #向操作员表中插入数据
    BEGIN;
	INSERT INTO `yikang`.`operator` VALUES
	(909087628027035659, 'X4285', '斯蒂芬库里', '/images/1.jpg', 909087628031229954, '核心控卫', 0),
	(909087628027035660, 'X4286', '凯文杜兰特', '/images/2.jpg', 909087628031229954, '死神杜兰特', 0),
	(909087628027035661, 'X4287', '追梦格林',  '/images/3.jpg', 909087628031229954, '追梦格林', 0),

	(909087628027035662, 'X4288', '斯蒂芬库里', '/images/1.jpg', 909087628031229955, '核心控卫', 0),
	(909087628027035663, 'X4289', '凯文杜兰特', '/images/2.jpg', 909087628031229955, '死神杜兰特', 0),
	(909087628027035664, 'X4290', '追梦格林',  '/images/3.jpg', 909087628031229955, '追梦格林', 0);

	COMMIT;	



    #操作员岗位技能
	DROP TABLE IF EXISTS `yikang`.`operator_joblevel`;
	CREATE TABLE `operator_joblevel` (
	  `id` bigint(20) NOT NULL COMMENT '操作员岗位技能表主键',
	  `operator_id` bigint(20) NOT NULL COMMENT '操作员ID',
	  `job_id` bigint(20) NOT NULL COMMENT '岗位ID',
	  `starlevel` int(11) NOT NULL COMMENT '星级',
	  `expired` datetime NOT NULL COMMENT '星级评定到期时间',
	  `state` tinyint(4) NOT NULL DEFAULT '1' COMMENT '星级评定状态：0：失效，1：有效',
	  `delflag` tinyint(4) NOT NULL DEFAULT '0' COMMENT '星级评定删除标记',
	  PRIMARY KEY (`id`),
	  UNIQUE KEY `operator_job_id_UNIQUE` (`job_id`,`operator_id`));
    #向操作员岗位技能表插入数据
    BEGIN;
	INSERT INTO `yikang`.`operator_joblevel` VALUES
	(911961759932342273, 909087628027035659, 909087628018647044, 1,'2018-01-01 00:00:00', 1, 0),
	(911961759932342274, 909087628027035659, 909087628018647045, 2,'2018-01-01 00:00:00', 1, 0),
	(911961759932342275, 909087628027035659, 909087628018647046, 3,'2018-01-01 00:00:00', 1, 0),
	(911961759932342276, 909087628027035659, 909087628018647047, 4,'2018-01-01 00:00:00', 1, 0),
	(911961759932342277, 909087628027035659, 909087628018647048, 5,'2018-01-01 00:00:00', 1, 0),
	(911961759932342278, 909087628027035659, 909087628018647049, 1,'2018-01-01 00:00:00', 1, 0),
	(911961759932342279, 909087628027035659, 909087628018647050, 2,'2018-01-01 00:00:00', 1, 0),
	(911961759932342280, 909087628027035659, 909087628018647051, 3,'2018-01-01 00:00:00', 1, 0),
	(911961759932342281, 909087628027035659, 909087628018647052, 4,'2018-01-01 00:00:00', 1, 0),
	(911961759932342282, 909087628027035660, 909087628018647044, 1,'2018-01-01 00:00:00', 1, 0),
	(911961759932342283, 909087628027035660, 909087628018647045, 2,'2018-01-01 00:00:00', 1, 0),
	(911961759932342284, 909087628027035660, 909087628018647046, 3,'2018-01-01 00:00:00', 1, 0),
	(911961759932342285, 909087628027035660, 909087628018647047, 4,'2018-01-01 00:00:00', 1, 0),
	(911961759932342286, 909087628027035660, 909087628018647048, 5,'2018-01-01 00:00:00', 1, 0),
	(911961759932342287, 909087628027035660, 909087628018647049, 1,'2018-01-01 00:00:00', 1, 0),
	(911961759932342288, 909087628027035660, 909087628018647050, 2,'2018-01-01 00:00:00', 1, 0),
	(911961759932342289, 909087628027035660, 909087628018647051, 3,'2018-01-01 00:00:00', 1, 0),
	(911961759932342290, 909087628027035660, 909087628018647052, 4,'2018-01-01 00:00:00', 1, 0),
	(911961759932342291, 909087628027035661, 909087628018647044, 1,'2018-01-01 00:00:00', 1, 0),
	(911961759932342292, 909087628027035661, 909087628018647045, 2,'2018-01-01 00:00:00', 1, 0),
	(911961759932342293, 909087628027035661, 909087628018647046, 3,'2018-01-01 00:00:00', 1, 0),
	(911961759932342294, 909087628027035661, 909087628018647047, 4,'2018-01-01 00:00:00', 1, 0),
	(911961759932342295, 909087628027035661, 909087628018647048, 5,'2018-01-01 00:00:00', 1, 0),
	(911961759932342296, 909087628027035661, 909087628018647049, 1,'2018-01-01 00:00:00', 1, 0),
	(911961759932342297, 909087628027035661, 909087628018647050, 2,'2018-01-01 00:00:00', 1, 0),
	(911961759932342298, 909087628027035661, 909087628018647051, 3,'2018-01-01 00:00:00', 1, 0),
	(911961759932342299, 909087628027035661, 909087628018647052, 4,'2018-01-01 00:00:00', 1, 0),
	(911961759932342300, 909087628027035662, 909087628018647044, 1,'2018-01-01 00:00:00', 1, 0),
	(911961759932342301, 909087628027035662, 909087628018647045, 2,'2018-01-01 00:00:00', 1, 0),
	(911961759932342302, 909087628027035662, 909087628018647046, 3,'2018-01-01 00:00:00', 1, 0),
	(911961759932342303, 909087628027035662, 909087628018647047, 4,'2018-01-01 00:00:00', 1, 0),
	(911961759932342304, 909087628027035662, 909087628018647048, 5,'2018-01-01 00:00:00', 1, 0),
	(911961759932342305, 909087628027035662, 909087628018647049, 1,'2018-01-01 00:00:00', 1, 0),
	(911961759932342306, 909087628027035662, 909087628018647050, 2,'2018-01-01 00:00:00', 1, 0),
	(911961759932342307, 909087628027035662, 909087628018647051, 3,'2018-01-01 00:00:00', 1, 0),
	(911961759932342308, 909087628027035662, 909087628018647052, 4,'2018-01-01 00:00:00', 1, 0),
	(911961759932342309, 909087628027035663, 909087628018647044, 1,'2018-01-01 00:00:00', 1, 0),
	(911961759932342310, 909087628027035663, 909087628018647045, 2,'2018-01-01 00:00:00', 1, 0),
	(911961759932342311, 909087628027035663, 909087628018647046, 3,'2018-01-01 00:00:00', 1, 0),
	(911961759932342312, 909087628027035663, 909087628018647047, 4,'2018-01-01 00:00:00', 1, 0),
	(911961759932342313, 909087628027035663, 909087628018647048, 5,'2018-01-01 00:00:00', 1, 0),
	(911961759932342314, 909087628027035663, 909087628018647049, 1,'2018-01-01 00:00:00', 1, 0),
	(911961759932342315, 909087628027035663, 909087628018647050, 2,'2018-01-01 00:00:00', 1, 0),
	(911961759965896706, 909087628027035663, 909087628018647051, 3,'2018-01-01 00:00:00', 1, 0),
	(911961759965896707, 909087628027035663, 909087628018647052, 4,'2018-01-01 00:00:00', 1, 0),
	(911961759965896708, 909087628027035664, 909087628018647044, 1,'2018-01-01 00:00:00', 1, 0),
	(911961759965896709, 909087628027035664, 909087628018647045, 2,'2018-01-01 00:00:00', 1, 0),
	(911961759965896710, 909087628027035664, 909087628018647046, 3,'2018-01-01 00:00:00', 1, 0),
	(911961759965896711, 909087628027035664, 909087628018647047, 4,'2018-01-01 00:00:00', 1, 0),
	(911961759965896712, 909087628027035664, 909087628018647048, 5,'2018-01-01 00:00:00', 1, 0),
	(911961759965896713, 909087628027035664, 909087628018647049, 1,'2018-01-01 00:00:00', 1, 0),
	(911961759965896714, 909087628027035664, 909087628018647050, 2,'2018-01-01 00:00:00', 1, 0),
	(911961759965896715, 909087628027035664, 909087628018647051, 3,'2018-01-01 00:00:00', 1, 0),
	(911961759965896716, 909087628027035664, 909087628018647052, 4,'2018-01-01 00:00:00', 1, 0);
	COMMIT;	


    #班组管理
	DROP TABLE IF EXISTS `yikang`.`shift`;
    CREATE TABLE `yikang`.`shift`(
    	`id` BIGINT(20) NOT NULL  COMMENT '班组表主键',
    	`name` VARCHAR(50) NOT NULL COMMENT '班组名称',
    	`owner` VARCHAR(50) NOT NULL COMMENT '班组管理员姓名',
		`comment` VARCHAR(200) NULL COMMENT '班组备注',
		`delflag` TINYINT NOT NULL DEFAULT 0 COMMENT '班组删除状态',
		PRIMARY KEY (`id`));
    #向班组表中插入数据
	BEGIN;
	INSERT INTO `yikang`.`shift` VALUES
	(909087628031229954, 'Shift A', '张三', 'A班', 0),
	(909087628031229955, 'Shift B', '李四', 'B班', 0),
	(909087628031229956, 'Shift C', '王五', 'C班', 0);
	COMMIT;	

    #人员工作明细
	DROP TABLE IF EXISTS `yikang`.`operator_workdetail`;
    CREATE TABLE `yikang`.`operator_workdetail`(
    	`id` BIGINT(20) NOT NULL COMMENT '主键',
    	`operator_id` BIGINT(20) NOT NULL COMMENT '操作员ID',
    	`seat_id` BIGINT(20) NOT NULL COMMENT '坐席ID',
    	`starttime` DATETIME NOT NULL COMMENT '开始时间',
    	`endtime` DATETIME NOT NULL COMMENT '结束时间',
		PRIMARY KEY (`id`));

    #补贴管理
	DROP TABLE IF EXISTS `yikang`.`subsidy`;
	CREATE TABLE `yikang`.`subsidy` (
		`id` BIGINT(20) NOT NULL COMMENT '主键',
		`type` TINYINT NOT NULL COMMENT '补贴类型：0：星级补贴，1：月岗位补贴，2：小时岗位补贴',
		`joblevel_id` BIGINT(20) NOT NULL COMMENT '班组表主键',
		`startlevel` INT NOT NULL COMMENT '星级',
		`subsidy` DECIMAL(10,2) NOT NULL COMMENT '补贴值',
		`comment` VARCHAR(200) NULL COMMENT '备注',		
		PRIMARY KEY (`id`));

	#生产信息
	DROP TABLE IF EXISTS `yikang`.`porductlog`;
	CREATE TABLE `yikang`.`porductlog` (
		`id` BIGINT(20) NOT NULL COMMENT '生产信息日志表主键',
		`line_id` BIGINT(20) NOT NULL COMMENT '生产线ID',
		`shift_id` BIGINT(20) NOT NULL COMMENT '班次ID',
		`batchno_id` BIGINT(20) NOT NULL COMMENT '批次号ID',
    	`starttime` DATETIME NOT NULL COMMENT '开始时间',
    	`endtime` DATETIME NOT NULL COMMENT '截止时间',		
		`done` INT NOT NULL COMMENT '已完成数量',
		`crap` INT NOT NULL COMMENT '废品数量',
		`rework` INT NOT NULL COMMENT '返工数量',
        `comment` VARCHAR(200) NULL COMMENT '备注',	
		`delflag` TINYINT NOT NULL DEFAULT 0 COMMENT '删除标记',		
		PRIMARY KEY (`id`));

	#故障信息
	DROP TABLE IF EXISTS `yikang`.`stopreasonlog`;
	CREATE TABLE `yikang`.`stopreasonlog` (
		`id` BIGINT(20) NOT NULL COMMENT '故障信息日志表主键',
		`line_id` BIGINT(20) NOT NULL COMMENT '班次ID',
		`shift_id` BIGINT(20) NOT NULL COMMENT '停机原因表主键',
    	`starttime` DATETIME NOT NULL COMMENT '开始时间',
    	`endtime` DATETIME NOT NULL COMMENT '结束时间',			
		`reason_id` BIGINT(20) NOT NULL COMMENT '原因ID',
        `comment` VARCHAR(200) NULL COMMENT '备注',	
		`delflag` TINYINT NOT NULL  DEFAULT 0 COMMENT '删除标记',	
		PRIMARY KEY (`id`));

  #用户表
  DROP  TABLE IF EXISTS `yikang`.`user`;
  CREATE TABLE `yikang`.`user`(
    `id` bigint(20) NOT NULL COMMENT '用户表主键',
    `username` varchar(20) NOT  NULL  COMMENT '用户名',
    `name` VARCHAR(20) NOT NULL COMMENT '用户姓名',
    `passwd` VARCHAR(12) NOT NULL COMMENT '密码',
    `role_id` bigint(20) NOT NULL COMMENT '角色id',
		`comment` VARCHAR(64) NULL COMMENT '备注',
    PRIMARY KEY (`id`)
  );
		BEGIN;
		INSERT INTO `user` VALUES ('913769646898827265', 'admin', 'admin', '123456', '913439581480722433', 'admin');
		COMMIT;

  #角色名
  DROP TABLE IF EXISTS `yikang`.`role`;
  CREATE TABLE `yikang`.`role`(
    `id` bigint(20) NOT  NULL COMMENT '角色表主键',
    `name` VARCHAR(20) NOT NULL COMMENT '角色名称',
		`comment` VARCHAR(64) NULL COMMENT '备注',
		`permission` VARCHAR(100) NULL COMMENT '权限串',
    PRIMARY KEY (`id`)
  );
	BEGIN;
	INSERT INTO `role` VALUES ('913439581480722433', '管理员', '系统管理员', '1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19');
	INSERT INTO `role` VALUES ('913668857429794818', '财务人员', '财务人员', '13,14,15');
	COMMIT;

		#角色映射表
  DROP TABLE IF EXISTS `yikang`.`role_permission`;
  CREATE TABLE `yikang`.`role_permission`(
    `id` bigint(20) NOT NULL COMMENT '角色映射表',
    `role_id` bigint(20) NOT NULL COMMENT '角色id',
    `permission` VARCHAR(100) NOT NULL COMMENT '权限串',
    PRIMARY KEY (`id`)
  );

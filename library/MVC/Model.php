<?php
namespace library\MVC;
use \config as conf;

// This class is called by all models (with "extends")
class Model {

    protected static $_sql;
    //protected $_ListModel = array();
    //protected $_RequeteSql;

    function __construct() {
        $this->_sql = new \PDO('mysql:host='.conf\confDB::hostDefaut.';dbname='.conf\confDB::bddDefaut,conf\confDB::userDefaut,conf\confDB::passDefaut);
        $this->_sql->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
        $this->_sql->setAttribute(\PDO::ATTR_EMULATE_PREPARES, false);
    }

    public static function getInstance() {
        if (!isset(self::$_sql)) {
            $c = __CLASS__;
            self::$_sql = new $c;
        }
        return self::$_sql;
    }

    function getLastInsertedId() {
        return $this->_sql->lastInsertId();
    }

    public function __get($attr) {
        return $this->$attr;
    }

    public function __set($attr, $val) {
        $this->$attr = $val;
    }
};

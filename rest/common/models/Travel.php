<?php

namespace common\models;

use Yii;
use \common\models\base\Travel as BaseTravel;

/**
 * This is the model class for table "Travel".
 */
class Travel extends BaseTravel
{
	public function extraFields() {
        $fields = parent::extraFields();
        $fields[] = 'topics';
        return $fields;
    }
}
